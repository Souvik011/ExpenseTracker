import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenses: [] ,
    expenseAmount: 0,
    Premium : false
};

const ExpenseSlice = createSlice({
    name : "expense",
    initialState : initialExpenseState ,
    reducers : {
        addExpense: (state, action) => {
            state.expenses = action.payload.itemsArray;
            state.expenseAmount = action.payload.expensesAmount;
        },
        premium (state) {
            state.Premium = true ;
        },
        closepremiun(state) {
            state.Premium = false ;
        }
    }
});

export const ExpenseActions = ExpenseSlice.actions;
export default ExpenseSlice.reducer;