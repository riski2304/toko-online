import { useState } from "react";
import { User, Phone, MapPin, LogIn, UserPlus, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "login" | "register";
}

const addresses = [
  "Pahandut, Palangka Raya",
  "Jekan Raya, Palangka Raya",
  "Bukit Batu, Palangka Raya",
  "Sebangau, Palangka Raya",
  "Rakumpit, Palangka Raya",
];

export const AuthModal = ({ open, onOpenChange, defaultMode = "login" }: AuthModalProps) => {
  const { toast } = useToast();
  const { login, register } = useAuth();
  
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [loginData, setLoginData] = useState({ whatsapp: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    whatsapp: "",
    address: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.whatsapp) {
      toast({
        variant: "destructive",
        title: "Nomor WhatsApp diperlukan",
        description: "Masukkan nomor WhatsApp untuk masuk.",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    login(loginData.whatsapp);
    setIsLoading(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      toast({
        title: "Selamat datang! 👋",
        description: "Anda berhasil masuk ke Palangka Hub.",
      });
      handleClose();
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.name || !registerData.whatsapp || !registerData.address) {
      toast({
        variant: "destructive",
        title: "Form tidak lengkap",
        description: "Mohon lengkapi semua data pendaftaran.",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    register(registerData);
    setIsLoading(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      toast({
        title: "Selamat bergabung! 🎉",
        description: "Akun Anda berhasil dibuat di Palangka Hub.",
      });
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setLoginData({ whatsapp: "" });
    setRegisterData({ name: "", whatsapp: "", address: "" });
    setShowSuccess(false);
    setMode("login");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {mode === "login" ? (
              <>
                <LogIn className="h-5 w-5 text-primary" />
                Masuk ke Palangka Hub
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 text-primary" />
                Daftar Akun Baru
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-1">
                {mode === "login" ? "Login Berhasil!" : "Pendaftaran Berhasil!"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Mengalihkan ke beranda...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Mode Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                  mode === "login"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                  mode === "register"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Daftar
              </button>
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-wa">Nomor WhatsApp</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-wa"
                      type="tel"
                      placeholder="08123456789"
                      className="pl-10"
                      value={loginData.whatsapp}
                      onChange={(e) => setLoginData({ whatsapp: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Memproses...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Masuk
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-primary font-medium hover:underline"
                  >
                    Daftar sekarang
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Nama Lengkap *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-name"
                      placeholder="Ahmad Ridwan"
                      className="pl-10"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-wa">Nomor WhatsApp *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-wa"
                      type="tel"
                      placeholder="08123456789"
                      className="pl-10"
                      value={registerData.whatsapp}
                      onChange={(e) => setRegisterData({ ...registerData, whatsapp: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Alamat di Palangka Raya *</Label>
                  <Select
                    value={registerData.address}
                    onValueChange={(value) => setRegisterData({ ...registerData, address: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kecamatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map((addr) => (
                        <SelectItem key={addr} value={addr}>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {addr}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Mendaftarkan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Daftar Sekarang
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Sudah punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-primary font-medium hover:underline"
                  >
                    Masuk di sini
                  </button>
                </p>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
