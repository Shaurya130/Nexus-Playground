import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Header } from "@/app/Header";
import { Hero } from "@/app/Hero";
import { Features } from "@/app/Features";
import { HowItWorks } from "@/app/HowItWorks";
import { Footer } from "@/app/Footer";

export default async function App() {
  const { userId } = await auth();

  if (userId) {
    redirect("/home");
  }

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