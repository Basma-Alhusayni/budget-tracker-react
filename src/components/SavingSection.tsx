import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";

const targetSchema = z.object({
  target: z.number().min(1, "Target must be at least 1"),
});

type SavingSectionProps = {
  target: number;
  setTarget: (value: number) => void;
  saving: number;
  balance: number;
  progress: number;
  onTransfer: (amount: number) => void;
};

export default function SavingSection({
  target,
  setTarget,
  saving,
  balance,
  progress,
  onTransfer,
}: SavingSectionProps) {
  const [transferAmount, setTransferAmount] = useState<number | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(targetSchema),
    defaultValues: { target },
  });

  const onSubmit = (data: { target: number }) => {
    setTarget(data.target);
  };

  const handleReset = () => {
    setTarget(0);
    reset({ target: 0 });
  };

  const handleTransferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTransferAmount(value === "" ? "" : Math.max(0, Number(value)));
  };

  const handleTransferSubmit = () => {
    if (
      transferAmount !== "" &&
      transferAmount > 0 &&
      transferAmount <= balance
    ) {
      onTransfer(transferAmount);
      setTransferAmount("");
    }
  };

  return (
    <section className="saving-section">
      <form onSubmit={handleSubmit(onSubmit)} className="target-form">
        <label>
          Set target
          <input
            type="number"
            min="1"
            {...register("target", { valueAsNumber: true })}
          />
          {errors.target && (
            <span className="error">{errors.target.message}</span>
          )}
        </label>
        <div className="button-group">
          <Button type="submit" label="Set Target" />
          <Button
            type="button"
            label="Reset"
            onClick={handleReset}
            style={{ backgroundColor: "#e74c3c" }}
          />
        </div>
      </form>

      <div className="saving-info">
        <p>Current saving: {saving.toLocaleString()} EUR</p>
        <p>Target: {target.toLocaleString()} EUR</p>
        <p>Progress: {progress.toFixed(2)}%</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}>
            {progress > 15 ? `${progress.toFixed(2)}%` : ""}
          </div>
        </div>
      </div>

      <div className="balance-section expanded-balance">
        <div className="balance-info">
          <p className="balance-amount">
            Current balance: {balance.toLocaleString()} EUR
          </p>
          <div className="transfer-section">
            <input
              type="number"
              min="0"
              max={balance}
              value={transferAmount}
              onChange={handleTransferChange}
              placeholder="Transfer amount"
              className="transfer-input"
            />
            <Button
              label="Transfer to Savings"
              onClick={handleTransferSubmit}
              disabled={
                !transferAmount ||
                transferAmount <= 0 ||
                transferAmount > balance
              }
              className="transfer-button"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
