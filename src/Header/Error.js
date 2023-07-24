import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import { NavLink } from 'react-router-dom';




const Error = () => {
    return <Fragment>
        <Card style={{height:"100%",width:"100%"}}>
            <Card.Header style={{margin:"1rem 5rem 3rem 2rem",padding:"2rem"}}><marquee><h2 style={{color:"brown",fontWeight:"bold",fontStyle:"italic"}}>You Have Encountered An "Error!!"</h2></marquee></Card.Header>
            <Card.Body style={{height:"70%",width:"70%",marginTop:"3rem",marginBottom:"2rem"}}>
                <Card.Title style={{marginBottom:"3.5rem",fontSize:"1rem"}}>
                    <h4>Something Went Wrong .....</h4>
                </Card.Title>
                <Card.Text style={{marginBottom:"3.5rem",fontSize:"1rem"}}>
                    Please Check Your Activity ,Maya be You Haven't Log In Into Your Account 
                </Card.Text>
                <Card.Text style={{marginBottom:"3.5rem",fontSize:"1rem"}}>
                    To Log In Into Your Account <NavLink to="/auth">Click Here</NavLink>
                </Card.Text>
                <Card.Text style={{marginBottom:"3.5rem",fontSize:"1rem"}}>
                    If you have linked in already then check your Internet Connection ....
                </Card.Text>
                
            </Card.Body>
        </Card>
    </Fragment>
};

export default Error;