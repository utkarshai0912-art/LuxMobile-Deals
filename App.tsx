
import React, { useState, useEffect, useMemo } from 'react';
import { Phone, AdType } from './types';
import { generatePhones } from './constants';
import PhoneCard from './components/PhoneCard';
import AdSlot from './components/AdSlot';

const App: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBrand, setActiveBrand] = useState("All");

  useEffect(() => {
    // Generate 204 premium phones for the inventory to meet the "200+" requirement
    const data = generatePhones(204);
    setPhones(data);
    
    // Short delay to simulate inventory sync and improve perceived value
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const brands = useMemo(() => {
    const b = new Set(phones.map(p => p.brand));
    return ["All", ...Array.from(b)];
  }, [phones]);

  const filteredPhones = useMemo(() => {
    return phones.filter(p => {
      const matchesBrand = activeBrand === "All" || p.brand === activeBrand;
      const matchesSearch = p.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [phones, activeBrand, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-black italic text-indigo-400">L</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-black tracking-[0.3em] text-gray-400 animate-pulse">LUXMOBILE GLOBAL WAREHOUSE</p>
            <p className="text-xs text-gray-600">Verifying 200+ clearance units...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Banner - Urgency & SEO */}
      <header className="bg-indigo-700 text-white py-2.5 text-center text-[10px] md:text-xs font-black uppercase tracking-[0.25em] sticky top-0 z-50 shadow-lg">
        🔥 <span className="text-yellow-400">URGENT:</span> DIRECT WAREHOUSE CLEARANCE | 69-79% OFF PREMIUM BRANDED PHONES | ENDS TODAY
      </header>

      {/* Main Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-4 md:px-8 sticky top-[32px] md:top-[36px] z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center transform rotate-3 shadow-xl">
              <span className="text-3xl font-black text-white italic">L</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-gray-900 leading-none">LUXMOBILE</h1>
              <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase">Premium Clearance Center</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl w-full">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search branded inventory (e.g. iPhone 15, Galaxy S24 Ultra...)"
                className="w-full bg-gray-100/80 border-2 border-transparent rounded-2xl py-3 px-12 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Shipping</p>
              <p className="text-xs font-black text-gray-900">FREE EXPRESS</p>
            </div>
            <button className="bg-gray-900 text-white p-3 rounded-2xl relative hover:bg-indigo-600 transition-all shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">0</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10">
        
        {/* Prime Ad Unit */}
        <AdSlot type={AdType.BANNER} slotId="lux-top-banner" className="mb-12 rounded-2xl shadow-sm" />

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar / Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-44 space-y-8">
              <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center justify-between">
                  Inventory Filter
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-2.5">
                  {brands.map(brand => (
                    <button 
                      key={brand}
                      onClick={() => setActiveBrand(brand)}
                      className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all text-left ${activeBrand === brand ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 -translate-y-1' : 'bg-gray-50 text-gray-500 hover:bg-white hover:text-indigo-600 border border-transparent hover:border-indigo-100'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </section>

              {/* Sidebar Ad Unit */}
              <div className="rounded-3xl overflow-hidden shadow-sm">
                <AdSlot type={AdType.SIDEBAR} slotId="lux-sidebar-ad" />
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                  {activeBrand === "All" ? "Global Inventory" : `${activeBrand} Pro Series`}
                </h2>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                  Showing {filteredPhones.length} authenticated clearance units
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-400 uppercase">Sort By</span>
                <select className="bg-white border-gray-100 rounded-xl text-xs font-bold p-3 shadow-sm focus:ring-indigo-500 cursor-pointer min-w-[160px]">
                  <option>Highest Discount (79%)</option>
                  <option>Inventory Release Date</option>
                  <option>Price: Elite to Premium</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPhones.map((phone, index) => (
                <React.Fragment key={phone.id}>
                  <PhoneCard phone={phone} />
                  {/* Strategic Ad Insertion: Every 6 products ensures monetization without breaking user flow */}
                  {(index + 1) % 6 === 0 && (
                    <div className="col-span-full">
                      <AdSlot type={AdType.IN_FEED} slotId={`lux-feed-ad-${index}`} className="rounded-3xl shadow-sm" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {filteredPhones.length === 0 && (
              <div className="text-center py-24 bg-white rounded-[2rem] border-4 border-dashed border-gray-50 shadow-inner">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Unit Not Found in Warehouse</h3>
                <p className="text-gray-400 font-medium">Try searching for generic terms like "iPhone" or "Galaxy".</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer - Final SEO Block */}
      <footer className="bg-gray-950 text-white pt-20 pb-10 px-8 mt-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-2xl font-black text-gray-950 italic">L</span>
              </div>
              <h2 className="text-xl font-black tracking-tighter uppercase">LuxMobile</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Global leaders in branded smartphone warehouse liquidation. We provide verified, factory-sealed units directly to consumers at wholesale clearance prices.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-indigo-400">Authentic Brands</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Apple iPhone Clearance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Samsung Galaxy Liquidation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Google Pixel Flagships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sony Xperia Pro Units</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-indigo-400">Warehouse Support</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Customs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Registration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bulk Order Inquiries</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Direct Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-indigo-400">VIP Sale Alerts</h4>
            <p className="text-sm font-medium text-gray-500 mb-6">Get early access to 79% off drops.</p>
            <form className="flex group" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" className="bg-gray-900/50 border-none rounded-l-2xl py-3 px-5 w-full text-white text-sm focus:ring-2 focus:ring-indigo-500 transition-all" />
              <button className="bg-indigo-600 px-6 rounded-r-2xl font-black hover:bg-indigo-500 transition-all uppercase text-[10px] tracking-widest">Join</button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-gray-900/50 text-center">
          <AdSlot type={AdType.BANNER} slotId="lux-footer-banner" className="mb-10 opacity-80 hover:opacity-100 transition-opacity" />
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
            &copy; 2024 LUXMOBILE CLEARANCE CENTER | GLOBAL WAREHOUSE LIQUIDATION | ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
