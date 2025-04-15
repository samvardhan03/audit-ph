import * as React from 'react';
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Card from '@mui/material/Card';
import Mosaicstyles from '../styles/mosaicstyles.module.css';

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
                if ((dbInventoryData[i].id).toLowerCase().includes(event.target.value)) { foundMe = true }
                if ((dbInventoryData[i].Serial).toLowerCase().includes(event.target.value)) { foundMe = true }
                if ((dbInventoryData[i].quantity).toLowerCase().includes(event.target.value)) { foundMe = true }
                if ((dbInventoryData[i].damages).toLowerCase().includes(event.target.value)) { foundMe = true }
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
                { id: 'Acetominophen', Serial: '#447251', quantity: '100', damages: 'None' },
                { id: 'Ibuprofen', Serial: '#316815', quantity: '77', damages: 'None' },
                { id: 'Aspirin', Serial: '#859520', quantity: '27', damages: 'Physical damage' },
                { id: 'Oxygen Cylinder', Serial: '#71961', quantity: '40', damages: 'None' },
                { id: 'Aloe Vera Footcream', Serial: '#3112', quantity: '21', damages: 'Incorrect temperature' },
                { id: 'N95 Mask', Serial: '#99', quantity: '105', damages: 'Opened' },
       ];
       setDBInventoryData(inventoryData);
        setTableData(inventoryData);
    }

    return (
        <div>
            <Box sx={{ borderBottom:0, mt:0, width: "100%", display: 'flex', flexwrap: 'wrap'}}>
            <Box border={0} sx={{ mt:5, width: "30%"}}>
                <Box sx={{ml:5, width:"100%", display: 'flex', flexwrap: 'wrap'}}><Typography variant="h4" >Filter</Typography></Box>
                <Box sx={{mb:2 ,ml:5, mt:2, width: "100%", display: 'flex', flexwrap: 'wrap'}}>
                <Button sx={{mt:1, mr:2, backgroundColor:'#5C6AFF' ,color: 'white', borderRadius:10}} variant="contained">All items</Button>
                </Box>
                <Box sx={{mb:2 ,ml:5, mt:2, width:"100%", display: 'flex', flexwrap: 'wrap'}}>
                <Button sx={{mt:1, mr:2, backgroundColor:'#EBEAEA' ,boxShadow: 'none', color: 'black', borderRadius:10}} variant="contained">No damage</Button>
                <Button sx={{mt:1, mr:2, backgroundColor:'#EBEAEA' ,boxShadow: 'none', color: 'black', borderRadius:10}} variant="contained">Opened</Button>
                </Box>
                <Box sx={{mb:2 ,ml:5, mt:2, width: "100%", display: 'flex', flexwrap: 'wrap'}}>
                <Button sx={{mt:1, mr:2, backgroundColor:'#EBEAEA' ,boxShadow: 'none', color: 'black', borderRadius:10}} variant="contained">Physical damage</Button>
                <Button sx={{mt:1, mr:2, backgroundColor:'#EBEAEA' ,boxShadow: 'none', color: 'black', borderRadius:10}} variant="contained">Expired</Button>
                </Box>
                <Box sx={{mb:2 ,ml:5, mt:2, width: "100%", display: 'flex', flexwrap: 'wrap'}}>
                <Button sx={{mt:1, mr:2, backgroundColor:'#EBEAEA' ,boxShadow: 'none', color: 'black', borderRadius:10}} variant="contained">Incorrect temperature</Button>
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
                                <Box sx={{mb:2 ,ml:0, mt:2, width: "74%"}}><Typography variant="h3">Your<span style={{color: '#2027C5'}}> inventory</span></Typography></Box>
                                <Box sx={{mb:2 , mt:2, width: "26%"}}><Button sx={{backgroundColor:'#F1F3FF',color:'black',border:'3px solid #2027C5', borderRadius: '25px', mt:1, mr:2}} variant="contained">Manage inventory</Button></Box>
            </Box>

            <Box sx={{ mr:10, mt:7 }} >
            <TableContainer  sx={{ maxHeight: '70vh' }} component={Paper}>
                <Table stickyHeader >
                    <TableHead>
                        <TableRow >
                            <TableCell  sx={{borderBottom: "none", paddingTop: 0.8, paddingBottom: 4}}><Box sx={{ mr:15, color: '#2027C5'}} className={Mosaicstyles.label10}>S.No</Box></TableCell>
                            <TableCell  sx={{borderBottom: "none", paddingTop: 0.8, paddingBottom: 4}}><Box sx={{ mr:15, color: '#2027C5'}} className={Mosaicstyles.label10}>Product</Box></TableCell>
                            <TableCell  sx={{borderBottom: "none", paddingTop: 0.8, paddingBottom: 4}}><Box sx={{ mr:15, color: '#2027C5'}} className={Mosaicstyles.label10}>Serial number</Box></TableCell>
                            <TableCell  sx={{borderBottom: "none", paddingTop: 0.8, paddingBottom: 4}}><Box sx={{ mr:15, color: '#2027C5'}}className={Mosaicstyles.label10}>Total units</Box></TableCell>
                            <TableCell  sx={{borderBottom: "none", paddingTop: 0.8, paddingBottom: 4}}><Box sx={{ mr:15, color: '#2027C5'}} className={Mosaicstyles.label10}>Damages</Box></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableDataMap.map((college, index) => (
                            <TableRow className={Mosaicstyles.tablerowdesign} sx={{mt:10}} key={college.id}>
                                <TableCell className={Mosaicstyles.label12} sx={{borderBottom: "none", paddingTop: 15, paddingBottom: 0}}> <Box className={Mosaicstyles.label11}>{index + 1} </Box></TableCell>
                                <TableCell className={Mosaicstyles.label12} sx={{borderBottom: "none", paddingTop: 15, paddingBottom: 0}}><Box className={Mosaicstyles.label11}>{college.id}</Box></TableCell>
                                <TableCell className={Mosaicstyles.label12} sx={{borderBottom: "none", paddingTop: 15., paddingBottom: 0}}><Box className={Mosaicstyles.label11}>{college.Serial}</Box></TableCell>
                                <TableCell className={Mosaicstyles.label12} sx={{borderBottom: "none", paddingTop: 15, paddingBottom: 0}}><Box className={Mosaicstyles.label11}>{college.quantity}</Box></TableCell>
                                <TableCell  sx={{borderBottom: "none", paddingTop: 15, paddingBottom: 0}}>
                                    <Box className={Mosaicstyles.label11}>{college.damages}</Box>
                                </TableCell>
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