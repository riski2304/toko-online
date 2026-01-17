import { useState } from "react";
import { Wallet, QrCode, Building2, CheckCircle2, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface TopUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickAmounts = [
  { value: 10000, label: "Rp 10.000" },
  { value: 25000, label: "Rp 25.000" },
  { value: 50000, label: "Rp 50.000" },
  { value: 100000, label: "Rp 100.000" },
];

const paymentMethods = [
  { id: "qris", name: "QRIS", icon: QrCode, description: "Scan & bayar dari semua e-wallet" },
  { id: "bri", name: "Transfer BRI", icon: Building2, description: "Virtual Account BRI" },
  { id: "bca", name: "Transfer BCA", icon: Building2, description: "Virtual Account BCA" },
  { id: "mandiri", name: "Transfer Mandiri", icon: Building2, description: "Virtual Account Mandiri" },
];

type Step = "amount" | "payment" | "confirm" | "success";

export const TopUpModal = ({ open, onOpenChange }: TopUpModalProps) => {
  const { toast } = useToast();
  const { user, updateBalance } = useAuth();
  
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    setAmount(parseInt(value) || 0);
  };

  const handleProceedToPayment = () => {
    if (amount < 10000) {
      toast({
        variant: "destructive",
        title: "Minimal top up Rp 10.000",
        description: "Silakan masukkan jumlah yang lebih besar.",
      });
      return;
    }
    setStep("payment");
  };

  const handleSelectPayment = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep("confirm");
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    updateBalance(amount);
    setIsProcessing(false);
    setStep("success");
  };

  const handleClose = () => {
    setStep("amount");
    setAmount(0);
    setCustomAmount("");
    setSelectedMethod("");
    onOpenChange(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil disalin",
      description: "Nomor Virtual Account telah disalin.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Wallet className="h-5 w-5 text-primary" />
            Top Up Saldo
          </DialogTitle>
        </DialogHeader>

        {/* Current Balance */}
        <div className="bg-accent rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Saldo saat ini</p>
          <p className="text-2xl font-bold text-primary">
            Rp {formatCurrency(user?.balance || 0)}
          </p>
        </div>

        {step === "amount" && (
          <div className="space-y-4">
            <Label>Pilih Nominal</Label>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleAmountSelect(option.value)}
                  className={cn(
                    "p-3 rounded-xl border text-center transition-all font-medium",
                    amount === option.value && !customAmount
                      ? "border-primary bg-accent text-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Label htmlFor="custom-amount" className="text-xs text-muted-foreground">
                Atau masukkan nominal lain
              </Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  Rp
                </span>
                <Input
                  id="custom-amount"
                  type="text"
                  placeholder="0"
                  className="pl-10"
                  value={customAmount ? formatCurrency(parseInt(customAmount)) : ""}
                  onChange={handleCustomAmountChange}
                />
              </div>
            </div>

            <Button
              onClick={handleProceedToPayment}
              className="w-full gradient-primary hover:opacity-90"
              disabled={amount < 10000}
            >
              Lanjutkan
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <div className="bg-muted rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground">Jumlah top up</p>
              <p className="text-xl font-bold">Rp {formatCurrency(amount)}</p>
            </div>

            <Label>Pilih Metode Pembayaran</Label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleSelectPayment(method.id)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <method.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{method.name}</p>
                    <p className="text-[10px] text-muted-foreground">{method.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </button>
              ))}
            </div>

            <Button variant="ghost" onClick={() => setStep("amount")} className="w-full">
              Kembali
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <div className="bg-muted rounded-xl p-4 text-center space-y-2">
              <p className="text-xs text-muted-foreground">Total Pembayaran</p>
              <p className="text-2xl font-bold text-primary">Rp {formatCurrency(amount)}</p>
              <p className="text-xs text-muted-foreground">
                via {paymentMethods.find(m => m.id === selectedMethod)?.name}
              </p>
            </div>

            {selectedMethod === "qris" ? (
              <div className="flex flex-col items-center gap-4 p-4 bg-card border border-border rounded-xl">
                <div className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center">
                  <div className="w-full h-full border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-20 w-20 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Scan QR Code di atas menggunakan aplikasi e-wallet Anda
                </p>
              </div>
            ) : (
              <div className="p-4 bg-card border border-border rounded-xl space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Bank Tujuan</p>
                  <p className="font-medium">{paymentMethods.find(m => m.id === selectedMethod)?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Nomor Virtual Account</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono font-bold text-lg">8801234567890</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard("8801234567890")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Transfer tepat Rp {formatCurrency(amount)} ke nomor VA di atas
                </p>
              </div>
            )}

            <Button
              onClick={handleConfirmPayment}
              className="w-full gradient-primary hover:opacity-90"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Memproses...
                </div>
              ) : (
                "Saya Sudah Bayar"
              )}
            </Button>
            
            <Button variant="ghost" onClick={() => setStep("payment")} className="w-full">
              Ganti Metode
            </Button>
          </div>
        )}

        {step === "success" && (
          <div className="py-8 flex flex-col items-center justify-center gap-6">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Top Up Berhasil! 🎉</h3>
              <p className="text-sm text-muted-foreground">
                Saldo Rp {formatCurrency(amount)} telah ditambahkan ke akun Anda
              </p>
            </div>

            <div className="w-full bg-accent rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Saldo terbaru</p>
              <p className="text-2xl font-bold text-primary">
                Rp {formatCurrency(user?.balance || 0)}
              </p>
            </div>

            <Button onClick={handleClose} className="w-full">
              Selesai
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
