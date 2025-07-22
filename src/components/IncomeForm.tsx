import Button from "./Button";
type Props = {
  handleAddSource: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  source: string;
  amount: number;
  date: string;
};

export default function IncomeForm({
  handleAddSource,
  handleAddAmount,
  handleAddDate,
  handleSubmit,
  source,
  amount,
  date,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Income source
        <input
          type="text"
          placeholder="Type the income source"
          value={source}
          onChange={handleAddSource}
          required
        />
      </label>

      <label>
        Amount of income
        <input
          type="number"
          placeholder="Amount"
          min={1}
          value={amount}
          onChange={handleAddAmount}
          required
        />
      </label>

      <label>
        Date of income
        <input type="date" value={date} onChange={handleAddDate} required />
      </label>

      <Button type="submit" label="Add Income" />
    </form>
  );
}
