import "@/styles/slider.css";
import HomeNavBar from "@/app/components/NavBar";
import MoodForm from "@/app/components/forms/MoodForm";

export default function Home() {
  return (
    <main className="w-full">
      <HomeNavBar />
      <MoodForm />
    </main>
  );
}
