import {
  lazy,
  Suspense,
  useRef,
  useState,
  type CSSProperties,
  type JSX,
} from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./common/Header/Navbar";
import Footer from "./common/Footer/Footer";
import { LoaderLayout } from "./common/PageLoader";

import { useNavHeight } from "./hooks/useNavHeight";
import { usePageTracking } from "./hooks/usePageTracking";
import NotFound from "./common/NotFound";
import ScrollProgress from "./common/ScrollProgress";

const Home = lazy(() => import("./components/HomeComponents/Home"));
const About = lazy(() => import("./components/AboutComponents/About"));
const Experience = lazy(
  () => import("./components/ExperienceComponents/Experience"),
);
const Skills = lazy(() => import("./components/SkillsComponents/Skills"));
const Contact = lazy(() => import("./components/ContactComponents/contact"));
const WorkWithMe = lazy(() => import("./features/workwithme/WorkWithMe"));
const Projects = lazy(() => import("./components/ProjectComponents/Projects"));
const Articles = lazy(() => import("./components/ArticleComponents/Articles"));
const CertificateAward = lazy(
  () => import("./components/CertificateAwardComponents/CertificateAward"),
);
const CertificatesPage = lazy(
  () => import("./section/CertificateAward/CertificatesPage"),
);
const AwardsPage = lazy(() => import("./section/CertificateAward/AwardsPage"));
const HireMe = lazy(() => import("./features/hireme/HireMe"));

// ========================================
// MAIN LAYOUT
// ========================================

interface MainLayoutProps {
  onHireMeModalChange: (isOpen: boolean) => void;
}

const MainLayout = ({ onHireMeModalChange }: MainLayoutProps): JSX.Element => {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <Outlet />
      </Suspense>

      <Suspense fallback={null}>
        <HireMe onModalChange={onHireMeModalChange} />
      </Suspense>

      <Footer />
    </>
  );
};

// ========================================
// NOT FOUND LAYOUT
// ========================================

interface NavStyle extends CSSProperties {
  "--nav-h": string;
}

const NotFoundLayout = (): JSX.Element => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const nav = useNavHeight(navRef);

  const navStyle: NavStyle = {
    "--nav-h": `${nav.height}px`,
    paddingTop: nav.floating ? nav.height : 0,
  };

  return (
    <div style={navStyle}>
      <div ref={navRef}>
        <Navbar />
      </div>

      <Outlet />

      <Footer />
    </div>
  );
};

// ========================================
// APP
// ========================================

function App(): JSX.Element {
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);
  usePageTracking();
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hide scroll progress when Hire Me modal is open */}
      <ScrollProgress isHidden={isHireMeOpen} />

      <Routes>
        {/* Redirect /home to / */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Main website pages */}
        <Route element={<LoaderLayout />}>
          <Route element={<MainLayout onHireMeModalChange={setIsHireMeOpen} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/certificate" element={<CertificateAward />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/workwithme" element={<WorkWithMe />} />
          </Route>
        </Route>

        {/* 404 page */}
        <Route element={<NotFoundLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
