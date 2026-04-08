import { ArrowDown, ArrowRight, Code, Palette, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import instagramicon from "../assets/socialmedia/instagram.png";
import gmailicon from "../assets/socialmedia/gmail.png";
import whatsappicon from "../assets/socialmedia/whatsapp.png";
import mylogo from "../assets/siteCraftersLogo.png";

const highlights = [
  {
    icon: Code,
    title: "Custom Development",
    text: "Built around your business goals, not a generic template.",
  },
  {
    icon: Palette,
    title: "Distinct UI",
    text: "Clean structure, premium visuals, and strong brand presence.",
  },
  {
    icon: Rocket,
    title: "Launch Ready",
    text: "Fast, responsive, and prepared for SEO and conversions.",
  },
];

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden px-4 py-20 sm:py-24 lg:pt-28 lg:pb-16"
    >
      <div className="absolute inset-0">
        <img
          src={mylogo}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center scale-110 opacity-15 blur-[1px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.24),_transparent_34%),radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.24),_transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.58)_0%,rgba(2,6,23,0.84)_55%,rgba(2,6,23,0.98)_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-950/55 px-3 py-2 text-center text-xs leading-tight text-cyan-100 backdrop-blur-md sm:gap-3 sm:px-4 sm:text-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
              Website design, development, and digital presence that feels premium
            </div>

            <h1 className="text-3xl font-black leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Crafting digital</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                experiences people remember
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl lg:mx-0">
              We build polished websites that make your brand look sharp, load fast,
              and convert attention into action.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="group w-full border-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 px-6 py-3 text-base text-white duration-500 hover:from-cyan-300 hover:to-purple-400 hover:text-black sm:w-auto sm:px-8 sm:text-lg"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group w-full border border-white/10 bg-white/5 px-6 py-3 text-base text-white backdrop-blur-md duration-500 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-100 sm:w-auto sm:px-8 sm:text-lg"
                onClick={() =>
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Our Portfolio
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1 sm:h-5 sm:w-5" />
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3 lg:justify-start">
              {[
                "Responsive Layouts",
                "SEO Friendly",
                "Fast Performance",
                "Strong Branding",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-left shadow-xl backdrop-blur-xl sm:p-5"
                  >
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/20 sm:mb-4 sm:h-11 sm:w-11">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-white sm:text-base">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 text-slate-300 sm:flex-row sm:items-center lg:justify-start">
              <span className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Connect
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/250789599719"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                  className="rounded-full border border-white/10 bg-white/5 p-3 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  <img src={whatsappicon} alt="WhatsApp" className="h-5 w-5 object-contain" />
                </a>
                <a
                  href="https://www.instagram.com/sitecraftersz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SiteCrafters on Instagram"
                  className="rounded-full border border-white/10 bg-white/5 p-3 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  <img src={instagramicon} alt="Instagram" className="h-5 w-5 object-contain" />
                </a>
                <a
                  href="mailto:sitecraftersz@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email SiteCrafters"
                  className="rounded-full border border-white/10 bg-white/5 p-3 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  <img src={gmailicon} alt="Email" className="h-5 w-5 object-contain" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-fuchsia-500/20 blur-2xl sm:-inset-6 sm:blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/65 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-4 lg:rounded-[2rem]">
              <div className="grid gap-3 sm:gap-4">
                <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5 p-2 sm:p-4">
                  <img
                    src={mylogo}
                    alt="SiteCrafters brand visual"
                    className="h-60 w-full rounded-[1rem] object-cover object-center sm:h-80 sm:rounded-[1.25rem] md:h-[420px]"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/70 sm:text-sm">Design Focus</p>
                    <p className="mt-2 text-base font-semibold text-white sm:text-xl">Clean, sharp, and conversion-ready.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-purple-200/70 sm:text-sm">Build Style</p>
                    <p className="mt-2 text-base font-semibold text-white sm:text-xl">Fast handoff with modern frontend polish.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
