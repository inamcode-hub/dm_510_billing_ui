import styled from "@emotion/styled";
import React from "react";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <h1>Home</h1>
      </Wrapper>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  min-height: 300vh;
`;
export default Home;
