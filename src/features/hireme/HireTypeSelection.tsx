import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  Mail,
} from "lucide-react";

export type HireType = "company" | "project";

interface HireTypeSelectionProps {
  onSelect: (type: HireType) => void;
}

const HireTypeSelection = ({ onSelect }: HireTypeSelectionProps) => {
  return (
    <div className="p-5 sm:p-8">
      {/* Intro */}
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <p className="text-sm text-slate-400">
            Choose the option that best matches what you want to discuss.
          </p>
        </motion.div>
      </div>

      {/* Options */}
      <div
        className="
          mx-auto
          mt-7
          grid
          max-w-3xl
          grid-cols-1
          gap-4
          sm:grid-cols-2
        "
      >
        {/* Company */}
        <motion.button
          type="button"
          onClick={() => onSelect("company")}
          whileHover={{
            y: -4,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            group
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/50
            p-5
            text-left

            transition-all
            duration-300

            hover:border-cyan-400/40
            hover:bg-cyan-400/[0.04]
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-400/20
              bg-cyan-400/10
              text-cyan-400
            "
          >
            <Building2 size={22} />
          </div>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white">
                Company Opportunity
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Looking to hire me for a full-time, part-time, remote, or
                contract role?
              </p>
            </div>

            <ArrowRight
              size={18}
              className="
                mt-1
                shrink-0
                text-slate-600
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:text-cyan-400
              "
            />
          </div>
        </motion.button>

        {/* Project */}
        <motion.button
          type="button"
          onClick={() => onSelect("project")}
          whileHover={{
            y: -4,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            group
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/50
            p-5
            text-left

            transition-all
            duration-300

            hover:border-cyan-400/40
            hover:bg-cyan-400/[0.04]
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-cyan-400/20
              bg-cyan-400/10
              text-cyan-400
            "
          >
            <Code2 size={22} />
          </div>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white">
                Start a Project
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Have a website, web app, dashboard, or UI project you want to
                build?
              </p>
            </div>

            <ArrowRight
              size={18}
              className="
                mt-1
                shrink-0
                text-slate-600
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:text-cyan-400
              "
            />
          </div>
        </motion.button>
      </div>

      {/* Direct Email */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500">Prefer email?</p>

        <a
          href="mailto:ahadm3016@gmail.com"
          className="
            mt-2
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-cyan-400
            transition
            hover:text-cyan-300
          "
        >
          <Mail size={15} />
          ahadm3016@gmail.com
        </a>
      </div>

      {/* Bottom */}
      <div className="mt-7 flex justify-center">
        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            text-slate-600
          "
        >
          <BriefcaseBusiness size={13} />
          Let's build something meaningful.
        </div>
      </div>
    </div>
  );
};

export default HireTypeSelection;
