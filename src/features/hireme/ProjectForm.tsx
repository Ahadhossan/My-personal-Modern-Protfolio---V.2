import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Paperclip,
  Rocket,
  Send,
  Trash2,
  User,
} from "lucide-react";

export interface ProjectFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface ProjectFormProps {
  form: ProjectFormData;
  onChange: (field: keyof ProjectFormData, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  projectFile: File | null;
  fileError: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

const inputClass = `
  h-12
  w-full
  rounded-xl
  border
  border-slate-700/80
  bg-slate-900/70
  px-4
  text-sm
  text-white
  outline-none
  transition
  placeholder:text-slate-500
  focus:border-cyan-400
  focus:ring-2
  focus:ring-cyan-400/10
`;

const labelClass = `
  mb-2
  block
  text-sm
  font-medium
  text-slate-200
`;

const projectTypes = [
  "Website",
  "Web App",
  "E-commerce",
  "Dashboard",
  "UI Development",
  "Other",
];

function PrivacyNote() {
  return (
    <div
      className="
        text-center
        text-xs
        text-slate-500
        sm:col-span-2
      "
    >
      Your information will only be used to respond to you.
    </div>
  );
}

const ProjectForm = ({
  form,
  onChange,
  onSubmit,
  projectFile,
  fileError,
  fileInputRef,
  onFileChange,
  onRemoveFile,
}: ProjectFormProps) => {
  return (
    <motion.div
      key="project"
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -20,
      }}
      className="
        px-5
        py-7
        sm:px-8
        sm:py-8
      "
    >
      {/* Header */}
      <div className="mb-7">
        <div
          className="
            mb-3
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-cyan-400/20
            bg-cyan-400/10
            px-3
            py-1.5
            text-xs
            font-medium
            text-cyan-400
          "
        >
          <Rocket size={14} />
          Project Based
        </div>

        <h3
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          Let's build something great
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-400
          "
        >
          Share your project details and let's turn your idea into something
          real.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
        "
      >
        {/* Full Name */}
        <div>
          <label className={labelClass}>
            Full Name <span className="text-cyan-400">*</span>
          </label>

          <div className="relative">
            <User
              size={17}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />

            <input
              required
              value={form.name}
              onChange={(event) => onChange("name", event.target.value)}
              placeholder="Your full name"
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>
            Email Address <span className="text-cyan-400">*</span>
          </label>

          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => onChange("email", event.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        {/* Company */}
        <div>
          <label className={labelClass}>Company / Brand</label>

          <input
            value={form.company}
            onChange={(event) => onChange("company", event.target.value)}
            placeholder="Optional"
            className={inputClass}
          />
        </div>

        {/* Project Type */}
        <div>
          <label className={labelClass}>
            Project Type <span className="text-cyan-400">*</span>
          </label>

          <select
            required
            value={form.projectType}
            onChange={(event) => onChange("projectType", event.target.value)}
            className={`
              ${inputClass}
              cursor-pointer
            `}
          >
            <option value="" className="bg-slate-900">
              Select project type
            </option>

            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-slate-900">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className={labelClass}>Estimated Budget</label>

          <input
            value={form.budget}
            onChange={(event) => onChange("budget", event.target.value)}
            placeholder="e.g. $500 – $1,000"
            className={inputClass}
          />
        </div>

        {/* Timeline */}
        <div>
          <label className={labelClass}>Expected Timeline</label>

          <input
            value={form.timeline}
            onChange={(event) => onChange("timeline", event.target.value)}
            placeholder="e.g. 2–4 weeks"
            className={inputClass}
          />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Project Details <span className="text-cyan-400">*</span>
          </label>

          <textarea
            required
            rows={5}
            maxLength={1500}
            value={form.message}
            onChange={(event) => onChange("message", event.target.value)}
            placeholder="Tell me about your project, features, goals, current status, and specific requirements..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-slate-700/80
              bg-slate-900/70
              px-4
              py-3
              text-sm
              leading-6
              text-white
              outline-none
              transition
              placeholder:text-slate-500
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/10
            "
          />

          <div
            className="
              mt-1
              text-right
              text-xs
              text-slate-600
            "
          >
            {form.message.length}/1500
          </div>
        </div>

        {/* File Upload */}
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Project Documents{" "}
            <span className="text-xs text-slate-500">(Optional)</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onFileChange}
            className="hidden"
          />

          {!projectFile ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="
                group
                flex
                min-h-[135px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-slate-700
                bg-slate-900/50
                px-5
                py-6
                text-center
                transition
                hover:border-cyan-400/60
                hover:bg-cyan-400/[0.03]
              "
            >
              <span
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400/10
                  text-cyan-400
                  transition
                  group-hover:scale-105
                "
              >
                <Paperclip size={21} />
              </span>

              <span
                className="
                  mt-3
                  text-sm
                  font-semibold
                  text-slate-200
                "
              >
                Attach project documents
              </span>

              <span
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                PDF, DOC, DOCX • Maximum 50 MB
              </span>
            </button>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-cyan-400/20
                bg-slate-900/70
                p-4
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400/10
                  text-cyan-400
                "
              >
                <FileText size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    truncate
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {projectFile.name}
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-500
                  "
                >
                  {(projectFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <button
                type="button"
                onClick={onRemoveFile}
                aria-label="Remove attached file"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition
                  hover:bg-red-400/10
                  hover:text-red-400
                "
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          )}

          {fileError && (
            <p
              className="
                mt-2
                text-xs
                font-medium
                text-red-400
              "
            >
              {fileError}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={Boolean(fileError)}
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              px-6
              py-3.5
              text-sm
              font-bold
              text-slate-950
              shadow-lg
              shadow-cyan-500/10
              transition
              hover:scale-[1.01]
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:scale-100
            "
          >
            <Send size={17} />
            Send Project Request
            <ArrowRight
              size={16}
              className="
                transition
                group-hover:translate-x-1
              "
            />
          </button>
        </div>

        <PrivacyNote />
      </form>
    </motion.div>
  );
};

export default ProjectForm;
