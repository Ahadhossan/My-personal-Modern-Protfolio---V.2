import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ArrowLeft, X } from "lucide-react";

import HireTypeSelection, { type HireType } from "./HireTypeSelection";

import CompanyForm, { type CompanyFormData } from "./CompanyForm";

import ProjectForm, { type ProjectFormData } from "./ProjectForm";

import HireSuccess from "./HireSuccess";

/* =========================================================
   TYPES
========================================================= */

type Step = "select" | "company" | "project" | "success";

type SubmittedType = "company" | "project" | null;

/* =========================================================
   CONSTANTS
========================================================= */

const MAX_FILE_SIZE = 50 * 1024 * 1024;

const ALLOWED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx"];

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/* =========================================================
   PROPS
========================================================= */

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* =========================================================
   INITIAL COMPANY FORM
========================================================= */

const initialCompanyForm: CompanyFormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  employmentType: "",
  location: "",
  compensation: "",
  message: "",
};

/* =========================================================
   INITIAL PROJECT FORM
========================================================= */

const initialProjectForm: ProjectFormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

/* =========================================================
   COMPONENT
========================================================= */

const HireMeModal = ({ isOpen, onClose }: HireMeModalProps) => {
  /* =======================================================
     STATE
  ======================================================= */

  const [step, setStep] = useState<Step>("select");

  const [submittedType, setSubmittedType] = useState<SubmittedType>(null);

  const [companyForm, setCompanyForm] = useState<CompanyFormData>({
    ...initialCompanyForm,
  });

  const [projectForm, setProjectForm] = useState<ProjectFormData>({
    ...initialProjectForm,
  });

  const [projectFile, setProjectFile] = useState<File | null>(null);

  const [fileError, setFileError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* =======================================================
     SELECT TYPE
  ======================================================= */

  const handleSelectType = (type: HireType) => {
    if (type === "company") {
      setStep("company");
    }

    if (type === "project") {
      setStep("project");
    }
  };

  /* =======================================================
     COMPANY CHANGE
  ======================================================= */

  const handleCompanyChange = (field: keyof CompanyFormData, value: string) => {
    setCompanyForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =======================================================
     PROJECT CHANGE
  ======================================================= */

  const handleProjectChange = (field: keyof ProjectFormData, value: string) => {
    setProjectForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =======================================================
     BACK
  ======================================================= */

  const handleBack = () => {
    if (step === "company" || step === "project") {
      setStep("select");
      return;
    }

    if (step === "success") {
      setStep("select");
      setSubmittedType(null);
    }
  };

  /* =======================================================
     FILE CHANGE
  ======================================================= */

  const handleProjectFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFileError("");

    const file = event.target.files?.[0];

    if (!file) {
      setProjectFile(null);
      return;
    }

    const fileName = file.name.toLowerCase();

    const hasValidExtension = ALLOWED_FILE_EXTENSIONS.some((extension) =>
      fileName.endsWith(extension),
    );

    const hasValidMime = ALLOWED_FILE_TYPES.includes(file.type);

    /* -------------------------------------------------------
       FILE TYPE
    ------------------------------------------------------- */

    if (!hasValidExtension && !hasValidMime) {
      setProjectFile(null);

      setFileError(
        "Invalid file type. Please upload only PDF, DOC, or DOCX files.",
      );

      event.target.value = "";

      return;
    }

    /* -------------------------------------------------------
       FILE SIZE
    ------------------------------------------------------- */

    if (file.size > MAX_FILE_SIZE) {
      setProjectFile(null);

      setFileError("File size is too large. Maximum allowed size is 50 MB.");

      event.target.value = "";

      return;
    }

    /* -------------------------------------------------------
       VALID FILE
    ------------------------------------------------------- */

    setProjectFile(file);
  };

  /* =======================================================
     REMOVE FILE
  ======================================================= */

  const handleRemoveFile = () => {
    setProjectFile(null);
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =======================================================
     COMPANY SUBMIT
  ======================================================= */

  const handleCompanySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmittedType("company");
    setStep("success");
  };

  /* =======================================================
     PROJECT SUBMIT
  ======================================================= */

  const handleProjectSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fileError) {
      return;
    }

    if (projectFile && projectFile.size > MAX_FILE_SIZE) {
      setFileError("File size is too large. Maximum allowed size is 50 MB.");

      return;
    }

    setSubmittedType("project");
    setStep("success");
  };

  /* =======================================================
     RESET
  ======================================================= */

  const resetForm = () => {
    setStep("select");

    setSubmittedType(null);

    setCompanyForm({
      ...initialCompanyForm,
    });

    setProjectForm({
      ...initialProjectForm,
    });

    setProjectFile(null);

    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =======================================================
     CLOSE
  ======================================================= */

  const handleClose = () => {
    resetForm();
    onClose();
  };

  /* =======================================================
     ESC KEY
  ======================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  /* =======================================================
     BODY SCROLL
  ======================================================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* =======================================================
     NOT OPEN
  ======================================================= */

  if (!isOpen) {
    return null;
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <AnimatePresence>
      <div
        className="
          fixed
          inset-0
          z-[1000]
          flex
          items-center
          justify-center
          p-3
          sm:p-5
        "
      >
        {/* =================================================
            BACKDROP
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={handleClose}
          className="
            absolute
            inset-0
            bg-slate-950/85
            backdrop-blur-md
          "
        />

        {/* =================================================
            MODAL
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Hire Me"
          onClick={(event) => event.stopPropagation()}
          className="
            relative
            flex
            w-full
            max-w-5xl
            max-h-[94vh]
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-cyan-400/20
            bg-[#07111f]
            shadow-[0_25px_100px_rgba(0,0,0,0.65)]
          "
        >
          {/* Glow */}
          <div
            className="
              pointer-events-none
              absolute
              -left-32
              -top-32
              h-80
              w-80
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />

          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              relative
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-slate-800/80
              px-4
              py-4
              sm:px-7
            "
          >
            {/* Header Left */}
            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
              "
            >
              {/* Back */}
              {(step === "company" || step === "project") && (
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Go back"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-700
                    text-slate-300
                    transition
                    hover:border-cyan-400
                    hover:bg-cyan-400/10
                    hover:text-cyan-400
                  "
                >
                  <ArrowLeft size={17} />
                </button>
              )}

              {/* Title */}
              <div className="min-w-0">
                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-cyan-400
                    sm:text-xs
                  "
                >
                  Let's Work Together
                </p>

                <h2
                  className="
                    mt-1
                    truncate
                    text-base
                    font-semibold
                    text-white
                    sm:text-lg
                  "
                >
                  {step === "select" && "How can I help?"}

                  {step === "company" && "Company Opportunity"}

                  {step === "project" && "Start a Project"}

                  {step === "success" && "Request Submitted"}
                </h2>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close Hire Me"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-slate-700
                text-slate-400
                transition
                hover:border-red-400/50
                hover:bg-red-400/10
                hover:text-red-400
              "
            >
              <X size={18} />
            </button>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              relative
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {/* =================================================
                  SELECT
              ================================================= */}

              {step === "select" && (
                <motion.div
                  key="select"
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
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <HireTypeSelection onSelect={handleSelectType} />
                </motion.div>
              )}

              {/* =================================================
                  COMPANY
              ================================================= */}

              {step === "company" && (
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
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <CompanyForm
                    form={companyForm}
                    onChange={handleCompanyChange}
                    onSubmit={handleCompanySubmit}
                  />
                </motion.div>
              )}

              {/* =================================================
                  PROJECT
              ================================================= */}

              {step === "project" && (
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
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <ProjectForm
                    form={projectForm}
                    onChange={handleProjectChange}
                    onSubmit={handleProjectSubmit}
                    projectFile={projectFile}
                    fileError={fileError}
                    fileInputRef={fileInputRef}
                    onFileChange={handleProjectFileChange}
                    onRemoveFile={handleRemoveFile}
                  />
                </motion.div>
              )}

              {/* =================================================
                  SUCCESS
              ================================================= */}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <HireSuccess
                    submittedType={submittedType}
                    onClose={handleClose}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HireMeModal;
