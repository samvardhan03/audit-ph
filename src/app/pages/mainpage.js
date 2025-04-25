import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import Home from './homepage';
import Inventory from './inventory';
import Activity from './activity';
import Mosaicstyles from '../styles/mosaicstyles.module.css';

export default function MainPage(props) {
  const [pageName, setPageName] = useState('HomePage');

  const [dbInventoryData, setDBInventoryData] = useState([]);
  const [tableDataMap, setTableData] = useState([]);

  useEffect(() => {
      mountFunctionhelo();
    }, []);
  
    const mountFunctionhelo = async () => {
      const inventoryData = [
        { id: 'Acetominophen', opened: `${true}`, damaged: `${true}` , expiry_date:`${22}/${8}/${2026}`},
        { id: 'Ibuprofen', opened: `${true}`, damaged: `${true}`, expiry_date:`${22}/${8}/${2026}` },
        { id: 'Aspirin', opened: `${true}`,  damaged: `${true}` , expiry_date:`${22}/${8}/${2026}`},
        { id: 'Oxygen Cylinder', opened: `${true}`,  damaged: `${true}`, expiry_date:`${22}/${8}/${2026}` },
        { id: 'Aloe Vera Footcream', opened: `${true}`, damaged: `${true}`, expiry_date:`${22}/${8}/${2026}` },
        { id: 'N95 Mask', opened: `${true}`, damaged: `${true}`,expiry_date:`${22}/${8}/${2026}` },
      ];
      setDBInventoryData(inventoryData);
      setTableData(inventoryData);
    };

  const showPage = (page) => {
    console.log('Page Name is ::' + page + '::');
    if (page === 'Home') {
      setPageName('HomePage');
    } else if (page === 'Inventory') {
      setPageName('Inventory');
    } else if (page === 'Activity') {
      setPageName('Activity');
    }
  };

  useEffect(() => {
    mountFunction();
  }, []);

  const mountFunction = async () => {
    showPage('Home');
  };

  let mainBodyPage = '';
  if (pageName === 'HomePage') {
    mainBodyPage = <Home dbInventoryData={dbInventoryData} tableDataMap={tableDataMap}  setTableData={setTableData}/>;
  } else if (pageName === 'Inventory') {
    mainBodyPage = <Inventory dbInventoryData={dbInventoryData} tableDataMap={tableDataMap}  setTableData={setTableData} />;
  } else if (pageName === 'Activity') {
    mainBodyPage = <Activity />;
  }

  const NavBar = (
    <Box sx={{ borderBottom: 2.4, borderColor: '#5C6AFF', py: 2 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{ color: '#2707C5', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, pl: 2 }}
          >
            Mosaic
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          {['Home', 'Inventory', 'Activity'].map((page) => (
            <Button
              key={page}
              sx={{
                borderRadius: '25px',
                backgroundColor: pageName === (page === 'Home' ? 'HomePage' : page) ? '#5C6AFF' : 'transparent',
                color: pageName === (page === 'Home' ? 'HomePage' : page) ? 'white' : '#5C6AFF',
                boxShadow: 'none',
                mx: 1,
                my: { xs: 0.5, md: 0 },
                px: { xs: 2, sm: 3 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
              variant="contained"
              onClick={() => showPage(page)}
            >
              {page}
            </Button>
          ))}
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      {NavBar}
      {mainBodyPage}
    </Box>
  );
}