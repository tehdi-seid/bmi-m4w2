export function calculateBmi(height: number, weight: number) {
  const BMI: number | null =
    height > 0 && weight > 0 ? weight / (height * height) : null;
  return BMI;
}

export type BmiCategory =
  | "Underweight"
  | "Normal weight"
  | "Overweight"
  | "Obesity";

export function bmiCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";

  return "Obesity";
}
