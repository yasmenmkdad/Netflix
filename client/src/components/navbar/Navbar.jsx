import { ArrowDropDown} from '@mui/icons-material'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState} from 'react'


import { Link ,useNavigate} from 'react-router-dom';

import "./navbar.css"
import { Button } from '@mui/material';


function Navbar({StateChanger,User}) {

    const [isScrolled, setIsScrolled] = useState(false);
   let [searchval, setsearch] = useState();

    const navigate=useNavigate();

        window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
      };
     
useEffect(()=>{

},[searchval])
const searchvalue=(e)=>{
setsearch(e.target.value);
}

  return (
     <div className={isScrolled ? "navbar scrolled" : "navbar"}>
       <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link state={searchval} to={"/home"} className="Link">
          <span>Homepage</span>
          </Link>
          <Link state={searchval}  className="Link" to={"/series"}>
          <span>Series</span>
          </Link>
          <Link state={searchval}  className="Link" to={"/movies"}>
          <span>Movies</span>
          </Link>
         
     
        </div>
        <div className="right">
      

          <Paper
      component="form"
      sx={{height:40,marginRight:10, display: 'flex', alignItems: 'center', width: 300 }}
    >
   
      <InputBase
      
      onChange={searchvalue}
        sx={{  ml: 1, flex: 1 }}
        
        placeholder="Search Movies"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Link  state={searchval}  className="Link"  to={"/search"}>
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      </Link>

    </Paper>



          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>{User["email"]}</span>
              <Button onClick={()=>{StateChanger(false);navigate('/login');}}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
       
        
        </div>
  )
}

export default Navbar;
