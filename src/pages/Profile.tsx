import { useState } from "react";
import { 
  Settings, ChevronRight, User, MapPin, Bell, Shield, 
  Wallet, Star, ShoppingBag, Briefcase, Building2, 
  BadgeCheck, LogOut, Moon, HelpCircle 
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/modals/AuthModal";
import { TopUpModal } from "@/components/modals/TopUpModal";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);

  const stats = [
    { icon: ShoppingBag, label: "Barang Dijual", value: user?.itemsSold || 0, color: "text-orange-500" },
    { icon: Briefcase, label: "Tugas Selesai", value: user?.tasksCompleted || 0, color: "text-blue-500" },
    { icon: Star, label: "Rating", value: user?.rating || "-", color: "text-warning" },
  ];

  const menuItems = [
    {
      section: "Akun",
      items: [
        { icon: User, label: "Edit Profil", badge: null, action: () => {} },
        { icon: MapPin, label: "Alamat Tersimpan", badge: "1", action: () => {} },
        { icon: Shield, label: "Verifikasi KTP", badge: user?.isVerified ? "Verified" : "Belum", action: () => {} },
        { icon: Wallet, label: "Saldo & Top Up", badge: `Rp ${(user?.balance || 0).toLocaleString('id-ID')}`, action: () => setTopUpModalOpen(true) },
      ],
    },
    {
      section: "Aktivitas",
      items: [
        { icon: ShoppingBag, label: "Riwayat Transaksi", badge: null, action: () => {} },
        { icon: Briefcase, label: "Tugas Saya", badge: "0 Aktif", action: () => {} },
        { icon: Building2, label: "Kos Favorit", badge: null, action: () => {} },
      ],
    },
    {
      section: "Pengaturan",
      items: [
        { icon: Bell, label: "Notifikasi", badge: null, hasSwitch: true, action: () => {} },
        { icon: Moon, label: "Mode Gelap", badge: null, hasSwitch: true, action: () => {} },
        { icon: HelpCircle, label: "Bantuan", badge: null, action: () => {} },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Sampai jumpa! 👋",
      description: "Anda telah keluar dari akun.",
    });
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-4">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Belum Masuk</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Masuk atau daftar untuk mengakses profil dan fitur lengkap Palangka Hub
          </p>
          <Button onClick={() => setAuthModalOpen(true)} className="gradient-primary">
            Masuk / Daftar
          </Button>
          <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-4 py-4">
        {/* Profile Header */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-slide-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              {user?.isVerified && (
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-success rounded-full border-4 border-card flex items-center justify-center">
                  <BadgeCheck className="h-3 w-3 text-success-foreground" />
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{user?.name}</h1>
                {user?.isVerified && <Badge variant="outline" className="text-[10px]">Verified</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{user?.whatsapp}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {user?.address}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                  <span className="font-bold text-lg">{stat.value}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        {menuItems.map((section, sectionIndex) => (
          <div
            key={section.section}
            className={cn("mb-4 animate-slide-up opacity-0")}
            style={{ animationDelay: `${0.1 + sectionIndex * 0.1}s`, animationFillMode: "forwards" }}
          >
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
              {section.section}
            </h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 hover:bg-accent active:scale-[0.99] transition-all",
                    itemIndex !== section.items.length - 1 && "border-b border-border"
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                  {item.badge && !item.hasSwitch && (
                    <Badge variant="secondary" className="text-[10px]">{item.badge}</Badge>
                  )}
                  {item.hasSwitch ? <Switch /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full mt-4 text-destructive border-destructive/30 hover:bg-destructive/10 active:scale-[0.98] transition-all"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>

        <p className="text-center text-[10px] text-muted-foreground mt-6">Palangka Hub v1.0.0</p>
      </div>

      <TopUpModal open={topUpModalOpen} onOpenChange={setTopUpModalOpen} />
    </MainLayout>
  );
};

export default Profile;
