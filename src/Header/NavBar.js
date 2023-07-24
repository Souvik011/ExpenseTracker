import React, { Fragment , useState} from "react";
import { Button, Nav } from "react-bootstrap";
import classes from './NavBar.module.css';
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { AuthAction } from "../store/AuthSlice";
import { ExpenseActions } from "../store/ExpenseSlice";

const NavBar = (props) => {
    const Dispatch = useDispatch();
    const Navigate = useNavigate();
    const [active,setActive] = useState(false);
    const totalExpenseAmount = useSelector((state)=>state.expense.expenseAmount);
    const isPremium = useSelector((state)=>state.expense.Premium);
    const PremiumHandler = () => {
        if(totalExpenseAmount >= 10000){
            console.log(totalExpenseAmount);
            Dispatch(ExpenseActions.premium());
            alert("You Have Subscribed Premium Features");
        } else {
            setActive(true);
        }
    };
    const ClosePremiumHandler = () => {
        Dispatch(ExpenseActions.closepremiun());
        alert("You Have Unsubscribed Premium Features");
    };
    const okHandler = () => {
        setActive(false);
    };
    const LogOutHandler = () => {
        Dispatch(AuthAction.logout());
        Navigate("/");
    };
    return (<Fragment>
        <Nav className={isPremium ? classes.ordPremium : classes.ord } >
            <h1>Expense Tracker</h1>
            <div> 
            <Link to="/form" ><Button>Add Expenses</Button></Link>
            <Link to="/expense" ><Button>Expense Details</Button></Link>
            {!isPremium ? (<Button onClick={PremiumHandler}>Premium Features</Button>):(<Button onClick={ClosePremiumHandler}>Close Premium</Button>)}
            <Button variant="danger" onClick={LogOutHandler}>Log Out</Button>
            </div>
        </Nav>
       {active && <p className={classes.htext}>Premium Mode need Expenses More Then $10000. To activate Premium Mode You Need To Add More Expenses <Button style={{height:"1.5rem",width:"3rem",fontSize:"small",textAlign:"start"}} onClick={okHandler}>Ok</Button></p>} 
    </Fragment>);
};

export default NavBar;