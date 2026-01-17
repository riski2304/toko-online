import { useState } from "react";
import { Plus, Search, Clock, CheckCircle2, MapPin, Wallet, ShoppingBag, Package, MoreHorizontal } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const taskCategories = [
  { icon: ShoppingBag, label: "Belanja Makanan", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
  { icon: Package, label: "Antar Barang", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  { icon: MoreHorizontal, label: "Lainnya", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
];

const tasks = [
  {
    id: "1",
    title: "Belanja di Pasar Gede",
    description: "Beli sayur mayur, daging ayam 1kg, dan bumbu dapur",
    status: "searching" as const,
    budget: 50000,
    location: "Pasar Gede",
    category: "Belanja Makanan",
    postedAt: "10 menit lalu",
    poster: {
      name: "Ibu Sari",
      rating: 4.8,
      isVerified: true,
    },
  },
  {
    id: "2",
    title: "Antar dokumen ke kantor",
    description: "Dokumen penting ke Kantor Pemda lantai 3",
    status: "in-progress" as const,
    budget: 30000,
    location: "Kantor Pemda",
    category: "Antar Barang",
    postedAt: "30 menit lalu",
    poster: {
      name: "Pak Andi",
      rating: 4.5,
      isVerified: true,
    },
    runner: {
      name: "Rizky",
      rating: 4.9,
    },
  },
  {
    id: "3",
    title: "Beli makanan di Warung Mbok Sri",
    description: "Nasi gudeg 2 porsi, es teh 2",
    status: "completed" as const,
    budget: 25000,
    location: "Jl. Ahmad Yani",
    category: "Belanja Makanan",
    postedAt: "2 jam lalu",
    poster: {
      name: "Dina",
      rating: 4.7,
      isVerified: false,
    },
  },
];

const statusConfig = {
  searching: {
    label: "Mencari Lawan",
    icon: Search,
    className: "status-searching",
  },
  "in-progress": {
    label: "Dalam Proses",
    icon: Clock,
    className: "status-in-progress",
  },
  completed: {
    label: "Selesai",
    icon: CheckCircle2,
    className: "status-completed",
  },
};

const LakasWal = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    return task.status === activeTab;
  });

  return (
    <MainLayout>
      <div className="px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Lakas Wal</h1>
          <p className="text-muted-foreground text-sm">
            Jasa suruhan & titip untuk warga Palangka Raya
          </p>
        </div>

        {/* Category Quick Access */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {taskCategories.map((cat) => (
            <button
              key={cat.label}
              className={cn(
                "flex flex-col items-center p-4 rounded-2xl border border-border",
                "hover:border-primary hover:shadow-card-hover transition-all duration-200",
                "bg-card"
              )}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-2", cat.color)}>
                <cat.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-center">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Create Task Button */}
        <Button className="w-full mb-6 h-12 rounded-xl shadow-orange" size="lg">
          <Plus className="h-5 w-5" />
          Buat Tugas Baru
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4 h-12 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg text-xs">Semua</TabsTrigger>
            <TabsTrigger value="searching" className="rounded-lg text-xs">Mencari</TabsTrigger>
            <TabsTrigger value="in-progress" className="rounded-lg text-xs">Proses</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg text-xs">Selesai</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-3">
              {filteredTasks.map((task, index) => {
                const config = statusConfig[task.status];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={task.id}
                    className={cn(
                      "bg-card rounded-2xl border border-border p-4",
                      "hover:shadow-card-hover hover:border-primary/30 transition-all duration-200",
                      "animate-slide-up opacity-0"
                    )}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                      <Badge className={cn("text-[10px] border shrink-0", config.className)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {task.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Wallet className="h-3 w-3" />
                        <span className="font-semibold text-primary">
                          Rp {task.budget.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-primary">
                            {task.poster.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-xs">{task.poster.name}</span>
                        {task.poster.isVerified && (
                          <Badge variant="outline" className="text-[8px] px-1 py-0 h-4">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{task.postedAt}</span>
                    </div>

                    {task.status === "searching" && (
                      <Button className="w-full mt-3 rounded-xl" size="sm">
                        Ambil Tugas
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LakasWal;
