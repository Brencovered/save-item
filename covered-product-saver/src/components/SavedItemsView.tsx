import React from 'react';
import { SavedProduct } from '../types';

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
  return (
    <div>
      <h2>Saved items</h2>
      <p className="text-muted">
        These are the products you&apos;ve starred from Browse. In a real Covered
        flow, we&apos;d watch Woolworths / Coles prices and ping you when these drop.
      </p>

      {saved.length === 0 ? (
        <div className="empty-state">
          <strong>No saved products yet.</strong>
          <p>
            Go back to <strong>Browse</strong> and hit <em>Save</em> on any product
            you want to watch. They&apos;ll appear here with alert settings.
          </p>
        </div>
      ) : (
        <div className="saved-list">
          {saved.map((p) => (
            <div key={p.id} className="saved-item">
              <div className="saved-item-main">
                <span className="saved-item-name">{p.name}</span>
                <span className="saved-item-meta">
                  {p.size} • ${p.price.toFixed(2)}{' '}
                  <span className="chip">Saved {new Date(p.savedAt).toLocaleDateString()}</span>
                </span>
              </div>
              <span className="badge">Watching for price drops</span>
            </div>
          ))}
        </div>
      )}

      <div className="alert-settings">
        <h3>Price drop alerts (mock)</h3>
        <p>
          This is where we&apos;d wire up email / SMS notifications when any of your
          saved products hit a trigger price or go on special.
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
