import React from 'react';
import { useQuery } from 'react-query';
import { getProfile } from '../../api/common';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';

function ProfileIcon() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getProfile,
    refetchOnWindowFocus: false,
  });

  console.log(data);
  if (isLoading) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }
  return (
    <>
      <Avatar alt={data?.display_name} src={data?.images?.[0]?.url} />
    </>
  );
}

export default ProfileIcon;
