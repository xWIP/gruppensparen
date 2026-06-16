// Aufgabe 8.4.2 - Client Formular
"use client";

import {useState} from "react";
import {createGoal} from "@/actions";

export default function NewGoalForm(){
    const [title, setTitle] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [currentAmount, setCurrentAmount] = useState("");

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        await createGoal(title, Number(targetAmount), Number(currentAmount), 1);
        setTitle("");
        setTargetAmount("");
        setCurrentAmount("");
    }
  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Sparziel"
        className="w-full border rounded-lg px-4 py-2"
        required
      />
      <input
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        placeholder="Zielbetrag"
        type="number"
        className="w-full border rounded-lg px-4 py-2"
        required
      />
      <input
        value={currentAmount}
        onChange={(e) => setCurrentAmount(e.target.value)}
        placeholder="Aktueller Betrag"
        type="number"
        className="w-full border rounded-lg px-4 py-2"
        required
      />

      <button type="submit" className="bg-accent text-white px-6 py-2 rounded-lg">
        Sparziel hinzufügen
      </button>
    </form>
  );
}