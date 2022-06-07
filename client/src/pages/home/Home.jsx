
import React, { useEffect, useState } from 'react'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import {v4 as uuid} from 'uuid'
import Navbar from '../../components/navbar/Navbar'

import "./home.css"
import { useLocation } from 'react-router-dom'



function Home({type,stateChanger,Token,User}) {
  let [list,setLists]=useState();
  let [genre,setgenre]=useState();
  let [searchval,setsearch]=useState();

  const location =useLocation();
  
  useEffect(() => {


      try {
        console.log(location)
       fetch(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              `Bearer ${Token}`
            },
          }
      
        ).then((res)=>(res.json())).then((data)=>{
      setLists(data)}).catch((err)=>{console.log(err)});
      } catch (err) {
        console.log(err);
      }

  }, [type,genre,Token,location.state]);
 
  return (
    <div className="home">
        <Navbar StateChanger={stateChanger} User={User}/>

        
        <Featured type={type} Token={Token} />

       {list&& list.map((list)=>(
        <List state={searchval}  key={uuid()} list={list}/>

       ))}
        </div>
  )
}

export default Home
