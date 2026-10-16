import React from "react";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFigma,
  SiReact,
  SiCapacitor,
  SiJavascript,
  SiJenkins,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiGrafana,
  SiHono,
  SiVuedotjs,
} from "react-icons/si";

type Skill = { name: string; Icon: IconType; color: string };

const skills: Skill[] = [
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "React JS", Icon: SiReact, color: "#61DAFB" },
  { name: "Capacitor JS", Icon: SiCapacitor, color: "#53B9FF" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Jenkins", Icon: SiJenkins, color: "#D33833" },
  { name: "Next JS", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Grafana", Icon: SiGrafana, color: "#F46800" },
  { name: "Hono JS", Icon: SiHono, color: "#FF6A2B" },
  { name: "Vue JS", Icon: SiVuedotjs, color: "#42B883" },
];

const rowA = skills;
const rowB = [...skills.slice(6), ...skills.slice(0, 6)];

const Chip: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="group flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-2 pr-5 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/[0.08] cursor-pointer">
    <span
      className="flex h-10 w-10 items-center justify-center rounded-full"
      style={{ backgroundColor: `${skill.color}22` }}
    >
      <skill.Icon size={20} color={skill.color} />
    </span>
    <span className="text-base font-medium text-slate-200 group-hover:text-white">
      {skill.name}
    </span>
  </div>
);

const Row: React.FC<{
  items: Skill[];
  reverse?: boolean;
  duration?: number;
}> = ({ items, reverse = false, duration = 35 }) => (
  <div
    className="marquee-mask overflow-hidden"
    style={{
      maskImage:
        "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      WebkitMaskImage:
        "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
    }}
  >
    <div
      className="marquee-track flex w-max gap-4 pr-4"
      style={{
        animation: `marquee ${duration}s linear infinite ${
          reverse ? "reverse" : "normal"
        }`,
      }}
    >
      {[...items, ...items].map((skill, i) => (
        <Chip key={`${skill.name}-${i}`} skill={skill} />
      ))}
    </div>
  </div>
);

const Herobottom = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div className="relative flex flex-col gap-4">
        <Row items={rowA} duration={40} />
        <Row items={rowB} reverse duration={45} />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-mask:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Herobottom;
