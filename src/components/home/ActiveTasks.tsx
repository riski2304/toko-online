import { Clock, MapPin, CheckCircle2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tasks = [
  {
    id: "1",
    title: "Belanja di Pasar Gede",
    description: "Beli sayur dan daging",
    status: "searching" as const,
    budget: 50000,
    location: "Pasar Gede",
  },
  {
    id: "2",
    title: "Antar dokumen ke kantor",
    description: "Dokumen penting ke Pemda",
    status: "in-progress" as const,
    budget: 30000,
    location: "Kantor Pemda",
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

export const ActiveTasks = () => {
  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Tugas Aktif</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/lakas-wal" className="text-primary">
            Lihat Semua
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const config = statusConfig[task.status];
          const StatusIcon = config.icon;

          return (
            <Link
              key={task.id}
              to={`/lakas-wal/task/${task.id}`}
              className="block bg-card rounded-2xl border border-border p-4 hover:shadow-card-hover hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{task.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{task.location}</span>
                    </div>
                    <span className="text-xs font-semibold text-primary">
                      Rp {task.budget.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <Badge className={cn("text-[10px] border", config.className)}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {config.label}
                </Badge>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
