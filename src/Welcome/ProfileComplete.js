import React, {  useRef, useEffect, useState } from "react";
import { useSelector  } from "react-redux";
import classes from "./ProfileComplete.module.css";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProfileComplete = () => {
  const fullNameRef = useRef("");
  const photoRef = useRef("");
  const [displayNameValue, setDisplayNameValue] = useState("");
  const [photoUrlValue, setPhotoUrlValue] = useState("");

  const idToken = useSelector((state) => state.auth.idToken);

  const updateDetailsHandler = async (event) => {
    event.preventDefault();

    const fullName = fullNameRef.current.value;
    const photoUrl = photoRef.current.value;
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBvPELIwxHs3wToSpMlTVeSt03pHvohb7c",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: fullName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(data);

      fullNameRef.current.value = "";
      photoRef.current.value = "";
    } else {
      alert(data.error.message);
    }
  };

  useEffect(() => {
    const fillInputsHandler = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDICIhykIkqE7MfZMMbKHGVp7G1EQVAeK4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDisplayNameValue(data.users[0].displayName);
        setPhotoUrlValue(data.users[0].photoUrl);
      } else {
        alert(data.error.message);
      }
    };
    fillInputsHandler();
  }, [idToken]);

  return (
    <React.Fragment>
    <Form  onSubmit={updateDetailsHandler} className={classes.IncompleteProfile} >
      <h3>Contact Details</h3>
      <div>
        <label>Update Your Profile Name</label>
        <input
          placeholder="Full Name"
          input="text"
          ref={fullNameRef}
          defaultValue={displayNameValue}
        />
        <label>Update Your Photo</label>
        <input
          placeholder="Profile Photo URL"
          input="text"
          ref={photoRef}
          defaultValue={photoUrlValue}
        />
      </div>
      <button>Update Details</button>
    </Form>

    <div style={{ color:"brown", fontFamily:"serif",marginRight:"auto",marginLeft:"35%"}}>To ADD Expenses     <NavLink to="/form" style={{marginLeft:"1.5rem"}}>Click Here</NavLink></div>
  </React.Fragment>
  );
};

export default ProfileComplete;
