import "@/styles/slider.css";
import HomeNavBar from "@/app/components/NavBar";
import MoodForm from "@/app/components/forms/MoodForm";
import HistoryModal from "./components/quotes/HistoryModal";
import PolicyModal from "@/components/shared/modals/PolicyModal";

export default function Home() {
    return (
        <main className="w-full @container">
            <HomeNavBar />
            <MoodForm />
            <HistoryModal />
            <PolicyModal/>
        </main>
    );
}