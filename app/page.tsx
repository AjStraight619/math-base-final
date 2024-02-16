import CallToAction from "@/components/landing-page/call-to-action";
import Contact from "@/components/landing-page/contact";
import FAQ from "@/components/landing-page/faq";
import Features from "@/components/landing-page/features";
import { Header } from "@/components/landing-page/header";
import TitleSection from "@/components/landing-page/title-section";
import TopicsPreview from "@/components/landing-page/topics-preview";

export default function Home() {
  return (
    <>
      {/* <div className="background-glow"></div> */}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        <TitleSection />
        <CallToAction />
        <Features />
        <TopicsPreview />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
