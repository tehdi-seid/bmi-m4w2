import { useState } from "react";
import BmiForm from "./components/BmiForm";
import "./index.css";
import { type Entry } from "./types";
import { calculateBmi } from "./lib/Bmi";
import EntryList from "./components/EntryList";
import GoalTracker from "./components/Prograss";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [bmi, setBmi] = useState(0);

  function addEntries(height: number, weight: number) {
    const entry: Entry = {
      id: crypto.randomUUID(),
      height: height,
      weight: weight,
      BMI: calculateBmi(height, weight),
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [entry, ...prev]);
    setBmi(entry.BMI!);
    console.log(entries);
  }

  function remove(id: string) {
    setEntries((prve) => prve.filter((entry) => entry.id !== id));
  }
  return (
    <div className="mx-auto w-max mt-20">
      <div className="text-center mb-3">
        <h1 className="text-4xl font-bold text-shadow-red-950 text-shadow-sm ">
          BMI Calculator
        </h1>
        <p className="text-xl capitalize">
          enter your value to get your result
        </p>
      </div>
      <div className=" border border-amber-800 py-15 px-10 shadow-amber-700 shadow-sm rounded-3xl flex">
        <BmiForm onSave={addEntries} />
        <GoalTracker currentBmi={bmi} />
      </div>
      <EntryList entries={entries} onDelete={remove} />
    </div>
  );
}
export default App;
