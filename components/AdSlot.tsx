
import React, { useEffect, useRef } from 'react';
import { AD_CLIENT_ID } from '../constants';
import { AdType } from '../types';

interface AdSlotProps {
  type: AdType;
  slotId: string;
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, slotId, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: number;
    
    const initAd = () => {
      // Check if container has width to avoid "availableWidth=0" error
      if (containerRef.current && containerRef.current.clientWidth > 0) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense Push Error:", e);
        }
      } else {
        // Retry shortly if the container isn't ready yet
        timeoutId = window.setTimeout(initAd, 200);
      }
    };

    // Delay initial call to let layout stabilize
    timeoutId = window.setTimeout(initAd, 100);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const styles = {
    [AdType.BANNER]: "w-full min-h-[90px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300",
    [AdType.SIDEBAR]: "w-full h-[600px] sticky top-20 bg-gray-100 flex items-center justify-center border border-dashed border-gray-300",
    [AdType.IN_FEED]: "w-full min-h-[250px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 my-8"
  };

  return (
    <div ref={containerRef} className={`ad-container ${styles[type]} ${className} relative overflow-hidden`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={AD_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <span className="text-[10px] text-gray-400 absolute top-1 right-1 uppercase tracking-widest z-10 pointer-events-none">Advertisement</span>
    </div>
  );
};

export default AdSlot;
