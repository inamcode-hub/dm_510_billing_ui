import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DropdownContent from "./DropdownContent";
import useWindowSize from "../../../lib/hooks/useWindowSize";
const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { width } = useWindowSize();

  const handleAction = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (width > 768) {
      setOpen(false);
    }
  }, [width]);
  return (
    <React.Fragment>
      <Wrapper>
        <div className="header-content">
          <div className="logo">
            <Link to="/">DM Mobile</Link>
          </div>
          {width <= 768 && (
            <button className="icon" onClick={handleAction}>
              <MenuIcon style={{ color: "white", fontSize: 28 }} />
            </button>
          )}
        </div>
        <div
          className={
            open ? "drop-down show-drop-down" : "drop-down hide-drop-down"
          }
        >
          <DropdownContent />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  position: relative;
  .header-content {
    background-color: var(--menu-color);
    display: flex;
    justify-content: space-between;
    min-height: 50px;
    .logo {
      a {
        float: left;
        height: 50px;
        padding: 15px 15px;
        font-size: 18px;
        line-height: 20px;
        color: var(--menu-text-color);
        // hover
        :hover {
          color: #fff;
        }
      }
    }
    .icon {
      border: 1px solid #333;
      border-radius: 2px;
      margin: 10px;
      padding: 5px;
      margin-right: 15px;
      margin-top: 8px;
      background-color: transparent;
      :hover {
        background-color: #333;
      }

      svg {
        margin: -3px 2px -7px 3px;
      }
    }
  }
  .drop-down {
    background-color: var(--menu-color);
    position: absolute;
    width: 100%;
    overflow-y: hidden;
    border-top: 1px solid #333;
    // box shadow top
  }
  .show-drop-down {
    transition: height 0.3s;
    height: 216px;
  }
  .hide-drop-down {
    transition: height 0.3s;
    height: 0;
  }
`;
export default Header;
