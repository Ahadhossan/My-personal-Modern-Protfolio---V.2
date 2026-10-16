import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  MapPin,
  Send,
  User,
} from "lucide-react";

export interface CompanyFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  employmentType: string;
  location: string;
  compensation: string;
  message: string;
}

interface CompanyFormProps {
  form: CompanyFormData;
  onChange: (field: keyof CompanyFormData, value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Remote",
  "Hybrid",
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

const CompanyForm = ({ form, onChange, onSubmit }: CompanyFormProps) => {
  return (
    <motion.div
      key="company"
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
          <Building2 size={14} />
          Company
        </div>

        <h3
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          Let's talk about the role
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-400
          "
        >
          Tell me about the opportunity and your organization.
        </p>
      </div>

      {/* Form */}
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
          <label className={labelClass}>
            Company / Organization <span className="text-cyan-400">*</span>
          </label>

          <div className="relative">
            <Building2
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
              value={form.company}
              onChange={(event) => onChange("company", event.target.value)}
              placeholder="Company name"
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className={labelClass}>
            Role / Position <span className="text-cyan-400">*</span>
          </label>

          <div className="relative">
            <BriefcaseBusiness
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
              value={form.role}
              onChange={(event) => onChange("role", event.target.value)}
              placeholder="e.g. Frontend Developer"
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

        {/* Employment Type */}
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Employment Type <span className="text-cyan-400">*</span>
          </label>

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {employmentTypes.map((type) => {
              const selected = form.employmentType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange("employmentType", type)}
                  className={`
                      rounded-xl
                      border
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      transition

                      ${
                        selected
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                          : "border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600 hover:text-white"
                      }
                    `}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>Location</label>

          <div className="relative">
            <MapPin
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
              value={form.location}
              onChange={(event) => onChange("location", event.target.value)}
              placeholder="Dhaka / Remote"
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

        {/* Compensation */}
        <div>
          <label className={labelClass}>
            Compensation{" "}
            <span className="text-xs text-slate-500">(Optional)</span>
          </label>

          <input
            value={form.compensation}
            onChange={(event) => onChange("compensation", event.target.value)}
            placeholder="e.g. $20K – $40K"
            className={inputClass}
          />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label className={labelClass}>
            About the Opportunity <span className="text-cyan-400">*</span>
          </label>

          <textarea
            required
            rows={5}
            maxLength={1000}
            value={form.message}
            onChange={(event) => onChange("message", event.target.value)}
            placeholder="Tell me about the role, responsibilities, team, requirements, and anything else I should know..."
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
            {form.message.length}/1000
          </div>
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
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
            "
          >
            <Send size={17} />
            Send Opportunity
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

export default CompanyForm;
