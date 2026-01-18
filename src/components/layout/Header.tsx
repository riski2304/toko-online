import { Bell, Search, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleNotificationClick = () => {
    navigate("/chat");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 glass border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {showSearch ? (
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari barang, lokasi..."
                className="pl-9 h-10 rounded-full bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon-sm" 
              className="rounded-full"
              onClick={toggleSearch}
            >
              <X className="h-5 w-5" />
            </Button>
          </form>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ML</span>
              </div>
              <span className="font-bold text-lg">MarketLink</span>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon-sm" 
                className="rounded-full"
                onClick={toggleSearch}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon-sm" 
                className="rounded-full relative"
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full"
                onClick={toggleDarkMode}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
