import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../covered-product-saver/src/components/Sidebar';
import Header from '../covered-product-saver/src/components/Header';
import ProductGrid from '../covered-product-saver/src/components/ProductGrid';
import SavedItemsView from '../covered-product-saver/src/components/SavedItemsView';
import { mockProducts } from './mockProducts';
import { Product, SavedProduct } from './types';

type Section = 'browse' | 'saved';

const STORAGE_KEY = 'covered-demo-saved-products';

const App: React.FC = () => {
  const [section, setSection] = useState<Section>('browse');
  const [saved, setSaved] = useState<SavedProduct[]>([]);
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alertsEmail, setAlertsEmail] = useState(true);
  const [alertsSms, setAlertsSms] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedProduct[];
        setSaved(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // ignore
    }
  }, [saved]);

  const onSaveToggle = (product: Product) => {
    setSaved((current) => {
      const exists = current.some((p) => p.id === product.id);
      if (exists) {
        return current.filter((p) => p.id !== product.id);
      }
      const now: SavedProduct = {
        ...product,
        savedAt: new Date().toISOString()
      };
      return [...current, now];
    });
  };

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockProducts;
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [search]);

  const savedIds = useMemo(() => saved.map((s) => s.id), [saved]);

  return (
    <div className="app-root">
      <Sidebar activeSection={section} onChangeSection={setSection} />
      <div className="main-area">
        <Header
          activeSection={section}
          onChangeSection={setSection}
          search={search}
          onSearchChange={setSearch}
        />
        <main className="content">
          {section === 'browse' ? (
            <ProductGrid
              products={filteredProducts}
              savedIds={savedIds}
              onSaveToggle={onSaveToggle}
            />
          ) : (
            <SavedItemsView
              saved={saved}
              email={email}
              phone={phone}
              alertsEmail={alertsEmail}
              alertsSms={alertsSms}
              onEmailChange={setEmail}
              onPhoneChange={setPhone}
              onToggleEmailAlerts={() => setAlertsEmail((v) => !v)}
              onToggleSmsAlerts={() => setAlertsSms((v) => !v)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
