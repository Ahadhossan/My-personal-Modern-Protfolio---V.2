import { useRef } from "react";
import AboutImage from "../../assets/About.jpeg";
import SectionEyebrow from "../../common/SectionEyebrow";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const MAX_TILT = 14; // degrees: 8 = subtle, 20 = dramatic

/* ---------- Tilt card (follows the mouse) ---------- */
const TiltCard = ({ src, alt }: { src: string; alt: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    el.style.setProperty("--ry", `${(x - 0.5) * MAX_TILT * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * MAX_TILT * 2}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="[perspective:1000px]">
      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#151B27]
          ring-1 ring-white/10 shadow-[0_16px_40px_-12px_rgba(42,127,163,0.35)]
          transition-[transform,box-shadow] duration-200 ease-out will-change-transform
          [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]
          hover:scale-[1.03]
          motion-reduce:transform-none motion-reduce:transition-none cursor-pointer"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          className="h-full w-full select-none object-cover grayscale
            transition-[filter] duration-500 group-hover:grayscale-0"
        />

        {/* Glare that follows the cursor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300
            group-hover:opacity-100
            bg-[radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,0.25),transparent_55%)]"
        />
      </div>
    </div>
  );
};

/* ---------- About section ---------- */
const About = () => {
  return (
    <section
      id="about"
      className="mx-auto mt-0 max-w-7xl border-t border-white/10 px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30"
    >
      {/* Eyebrow */}
      <div className="mb-4 flex items-center gap-3 md:mb-6">
        <SectionEyebrow label="About Me" />
      </div>

      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
        {/* Text content */}
        <div className="order-2 md:order-1">
          <h2 className=" text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]">
            Passion fuels purpose.
          </h2>
          <div className="mt-4 mb-0 flex items-start justify-start gap-1.5">
            <i className="block h-[3px] w-[220px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081]" />
            <b className="h-1.5 w-1.5 rounded-full bg-[#2a7fa3]" />
          </div>
          <p className="mt-4 sm:mt-6 sm:text-base max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
            Hi, I'm{" "}
            <span className="text-[#194356] dark:text-[#94c6db]">
              Md. Ahad Hossain
            </span>{" "}
            — Results-driven Web Developer with 2+ years of professional
            experience building modern, responsive, and scalable web
            applications using React.js, Next.js, TypeScript, JavaScript, and
            Tailwind CSS. Experienced in frontend development, responsive UI
            implementation, state management, software troubleshooting, product
            support, and cross-functional collaboration.
          </p>
          <p className="mt-4 sm:mt-6 sm:text-base max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
            Currently working as a
            <span className="text-[#194356] dark:text-[#94c6db]">
              Product Excellence Engineer
            </span>
            at Cubix Technology Ltd., supporting HMS/PMS products, analyzing
            software queries, collaborating with development teams, conducting
            client training, and contributing to product quality and user
            experience improvements.
          </p>
          <p className="mt-4 sm:mt-6 sm:text-base max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
            Previously worked as a Junior Web Developer at Imranslab, developing
            responsive web applications and collaborating with remote teams
            using modern development and project-management tools. Strong
            understanding of the software development lifecycle, Agile
            practices, Git-based workflows, and production deployment.
          </p>
          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            {/* GitHub Profile */}
            <a
              href="https://github.com/Ahadhossan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="group relative inline-flex items-center justify-center gap-3
      overflow-hidden rounded-full border border-slate-300 bg-white px-5 py-3.5
      text-sm font-semibold text-slate-800 shadow-sm
      transition-all duration-300
      hover:-translate-y-0.5 hover:border-[#2a7fa3]
      hover:bg-slate-50 hover:shadow-lg hover:shadow-[#2a7fa3]/10
      active:translate-y-0
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-[#2a7fa3] focus-visible:ring-offset-2
      dark:border-slate-700 dark:bg-slate-900 dark:text-white
      dark:hover:border-[#2a7fa3] dark:hover:bg-slate-800
      dark:focus-visible:ring-offset-slate-950 sm:w-auto sm:py-4"
            >
              <FaGithub
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-300
        group-hover:rotate-[-8deg] group-hover:scale-110"
              />

              <span>GitHub Profile</span>

              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 text-slate-400 transition-all duration-300
        group-hover:-translate-y-0.5 group-hover:translate-x-0.5
        group-hover:text-[#2a7fa3]"
              />
            </a>

            {/* View Projects */}
            <a
              href="/projects"
              className="group relative inline-flex items-center justify-center gap-3
      overflow-hidden rounded-full bg-gradient-to-r from-[#1E5470] to-[#2a7fa3]
      px-5 py-3.5 text-sm font-semibold text-white
      shadow-lg shadow-[#2a7fa3]/20
      transition-all duration-300
      hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2a7fa3]/35
      active:translate-y-0
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-[#2a7fa3] focus-visible:ring-offset-2
      dark:focus-visible:ring-offset-slate-950 sm:w-auto sm:py-4"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        transition-transform duration-700 ease-out
        group-hover:translate-x-full"
              />

              <span className="relative">View Projects</span>

              <ArrowUpRight
                aria-hidden="true"
                className="relative h-4 w-4 transition-transform duration-300
        group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2">
          <div className="relative isolate mx-auto max-w-xs md:max-w-lg">
            {/* soft glow behind image */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-white/5 via-transparent to-white/5 blur-2xl" />

            <TiltCard src={AboutImage} alt="Md. Ahad Hossain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
