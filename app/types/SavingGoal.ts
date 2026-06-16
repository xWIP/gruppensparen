/*export type SavingGoal = {
    id: number;
    title: string;
    targetAmount: number;
    currentAmount: number;
    category: "Reise" | "Notfall" | "Freizeit" | "Will haben" | "Technik";
}*/

export type SavingGoal = {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  categoryId: number;
  category: {id: number; name: string;};
};