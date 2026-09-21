import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { HowItWorks } from "@/components/how-it-works";
import { Calculator } from "@/components/calculator";
import { Guarantee } from "@/components/guarantee";
import { Testimonials } from "@/components/testimonials";
import { BookingCta } from "@/components/booking-cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Calculator />
        <Guarantee />
        <Testimonials />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
