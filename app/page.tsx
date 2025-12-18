import { Header } from "@/app/Header";
import { Hero } from "@/app/Hero";
import { Features } from "@/app/Features";
import { HowItWorks } from "@/app/HowItWorks";
import { Footer } from "@/app/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}