// import React from "react";
import {useState} from "react";
import ExpenseList from "./components/expense_manager/ExpenseList.tsx";
import {expense} from "./components/expense_manager/ExpenseTypes.ts";
import ExpenseFilter from "./components/expense_manager/ExpenseFilter.tsx";
import ExpenxeForm from "./components/expense_manager/ExpenxeForm.tsx";

const default_expenses = [
  {description: "bread", category: "Grocery", amount: 80},
  {description: "Dinner", category: "Food", amount: 3000},
  {description: "Tour", category: "Travel", amount: 500000},
  {description: "mobile", category: "Utility", amount: 67000},
];

const App = () => {
  const [expensesState, setExpenses] = useState(default_expenses);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const visibleExpenses =
    selectedCategory === "all"
      ? expensesState
      : expensesState.filter(
          (expense) => expense.category === selectedCategory
        );
  const handleRemove = (selectedFilterExpense: expense) => {
    setExpenses(
      expensesState.filter(
        (expense) =>
          !(
            // agr ye not nhi lagayen gy to jis per click keren gy wohi filter ho jaye ga, or wohi bachy ga, baki sab remove ho jain gy
            (
              expense.amount == selectedFilterExpense.amount &&
              expense.description == selectedFilterExpense.description
            )
          )
      )
    );
  };

  return (
    <>
      <div className="container">
        <h2>
          <b>Expense Tracker</b>
          <hr />
        </h2>

        <h4>Form Component</h4>
        <hr />
        <ExpenxeForm
          onExpenseAdd={(values) => {
            setExpenses([...expensesState, values]);
          }}
        />
        <h4>Filter Component</h4>
        <ExpenseFilter
          handleSelection={(selectedCategory) => {
            setSelectedCategory(selectedCategory);
          }}
        />
        <hr />
        <h4>List Component</h4>
        <hr />
        <ExpenseList expenses={visibleExpenses} removeExpense={handleRemove} />
      </div>
    </>
  );
};

export default App;
