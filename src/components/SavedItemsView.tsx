import React, { useMemo } from 'react';
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

function computeStats(history: PricePoint[]) {
  const prices = history.map((p) => p.price);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const median = prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)];
  return { lowest, highest, median };
}

function predictNextDrop(history: PricePoint[], currentPrice: number): string {
  if (history.length < 3) return 'Not enough history yet.';

  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const drops: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].price < sorted[i - 1].price) {
      const days =
        (new Date(sorted[i].date).getTime() -
          new Date(sorted[i - 1].date).getTime()) /
        (1000 * 60 * 60 * 24);
      drops.push(days);
    }
  }

  const hasDrops = drops.length > 0;
  const avgDropGap = hasDrops
    ? drops.reduce((a, b) => a + b, 0) / drops.length
    : null;

  const { median } = computeStats(sorted);

  if (currentPrice <= median) {
    return 'Already at or below typical price.';
  }

  if (!avgDropGap) {
    return 'Above typical price, but no clear drop pattern yet.';
  }

  const lastDate = sorted[sorted.length - 1].date;
  const estimate = new Date(lastDate);
  estimate.setDate(estimate.getDate() + Math.round(avgDropGap));

  return `Likely to drop again in ~${Math.round(
    avgDropGap
  )} days (around ${estimate.toLocaleDateString()}).`;
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
  const itemsWithPrediction = useMemo(
    () =>
      saved.map((p) => {
        const prediction =
          p.priceHistory && p.priceHistory.length
            ? predictNextDrop(p.priceHistory, p.price)
            : 'No price history yet.';
        return { product: p, prediction };
      }),
    [saved]
  );

  return (
    <div>
      <h2>Saved items</h2>
      <p className="text-muted">
        These are the products you&apos;ve starred from Browse. We mock a simple
        prediction of when they might drop in price based on recent changes.
      </p>

      {saved.length === 0 ? (
        <div className="empty-state">
          <strong>No saved products yet.</strong>
          <p>
            Go back to <strong>Browse</strong> and hit <em>Save</em> on any
            product you want to watch. They&apos;ll appear here with alert
            settings.
          </p>
        </div>
      ) : (
        <div className="saved-list">
          {itemsWithPrediction.map(({ product, prediction }) => (
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
              </div>
              <span className="badge">Watching for price drops</span>
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
