import { useState } from "react";

type GoalTrackerProps = {
  currentBmi: number | null;
};

export default function GoalTracker({ currentBmi }: GoalTrackerProps) {
  const [goalInput, setGoalInput] = useState("22");

  const goal = Number(goalInput);
  //   const validGoal =
  //     goalInput.trim() !== "" &&
  //     Number.isFinite(goal) &&
  //     goal >= 10 &&
  //     goal <= 60;

  const difference = currentBmi ? currentBmi - goal : null;

  // A proximity indicator, not a measure of health improvement.
  const match =
    difference !== null
      ? Math.max(0, 100 - (Math.abs(difference) / goal) * 100)
      : null;

  return (
    <section className="rounded-2xl border border-amber-300 bg-white p-6 ml-6">
      <h2 className="text-xl font-bold text-slate-900">BMI goal</h2>
      <p className="mt-1 text-sm text-slate-500">
        Set a target to compare it with your current BMI.
      </p>

      <label
        htmlFor="bmi-goal"
        className="mb-2 mt-5 block text-sm font-medium text-slate-700"
      >
        Target BMI
      </label>

      <input
        id="bmi-goal"
        name="bmi-goal"
        type="number"
        inputMode="decimal"
        min="10"
        max="60"
        step="any"
        required
        value={goalInput}
        onChange={(event) => setGoalInput(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      {!currentBmi ? (
        <p className="mt-3 text-sm text-red-700">
          Enter a target between 10 and 60.
        </p>
      ) : currentBmi === null ? (
        <p className="mt-3 text-sm text-slate-500">
          Enter your height and weight to compare your BMI with your goal.
        </p>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-slate-600">Difference from goal</span>
            <strong className="text-slate-900">
              {difference! > 0 ? "+" : ""}
              {difference !== null && difference!.toFixed(2)}
            </strong>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-600">Goal match</span>
              <strong>{match && match!.toFixed(0)}%</strong>
            </div>
            <div
              role="progressbar"
              aria-label="BMI goal match"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(match!)}
              className="h-3 overflow-hidden rounded-full bg-slate-100"
            >
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${match}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              This shows numerical closeness to your target, not health
              progress.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
