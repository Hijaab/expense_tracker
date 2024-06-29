const categories = ["Grocery", "Food", "Travel", "Utility"]; // items can be add or removed
const PI = 3.14;

//shape of object
interface expense {
  description: string;
  category: (typeof categories)[number];
  amount: number;
}

// export default categories;

export {categories, PI}; // to export values
export type {expense}; // to export type
