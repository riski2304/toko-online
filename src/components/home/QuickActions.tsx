import { useState } from "react";
import { Plus, Camera, FileText, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { SellItemModal } from "@/components/modals/SellItemModal";
import { CreateTaskModal } from "@/components/modals/CreateTaskModal";
import { TopUpModal } from "@/components/modals/TopUpModal";
import { AuthModal } from "@/components/modals/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const actions = [
  {
    icon: Plus,
    label: "Jual Barang",
    color: "bg-primary text-primary-foreground",
    action: "sell",
  },
  {
    icon: Camera,
    label: "Foto Produk",
    color: "bg-secondary text-secondary-foreground",
    action: "photo",
  },
  {
    icon: FileText,
    label: "Buat Tugas",
    color: "bg-secondary text-secondary-foreground",
    action: "task",
  },
  {
    icon: Wallet,
    label: "Top Up",
    color: "bg-secondary text-secondary-foreground",
    action: "topup",
  },
];

export const QuickActions = () => {
  const { isAuthenticated } = useAuth();
  
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [sellWithCamera, setSellWithCamera] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleAction = (actionType: string) => {
    // Check if user is authenticated for actions that need auth
    if (!isAuthenticated && (actionType === "topup")) {
      setAuthModalOpen(true);
      return;
    }

    switch (actionType) {
      case "sell":
        setSellWithCamera(false);
        setSellModalOpen(true);
        break;
      case "photo":
        setSellWithCamera(true);
        setSellModalOpen(true);
        break;
      case "task":
        setTaskModalOpen(true);
        break;
      case "topup":
        setTopUpModalOpen(true);
        break;
    }
  };

  return (
    <>
      <section className="px-4 py-4">
        <div className="bg-card rounded-2xl border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between gap-2">
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleAction(action.action)}
                className="flex flex-col items-center gap-2 flex-1 p-2 rounded-xl hover:bg-accent active:scale-95 transition-all duration-200"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105", action.color)}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <SellItemModal 
        open={sellModalOpen} 
        onOpenChange={setSellModalOpen}
        openCamera={sellWithCamera}
      />
      
      <CreateTaskModal 
        open={taskModalOpen} 
        onOpenChange={setTaskModalOpen} 
      />
      
      <TopUpModal 
        open={topUpModalOpen} 
        onOpenChange={setTopUpModalOpen} 
      />
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultMode="register"
      />
    </>
  );
};
