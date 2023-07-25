import React, { Fragment ,useState} from "react";
import { Button, Card, Form } from "react-bootstrap";
import classes from "./ExpenseList.module.css";
import { useSelector,useDispatch } from "react-redux";
import {deleteExpenseFetching,editExpenseFetching} from "../store/ExpenseThunk";

const ExpenseList = (props) => {
    const expense = useSelector((state)=>state.expense.expenses);
    const totalExpenseAmount = useSelector((state)=>state.expense.expenseAmount);
    const isPremium = useSelector((state)=>state.expense.Premium);
    const [edit,setEdit] = useState(null);
    const [downloadExpense,setDownloadExpense] = useState(true);
    
    const email = useSelector((state)=>state.auth.email).replace("@", "").replace(".", "");
    const Dispatch = useDispatch();
    const deleteHandler = (expenseItem) => {
        Dispatch(deleteExpenseFetching(expenseItem.id,email));
    };
    const editHandler = (expenseItem) => {
        setEdit(expenseItem);
    };
    const saveEditHandler = (expenseItem) => {
        setEdit(null);
        Dispatch(editExpenseFetching(expenseItem,email));
    };


    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType });
    
        const a = document.createElement("a");
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
      };
    
      const downloadExpenses = () => {
        if(isPremium) {
          setDownloadExpense(true);
          let headers = ["Date ,Money,Description,Category"];
    
        let usersCsv = expense.reduce((acc, user) => {
          const { date, money, description, category } = user;
          acc.push([date, money, description, category].join(","));
          return acc;
        }, []);
        usersCsv.push(["","","",""].join(","));
        usersCsv.push(["TotalExpense : ",totalExpenseAmount].join(","));
    
        downloadFile({
          data: [...headers, ...usersCsv].join("\n"),
          fileName: "Your Expenses.csv",
          fileType: "text/csv",
        });
        } else {
          setDownloadExpense(false);
        }
        
      };

      
    const showExpense = <ul style={{maxHeight:"15rem",overflowY:"scroll"}} >
        {expense.map((expense) => (
            <li key={expense.id} style={isPremium ?{backgroundColor:"blue",borderBottom:"2px solid red",marginBottom:"1rem",fontFamily:"cursive",borderRadius:"6%"}:{backgroundColor:"blueviolet",borderBottom:"1px solid black",marginBottom:"1rem"}}  >
                <div style={{display:"inline-flex",justifyContent:"space-around",width:"100%"}}>
                <div style={{fontSize:"large",color:"orange",fontWeight:"bold"}}>{expense.date}</div>
              <div style={{fontSize:"small",color:"yellow",fontWeight:"500" ,height:"3rem",width:"5rem",textAlign:"left",marginRight:"1rem"}}>{expense.description} </div>
              <div style={{fontSize:"large",fontWeight:"700",marginRight:"1rem"}}>{expense.category}</div>
              <div style={{fontSize:"large",color:"red",fontWeight:"bold",marginLeft:"1rem",marginRight:"1rem"}}>$ {expense.money}</div>    
              </div>
              <Button variant="danger" style={{marginLeft:"7rem"}} onClick={() => deleteHandler(expense)}>
                Delete Expense
              </Button>
              <Button variant="info" style={{marginLeft:"3rem"}} onClick={() => editHandler(expense)}>
                Edit Expense
              </Button>
            </li>
          ))}
    </ul>
        return (<Fragment>
            {!edit && (<Card className={classes.modal}>
                <Card.Header className={isPremium?classes.headerPremium:classes.header}> Expenses</Card.Header>
                <Card.Body>
                    <Card.Title className={isPremium?classes.titlePremium:classes.title}>
                        <h6>Date</h6>
                        <h6>Content</h6>
                        <h6>Description</h6>
                        <h6>Money</h6>
                    </Card.Title>
                    {showExpense}
                </Card.Body>
                <Card.Footer className={isPremium ?classes.footerPremium:classes.footer}>Total Amount : <p className={isPremium ? classes.pPremium:classes.p}>$ {totalExpenseAmount}</p>  <Button variant="info" onClick={downloadExpenses}>Download Expenses</Button></Card.Footer>
                {!downloadExpense && <p style={{color:"red",fontFamily:"initial"}}>Only Premium Subscriber's Can Download there Expense Details</p>}
                
            </Card>)}
            {edit && (
                <div className={classes.editExpense}>
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  const updatedExpense = {
                    ...edit,
                    date:e.target.date.value,
                    description: e.target.description.value,
                    category: e.target.category.value,
                    money: e.target.money.value,
                  };
                  saveEditHandler(updatedExpense);
                }}>
                    <label>
                    Date:
                    <input type="date" name="date" defaultValue={edit.date} />
                  </label>
                  <label>
                    Description:
                    <input type="text" name="description" defaultValue={edit.description} />
                  </label>
                  <label>
                    Category:
                   
                    <select name="category" defaultValue={edit.category} >
                  <option value="Food">Food</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Travel">Travel</option> 
                  <option value="Other">Other</option>
                </select>
                  </label>
                  <label>
                    Amount:
                    <input type="number" name="money" defaultValue={edit.money} />
                  </label>
                  <Button type="submit" variant="outline-success" style={{marginRight:"1.5rem"}}>Save</Button>
                  <Button variant="outline-danger" onClick={() => setEdit(null)}>Cancel</Button>
                </Form>
                
              </div>
            )}
        </Fragment>);
};
export default ExpenseList;