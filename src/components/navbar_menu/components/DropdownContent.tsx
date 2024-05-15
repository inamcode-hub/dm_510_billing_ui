import styled from '@emotion/styled';
import { FaChartBar, FaCog, FaHistory, FaPowerOff } from 'react-icons/fa';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaCreditCard } from 'react-icons/fa';
const navItems = [
  {
    href: 'https://my.dryermaster.com/users/dashboard',
    icon: <AiOutlineDashboard />,
    label: 'Dashboard',
  },
  {
    href: 'https://my.dryermaster.com/users/charts',
    icon: <FaChartBar />,
    label: 'Charts',
  },
  {
    href: 'https://my.dryermaster.com/users/history',
    icon: <FaHistory />,
    label: 'History',
  },
  {
    href: 'https://my.dryermaster.com/users/preferences',
    icon: <FaCog />,
    label: 'Preferences',
  },
  {
    href: import.meta.env.VITE_REDIRECT_URL_NAV,
    icon: <FaCreditCard />,
    label: 'Billing',
    active: true,
  },
  {
    href: 'https://my.dryermaster.com/users/dashboard',
    icon: <FaPowerOff />,
    label: 'Log Out',
  },
];

const DropdownContent = () => {
  return (
    <Wrapper>
      <ul>
        {navItems.map((item, index) => (
          <li key={index} className={item.active ? 'active' : ''}>
            <a href={item.href}>
              {item.icon} {item.label}
            </a>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 768px) {
    border-top: 1px solid #333;
  }

  ul {
    @media (max-width: 768px) {
      margin-top: 7px;
    }
    margin-top: 1px;
    li {
      line-height: 20px;
      display: flex;
      align-items: center;

      :hover {
        cursor: pointer;
      }

      a {
        color: var(--menu-text-color);
        padding-left: 2px;
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

        svg {
          margin-right: 3px;
          margin-left: -2px;
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
