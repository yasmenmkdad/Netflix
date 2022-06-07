import React, { useEffect, useState } from 'react'

import "./featured.css"

import {  PlayArrow } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderColor:"white"
    },
  },
};

const names = [
  'adventure',
  'crime',
  'comedy',
  'fantasy',
  'historical',
  'horror',
  'romance',
  'thriller',
  'drama',
  'animation',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
        
  };
}


function Featured({type,Token}) {
  let [content,setcontent]=useState([])
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(()=>{
    console.log(type)
    try{
      fetch(`movies/random/${type?"?type="+type:""}`,{
        
          headers: {
            token:
            `Bearer ${Token}`
          },
        
      }).then((respose)=>(respose.json()))
      .then((data)=>{setcontent(data[0])}).catch((err)=>{console.log(err)})
    }
    catch(err){
      console.log(err)
    }
  },[type,Token])
  return (
    <div className="featured">
      {type &&(


<div className="category">


<span>{type === "movie" ? "Movies" : "Series"}</span>






<div>
      <FormControl style={{backgroundColor:"white" }} sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
        <Select
          style={{borderColor:"white" ,color:"white"}}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <Link className="Link" state={name} to={"/category"} >
            <MenuItem 
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
            </Link>
          ))}
        </Select>
      </FormControl>
    </div>








          {/* <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select> */}
</div>

      )}
        
        <img 
      
            src={content.img}   alt=""/>

<div className="info">
        {/* <img
          src={content.img}        alt=""
        /> */}
        <span className="desc">
        {content.desc}  
        </span>

        <div className="buttons">
          <Link className='Link' state={content} to={"/watch"}>
        <button className="play">

          <PlayArrow/>
          <span>play</span>
        </button>
        </Link>
      






        </div>
        </div>
        
        
        </div>
  )
}

export default Featured
