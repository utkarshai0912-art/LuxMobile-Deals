
import React, { useState, useEffect, useRef } from 'react';
import { Phone } from '../types';
import { getSalesPitch } from '../services/geminiService';

interface PhoneCardProps {
  phone: Phone;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  const [pitch, setPitch] = useState<string>("");
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const discountedPrice = (phone.originalPrice * (100 - phone.discountPercentage) / 100).toFixed(2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '300px' 
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isIntersecting && !pitch) {
      const fetchPitch = async () => {
        const p = await getSalesPitch(phone.brand, phone.model);
        setPitch(p);
      };
      fetchPitch();
    }
  }, [isIntersecting, phone, pitch]);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden group border border-gray-100 relative flex flex-col h-full"
    >
      {phone.trending && (
        <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter z-20 shadow-xl ring-2 ring-white/50 pointer-events-none">
          Limited Warehouse Stock
        </div>
      )}
      
      <div className="relative h-80 overflow-hidden bg-gray-50 flex-shrink-0 cursor-zoom-in">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Loading Photo...</span>
          </div>
        )}
        
        {/* Enhanced Zoom Logic: scale-100 normally, scale-125 on hover with a slow ease */}
        <img 
          src={phone.imageUrl} 
          alt={`${phone.brand} ${phone.model} Real Product View`} 
          className={`w-full h-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${imgLoaded ? 'opacity-100 scale-100 group-hover:scale-125' : 'opacity-0 scale-105'}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        
        {/* Subtle overlay that darkens slightly on hover to make text/UI pop more */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 pointer-events-none">
           <div className="bg-yellow-400 text-black font-black px-4 py-2 rounded-xl text-xs shadow-2xl uppercase tracking-tighter transform group-hover:-translate-y-1 transition-transform duration-500">
            Clearance: {phone.discountPercentage}% OFF
          </div>
        </div>
      </div>

      <div className="p-7 flex flex-col flex-1 relative bg-white">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-indigo-600 text-[11px] font-black uppercase tracking-[0.4em]">{phone.brand}</span>
            <span className="h-[1px] flex-1 bg-indigo-100"></span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">
            {phone.model}
          </h2>
        </div>

        <p className="text-gray-500 text-sm mb-8 leading-relaxed min-h-[48px] line-clamp-2 italic font-medium">
          {pitch || (isIntersecting ? "Verifying clearance details..." : "")}
        </p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black text-gray-950 tracking-tighter">${discountedPrice}</span>
            <span className="text-base text-gray-400 line-through font-bold">${phone.originalPrice}</span>
          </div>

          <div className="space-y-2 mb-8 bg-gray-50 p-3 rounded-xl group-hover:bg-indigo-50/50 transition-colors duration-500">
            {phone.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700 text-[11px] font-bold">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {spec}
              </div>
            ))}
          </div>

          <button className="w-full bg-gray-900 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-xl hover:shadow-indigo-200 uppercase tracking-widest text-xs">
            Check Final Stock
            <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
