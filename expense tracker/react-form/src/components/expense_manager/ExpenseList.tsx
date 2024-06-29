import {expense} from "./ExpenseTypes";

interface Props {
  expenses: expense[]; // ye wo expense hai jo ExpenseTypes ka interface hai
  removeExpense: (exp: expense) => void;
}

const ExpenseList = ({expenses, removeExpense}: Props) => {
  const handleClick = () => {
    console.log("delete");
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr key={"index"}>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Category</th>
          {/* jis ki basis per filter hosaky */}
          <th scope="col">Amount</th>
          <th scope="col">Action</th>
          {/* for delete edit update */}
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp, index) => {
          return (
            <tr>
              <th>{index + 1}</th>
              <td>{exp.description}</td>
              <td>{exp.category}</td>
              <td>{exp.amount}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => removeExpense(exp)}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={4}>Total Amount: </td>
          <td>
            {expenses.reduce((acc, individualExpenses) => {
              return acc + individualExpenses.amount;
            }, 0)}
            {/* accumulator jis main cheezon ko sum kerwa rha hunga */}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExpenseList;
