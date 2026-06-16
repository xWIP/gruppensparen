"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import GoalInfoPopup from "./GoalInfoPopup";
import type { SavingGoal } from "@/types/SavingGoal";
import Link from "next/link";
import { deleteGoal, updateGoal, createGoal } from "@/actions";

type GoalsClientProps = {goals: SavingGoal[];};

function progressColor(progress: number) {
  if (progress >= 100)
    return {
      from: "from-accent-400",
      to: "to-accent-300",
      shadow: "shadow-[0_0_12px_rgba(196,181,253,0.45)]",
    };
  if (progress >= 60)
    return {
      from: "from-accent-500",
      to: "to-accent-400",
      shadow: "shadow-[0_0_10px_rgba(167,139,250,0.4)]",
    };
  if (progress >= 25)
    return {
      from: "from-accent-600",
      to: "to-accent-500",
      shadow: "shadow-[0_0_8px_rgba(139,92,246,0.35)]",
    };

  return {
    from: "from-accent-700",
    to: "to-accent-600",
    shadow: "shadow-[0_0_6px_rgba(124,58,237,0.3)]",
  };
}
// Aufgabe 8.4.3 - Löschen und Editieren 
export default function GoalsClient({ goals }: GoalsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTargetAmount, setEditTargetAmount] = useState("");
  const [editCurrentAmount, setEditCurrentAmount] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTargetAmount, setNewTargetAmount] = useState("");
  const [newCurrentAmount, setNewCurrentAmount] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");

  const [selectedGoal, setSelectedGoal] = useState<SavingGoal | null>(null);

  const filteredGoals = goals.filter((goal) => goal.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function startEdit(goal: SavingGoal) {
    setEditingId(goal.id);
    setEditTitle(goal.title);
    setEditTargetAmount(String(goal.targetAmount));
    setEditCurrentAmount(String(goal.currentAmount));
  }

  async function handleCreateGoal(e: React.FormEvent) {
    e.preventDefault();
    await createGoal(newTitle, Number(newTargetAmount), Number(newCurrentAmount), Number(newCategoryId));
    setShowForm(false);
    setNewTitle("");
    setNewTargetAmount("");
    setNewCurrentAmount("");
    setNewCategoryId("");
  }

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-light transition flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Neues Sparziel
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreateGoal} className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted font-medium mb-1.5">Titel</label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-foreground"
                placeholder="z.B. Urlaub"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-muted font-medium mb-1.5">Kategorie</label>
              <select
                value={newCategoryId}
                onChange={(e) => setNewCategoryId(e.target.value)}
                className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-foreground"
                required
              >
                <option value="">Bitte wählen...</option>
                <option value="1">Reise</option>
                <option value="2">Technik</option>
                <option value="3">Notfall</option>
                <option value="4">Will haben</option>
                <option value="5">Freizeit</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted font-medium mb-1.5">Zielbetrag (€)</label>
              <input
                type="number"
                value={newTargetAmount}
                onChange={(e) => setNewTargetAmount(e.target.value)}
                className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-foreground"
                placeholder="1000"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-muted font-medium mb-1.5">Aktuell gespart (€)</label>
              <input
                type="number"
                value={newCurrentAmount}
                onChange={(e) => setNewCurrentAmount(e.target.value)}
                className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-foreground"
                placeholder="0"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-700 transition">
              Erstellen
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-600 transition">
              Abbrechen
            </button>
          </div>
        </form>
      )}
      {filteredGoals.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted text-sm">Keine Sparziele gefunden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredGoals.map((goal) => {
            const progress = Math.round(
              (goal.currentAmount / goal.targetAmount) * 100
            );
            const colors = progressColor(progress);
            const remaining = Math.max(
              0,
              goal.targetAmount - goal.currentAmount
            );

            return (
              <div
                key={goal.id}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:border-accent-border hover:bg-card-hover transition-all duration-200 h-full flex flex-col"
              >
                {editingId === goal.id ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await updateGoal(goal.id, editTitle, Number(editTargetAmount), Number(editCurrentAmount));
                      setEditingId(null);
                    }}
                    className="space-y-3"
                  >
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-foreground"
                      placeholder="Titel"
                      required
                    />
                    <input
                      type="number"
                      value={editTargetAmount}
                      onChange={(e) => setEditTargetAmount(e.target.value)}
                      className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-foreground"
                      placeholder="Zielbetrag"
                      required
                    />
                    <input
                      type="number"
                      value={editCurrentAmount}
                      onChange={(e) => setEditCurrentAmount(e.target.value)}
                      className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-foreground"
                      placeholder="Aktuell gespart"
                      required
                    />
                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-700 transition">
                        Speichern
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="bg-gray-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-600 transition">
                        Abbrechen
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0 pr-3">
                        <h2 className="text-base font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                          {goal.title}
                        </h2>
                        <p className="text-muted text-xs mt-1">
                          {goal.category?.name ?? "Keine Kategorie"}
                        </p>
                      </div>

<div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0 group-hover:bg-accent-subtle-strong transition-colors cursor-pointer"
                       onClick={() => setSelectedGoal(goal)}>
                         <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                         </svg>
                       </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">
                          {goal.currentAmount.toLocaleString()} €
                        </span>
                        <span className="text-muted">
                          / {goal.targetAmount.toLocaleString()} €
                        </span>
                      </div>
                      <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden">
                        <div className={`bg-gradient-to-r ${colors.from} ${colors.to} h-2.5 rounded-full transition-all duration-500 ${colors.shadow}`} style={{ width: `${Math.min(progress, 100)}%` }}/>
                      </div>
                      <div className="flex justify-between mt-3">
                        <span className="text-xs text-accent font-medium">
                          {progress}% erreicht
                        </span>
                        {remaining > 0 && (
                          <span className="text-xs text-muted">
                            {remaining.toLocaleString()} € übrig
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-5">
                      <Link href={`/goals/${goal.id}`} className="bg-accent text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-accent-light transition">
                        Details
                      </Link>
                      <button type="button" onClick={() => startEdit(goal)} className="bg-accent-subtle-strong text-accent px-3 py-2 rounded-lg text-xs font-medium hover:bg-accent-border hover:text-white transition">
                        Bearbeiten
                      </button>
                      <button type="button" onClick={async () => {await deleteGoal(goal.id);}} className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-500 hover:text-white transition">
                        Löschen
                      </button>
                    </div>
                  </>
                )}
</div>
        );
            })}
          </div>
        )}
        <GoalInfoPopup goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
      </>
    );
}