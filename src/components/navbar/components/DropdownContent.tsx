import styled from "@emotion/styled";
import { FaChartBar, FaCog, FaHistory, FaPowerOff } from "react-icons/fa"; // Import the required icons
import { AiOutlineDashboard } from "react-icons/ai";
const MyComponent = () => {
  return (
    <Wrapper>
      <ul className="nav navbar-nav side-nav">
        <li className="active">
          <a href="/users/dashboard">
            <AiOutlineDashboard /> Dashboard
          </a>
        </li>
        <li>
          <a href="/users/charts">
            <FaChartBar /> Charts
          </a>
        </li>
        <li>
          <a href="/users/history">
            <FaHistory /> History
          </a>
        </li>
        <li>
          <a href="/users/preferences">
            <FaCog /> Preferences
          </a>
        </li>
        <li>
          <a href="#">
            <FaPowerOff /> Log Out
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ul {
    margin-top: 7px;
    li {
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 15px;
      padding-right: 15px;

      /* border-bottom: 1px solid #333; */
      line-height: 20px;
      align-items: center;

      a {
        color: var(--menu-text-color);
        padding-left: 2px;

        :hover {
          color: #fff;
        }
        // icon
        svg {
          font-size: 14px;
          margin-right: 2px;
          margin-bottom: -2px;
        }
      }
    }
  }
  .active {
    background-color: #080808;
    a {
      color: #fff;
    }
  }
`;
export default MyComponent;
