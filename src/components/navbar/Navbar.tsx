import React from "react";
import useWindowSize from "../../lib/hooks/useWindowSize";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";

const Navbar: React.FC = () => {
  const { width } = useWindowSize();

  return <div>{width <= 768 ? <NavbarMobile /> : <NavbarDesktop />}</div>;
};

export default Navbar;
