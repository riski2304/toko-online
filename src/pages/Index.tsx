import { MainLayout } from "@/components/layout/MainLayout";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategorySection } from "@/components/home/CategorySection";
import { QuickActions } from "@/components/home/QuickActions";
import { RecentProducts } from "@/components/home/RecentProducts";
import { ActiveTasks } from "@/components/home/ActiveTasks";

const Index = () => {
  return (
    <MainLayout hideHeader>
      <HeroBanner />
      <CategorySection />
      <QuickActions />
      <RecentProducts />
      <ActiveTasks />
    </MainLayout>
  );
};

export default Index;
