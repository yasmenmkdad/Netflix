import { useRef } from "react";
import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import "./register.css";

export default function Register({stateChanger}) {
  const [_email, setEmail] = useState("");
  const navigate=useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = () => {
    const data = {email:_email,password:passwordRef.current.value};
    const myRequest = new Request('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },  
        body:JSON.stringify(data),
      });
      try{
       
         fetch(myRequest)
         .then(()=>{stateChanger(true);})
         .then((data)=>navigate('/login'))
        .catch((err)=>console.log("error"+ err))
      }
      catch(err){
        console.log(err)
      }
   
    
  }
  
  return (
   
  
    <div className="register ">
     <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
         
         <NavLink to={`/login`} className="loginButton">Sign In</NavLink>
        
     </div>
     </div>
     <div className="container">
     
       <h1>Unlimited movies, TV shows, and more.</h1>
       <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
         </p>
      {!_email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
           </button>
          </div>
       ) : (
           <div className="input">
            <input type="password" placeholder="password" ref={passwordRef} />
             <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
           </div>
         )}  
      </div>  
    </div> 
  );
}
