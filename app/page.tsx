import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import UserAdmin from "@/components/UserAdmin";
import Features from "@/components/Features";
import DashboardShowcase from "@/components/DashboardShowcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <HowItWorks />
        <UserAdmin />
        <Features />
        <DashboardShowcase />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
