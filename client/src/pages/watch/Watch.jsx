import "./watch.css"
import React from 'react'
import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function Watch() {
  const location =useLocation();
    return (

      <div className="watch">
        <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
        </Link>
      <iframe   className="video" width="727" height="409" src={location.state.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           </div>
    );
  }
