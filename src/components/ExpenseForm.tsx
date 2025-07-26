import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";

const expenseSchema = z.object({
  source: z.string().min(1, "Source is required"),
  amount: z.number().min(1, "Amount must be at least 1"),
  date: z.string().min(1, "Date is required"),
});

type ExpenseFormProps = {
  onSubmit: (data: z.infer<typeof expenseSchema>) => void;
};

export default function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(expenseSchema),
  });

  const submitHandler = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <label>
        Expense source
        <input
          type="text"
          placeholder="Type the expense source"
          {...register("source")}
        />
        {errors.source && (
          <span className="error">{errors.source.message}</span>
        )}
      </label>

      <label>
        Amount of expense
        <input
          type="number"
          placeholder="Amount"
          min={1}
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <span className="error">{errors.amount.message}</span>
        )}
      </label>

      <label>
        Date of expense
        <input type="date" {...register("date")} />
        {errors.date && <span className="error">{errors.date.message}</span>}
      </label>

      <Button type="submit" label="Add Expense" />
    </form>
  );
}
