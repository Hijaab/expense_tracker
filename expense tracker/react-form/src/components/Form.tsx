// using zod library to validate the form, and not appying in the middle of the form
import {zodResolver} from "@hookform/resolvers/zod/dist/zod.js"; // to link the react-hook-form with zod schema object
import {FieldValues, useForm} from "react-hook-form";
import {z} from "zod";

// zod schema object
const schema = z.object({
  name: z
    .string()
    .min(3, "Please enter a string more than 3 characters")
    .max(10)
    .startsWith("a", "Use a in start"), //isEmail, isUrl, etc.
  age: z.number({invalid_type_error: "Please enter a number"}).min(18),
});

type formData = z.infer<typeof schema>;
// schema ko use kerty huye formdata main name and age ki values agai hai
// extra interface banany ki zarorat nhi hoti zod khud povide kerta hai interface formData
// interface and type both define shapes, zod type ka use karty hain
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<formData>({resolver: zodResolver(schema)}); // using the zod resolver
  // using formData interface for autocomplete option

  const submitHandler = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="container py-5">
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name:
          </label>
          <input
            id="Name"
            type="text"
            className="form-control"
            {...register("name")} //register provides values, ref, onchange, onBlur, etc. functions
          />
          {/* {valueAsNumber: true} shows error if the value is not a number */}
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="Age" className="form-label">
            Age:
          </label>
          <input
            id="Age"
            type="number"
            className="form-control"
            {...register("age", {valueAsNumber: true})}
          />
          {errors.age && <p className="text-danger">{errors.age.message}</p>}
        </div>

        <button className="btn-primary btn" type="submit" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
