import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Guarantee } from "@/components/guarantee";
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
        <Guarantee />
        <BookingCta />
      </main>
      <SiteFooter />
    </>
  );
}
