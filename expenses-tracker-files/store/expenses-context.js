import { createContext, useReducer } from "react";
import { DUMMY_EXPENSES } from "../constants/dummy-data";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString;
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const index = state.findIndex((item) => item.id === action.payload.id);
      let updatedState = [...state];
      updatedState[index] = { ...updatedState[index], ...action.payload.data };
      return updatedState;
    case "DELETE":
        return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseDate) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseDate } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export default ExpensesContextProvider;
