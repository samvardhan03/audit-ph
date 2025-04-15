import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';
import Mosaicstyles from '../styles/mosaicstyles.module.css';

export default function Activity(props) {
  const [dbInventoryData, setDBInventoryData] = useState([]);
  const [tableDataMap, setTableData] = useState([]);

  const handleSearch = (event) => {
    if (event.target.value.length === 0) {
      setTableData(dbInventoryData);
    } else {
      const searchResult = dbInventoryData.filter((item) =>
        ['Actiontime', 'Activity', 'Notes'].some((key) =>
          item[key].toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      setTableData(searchResult);
    }
  };

  useEffect(() => {
    mountFunction();
  }, []);

  const mountFunction = async () => {
    const inventoryData = [
      { Actiontime: '15/2/2025', Activity: 'Aspirin, +12 units', Notes: 'Added new stock' },
      { Actiontime: '12/2/2025', Activity: 'Loratadine, -2 units', Notes: 'Removed expired stock' },
      { Actiontime: '8/2/2025', Activity: 'Acetominophine, -4 units', Notes: 'Removed damaged stock' },
      { Actiontime: '8/2/2025', Activity: 'Ibuprofen', Notes: 'Inspected and verfied units' },
      { Actiontime: '29/1/2025', Activity: 'Aloe Vera Footcream', Notes: 'Added new stock' },
      { Actiontime: '18/1/2025', Activity: 'Stethoscope', Notes: 'Inspected and verfieid units' },
    ];
    setDBInventoryData(inventoryData);
    setTableData(inventoryData);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Sort
          </Typography>
          {['Newest to Oldest', 'Oldest to Newest', 'Archived'].map((sort, index) => (
            <Button
              key={index}
              sx={{
                mt: 1,
                mr: 2,
                backgroundColor: sort === 'Newest to Oldest' ? '#5C6AFF' : '#EBEAEA',
                color: sort === 'Newest to Oldest' ? 'white' : 'black',
                borderRadius: 10,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
              variant="contained"
            >
              {sort}
            </Button>
          ))}
          <Typography variant="h4" sx={{ mt: 4, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Search
          </Typography>
          <TextField
            id="filled-multiline-flexible"
            label="Press 'enter' to filter"
            multiline
            rows={4}
            fullWidth
            onChange={handleSearch}
            sx={{ mt: 2, backgroundColor: '#EBEAEA', borderRadius: 5 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
                Your <span style={{ color: '#2027C5' }}>activity</span>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
              <Button
                sx={{
                  backgroundColor: '#F1F3FF',
                  color: 'black',
                  border: '3px solid #2027C5',
                  borderRadius: '25px',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
                variant="contained"
              >
                Register Activity
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ mt: 4, maxHeight: '70vh', overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {['Date', 'Activity', 'Notes'].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        borderBottom: 'none',
                        py: 2,
                        color: '#2027C5',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableDataMap.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: 'none', py: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {item.Actiontime}
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none', py: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {item.Activity}
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none', py: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {item.Notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}