import { useEffect, useState } from "react";
import FloatingHireMeButton from "./FloatingHireMeButton";
import HireMeModal from "./HireMeModal";

interface HireMeProps {
  onModalChange?: (isOpen: boolean) => void;
}

const HireMe = ({ onModalChange }: HireMeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onModalChange?.(isOpen);
  }, [isOpen, onModalChange]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && <FloatingHireMeButton onHireMe={handleOpen} />}

      <HireMeModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default HireMe;
