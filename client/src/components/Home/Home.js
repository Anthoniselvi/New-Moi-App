import React from "react";
import Header from "./Header/Header";
import About from "./About/About";
import Services from "./Services/Services";
import Works from "./Works/Works";
import Testimonal from "./Testimonal/Testimonal";
import Footer from "./Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <About />
      <Services />
      <Works />
      <Testimonal />
      <Footer />
    </div>
  );
}
