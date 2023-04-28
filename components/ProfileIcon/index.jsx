import React from 'react';
import { useQuery } from 'react-query';
import { getProfile } from '../../api/common';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import { Button, Card } from '@mui/material';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

function ProfileIcon() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { isLoading, error, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getProfile,
    refetchOnWindowFocus: false,
  });

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = () => {
    // Deleting cookies makes app logout
    deleteCookie('access_token');
    deleteCookie('code_verifier');
    router.push('/');
  };

  if (isLoading) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }
  return (
    <>
      <div className="clickable profileIconParent">
        <div className="avatarContainer">
          <Avatar alt={data?.display_name} src={data?.images?.[0]?.url} onClick={toggleMenu} />
          {isMenuVisible && (
            <div className="popupMenuContainer">
              <Card sx={{ minWidth: 160 }}>
                <div className="profilePopup">
                  <p>{data?.display_name || data?.email}</p>
                  <Button variant="text" size="small" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileIcon;
