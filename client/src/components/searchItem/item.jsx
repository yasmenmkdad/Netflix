import React, { useEffect } from 'react'
import "./item.css"


import { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const Itemcss = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
export default function Item({ index,movie }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  let [listmovie,setmovie]=useState([])
  useEffect(() => {
 
    try {
     fetch(
        `/movies/find/${movie}
        `,
        {
          headers: {
            token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODJiNjI4YzIzNGI0MWE1ODcwNGVkMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MzI0NzgxMCwiZXhwIjoxNjUzNjc5ODEwfQ.6MVzAfrHKCGhzmDu1im54AKrcpnLtkfKTYbzVk70hOk"
          },
        }
    
      ).then((res)=>(res.json())).then((data)=>{
    setmovie(data)}).catch((err)=>{console.log(err)});
    } catch (err) {
      console.log(err);
    }

}, [movie]);



  return(
   
    <Grid item xs={4}>
    <Itemcss>
    <Box component="span">


    <Card sx={{ maxWidth: 345 }}>
    <Link className='Link' to={"/watch"}state={listmovie}>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[900] }} aria-label="recipe">
            N
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={listmovie.title}
        subheader={listmovie.year}
      />
      <CardMedia
      style={{
        objectFit:"fill"}}
        component="img"
        height="194"
        className='imgsearch'

            image={listmovie.img}
        alt={listmovie.imgTitle}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {listmovie.desc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         category: {listmovie.genre}
          </Typography>
      </CardContent>
</Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
  
       
          <Typography>
          <iframe  src={listmovie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>

          </Typography>
        </CardContent>
      </Collapse>
    </Card>





        
    </Box>

    </Itemcss>
  
</Grid>
  );
}