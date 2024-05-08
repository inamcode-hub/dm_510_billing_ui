import React from "react";
import useWindowSize from "../../lib/hooks/useWindowSize";
import NavbarMobile from "./mobile/NavbarMobile";
import NavbarDesktop from "./desktop/NavbarDesktop";

const Navbar: React.FC = () => {
  const { width } = useWindowSize();

  return <div>{width <= 768 ? <NavbarMobile /> : <NavbarDesktop />}</div>;
};

export default Navbar;
