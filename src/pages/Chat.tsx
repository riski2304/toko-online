import { useState } from "react";
import { Search, ShoppingBag, Briefcase, Building2, MoreVertical, CheckCheck } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const chatCategories = [
  { value: "all", label: "Semua", icon: null },
  { value: "marketplace", label: "Jual-Beli", icon: ShoppingBag },
  { value: "lakas-wal", label: "Lakas Wal", icon: Briefcase },
  { value: "kos", label: "Kos", icon: Building2 },
];

const chats = [
  {
    id: "1",
    name: "Pak Andi",
    avatar: "A",
    lastMessage: "Baik pak, saya ambil hari ini ya",
    time: "10:30",
    unread: 2,
    isOnline: true,
    category: "marketplace",
    transaction: "iPhone 12 Pro Max",
  },
  {
    id: "2",
    name: "Rizky Runner",
    avatar: "R",
    lastMessage: "Sudah sampai di Pasar Gede pak",
    time: "09:45",
    unread: 0,
    isOnline: true,
    category: "lakas-wal",
    transaction: "Belanja di Pasar Gede",
  },
  {
    id: "3",
    name: "Kos Melati Indah",
    avatar: "K",
    lastMessage: "Silakan datang untuk survey kapan saja bu",
    time: "Kemarin",
    unread: 0,
    isOnline: false,
    category: "kos",
    transaction: "Kamar No. 5",
  },
  {
    id: "4",
    name: "Ibu Sari",
    avatar: "S",
    lastMessage: "Motor masih ada kak?",
    time: "Kemarin",
    unread: 1,
    isOnline: false,
    category: "marketplace",
    transaction: "Honda Vario 125",
  },
  {
    id: "5",
    name: "Dian Tasker",
    avatar: "D",
    lastMessage: "Tugas sudah selesai, terima kasih!",
    time: "2 hari lalu",
    unread: 0,
    isOnline: false,
    category: "lakas-wal",
    transaction: "Antar dokumen",
  },
];

const categoryConfig: Record<string, { color: string; icon: typeof ShoppingBag }> = {
  marketplace: { color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", icon: ShoppingBag },
  "lakas-wal": { color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400", icon: Briefcase },
  kos: { color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400", icon: Building2 },
};

const Chat = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredChats = chats.filter((chat) => {
    if (activeTab === "all") return true;
    return chat.category === activeTab;
  });

  return (
    <MainLayout>
      <div className="px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Pesan</h1>
          <p className="text-muted-foreground text-sm">
            Kelola semua percakapan transaksi Anda
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Cari percakapan..."
            className="pl-10 h-12 rounded-xl bg-card border-border"
          />
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4 h-12 rounded-xl">
            {chatCategories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="rounded-lg text-xs">
                {cat.icon && <cat.icon className="h-3 w-3 mr-1" />}
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-2">
              {filteredChats.map((chat, index) => {
                const config = categoryConfig[chat.category];
                const CategoryIcon = config.icon;

                return (
                  <div
                    key={chat.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl bg-card border border-border",
                      "hover:shadow-card-hover hover:border-primary/30 transition-all duration-200 cursor-pointer",
                      "animate-slide-up opacity-0"
                    )}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary">{chat.avatar}</span>
                      </div>
                      {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                        <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <div className={cn("w-4 h-4 rounded flex items-center justify-center", config.color)}>
                          <CategoryIcon className="h-2.5 w-2.5" />
                        </div>
                        <span className="text-[10px] text-muted-foreground truncate">{chat.transaction}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate flex-1">
                          {chat.unread === 0 && <CheckCheck className="h-3 w-3 text-primary inline mr-1" />}
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
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

export default Chat;
