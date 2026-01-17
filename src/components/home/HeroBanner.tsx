import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroBanner = () => {
  const navigate = useNavigate ();

  const handleExplore = () => {
    navigate("/marketplace");
  };

  return (
    <section className="relative overflow-hidden gradient-hero text-primary-foreground px-4 py-8 rounded-b-3xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm opacity-90">Palangka Raya, Kalimantan Tengah</span>
        </div>

        <h1 className="text-2xl font-bold leading-tight mb-2">
          Warga Palangka Raya!
        </h1>
        <p className="text-base opacity-90 mb-6 leading-relaxed">
          Cari barang bekas, jasa, atau kos jadi lebih mudah dan terpercaya.
        </p>

        <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg" onClick={handleExplore}>
          Mulai Jelajahi
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="white" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="40" cy="40" r="20" fill="white" fillOpacity="0.3" />
        </svg>
      </div>
    </section>
  );
};
