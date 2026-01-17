import { ShoppingBag, Briefcase, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  {
    icon: ShoppingBag,
    title: "Barang Bekas",
    description: "Jual-beli barang second",
    path: "/marketplace",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    count: "1.2k+ barang",
  },
  {
    icon: Briefcase,
    title: "Lakas Wal",
    description: "Jasa suruhan & titip",
    path: "/lakas-wal",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    count: "500+ jasa",
  },
  {
    icon: Building2,
    title: "Info Kos",
    description: "Cari tempat tinggal",
    path: "/kos",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    count: "300+ kos",
  },
];

export const CategorySection = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4">Kategori Utama</h2>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((cat, index) => (
          <Link
            key={cat.path}
            to={cat.path}
            className={cn(
              "flex flex-col items-center p-4 rounded-2xl bg-card border border-border",
              "hover:border-primary hover:shadow-card-hover transition-all duration-200",
              "animate-slide-up opacity-0",
              index === 0 && "stagger-1",
              index === 1 && "stagger-2",
              index === 2 && "stagger-3"
            )}
            style={{ animationFillMode: "forwards" }}
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3", cat.color)}>
              <cat.icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold text-center">{cat.title}</span>
            <span className="text-[10px] text-muted-foreground mt-1">{cat.count}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
