import "@/styles/slider.css";
import HomeNavBar from "@/app/components/NavBar";
import FeatureFrame from "@/app/components/FeatureFrame";

export default function Home() {
  return (
    <main className="w-full">
      <HomeNavBar />
      <FeatureFrame />
    </main>
  );
}
