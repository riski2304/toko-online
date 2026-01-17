import { MapPin, Star, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  status: "available" | "sold";
  rating?: number;
  isVerified?: boolean;
  category?: string;
}

export const ProductCard = ({
  id,
  title,
  price,
  location,
  image,
  status,
  rating,
  isVerified,
  category,
}: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        "block bg-card rounded-2xl overflow-hidden border border-border",
        "hover:shadow-card-hover hover:border-primary/30 transition-all duration-200",
        "active:scale-[0.98]",
        status === "sold" && "opacity-60"
      )}
    >
      <div className="relative aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {status === "sold" && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-background/90 text-foreground">
              TERJUAL
            </Badge>
          </div>
        )}
        {status === "available" && (
          <Badge className="absolute top-2 left-2 bg-success text-success-foreground text-[10px]">
            Tersedia
          </Badge>
        )}
        {category && (
          <Badge variant="secondary" className="absolute top-2 right-2 text-[10px]">
            {category}
          </Badge>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm line-clamp-2 flex-1">{title}</h3>
          {isVerified && (
            <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />
          )}
        </div>

        <p className="text-primary font-bold text-base mb-2">{formatPrice(price)}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{location}</span>
          </div>
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-warning text-warning" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
