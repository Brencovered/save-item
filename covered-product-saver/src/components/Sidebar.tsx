import React, { useMemo, useState } from 'react';
import { SavedProduct, PricePoint } from '../types';

interface SavedItemsViewProps {
  saved: SavedProduct[];
  email: string;
  phone: string;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  alertsEmail: boolean;
  alertsSms: boolean;
  onToggleEmailAlerts: () => void;
  onToggleSmsAlerts: () => void;
}

/** Tiny inline sparkline chart for history */
const Sparkline: React.FC<{ history: PricePoint[] }> = ({ history }) => {
  if (!history.length) return null;

  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const prices = sorted.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const width = 160;
  const height = 40;
  const n = sorted.length;
  const stepX = n > 1 ? width / (n - 1) : 0;

  const points = prices
    .map((price, i) => {
      const x = stepX * i;
      let y: number;
      if (max === min) {
        y = height / 2;
      } else {
        const ratio = (price - min) / (max - min);
        y = height - ratio * (height - 4) - 2; // top-down
      }
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="sparkline"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Turn price history into:
 *  - a prediction sentence
 *  - a short “why” explanation
 */
function analysePriceHistory(
  history: PricePoint[],
  currentPrice: number
): { prediction: string; explanation: string } {
  if (history.length < 2) {
    return {
      prediction: 'Not enough history yet to estimate a change.',
      explanation:
        'We only have a few data points so far, so there is no clear pattern yet.'
    };
  }

  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  type ChangePoint = { date: Date; price: number };
  const changes: ChangePoint[] = [
    { date: new Date(sorted[0].date), price: sorted[0].price }
  ];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].price !== sorted[i - 1].price) {
      changes.push({ date: new Date(sorted[i].date), price: sorted[i].price });
    }
  }

  if (changes.length < 2) {
    return {
      prediction: 'Price has been mostly flat; no clear pattern yet.',
      explanation:
        'The price hasn’t moved much across the dates we have, so we can’t reliably guess the next change.'
    };
  }

  // gaps between changes in days
  const gaps: number[] = [];
  for (let i = 1; i < changes.length; i++) {
    const days =
      (changes[i].date.getTime() - changes[i - 1].date.getTime()) /
      (1000 * 60 * 60 * 24);
    gaps.push(days);
  }

  const rawAvgGap = gaps.reduce((sum, d) => sum + d, 0) / gaps.length;

  // clamp to realistic 1–2 weeks
  const clampedGap = Math.min(14, Math.max(7, rawAvgGap));
  const days = Math.round(clampedGap);
  const shops = Math.max(1, Math.round(days / 7));

  const lastChange = changes[changes.length - 1];
  const today = new Date();
  const baseDate = today > lastChange.date ? today : lastChange.date;

  const estimateDate = new Date(baseDate);
  estimateDate.setDate(baseDate.getDate() + days);

  // simple direction hint vs median
  const prices = sorted.map((p) => p.price).sort((a, b) => a - b);
  const median = prices[Math.floor(prices.length / 2)];
  let extra = '';

  if (currentPrice > median) {
    extra = ' It’s a little higher than normal, so we expect a drop soon.';
  } else if (currentPrice < median) {
    extra = ' It’s a little lower than normal, so we expect it to move back up.';
  }

  const prediction = `Expected price change in ~${days} days (about ${shops} weekly shop${
    shops > 1 ? 's' : ''
  }), around ${estimateDate.toLocaleDateString()}.`;

  const explanation = `This product usually changes price every ~${Math.round(
    rawAvgGap
  )} days. The last change was on ${lastChange.date.toLocaleDateString()}, so we expect the next move around ${estimateDate.toLocaleDateString()}.${extra}`;

  return { prediction, explanation };
}

const SavedItemsView: React.FC<SavedItemsViewProps> = ({
  saved,
  email,
  phone,
  onEmailChange,
  onPhoneChange,
  alertsEmail,
  alertsSms,
  onToggleEmailAlerts,
  onToggleSmsAlerts
}) => {
  const [openHistoryId, setOpenHistoryId] = useState<number | null>(null);

  const itemsWithInfo = useMemo(
    () =>
      saved.map((p) => {
        if (p.priceHistory && p.priceHistory.length > 0) {
          const { prediction, explanation } = analysePriceHistory(
            p.priceHistory,
            p.price
          );
          return { product: p, prediction, explanation };
        }
        return {
          product: p,
          prediction: 'No price history yet.',
          explanation:
            'We haven’t collected enough historical prices for this item yet.'
        };
      }),
    [saved]
  );

  return (
    <div>
      <h2>Saved items</h2>
      <p className="text-muted">
        These are the products you&apos;ve starred from Browse. We estimate when
        the price is likely to move again based on how it&apos;s changed in the
        past.
      </p>

      {saved.length === 0 ? (
        <div className="empty-state">
          <strong>No saved products yet.</strong>
          <p>
            Go back to <strong>Browse</strong> and hit <em>Save</em> on any
            product you want to watch.
          </p>
        </div>
      ) : (
        <div className="saved-list">
          {itemsWithInfo.map(({ product, prediction, explanation }) => {
            const history = (product.priceHistory || []) as PricePoint[];
            const sortedHistory = [...history].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            return (
              <div key={product.id} className="saved-item">
                <div className="saved-item-main">
                  <span className="saved-item-name">{product.name}</span>
                  <span className="saved-item-meta">
                    {product.size} • ${product.price.toFixed(2)}{' '}
                    <span className="chip">
                      Saved {new Date(product.savedAt).toLocaleDateString()}
                    </span>
                  </span>
                  <span className="saved-item-meta">{prediction}</span>

                  {openHistoryId === product.id && (
                    <div className="saved-item-history">
                      <p className="saved-item-explanation">{explanation}</p>

                      {history.length > 0 && (
                        <>
                          <Sparkline history={history} />
                          <ul className="saved-item-history-list">
                            {sortedHistory.map((h) => (
                              <li key={h.date}>
                                <span>
                                  {new Date(h.date).toLocaleDateString()}
                                </span>
                                <span>${h.price.toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="saved-item-actions">
                  <button
                    type="button"
                    className="history-button"
                    onClick={() =>
                      setOpenHistoryId(
                        openHistoryId === product.id ? null : product.id
                      )
                    }
                  >
                    History
                  </button>
                  <span className="badge">Watching for price drops</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="alert-settings">
        <h3>Price drop alerts (mock)</h3>
        <p>
          This is where we&apos;d wire up email / SMS notifications when any of
          your saved products hit a trigger price or go on special.
        </p>

        <div className="alert-channels">
          <label className="alert-switch-group">
            <input
              type="checkbox"
              checked={alertsEmail}
              onChange={onToggleEmailAlerts}
            />
            <span>Email alerts</span>
          </label>

        <label className="alert-switch-group">
            <input
              type="checkbox"
              checked={alertsSms}
              onChange={onToggleSmsAlerts}
            />
            <span>SMS alerts</span>
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>
            Mobile number
            <input
              type="text"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="04xx xxx xxx"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SavedItemsView;
