import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Layout from '../../components/Layout';
import { getTopArtists } from '../../api/common';
import { useQuery } from 'react-query';
import { Card } from '@mui/material';
import PieChart from '../../components/PieChart';
import ArtistsList from '../../components/ArtistsList';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TopArtists() {
  const [value, setValue] = useState(0);

  const { isLoading, error, data } = useQuery({
    queryKey: ['topArtists'],
    queryFn: getTopArtists,
    refetchOnWindowFocus: false,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getPieData = () => {
    const returnObj = {
      labels: data.items?.map((item) => item.name),
      datasets: [
        {
          data: data.items?.map((item, index) => (10 - index) * 100),
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          animation: {
            animateScale: true,
          },
        },
      ],
    };
    return returnObj;
  };

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Pie chart" {...a11yProps(0)} />
            <Tab label="List" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      {value === 0 && data && (
        <div className="chartContainer">
          <PieChart data={getPieData()} />
        </div>
      )}
      {value === 1 && data && (
        <div className="artistsList">
          <ArtistsList artists={data?.items} />
        </div>
      )}
    </Layout>
  );
}

export default TopArtists;
