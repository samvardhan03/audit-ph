import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { light } from '@mui/material/styles/createPalette';
import Home from './homepage';
import Inventory from './inventory';
import Activity from './activity';
import Mosaicstyles from '../styles/mosaicstyles.module.css';

export default function mainpage (props) {

    const [pageName, setPageName] = useState('HomePage');

    function showPage(page) {
        console.log("Page Name is ::" + page + "::");
        if (page === 'Home') {
            setPageName('HomePage');
        } else if (page === 'Inventory') {
            setPageName('Inventory');
        } else if (page === 'Activity') {
            setPageName('Activity');
        }
    }

    useEffect(() => {
        mountFunction();
    }, []);

    async function mountFunction() {
        // Fetch the User details from the backend
        // setAvatarInitials('SI');
        showPage('Home', 0);
    }

    let mainBodyPage = '';
    if (pageName === 'HomePage') {
        mainBodyPage = <Home />;
    } else if (pageName === 'Inventory') {
        mainBodyPage = <Inventory />;
    } else if (pageName === 'Activity') {
        mainBodyPage = <Activity />;
    }

    let NavBar = (
        <Box border={0} sx={{ borderBottom:2.4, borderColor:'#5C6AFF', mt:2, width: "100%", display: 'flex', flexwrap: 'wrap'}}>
                <Box sx={{mb:2 ,ml:5, width: "65%"}}><Typography variant="h4" sx={{color: '#2707C5'}}>Mosaic</Typography></Box>
                <Box border={0} direction="column" justifyContent='right' alignItems='right' sx={{mb:2, width: "25%"}}>

                    {(pageName==='HomePage')?
                    <Button sx={{ borderRadius: '25px',backgroundColor:'#5C6AFF' ,color: 'white',textAlign: 'center',
                        width: '22%',padding: '4px',transition: 'all 1s',cursor: 'pointer',mr:2, mt:1}}variant="contained" onClick= {() => showPage('Home')}>Home</Button>
                    :
                    <Button sx={{ borderRadius: '25px',color: '#5C6AFF',backgroundColor: 'transparent', border: '0px', boxShadow: 'none',textAlign: 'center',
                    width: '22%',padding: '4px',transition: 'all 1s',cursor: 'pointer',mr:2, mt:1}}variant="contained" onClick= {() => showPage('Home')}>Home</Button> 
                    }

                    {(pageName==='Inventory')?
                    <Button sx={{ borderRadius: '25px',backgroundColor:'#5C6AFF' ,color: 'white',textAlign: 'center',
                        width: '22%',padding: '4px',transition: 'all 1s',cursor: 'pointer',mr:2, mt:1}}variant="contained" onClick= {() => showPage('Inventory')}>Inventory</Button>
                    :
                    <Button sx={{ borderRadius: '25px',color: '#5C6AFF',backgroundColor: 'transparent', border: '0px', boxShadow: 'none',textAlign: 'center',
                    width: '22%',padding: '4px',transition: 'all 1s',cursor: 'pointer',mr:2, mt:1}}variant="contained" onClick= {() => showPage('Inventory')}>Inventory</Button> 
                    }

                    {(pageName==='Activity')?
                    <Button sx={{ borderRadius: '25px',backgroundColor:'#5C6AFF' ,color: 'white',textAlign: 'center',
                        width: '22%',padding: '4px',transition: 'all 1s',cursor: 'pointer',mr:2, mt:1}}variant="contained" onClick= {() => showPage('Activity')}>Activity</Button>
                    :
                    <Button sx={{ borderRadius: '25px',color: '#5C6AFF',backgroundColor: 'transparent', border: '0px', boxShadow: 'none',textAlign: 'center',
                    width: '22%',padding: '4px',transition: 'all 1s',cursor: 'pointer',mr:2, mt:1}}variant="contained" onClick= {() => showPage('Activity')}>Activity</Button> 
                    }

                </Box>
                <Box sx={{mb:2, width: "10%"}}></Box> 
            </Box>
    );

    return (
        <div>
            {NavBar}
            {mainBodyPage}
            
        </div>
    );
}