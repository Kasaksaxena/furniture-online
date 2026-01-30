"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const PRODUCT_DATA: any = {
  'aero-chair': {
    name: 'Aero Chair',
    angles: [
      { label: 'Front', url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80' },
      { label: 'Profile', url: 'https://images.unsplash.com/photo-1567016432779-094069958ad5?q=80' },
      { label: 'Detail', url: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80' }
    ]
  },
  'geo-sofa': {
    name: 'Geo Sofa',
    angles: [
      { label: 'Front', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80' },
      { label: 'Side', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80' },
      { label: 'Detail', url: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?q=80' }
    ]
  },
  // ADDED: Missing data for v-table to prevent the undefined error
  'v-table': {
    name: 'V-Series Table',
    angles: [
      { label: 'Perspective', url: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80' },
      { label: 'Top', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80' },
      { label: 'Surface', url: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80' }
    ]
  }
};

function MarketingContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || 'aero-chair';
  const product = PRODUCT_DATA[id];

  // Safety check: If ID is wrong, don't crash, show a message
  if (!product) {
    return (
      <div className="p-20 text-center space-y-4">
        <h2 className="text-4xl font-black italic uppercase">Asset Not Loaded</h2>
        <Link href="/inventory" className="text-indigo-600 font-bold uppercase text-xs tracking-widest underline">Return to Inventory</Link>
      </div>
    );
  }

  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-700">
      <h1 className="text-6xl font-black italic uppercase tracking-tighter">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {product.angles.map((angle: any) => (
          <div key={angle.label} className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-slate-100 group">
            <img src={angle.url} className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700" alt={angle.label} />
            <p className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{angle.label} View</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ThreeAngleDashboard() {
  return (
    // Suspense is REQUIRED when using useSearchParams in Next.js 15+
    <Suspense fallback={<div className="p-20 font-black italic uppercase tracking-tighter text-4xl animate-pulse">Loading Assets...</div>}>
      <MarketingContent />
    </Suspense>
  );
}
