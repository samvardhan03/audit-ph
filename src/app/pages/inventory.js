import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';
import Mosaicstyles from '../styles/mosaicstyles.module.css';

export default function Inventory(props) {
  const [dbInventoryData, setDBInventoryData] = useState([]);
  const [tableDataMap, setTableData] = useState([]);

  const handleSearch = (event) => {
    if (event.target.value.length === 0) {
      setTableData(dbInventoryData);
    } else {
      const searchResult = dbInventoryData.filter((item) =>
        ['id', 'Serial', 'quantity', 'damages'].some((key) =>
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
      { id: 'Acetominophen', Serial: '#447251', quantity: '100', damages: 'None' },
      { id: 'Ibuprofen', Serial: '#316815', quantity: '77', damages: 'None' },
      { id: 'Aspirin', Serial: '#859520', quantity: '27', damages: 'Physical damage' },
      { id: 'Oxygen Cylinder', Serial: '#71961', quantity: '40', damages: 'None' },
      { id: 'Aloe Vera Footcream', Serial: '#3112', quantity: '21', damages: 'Incorrect temperature' },
      { id: 'N95 Mask', Serial: '#99', quantity: '105', damages: 'Opened' },
    ];
    setDBInventoryData(inventoryData);
    setTableData(inventoryData);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Filter
          </Typography>
          {['All items', 'No damage', 'Opened', 'Physical damage', 'Expired', 'Incorrect temperature'].map((filter, index) => (
            <Button
              key={index}
              sx={{
                mt: 1,
                mr: 2,
                backgroundColor: filter === 'All items' ? '#5C6AFF' : '#EBEAEA',
                color: filter === 'All items' ? 'white' : 'black',
                borderRadius: 10,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              }}
              variant="contained"
            >
              {filter}
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
                Your <span style={{ color: '#2027C5' }}>inventory</span>
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
                Manage inventory
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ mt: 4, maxHeight: '70vh', overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {['S.No', 'Product', 'Serial number', 'Total units', 'Damages'].map((header) => (
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
                  <TableRow key={item.id}>
                    <TableCell sx={{ borderBottom: 'none', py: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none', py: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {item.id}
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none', py: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {item.Serial}
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none', py: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {item.quantity}
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none', py: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {item.damages}
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