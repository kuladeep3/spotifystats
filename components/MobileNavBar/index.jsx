import { Chip, Stack } from '@mui/material';
import Link from 'next/link';
import React from 'react';

function MobileNavbar() {
  return (
    <div className="mobileNavbar">
      <Stack direction="row" spacing={1}>
        <Link href="/dashboard/top-artists">
          <Chip label="Top Artists" color="primary" clickable />
        </Link>
        <Link href="/dashboard/top-tracks">
          <Chip label="Top Tracks" color="success" clickable />
        </Link>
      </Stack>
    </div>
  );
}

export default MobileNavbar;
