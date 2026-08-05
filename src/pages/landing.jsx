import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="w-full bg-[#12131A] text-[#F5F3EF]">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 md:px-11 pt-16 sm:pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: headline + copy */}
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#7C8CFF]">
            long → short, instantly
          </span>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Trim the fat
            <br />
            off every URL
            <span className="text-[#E8A73B]">.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#B8B9C4] max-w-md">
            Paste a link, get back something you'd actually want to share —
            with click analytics baked in from the first tap.
          </p>

          {/* Form styled like a terminal / URL bar */}
          <form
            onSubmit={handleShorten}
            className="flex flex-col sm:flex-row gap-2 mt-2 w-full max-w-md"
          >
            <Input
              type="url"
              placeholder="paste.your/loooong-url-here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="h-12 flex-1 px-4 font-mono text-sm bg-[#1B1D28] border border-[#2C2E3D] text-[#F5F3EF] placeholder:text-[#5C5E6E] focus-visible:ring-[#E8A73B] rounded-md"
            />
            <Button
              type="submit"
              className="h-12 px-6 bg-[#E8A73B] hover:bg-[#F2B754] text-[#12131A] font-semibold rounded-md transition-colors"
            >
              Trim it
            </Button>
          </form>
        </div>

        {/* Right: visual — the "trim" concept made literal */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-full max-w-sm bg-[#1B1D28] border border-[#2C2E3D] rounded-lg p-6 font-mono text-sm">
            <p className="text-[#5C5E6E] truncate">
              https://example.com/campaigns/summer-sale/2026/ref=email&amp;utm_source=x
            </p>
            <div className="my-4 border-t border-dashed border-[#3A3C4D] relative">
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#1B1D28] px-2 text-[#5C5E6E] text-xs">
                ✂ trimmed
              </span>
            </div>
            <p className="text-[#E8A73B] font-semibold">
              trimrr.co/sum2x
            </p>
          </div>
          <p className="mt-4 text-xs text-[#5C5E6E] font-mono">
            26 characters saved · 1 link that fits in a text
          </p>
        </div>
      </section>

      {/* signature cut-mark divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-11">
        <div className="border-t border-dashed border-[#2C2E3D]" />
      </div>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-6 md:px-11 py-16 sm:py-20">
        <h2 className="font-sans text-2xl sm:text-3xl font-bold mb-8">
          Questions, answered
        </h2>
        <Accordion type="multiple" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-[#2C2E3D]">
            <AccordionTrigger className="text-left hover:text-[#E8A73B]">
              How does the Trimrr URL shortener work?
            </AccordionTrigger>
            <AccordionContent className="text-[#B8B9C4]">
              When you enter a long URL, our system generates a shorter
              version of that URL. This shortened URL redirects to the
              original long URL when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-[#2C2E3D]">
            <AccordionTrigger className="text-left hover:text-[#E8A73B]">
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent className="text-[#B8B9C4]">
              Yes. Creating an account lets you manage your URLs, view
              analytics, and customize your short URLs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-[#2C2E3D]">
            <AccordionTrigger className="text-left hover:text-[#E8A73B]">
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent className="text-[#B8B9C4]">
              You can view the number of clicks, geolocation data of the
              clicks, and device types (mobile/desktop) for each of your
              shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default LandingPage;