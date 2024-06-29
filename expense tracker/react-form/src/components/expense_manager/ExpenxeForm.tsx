import {z} from "zod";
import {categories, expense} from "./ExpenseTypes";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod.js";

const schema = z.object({
  description: z
    .string()
    .min(3, "Please enter the description more than 3 characters")
    .max(100),
  category: z.enum(categories as [string, ...string[]], {
    errorMap: () => ({message: "Please select a category"}),
  }),
  amount: z
    .number({invalid_type_error: "Please enter the Amount"})
    .gte(1, {message: "Amount should be greater than 1"})
    .lte(1000000, "Please enter a number between 1 and 1000000"),
});

interface Props {
  onExpenseAdd: (values: expense) => void;
}

const ExpenseForm = ({onExpenseAdd}: Props) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<expense>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (values: expense) => {
    onExpenseAdd(values);
  };

  return (
    <form className="pb-5" onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-3">
        <label htmlFor="description" className="label-control">
          Description:
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description?.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="label-control">
          Category:
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-control"
        >
          <option value=""> Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category?.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="label-control">
          Amount:
        </label>
        <input
          {...register("amount", {valueAsNumber: true})}
          id="amount"
          type="text"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount?.message}</p>
        )}
      </div>

      <button className="btn btn-primary">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
