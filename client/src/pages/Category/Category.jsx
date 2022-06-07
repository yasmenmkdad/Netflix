import * as React from 'react';
import{v4 as uuid} from 'uuid'

import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Item from '../../components/searchItem/item';
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';

export default function Category({Token,stateChanger,User}) {
    let [content,setcontent]=React.useState();
    let location =useLocation();
    let category=location.state
    React.useEffect(()=>{
        try{
 
          
          fetch(`movies/category/${category?"?category="+category:""}`,{
            
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
      },[category,Token])
  return (
      <>
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
    </>
  );
}

