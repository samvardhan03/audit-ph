import * as React from 'react';
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Card from '@mui/material/Card';
import Mosaicstyles from '../styles/mosaicstyles.module.css';
import { ConstructionOutlined } from '@mui/icons-material';

export default function inventory (props) {
    const [dbInventoryData, setDBInventoryData] = useState([]);
    const [tableDataMap, setTableData] = useState([]);

    function handleSearch(event) {
        console.log ("Search length::"+event.target.value);
        if (event.target.value.length === 0) {
            setTableData(dbInventoryData);
        } else {
            let searchResult = [];
            
            for (let i = 0; i < dbInventoryData.length; i++) {
                let foundMe = false;
                if ((dbInventoryData[i].Actiontime).toLowerCase().includes(event.target.value)) { foundMe = true }
                if ((dbInventoryData[i].Activity).toLowerCase().includes(event.target.value)) { foundMe = true }
                if ((dbInventoryData[i].Notes).toLowerCase().includes(event.target.value)) { foundMe = true }
                if (foundMe === true) {
                    console.log ("Rows found::"+JSON.stringify(dbInventoryData[i]));
                    searchResult.push(dbInventoryData[i]);
                }
            }

             setTableData(searchResult);
        }
    }

 

    useEffect(() => {
        mountFunction();
    }, []);
    
    async function mountFunction() {
            // Fetch the Medicine details from the backend and assign the return value to the below variable inventoryData.
        
    let inventoryData = [
                { Actiontime: '15/2/2025', Activity: 'Aspirin, +12 units', Notes: 'Added new stock'},
                { Actiontime: '12/2/2025', Activity: 'Loratadine, -2 units', Notes: 'Removed expired stock'},
                { Actiontime: '8/2/2025', Activity: 'Acetominophine, -4 units', Notes: 'Removed damaged stock' },
                { Actiontime: '8/2/2025', Activity: 'Ibuprofen', Notes: 'Inspected and verfied units'},
                { Actiontime: '29/1/2025', Activity: 'Aloe Vera Footcream', Notes: 'Added new stock'},
                { Actiontime: '18/1/2025', Activity: 'Stethoscope', Notes: 'Inspected and verfieid units' }
       ];
       setDBInventoryData(inventoryData);
        setTableData(inventoryData);
    }

    return (
        <div>
            <Box sx={{ borderBottom:0, mt:0, width: "100%", display: 'flex', flexwrap: 'wrap'}}>
            <Box border={0} sx={{ mt:5, width: "30%"}}>
                <Box sx={{ml:5, width:"100%", display: 'flex', flexwrap: 'wrap'}}><Typography variant="h4" >Sort</Typography></Box>
                <Box sx={{mb:2 ,ml:5, mt:2, width: "100%", display: 'flex', flexwrap: 'wrap'}}>
                <Button sx={{mt:1, mr:2, backgroundColor:'#5C6AFF' ,color: 'white', borderRadius:10}} variant="contained">Newest to Oldest</Button>
                </Box>
                <Box sx={{mb:2 ,ml:5, mt:2, width: "100%", display: 'flex', flexwrap: 'wrap'}}>
                <Button sx={{mt:1, mr:2, backgroundColor:'#EBEAEA' ,boxShadow: 'none', color: 'black', borderRadius:10}} variant="contained">Oldest to Newest</Button>
                </Box>
                <Box sx={{mb:2 ,ml:5, mt:2, width:"100%", display: 'flex', flexwrap: 'wrap'}}>
                <Button sx={{mt:1, mr:2, backgroundColor:'#EBEAEA' ,boxShadow: 'none', color: 'black', borderRadius:10}} variant="contained">Archived</Button>
                </Box>
                <Box sx={{ml:5, mt:5, width:"100%" }}>
                    <Typography variant='h4'>Search</Typography>
                </Box>
                <Box sx={{ml:5, mt:2, width:"60%", backgroundColor:'#EBEAEA' ,boxShadow: 'none', borderRadius:5 }}>
                    <TextField id="filled-multiline-flexible" label="Press 'enter' to filter" multiline rows={4} fullWidth onChange={handleSearch}/>
                </Box>
            </Box>

            <Box border={0} sx={{mt:5, width: "70%"}}>
                <Box border={0} sx={{mb:2 ,ml:0, mt:2, width:"100%", display: 'flex', flexwrap: 'wrap'}}>
                    <Box sx={{mb:2 ,ml:0, mt:2, width: "55%"}}><Typography variant="h3">Your<span style={{color: '#2027C5'}}> activity</span></Typography></Box>
                    <Box sx={{mb:2 , mt:2, width: "45%"}}><Button sx={{backgroundColor:'#F1F3FF',color:'black',border:'3px solid #2027C5', borderRadius: '25px', mt:1, mr:2}} variant="contained">Register Activity</Button></Box>
                </Box>
            <Box sx={{ mr:10, mt:7 }} >
            <TableContainer  sx={{ maxHeight: '70vh' }} component={Paper}>
                <Table stickyHeader >
                    <TableHead>
                        <TableRow >
                            <TableCell  sx={{borderBottom: "none", paddingTop: 0.8, paddingBottom: 4}}><Box sx={{ mr:0, color: '#2027C5'}} className={Mosaicstyles.label10}>Date</Box></TableCell>
                            <TableCell  sx={{borderBottom: "none", paddingTop: 0.8, paddingBottom: 4}}><Box sx={{ mr:0, color: '#2027C5'}} className={Mosaicstyles.label10}>Activity</Box></TableCell>
                            <TableCell  sx={{borderBottom: "none", paddingTop: 0.8, paddingBottom: 4}}><Box sx={{ mr:0, color: '#2027C5'}} className={Mosaicstyles.label10}>Notes</Box></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableDataMap.map((college, index) => (
                            <TableRow className={Mosaicstyles.tablerowdesign} sx={{mt:10}} key={index+1}>
                                <TableCell className={Mosaicstyles.label12} sx={{borderBottom: "none", paddingTop: 15, paddingBottom: 0}}> <Box className={Mosaicstyles.label11}>{college.Actiontime} </Box></TableCell>
                                <TableCell className={Mosaicstyles.label12} sx={{borderBottom: "none", paddingTop: 15, paddingBottom: 0}}><Box className={Mosaicstyles.label11}>{college.Activity}</Box></TableCell>
                                <TableCell className={Mosaicstyles.label12} sx={{borderBottom: "none", paddingTop: 15., paddingBottom: 0}}><Box className={Mosaicstyles.label11}>{college.Notes}</Box></TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>

            </Box>
            </Box>  

 


        </div>
    )


}














