import styled from "@emotion/styled";
import { FaChartBar, FaCog, FaHistory, FaPowerOff } from "react-icons/fa"; // Import the required icons
import { AiOutlineDashboard } from "react-icons/ai";
const DropdownContent = () => {
  return (
    <Wrapper>
      <ul className="nav navbar-nav side-nav">
        <li className="active">
          <a href="https://my.dryermaster.com/users/dashboard">
            <AiOutlineDashboard /> Dashboard
          </a>
        </li>
        <li>
          <a href="https://my.dryermaster.com/users/charts">
            <FaChartBar /> Charts
          </a>
        </li>
        <li>
          <a href="https://my.dryermaster.com/users/history">
            <FaHistory /> History
          </a>
        </li>
        <li>
          <a href="https://my.dryermaster.com/users/preferences">
            <FaCog /> Preferences
          </a>
        </li>
        <li>
          <a href="https://my.dryermaster.com/users/dashboard">
            <FaPowerOff /> Log Out
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ul {
    @media (max-width: 768px) {
      margin-top: 8px;
    }
    margin-top: 1px;
    li {
      /* border-bottom: 1px solid #333; */
      line-height: 20px;
      display: flex;
      align-items: center;
      :hover {
        cursor: pointer;
      }

      a {
        color: var(--menu-text-color);
        padding-left: 2px;
        /* background-color: pink; */
        width: 100%;
        padding: 10px 15px;
        margin-left: 3px;
        @media (min-width: 768px) {
          padding: 15px 15px;
          :hover {
            background-color: #080808;
            a {
              color: #fff;
            }
          }
        }
        :hover {
          color: #fff;
        }
        // icon
        svg {
          margin-right: 1px;
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
export default DropdownContent;
