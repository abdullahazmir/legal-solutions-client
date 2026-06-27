import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <HeroSection></HeroSection>
    <HowItWorks></HowItWorks>
    <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
