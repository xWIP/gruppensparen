"use client";

import { useEffect, useState } from "react";
import type { SavingGoal } from "@/types/SavingGoal";

type GoalInfoPopupProps = {
  goal: SavingGoal | null;
  onClose: () => void;
};

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

export default function GoalInfoPopup({ goal, onClose }: GoalInfoPopupProps) {
  const [months, setMonths] = useState(12);
  
  useEffect(() => {
    if (goal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [goal]);

  if (!goal) return null;

  const progress = Math.round(
    (goal.currentAmount / goal.targetAmount) * 100
  );
  const colors = progressColor(progress);
  const remaining = Math.max(
    0,
    goal.targetAmount - goal.currentAmount
  );
  const monthlySavings = remaining > 0 && months > 0 ? Math.ceil(remaining / months) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0 pr-2 sm:pr-3">
            <h2 className="text-sm sm:text-base font-semibold text-foreground truncate">
              {goal.title}
            </h2>
            <p className="text-muted text-xs mt-1">
              {goal.category?.name ?? "Keine Kategorie"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0 hover:bg-accent-subtle-strong transition-colors"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
            <span className="text-foreground font-medium">
              {goal.currentAmount.toLocaleString()} €
            </span>
            <span className="text-muted">
              / {goal.targetAmount.toLocaleString()} €
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2 sm:h-2.5 overflow-hidden">
            <div className={`bg-gradient-to-r ${colors.from} ${colors.to} h-2 sm:h-2.5 rounded-full transition-all duration-500 ${colors.shadow}`} style={{ width: `${Math.min(progress, 100)}%` }}/>
          </div>
          <div className="flex justify-between mt-2 sm:mt-3">
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

        <div className="space-y-2 sm:space-y-3">
          <div>
            <label className="block text-xs text-muted font-medium mb-1">
              Zeitrahmen (Monate)
            </label>
            <input
              type="number"
              min="1"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full border border-border bg-surface rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-foreground"
              placeholder="12"
            />
          </div>
          {remaining > 0 && months > 0 && (
            <div className="bg-surface/60 border border-border rounded-xl p-3 sm:p-4">
              <p className="text-xs text-muted font-medium uppercase tracking-wider mb-0.5 sm:mb-1">Monatliche Sparrate</p>
              <p className="text-lg sm:text-2xl font-bold text-accent">{monthlySavings.toLocaleString()} €</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4 sm:mt-5">
          <button
            onClick={onClose}
            className="flex-1 bg-accent text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium hover:bg-accent-light transition"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}