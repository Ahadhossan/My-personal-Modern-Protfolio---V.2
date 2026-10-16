import React, { useEffect, useState } from "react";

const SectionEyebrow: React.FC<{ label: string }> = ({ label }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`mb-10 flex items-center gap-3 transition-all duration-700 ease-out md:mb-14 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
      }`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[#2a7fa3]/30 bg-[#2a7fa3]/10 px-4 py-1.5 dark:border-[#5bb8e0]/40 dark:bg-[#5bb8e0]/10">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2a7fa3]/60 dark:bg-[#5bb8e0]/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2a7fa3] dark:bg-[#5bb8e0]" />
        </span>
        <span className="font-space text-xs uppercase tracking-[0.25em] text-[#2a7fa3] dark:text-[#94c6db]">
          {label}
        </span>
      </span>
    </div>
  );
};

export default SectionEyebrow;
