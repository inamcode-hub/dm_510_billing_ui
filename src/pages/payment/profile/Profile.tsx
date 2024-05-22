import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { showProfile } = useSelector((state: any) => state.payment);

  useEffect(() => {
    console.log('showProfile:', showProfile);
  }, [showProfile]);
  return (
    <React.Fragment>
      <div>
        <h1>Profile page</h1>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/package">Package</Link>
          </li>
          <li>
            <Link to="/payment">Payment</Link>
          </li>
          <li>
            <Link to="/payment-success">Payment Success</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
export default Profile;
