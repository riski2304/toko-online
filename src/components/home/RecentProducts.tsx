import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";

const recentProducts = [
  {
    id: "1",
    title: "iPhone 12 Pro Max 256GB Pacific Blue",
    price: 6000000,
    location: "Pahandut",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop",
    status: "available" as const,
    rating: 4.8,
    isVerified: true,
    category: "Elektronik",
  },
  {
    id: "2",
    title: "Honda Vario 125 2021 Pajak Panjang",
    price: 9000000,
    location: "Yos Sudarso",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/2011_Honda_Vario_Techno_CBS_110_%2820210917%29.jpg/1280px-2011_Honda_Vario_Techno_CBS_110_%2820210917%29.jpg?20220202165630",
    status: "available" as const,
    rating: 4.5,
    isVerified: true,
    category: "Motor",
  },
  {
    id: "3",
    title: "Meja Kantor + Kursi Gaming Lengkap",
    price: 2500000,
    location: "Kereng Bangkirai",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop",
    status: "sold" as const,
    rating: 4.2,
    category: "Perabotan",
  },
  {
    id: "4",
    title: "Kulkas Samsung 2 Pintu No Frost",
    price: 2100000,
    location: "Bukit Hindu",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxmCdJkNQ3uSXTiFH4AMdByBIB_o8P97SrQ&s",
    status: "available" as const,
    rating: 4.9,
    isVerified: true,
    category: "Elektronik",
  },
];

export const RecentProducts = () => {
  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Baru Diupload</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/marketplace" className="text-primary">
            Lihat Semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {recentProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-slide-up opacity-0"
            style={{
              animationDelay: `${0.1 + index * 0.1}s`,
              animationFillMode: "forwards",
            }}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};
