import React, { useMemo, useState } from 'react';
import { PricePoint, SavedProduct } from '../types';

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

/**
 * Analyse price history and return:
 * - a prediction line for the list
 * - a plain-English explanation we can show when user clicks "History"
 */
function analysePriceHistory(
  history: PricePoint[],
  currentPrice: number
): { prediction: string; explanation: string } {
  if (history.length < 2) {
    return {
      prediction: 'Not enough history yet to estimate a change.',
      explanation:
        'We need at least a couple of price moves to understand how often this product tends to change.'
    };
  }

  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Gather only points where the price actually changed
  type ChangePoint = { date: Date; price: number };
  const changes: ChangePoint[] = [{ date: new Date(sorted[0].date), price: sorted[0].price }];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].price !== sorted[i - 1].price) {
      changes.push({ date: new Date(sorted[i].date), price: sorted[i].price });
    }
  }

  if (changes.length < 2) {
    return {
      prediction: 'Price has been stable so far; no clear change pattern yet.',
      explanation:
        'So far this product has barely moved in price, so we can’t confidently estimate when it will change again.'
    };
  }

  // Gaps between changes in days
  const gaps: number[] = [];
  for (let i = 1; i < changes.length; i++) {
    const days =
      (changes[i].date.getTime() - changes[i - 1].date.getTime()) /
      (1000 * 60 * 60 * 24);
    gaps.push(days);
  }

  const rawAvgGap = gaps.reduce((sum, d) => sum + d, 0) / gaps.length;

  // Clamp to a realistic 1–2 week cadence
  const clampedGap = Math.min(14, Math.max(7, rawAvgGap));
  const days = Math.round(clampedGap);
  const shops = Math.max(1, Math.round(days / 7)); // weekly shops

  const lastChange = changes[changes.length - 1];
  const today = new Date();
  const baseDate = today > lastChange.date ? today : lastChange.date;

  const estimateDate = new Date(baseDate);
  estimateDate.setDate(baseDate.getDate() + days);

  // Direction hint from median
  const allPrices = sorted.map((p) => p.price).sort((a, b) => a - b);
  const median = allPrices[Math.floor(allPrices.length / 2)];
  let directionHint = '';
  let directionWord = 'move';

  if (currentPrice > median) {
    directionHint = ' – it’s a bit higher than its normal price, so we expect it to drop again';
    directionWord = 'drop';
  } else if (currentPrice < median) {
    directionHint =
      ' – it’s a bit lower than its normal price, so we expect it to move back up';
    directionWord = 'increase';
  } else {
    directionHint = ' – it is close to its normal price, so a move up or down is likely';
  }

  const prediction = `Expected price change in ~${days} days (about ${shops} weekly shop${
    shops > 1 ? 's' : ''
  }), around ${estimateDate.toLocaleDateString()}.`;

  const windowStart = sorted[0].date;
  const windowEnd = sorted[sorted.length - 1].date;
  const totalDays =
    (new Date(windowEnd).getTime() - new Date(windowStart).getTime()) /
    (1000 * 60 * 60 * 24);
  const totalWeeks = totalDays / 7;

  const explanation = `We’ve seen ${changes.length} price changes over roughly ${totalWeeks.toFixed(
    1
  )} weeks, with an average gap of about ${rawAvgGap.toFixed(
    1
  )} days between changes. The last ${directionWord} was on ${lastChange.date.toLocaleDateString()}, when the price moved to $${lastChange.price.toFixed(
    2
  )}. Because the current price is $${currentPrice.toFixed(
    2
  )} and the typical (median) price is about $${median.toFixed(
    2
  )}${directionHint}, we’re estimating the next move in about ${days} days.`;

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
  // which saved item has its "history" explanation open
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
            'We haven’t collected enough historical prices for this item to explain a pattern yet.'
        };
      }),
    [saved]
  );

  return (
    <div>
      <h2>Saved items</h2>
      <p className="text-muted">
        These are the products you&apos;ve starred from Browse. We estimate when
        the price is likely to move again, based on how often it has changed in
        the past.
      </p>

      {saved.length === 0 ? (
        <div className="empty-state">
          <strong>No saved products yet.</strong>
          <p>
            Go back to <strong>Browse</strong> and hit <em>Save</em> on any
            product you want to watch. They&apos;ll appear here with predictions
            and alert settings.
          </p>
        </div>
      ) : (
        <div className="saved-list">
          {itemsWithInfo.map(({ product, prediction, explanation }) => (
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
                  <div className="saved-item-explanation">
                    {explanation}
                  </div>
                )}
              </div>

              <div className="saved-item-actions">
                <button
                  className="history-button"
                  type="button"
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
          ))}
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
