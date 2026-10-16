import { useRef, useState, type CSSProperties, type JSX } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./common/Header/Navbar";
import Footer from "./common/Footer/Footer";
import { LoaderLayout } from "./common/PageLoader";

import Home from "./components/HomeComponents/Home";
import About from "./components/AboutComponents/About";
import Experience from "./components/ExperienceComponents/Experience";
import Skills from "./components/SkillsComponents/Skills";
import Contact from "./components/ContactComponents/contact";

import HireMe from "./features/hireme/HireMe";
import WorkWithMe from "./features/workwithme/WorkWithMe";

import { useNavHeight } from "./hooks/useNavHeight";

import NotFound from "./common/NotFound";
import ScrollProgress from "./common/ScrollProgress";

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

      <Outlet />

      <HireMe onModalChange={onHireMeModalChange} />

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
