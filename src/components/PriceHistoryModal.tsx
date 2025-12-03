import React, { useMemo } from 'react';
import { PricePoint, Product } from '../types';

interface PriceHistoryModalProps {
  product: Product;
  onClose: () => void;
}

function computeStats(history: PricePoint[]) {
  const prices = history.map((p) => p.price);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const median = prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)];
  return { lowest, highest, median };
}

// simple prediction: if current price > median, estimate days to drop
// based on average interval between downward moves; otherwise "already good".
function predictNextDrop(history: PricePoint[], currentPrice: number) {
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
    return "Price is already at or below its typical level.";
  }

  if (!avgDropGap) {
    return "Price is above typical, but we don't have enough drop data yet.";
  }

  const lastDate = sorted[sorted.length - 1].date;
  const estimate = new Date(lastDate);
  estimate.setDate(estimate.getDate() + Math.round(avgDropGap));

  return `Based on past drops, we expect the next price dip in about ${Math.round(
    avgDropGap
  )} days (around ${estimate.toLocaleDateString()}).`;
}

const PriceHistoryModal: React.FC<PriceHistoryModalProps> = ({
  product,
  onClose
}) => {
  const history = product.priceHistory ?? [];

  const stats = useMemo(
    () => (history.length ? computeStats(history) : null),
    [history]
  );

  const prediction = useMemo(
    () =>
      history.length
        ? predictNextDrop(history, product.price)
        : 'No history yet for this product.',
    [history, product.price]
  );

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <div>
            <h2>{product.name}</h2>
            <div className="modal-subtitle">
              {stats && (
                <>
                  <span>Median: ${stats.median.toFixed(2)}</span>
                  <span>Lowest: ${stats.lowest.toFixed(2)}</span>
                  <span>Highest: ${stats.highest.toFixed(2)}</span>
                </>
              )}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </header>

        <section className="modal-content">
          <p className="modal-prediction">{prediction}</p>

          {history.length > 0 && (
            <div className="history-list">
              {history
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((point) => (
                  <div key={point.date} className="history-row">
                    <span>{new Date(point.date).toLocaleDateString()}</span>
                    <span>${point.price.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PriceHistoryModal;
