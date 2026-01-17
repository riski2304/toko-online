import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = ["Semua", "Elektronik", "Motor", "Perabotan", "Fashion", "Lainnya"];

const products = [
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
  {
    id: "5",
    title: "Laptop Asus ROG Gaming",
    price: 12000000,
    location: "Panarung",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpBt26hMepS3vbQ2cu41lJr0O4yKr3zWMCPQ&s",
    status: "available" as const,
    rating: 4.7,
    isVerified: true,
    category: "Elektronik",
  },
  {
    id: "6",
    title: "Yamaha NMAX 2020 Low KM",
    price: 17000000,
    location: "Menteng",
    image: "https://www.naikmotor.com/wp-content/uploads/2019/11/IMG-20200311-WA0021.jpg",
    status: "available" as const,
    rating: 4.6,
    category: "Motor",
  },
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "Semua" || product.category === selectedCategory;
    const statusMatch = !showAvailableOnly || product.status === "available";
    const searchMatch = searchQuery === "" || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && statusMatch && searchMatch;
  });

  return (
    <MainLayout>
      <div className="px-4 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Cari barang bekas..."
            className="pl-10 h-12 rounded-xl bg-card border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              className={cn(
                "cursor-pointer whitespace-nowrap px-4 py-2 rounded-full transition-all",
                selectedCategory === cat && "shadow-orange"
              )}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Available Only Toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} barang ditemukan
          </p>
          <Button
            variant={showAvailableOnly ? "default" : "outline"}
            size="sm"
            className="rounded-full text-xs"
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
          >
            Tersedia Saja
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up opacity-0"
              style={{
                animationDelay: `${index * 0.05}s`,
                animationFillMode: "forwards",
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
