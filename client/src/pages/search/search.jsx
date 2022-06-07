import React, { useEffect } from 'react'

import{v4 as uuid} from "uuid"

import { useState } from "react";
import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import ListItem from '../../components/listItem/ListItem';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Item from '../../components/searchItem/item';


import Grid from '@mui/material/Grid';
import Navbar from '../../components/navbar/Navbar';

export default function Search({Token,stateChanger,User}) {
    let location =useLocation();
  let search=location.state
    let [content,setcontent]=useState();
    useEffect(()=>{
        try{
 
          
          fetch(`movies/search/${search?"?search="+search:""}`,{
            
              headers: {
                token:
                `Bearer ${Token}`
              },
            
          }).then((respose)=>(respose.json()))
          .then((data)=>{setcontent(data);console.log(data)} ).catch((err)=>{console.log(err)})
        }
        catch(err){
          console.log(err)
        }
      },[search,Token])

      return (
          <div >
        <Navbar StateChanger={stateChanger} User={User} />

        <Container style={{marginTop:100}}  >


        <Box sx={{ flexGrow: 1 , height: '100vh' }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
        { content && content.map((movie,i)=>{
           
           return <Item key={uuid()} index={i}  movie={movie._id} />
     
     })}
    
   </Grid>
   </Grid>
   </Box>
</Container>
</div>

      );
}
