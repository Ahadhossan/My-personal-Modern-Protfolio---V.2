import { motion } from "framer-motion";
import { Check, Home, Mail } from "lucide-react";

type SubmittedType = "company" | "project" | null;

interface HireSuccessProps {
  submittedType: SubmittedType;
  onClose: () => void;
}

const HireSuccess = ({ submittedType, onClose }: HireSuccessProps) => {
  return (
    <motion.div
      key="success"
      initial={{
        opacity: 0,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.97,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        px-5
        py-12
        text-center
        sm:px-10
        sm:py-16
      "
    >
      {/* Success Icon */}
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 16,
        }}
        className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          border
          border-cyan-400/30
          bg-cyan-400/10
          text-cyan-400
        "
      >
        <Check size={38} strokeWidth={2.5} />
      </motion.div>

      {/* Title */}
      <h3
        className="
          mt-7
          text-2xl
          font-bold
          text-white
          sm:text-3xl
        "
      >
        {submittedType === "company"
          ? "Opportunity Details Sent!"
          : "Project Request Sent!"}
      </h3>

      {/* Description */}
      <p
        className="
          mx-auto
          mt-3
          max-w-md
          text-sm
          leading-6
          text-slate-400
        "
      >
        Thanks for reaching out! I'll review your information and get back to
        you as soon as possible.
      </p>

      {/* Next Steps */}
      <div
        className="
          mx-auto
          mt-8
          max-w-md
          rounded-2xl
          border
          border-cyan-400/20
          bg-slate-900/70
          p-5
          text-left
        "
      >
        <div className="flex gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-cyan-400/10
              text-cyan-400
            "
          >
            <Mail size={19} />
          </div>

          <div>
            <h4
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              What happens next?
            </h4>

            <div
              className="
                mt-3
                space-y-2
                text-xs
                leading-5
                text-slate-400
              "
            >
              <p>01. I'll review your submission</p>

              <p>02. I'll get back to you via email</p>

              <p>03. We'll discuss the next steps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={onClose}
        className="
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-700
          px-5
          py-3
          text-sm
          font-semibold
          text-slate-300
          transition
          hover:border-cyan-400
          hover:text-cyan-400
        "
      >
        <Home size={16} />
        Back to Portfolio
      </button>
    </motion.div>
  );
};

export default HireSuccess;
