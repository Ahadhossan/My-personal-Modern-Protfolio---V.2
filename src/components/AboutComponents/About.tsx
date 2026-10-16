import React from "react";
import AboutHero from "../../section/About/AboutHero";
import Education from "../../section/About/Education";
import LetsTalk from "../../common/LetsTalk";
// import CareerTarget from "../../TestFile/CareerTarget";

const About: React.FC = () => {
  return (
    <div>
      <AboutHero />
      <Education />
      {/* <CareerTarget /> */}
      <LetsTalk />
    </div>
  );
};

export default About;
