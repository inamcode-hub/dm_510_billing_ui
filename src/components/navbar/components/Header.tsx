import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const Header: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <div className="logo">
          <Link to="/">DM Mobile</Link>
        </div>
        <div className="icon">
          <MenuIcon style={{ color: "white", fontSize: 28 }} />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
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
    :hover {
      background-color: #333;
    }

    svg {
      margin: -3px 2px -7px 3px;
    }
  }
`;
export default Header;
