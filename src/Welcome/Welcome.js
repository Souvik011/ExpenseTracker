import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const WelcomePage = () => {
  const idToken = useSelector((state) => state.auth.idToken);
    const verifyEmailHandler = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBvPELIwxHs3wToSpMlTVeSt03pHvohb7c",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
            requestType: "VERIFY_EMAIL",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Verification Email has been send to your email");
        console.log(data.email);
      } else {
        alert(data.error.message);
      }
    };
  return (
    <div>
      <div style={{display:"grid" ,color:"InfoText"}}>
        <h2 style={{textAlign:"center",backgroundColor:"bisque"}}>Welcome To Expense Tracker</h2>
      </div>
      
      <p style={{color:"brown"}}>To verify your e-mail <Button variant="link" style={{marginRight:"50%"}} onClick={verifyEmailHandler}>click here</Button> To complete your Profile <NavLink to="/complete" >Click Here</NavLink>  </p>
      <div style={{ color:"brown", fontFamily:"serif"}}>To ADD Expenses     <NavLink to="/form" style={{marginLeft:"1.5rem"}}>Click Here</NavLink></div>

      <div style={{color:"red",marginTop:"3.5rem",marginBottom:"2rem",fontFamily:"cursive"}}>
        <ol>
            <li>Expense Tracker is made to track your expenses , You can add your expense here and track them .</li>
            <li>To avail the Premium features you have to add expense of minimum $10000 .  </li>
            <li>Premium Subscribers can download there expenses also </li>
        </ol>

      </div>
    </div>
  );
};

export default WelcomePage;
