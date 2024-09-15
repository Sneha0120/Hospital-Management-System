import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Doctors from "../components/Doctors";
const OurDoctors = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imageUrl={"/about.png"}
      />
     <Doctors/>
    </>
  );
};

export default OurDoctors;
