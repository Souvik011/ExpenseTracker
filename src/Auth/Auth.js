import React, { Fragment, useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

const Auth = (props) => {
  const [signup, setSignup] = useState(true);
  const [match, setMatch] = useState(true);
  const [forgotPass, setForgotPass] = useState(false);
  const EmailRef = useRef();
  const PassRef = useRef();
  const ConfirmPassRef = useRef();
  const ForgetEmailRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = EmailRef.current.value
      .replace("@", "")
      .replace(".", "");
    localStorage.setItem("email", enteredEmail);
    console.log(enteredEmail);
    let Obj;
    let link;
    if (EmailRef.current.value === "" || PassRef.current.value === "") {
      alert("Enter All the Fields Required Below");
    } else {
      if (signup) {
        if (ConfirmPassRef.current.value === "") {
          alert("Enter All the Fields Correctly");
        } else {
          if (PassRef.current.value === ConfirmPassRef.current.value) {
            Obj = {
              email: EmailRef.current.value,
              password: PassRef.current.value,
              confirmPassword: ConfirmPassRef.current.value,
              returnSecureToken: true,
            };
            link =
              "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvPELIwxHs3wToSpMlTVeSt03pHvohb7c";
          } else {
            setMatch(true);
            alert("Password isn't Matching");
          }
        }
      } else {
        Obj = {
          email: EmailRef.current.value,
          password: PassRef.current.value,
          returnSecureToken: true,
        };
        link =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvPELIwxHs3wToSpMlTVeSt03pHvohb7c";
      }

      fetch(link, {
        method: "POST",
        body: JSON.stringify(Obj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data.idToken);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    console.log(Obj);
  };
  const ChangeHandler = () => {
    setSignup((prevState) => !prevState);
  };
  const ForgotPassChangeHandler = () => {
    setForgotPass((prevState) => !prevState);
    setSignup(false);
  };
  async function ForgotPasswordHandler(e) {
    e.preventDefault();
    let link =  "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBvPELIwxHs3wToSpMlTVeSt03pHvohb7c" ;
    const email = ForgetEmailRef.current.value;
    const response = await fetch(link , {
        method:"POST" ,
        body: JSON.stringify({
            email: email,
            requestType: "PASSWORD_RESET",
          }),
          headers: {
            "Content-Type": "application/json",
          },
    });
    const data = await response.json();
      if (response.ok) {
        console.log(data.email);
        alert("Check Your Email Address For Reset Mail");
      } else {
        alert("Something Wrong Happened Check Once Again");
      }
    };
  return (
    <Fragment>
      <Card
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          backgroundColor: "aqua",
        }}
      >
        <Card.Header
          style={{
            textAlign: "center",
            fontSize: "30px",
            color: "rgb(159, 77, 170)",
            fontFamily: "fantasy",
            fontWeight: "bold",
          }}
        >
          Welcome To Expense Tracker
        </Card.Header>
        <Card.Body>
          <Card.Text
            style={{
              textAlign: "center",
              borderRadius: "25%",
              fontWeight: "600",
              fontSize: "26px",
              fontFamily: "serif",
              color: "yellowgreen",
              borderBottom: "solid yellow",
              marginLeft: "15rem",
              marginRight: "15rem",
            }}
          >
            Enter Your Details Properly
          </Card.Text>
          {!forgotPass && (
            <Form
              style={{
                margin: "3rem auto 4rem auto",
                marginLeft: "auto",
                marginBottom: "auto",
                height: "40%",
                width: "40%",
                padding: "2rem 1rem 2rem 1rem",
                fontWeight: "bold",
                backgroundColor: "rgb(93, 93, 219)",
                borderRadius: "10%",
              }}
              onSubmit={submitHandler}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "35px",
                  color: "CaptionText",
                  fontWeight: "600",
                  fontFamily: "monospace",
                }}
              >
                {signup ? "Sign Up" : "Log In "}
              </h2>
              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref={EmailRef}
                  placeholder="Enter Email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={PassRef}
                  placeholder="Enter Password"
                />
              </Form.Group>
              {signup && (
                <Form.Group className="mb-3" controlId="ConfirmPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={ConfirmPassRef}
                    placeholder="Enter Your Password Again"
                  />
                  {!match && (
                    <p style={{ color: "red" }}>Password isn't matching</p>
                  )}
                </Form.Group>
              )}
              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "40%", marginRight: "40%" }}
              >
                {signup ? "Sign Up" : "Log In"}
              </Button>
              {signup ?
              (<Button
                variant="outline-info"
                onClick={ChangeHandler}
                style={{
                  marginLeft: "16%",
                  marginRight: "16%",
                  marginTop: "1rem",
                }}
              >
                Already Have An Account ? Log In to Continue
              </Button>) : 
              (<Button
                variant="outline-info"
                onClick={ChangeHandler}
                style={{
                  marginLeft: "16%",
                  marginRight: "16%",
                  marginTop: "1rem",
                }}
              >
                Doesn't Have Any Account ? Sign In to Continue
              </Button>)}
              <Button
                variant="warning"
                onClick={ForgotPassChangeHandler}
                style={{
                  marginLeft: "34%",
                  marginRight: "26%",
                  marginTop: "1rem",
                }}
              >
                Forget Password
              </Button>
            </Form>
          )}
          {forgotPass && (
            <Form
              style={{
                margin: "3rem auto 10rem auto",
                marginLeft: "auto",
                marginBottom: "auto",
                height: "40%",
                width: "40%",
                padding: "2rem 1rem 2rem 1rem",
                fontWeight: "bold",
                backgroundColor: "rgb(93, 93, 219)",
                borderRadius: "10%",
              }}
              onSubmit={ForgotPasswordHandler}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "35px",
                  color: "CaptionText",
                  fontWeight: "600",
                  fontFamily: "monospace",
                }}
              >
                Forget Password
              </h2>
              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref={ForgetEmailRef}
                  placeholder="Enter Email"
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                style={{ marginLeft: "25%", marginRight: "18%" }}
              >
                Send Confirmation Mail
              </Button>
              <Button
                variant="info"
                style={{ marginLeft: "15%", marginRight: "18%" ,marginTop:"1rem"}}
                onClick={ForgotPassChangeHandler}
              >
                Go To LogIn Page Again To Continue
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Auth;
