import {categories} from "./ExpenseTypes";

interface Props {
  handleSelection: (selectedOption: string) => void;
}

const ExpenseFilter = ({handleSelection}: Props) => {
  return (
    <div className="mb-5">
      {/* label.label-control+select.form */}
      <label htmlFor="select" className="label-control">
        Select Category
      </label>
      <select
        id="select"
        className="form-control"
        onChange={(e) => {
          handleSelection(e.target.value);
        }}
      >
        <option value="all">View All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
