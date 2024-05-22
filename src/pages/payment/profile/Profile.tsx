import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavigatePages from '../components/NavigatePages';

const Profile: React.FC = () => {
  const { showProfile } = useSelector((state: any) => state.payment);

  useEffect(() => {
    console.log('showProfile:', showProfile);
  }, [showProfile]);
  return (
    <React.Fragment>
      <div>
        <NavigatePages />
        <h1>Profile page</h1>
      </div>
    </React.Fragment>
  );
};
export default Profile;
