import React, { Fragment ,useEffect,useRef, useState} from "react";
import { Button, Form , Row , Col } from "react-bootstrap";
import classes from './ExpenseForm.module.css';
import { addExpenseFetching,getExpenseFetching } from "../store/ExpenseThunk";
import { useDispatch, useSelector } from "react-redux";

const ExpenseForm = (props) => {
    const [theme,setTheme] = useState(classes.content);
    const [addedItem,setAddedItem] = useState(null);
    const isPremium = useSelector((state)=>state.expense.Premium);
    const dateRef = useRef();
    const moneyRef = useRef();
    const descRef = useRef();
    const categoryRef = useRef();
    const email = useSelector((state)=>state.auth.email).replace("@", "").replace(".", "");
    const Dispatch = useDispatch();

    let Obj;
    const submitHandler = (e) => {
        e.preventDefault();
        if(dateRef.current.value === "" || moneyRef.current.value === "" || descRef.current.value === "" || categoryRef.current.value === ""){
            setTheme(classes.alert);
            console.log("setting the theme red");
        } else {
            setTheme(classes.content);
            Obj = {date:dateRef.current.value,
                money:moneyRef.current.value,
                description:descRef.current.value,
                category: categoryRef.current.value
            };
            setAddedItem(Obj);
            Dispatch(addExpenseFetching(Obj,email));
        }
        
    };
    useEffect(()=>{
        Dispatch(getExpenseFetching(email));
    },[email,Dispatch])

    return (<Fragment>
        <Form onSubmit={submitHandler} className={isPremium?classes.formPremium:classes.form}>
            <Form.Group as={Row} className="mb-3" controlId="money">
                <Form.Label column sm={2} className={classes.level}>Date:</Form.Label>
                <Col sm={8} className={theme}>
                <Form.Control
                type="date"
                ref={dateRef}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="money">
                <Form.Label column sm={2} className={classes.level}>MoneySpent:</Form.Label>
                <Col sm={8} className={theme}>
                <Form.Control
                type="number"
                placeholder="Money Spent"
                ref={moneyRef}
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Description">
                <Form.Label column sm={2} className={classes.level}>Description:</Form.Label>
                <Col sm={8} className={theme}>
                <Form.Control 
                type="text"
                placeholder="Description"
                ref={descRef}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Category">
                <Form.Label column sm={2} className={classes.level}>Category:</Form.Label>
                <Col sm={8} className={theme}>
                <Form.Select ref={categoryRef} >
                    <option >Choose The Option Below</option>
                    <option value="Food">Food</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Travel">Travel</option> 
                    <option value="Other">Other</option>
                </Form.Select>
                </Col>
            </Form.Group>
            <Button type="submit" variant="success">Add Expense</Button>
        </Form>
        {addedItem && (<div style={{display:"grid",justifyContent:"center",marginTop:"2rem"}}>
            <p style={{color:"palegreen"}}>New Item Added  </p>
            <p style={{color:"peachpuff"}}>Date  : {addedItem.date}   ,   Description : {addedItem.description}   ,   Category : {addedItem.category}   ,   MoneySpent : {addedItem.money }</p>
        </div>)}
    </Fragment>);
};

export default ExpenseForm;