import { useState } from "react";
import { Briefcase, MapPin, Wallet, CreditCard, Search, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const taskCategories = [
  { value: "food", label: "Belanja Makanan", icon: "🍜" },
  { value: "delivery", label: "Antar Barang", icon: "📦" },
  { value: "shopping", label: "Belanja Kebutuhan", icon: "🛒" },
  { value: "other", label: "Lainnya", icon: "📝" },
];

const locations = [
  "Pasar Gede",
  "Pasar Kahayan",
  "Pasar Rajawali",
  "Grand Palangka Mall",
  "Mega Store",
  "Pahandut",
  "Jekan Raya",
  "Bukit Batu",
  "Sebangau",
];

const paymentMethods = [
  { value: "cash", label: "Tunai", icon: Wallet },
  { value: "ewallet", label: "Saldo Palangka Hub", icon: CreditCard },
];

type SearchState = "idle" | "searching" | "found";

export const CreateTaskModal = ({ open, onOpenChange }: CreateTaskModalProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: "",
    wage: "",
    paymentMethod: "cash",
  });
  const [searchState, setSearchState] = useState<SearchState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.location || !formData.wage) {
      toast({
        variant: "destructive",
        title: "Form tidak lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi.",
      });
      return;
    }

    // Start searching animation
    setSearchState("searching");
    
    // Simulate finding a runner
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setSearchState("found");
    
    // Show success after brief delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Lawan Lakas ditemukan! 🎉",
      description: "Ahmad sedang menuju lokasi pembelian. Silakan pantau di halaman Tugas Saya.",
    });
    
    // Reset and close
    setFormData({ category: "", description: "", location: "", wage: "", paymentMethod: "cash" });
    setSearchState("idle");
    onOpenChange(false);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen && searchState !== "idle") {
      // Don't allow closing during search
      return;
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="h-5 w-5 text-primary" />
            Buat Tugas Lakas Wal
          </DialogTitle>
        </DialogHeader>

        {searchState !== "idle" ? (
          <div className="py-8 flex flex-col items-center justify-center gap-6">
            <div className={cn(
              "relative w-24 h-24 rounded-full flex items-center justify-center",
              searchState === "searching" ? "bg-warning/10" : "bg-success/10"
            )}>
              {searchState === "searching" ? (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-warning/30 border-t-warning animate-spin" />
                  <Search className="h-10 w-10 text-warning" />
                </>
              ) : (
                <CheckCircle2 className="h-12 w-12 text-success animate-scale-in" />
              )}
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">
                {searchState === "searching" ? "Mencari Lawan Lakas..." : "Lawan Lakas Ditemukan!"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchState === "searching" 
                  ? "Sedang menghubungkan dengan kurir terdekat di area Anda" 
                  : "Ahmad (Rating ⭐ 4.8) siap mengerjakan tugas Anda"}
              </p>
            </div>

            {searchState === "searching" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>3 kurir aktif di sekitar lokasi</span>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div className="space-y-2">
              <Label>Kategori Tugas</Label>
              <div className="grid grid-cols-2 gap-2">
                {taskCategories.map((cat) => (
                  <button
                    type="button"
                    key={cat.value}
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all",
                      formData.category === cat.value
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span className="text-lg mb-1 block">{cat.icon}</span>
                    <span className="text-xs font-medium">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="task-desc">Deskripsi Tugas *</Label>
              <Textarea
                id="task-desc"
                placeholder="Contoh: Tolong belikan ikan nila 1 kg di Pasar Gede, yang segar ya..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Lokasi Pembelian *</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih lokasi" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {loc}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Wage */}
            <div className="space-y-2">
              <Label htmlFor="wage">Penawaran Upah Jasa *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  Rp
                </span>
                <Input
                  id="wage"
                  type="number"
                  placeholder="10000"
                  className="pl-10"
                  value={formData.wage}
                  onChange={(e) => setFormData({ ...formData, wage: e.target.value })}
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                Upah yang wajar akan menarik lebih banyak kurir
              </p>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Metode Pembayaran</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                className="grid grid-cols-2 gap-2"
              >
                {paymentMethods.map((method) => (
                  <div key={method.value}>
                    <RadioGroupItem
                      value={method.value}
                      id={method.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={method.value}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all",
                        formData.paymentMethod === method.value
                          ? "border-primary bg-accent"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <method.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full gradient-primary hover:opacity-90 transition-opacity"
            >
              <Search className="h-4 w-4 mr-2" />
              Cari Lawan Lakas Sekarang
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
