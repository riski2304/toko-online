import { useState } from "react";
import { Search, Filter, MapPin, Wifi, Wind, Bath, Star, BadgeCheck, Users, User } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeFilters = [
  { label: "Semua", value: "all" },
  { label: "Putra", value: "putra", icon: User },
  { label: "Putri", value: "putri", icon: User },
  { label: "Campur", value: "campur", icon: Users },
];

const kosData = [
  {
    id: "1",
    name: "Kos Melati Indah",
    price: 800000,
    location: "Jl. Ahmad Yani No. 45",
    district: "Pahandut",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    type: "putri",
    rating: 4.8,
    isVerified: true,
    facilities: ["wifi", "ac", "bathroom"],
    available: 3,
  },
  {
    id: "2",
    name: "Kos Putra Mandiri",
    price: 650000,
    location: "Jl. Diponegoro No. 12",
    district: "Menteng",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    type: "putra",
    rating: 4.5,
    isVerified: true,
    facilities: ["wifi", "bathroom"],
    available: 5,
  },
  {
    id: "3",
    name: "Rumah Kos Harmoni",
    price: 1200000,
    location: "Jl. Yos Sudarso No. 88",
    district: "Yos Sudarso",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    type: "campur",
    rating: 4.9,
    isVerified: true,
    facilities: ["wifi", "ac", "bathroom"],
    available: 2,
  },
  {
    id: "4",
    name: "Kos Putri Asri",
    price: 750000,
    location: "Jl. RTA Milono No. 23",
    district: "Bukit Hindu",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
    type: "putri",
    rating: 4.6,
    isVerified: false,
    facilities: ["wifi", "ac"],
    available: 4,
  },
];

const facilityIcons: Record<string, { icon: typeof Wifi; label: string }> = {
  wifi: { icon: Wifi, label: "WiFi" },
  ac: { icon: Wind, label: "AC" },
  bathroom: { icon: Bath, label: "K. Mandi Dalam" },
};

const Kos = () => {
  const [selectedType, setSelectedType] = useState("all");

  const filteredKos = kosData.filter((kos) => {
    if (selectedType === "all") return true;
    return kos.type === selectedType;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <MainLayout>
      <div className="px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Info Kos</h1>
          <p className="text-muted-foreground text-sm">
            Temukan tempat tinggal nyaman di Palangka Raya
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Cari kos di area..."
            className="pl-10 h-12 rounded-xl bg-card border-border"
          />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Type Filters */}
        <div className="flex gap-2 mb-6">
          {typeFilters.map((filter) => (
            <Badge
              key={filter.value}
              variant={selectedType === filter.value ? "default" : "secondary"}
              className={cn(
                "cursor-pointer px-4 py-2 rounded-full transition-all flex items-center gap-1",
                selectedType === filter.value && "shadow-orange"
              )}
              onClick={() => setSelectedType(filter.value)}
            >
              {filter.icon && <filter.icon className="h-3 w-3" />}
              {filter.label}
            </Badge>
          ))}
        </div>

        {/* Map Preview */}
        <div className="relative h-40 rounded-2xl overflow-hidden mb-6 bg-muted">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=300&fit=crop"
            alt="Map preview"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button variant="default" className="shadow-lg">
              <MapPin className="h-4 w-4" />
              Lihat Peta
            </Button>
          </div>
        </div>

        {/* Kos List */}
        <div className="space-y-4">
          {filteredKos.map((kos, index) => (
            <div
              key={kos.id}
              className={cn(
                "bg-card rounded-2xl border border-border overflow-hidden",
                "hover:shadow-card-hover hover:border-primary/30 transition-all duration-200",
                "animate-slide-up opacity-0"
              )}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="relative h-40">
                <img
                  src={kos.image}
                  alt={kos.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  {formatPrice(kos.price)}/bulan
                </Badge>
                <Badge
                  variant="secondary"
                  className="absolute top-3 right-3 capitalize"
                >
                  {kos.type}
                </Badge>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-base">{kos.name}</h3>
                  {kos.isVerified && (
                    <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-1 text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">{kos.location}</span>
                </div>

                {/* Facilities */}
                <div className="flex items-center gap-3 mb-3">
                  {kos.facilities.map((facility) => {
                    const config = facilityIcons[facility];
                    return (
                      <div
                        key={facility}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <config.icon className="h-4 w-4" />
                        <span>{config.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{kos.rating}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {kos.available} kamar tersedia
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Kos;
