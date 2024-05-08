import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <div className="logo">
          <Link to="/">DM Mobile</Link>
        </div>
        <div className="icon">icon</div>
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
    }
  }
`;
export default Header;
