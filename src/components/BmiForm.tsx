// import React from "react";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type SubmitEventHandler,
} from "react";
import { calculateBmi } from "../lib/Bmi";
// import type { Entry } from "../types";

export type BmiFormProp = {
  onSave: (height: number, weight: number) => void;
};
function BmiForm({ onSave }: BmiFormProp) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleHeightInput = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
    console.log(height);
  };
  const handleWeightInput = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);

    console.log(weight);
  };
  const heightM = Number(height) / 100;
  const weightKG = Number(weight);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave(heightM, weightKG);
    setHeight("");
    setWeight("");
  }

  return (
    <form className="flex flex-col min-w-80" onSubmit={(e) => handleSubmit(e)}>
      <label>
        <span>Height (cm):</span>
        <input
          className="border border-amber-500 w-full rounded-xl px-5 py-3 focus:outline-amber-300 mt-2"
          type="number"
          value={height}
          min={50}
          max={250}
          inputMode="decimal"
          onChange={(e) => handleHeightInput(e)}
        />
      </label>
      <label>
        <span>weight (KG):</span>
        <input
          className="border border-amber-500 w-full rounded-xl px-5 py-3 focus:outline-amber-300 mt-2"
          type="number"
          inputMode="decimal"
          min={20}
          max={300}
          value={weight}
          onChange={(e) => handleWeightInput(e)}
        />
      </label>

      <div className="border border-amber-300 rounded-lg mt-5 p-6">
        {calculateBmi(heightM, weightKG) ? (
          <h1 className="text-4xl font-bold">
            BMI:{" "}
            <span className="text-amber-800">
              {calculateBmi(heightM, weightKG)?.toFixed(2)}
            </span>
          </h1>
        ) : (
          <div>
            <p className="text-xl text-gray-700">
              enter your weight and height{" "}
            </p>
          </div>
        )}
      </div>
      <button
        className={`border py-1 border-amber-400 rounded-lg mt-6 bg-amber-600 text-white ${calculateBmi(heightM, weightKG) === null && "opacity-50 hover:bg-amber-600"} cursor-pointer hover:bg-amber-500`}
        disabled={calculateBmi(heightM, weightKG) === null}
        type="submit"
        // onClick={handleSubmit}
      >
        save
      </button>
    </form>
  );
}

export default BmiForm;
