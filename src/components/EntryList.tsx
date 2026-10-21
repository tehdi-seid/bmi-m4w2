// import React from 'react'

import type { Entry } from "../types";

import { bmiCategory } from "../lib/Bmi";

function EntryList({
  entries,
  onDelete,
}: {
  entries: Entry[];
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-col mt-5 gap-5">
      {entries.map((entry) => (
        <>
          <li className="flex flex-wrap items-center justify-between gap-4 border-b py-2 px-5 border border-amber-300 rounded-lg">
            <div className="flex gap-4 text-center">
              <p className="font-bold items-center">
                BMI {entry.BMI && entry.BMI.toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {entry.height} cm · {entry.weight} kg
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {entry.BMI && bmiCategory(entry.BMI)} ·{" "}
                {new Date(entry.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              type="button"
              aria-label={`Delete BMI entry ${entry.BMI && entry.BMI.toFixed(2)}`}
              onClick={() => onDelete(entry.id)}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          </li>
        </>
      ))}
    </div>
  );
}

export default EntryList;
