import { Fragment } from "react";
import './App.css';
import NavBar from "./Header/NavBar";
import ExpenseForm from "./Header/ExpenseForm";
import ExpenseList from "./Header/ExpenseList";
import Auth from "./Auth/Auth";
import Error from "./Header/Error";
import WelcomePage from "./Welcome/Welcome";
import ProfileComplete from "./Welcome/ProfileComplete";
import { Route,Routes } from "react-router-dom";
import { useSelector } from "react-redux";


function App() {
  const islogin = useSelector((state)=>state.auth.isLoggedIn);
  const isPremium = useSelector((state)=>state.expense.Premium);
  return (<Fragment>
    <div className={isPremium ? "body" : ""}>
    {islogin && <NavBar /> }
    <Routes>
      {islogin ? (<Route path="/" element={<WelcomePage />} />) : (<Route path="/" element={< Auth/>} />)}
      {islogin ? <Route path="/auth" element={<ExpenseForm />} /> : <Route path="/auth" element={<Auth />} /> }
      {islogin ? <Route path="/complete" element={<ProfileComplete />}/> : <Route path="/complete" element={<Error />}/>}
      {islogin ? <Route path="/form" element={<ExpenseForm />}/> : <Route path="/form" element={<Error />}/>}
      {islogin ? <Route path="/expense" element={<ExpenseList />}/> : <Route path="/expense" element={<Error />}/>}
    </Routes>
    </div>
  </Fragment>);
}

export default App;
