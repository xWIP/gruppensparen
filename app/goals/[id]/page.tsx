// Aufgabe 7.5 - dynamische Routen
"use client";

import { useState, useEffect } from "react";
import type { SavingGoal } from "@/types/SavingGoal";
import Link from "next/link";
import { useParams } from "next/navigation";

function progressColor(progress: number) {
  if (progress >= 100) return { bar: "bg-accent-300", text: "text-accent-300", from: "from-accent-400", to: "to-accent-300", shadow: "shadow-[0_0_12px_rgba(196,181,253,0.5)]", badge: "bg-accent-subtle-strong text-accent-300 border-accent-border" };
  if (progress >= 60)  return { bar: "bg-accent-400", text: "text-accent-400", from: "from-accent-500", to: "to-accent-400", shadow: "shadow-[0_0_10px_rgba(167,139,250,0.45)]", badge: "bg-accent-subtle-strong text-accent-400 border-accent-border" };
  if (progress >= 25)  return { bar: "bg-accent-500", text: "text-accent-500", from: "from-accent-600", to: "to-accent-500", shadow: "shadow-[0_0_8px_rgba(139,92,246,0.4)]", badge: "bg-accent-subtle-strong text-accent-500 border-accent-border" };
  return                  { bar: "bg-accent-600", text: "text-accent-600", from: "from-accent-700", to: "to-accent-600", shadow: "shadow-[0_0_6px_rgba(124,58,237,0.35)]", badge: "bg-accent-subtle-strong text-accent-600 border-accent-border" };
}

export default function GoalDetailPageClient() {
  const params = useParams();
  const id = Number(params.id);

  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [amount, setAmount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setGoals([
      { id: 1, title: "Japan Reise", targetAmount: 3000, currentAmount: 1200, categoryId: 1, category: {id:1, name: "Reise"}},
      { id: 2, title: "Neuer Laptop", targetAmount: 1800, currentAmount: 400, categoryId: 2, category: {id:2, name: "Technik" }},
      { id: 3, title: "Notgroschen", targetAmount: 5000, currentAmount: 2100, categoryId: 3, category: {id:3, name:"Notfall" }},
      { id: 4, title: "Supra MK3", targetAmount: 23000, currentAmount: 0, categoryId: 4, category: {id:4, name: "Will haben" }},
    ]);
  }, []);

  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    return (
      <main className="max-w-5xl mx-auto p-6">
        <div className="text-center py-20">
          <p className="text-muted text-sm">Sparziel nicht gefunden.</p>
          <Link href="/goals" className="text-accent hover:text-accent-light text-sm mt-4 inline-block transition-colors">
            ← Zurück zu allen Sparzielen
          </Link>
        </div>
      </main>
    );
  }

  const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
  const colors = progressColor(progress);
  const newAmount = Math.min(goal.targetAmount, goal.currentAmount + amount);
  const newProgress = Math.round((newAmount / goal.targetAmount) * 100);

  return (
    <main className="max-w-5xl mx-auto p-6 pt-10">
      <div className="animate-fade-up space-y-8">
        <div>
          <Link href="/goals" className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors text-sm group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zu allen Sparzielen
          </Link>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{goal.title}</h1>
              <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${colors.badge}`}>
                {goal.category.name}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-bold ${colors.text}`}>{progress}%</span>
              <span className="text-muted text-sm">erreicht</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface/60 border border-border rounded-2xl p-5">
              <p className="text-xs text-muted font-medium uppercase tracking-wider mb-1">Zielbetrag</p>
              <p className="text-2xl font-bold text-foreground">{goal.targetAmount.toLocaleString()} €</p>
            </div>
            <div className="bg-surface/60 border border-border rounded-2xl p-5">
              <p className="text-xs text-muted font-medium uppercase tracking-wider mb-1">Bereits gespart</p>
              <p className="text-2xl font-bold text-foreground">{goal.currentAmount.toLocaleString()} €</p>
              <p className="text-xs text-muted mt-1">{remaining.toLocaleString()} € bis zum Ziel</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="w-full bg-surface rounded-full h-4 overflow-hidden">
              <div
                className={`bg-gradient-to-r ${colors.from} ${colors.to} h-4 rounded-full transition-all duration-700 ${colors.shadow}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="bg-surface/40 border border-border rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Betrag hinzufügen</p>
                <p className="text-xs text-muted">Oder ziehe den Slider</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-accent">+{amount.toLocaleString()} €</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setAmount((a) => Math.max(0, a - 50))}
                className="flex-1 bg-card border border-border rounded-xl py-3 text-sm font-medium text-foreground hover:border-accent-border hover:bg-accent-subtle transition-all active:scale-95"
              >
                − 50 €
              </button>
              <button
                onClick={() => setAmount((a) => a + 50)}
                className="flex-1 bg-accent border border-accent rounded-xl py-3 text-sm font-medium text-white hover:bg-accent-light transition-all active:scale-95"
              >
                + 50 €
              </button>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <input
                type="range"
                min={0}
                max={remaining > 0 ? remaining : 1000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-accent"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 ${amount / (remaining > 0 ? remaining : 1000) * 100}%, #13131a ${amount / (remaining > 0 ? remaining : 1000) * 100}%)`
                }}
              />
            </div>

            <button
              disabled={amount === 0}
              className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
                amount > 0
                  ? "bg-gradient-to-r from-accent to-accent-light text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] active:scale-[0.98]"
                  : "bg-surface text-muted cursor-not-allowed"
              }`}
            >
              {remaining > 0 ? `Auf ${newAmount.toLocaleString()} € einzahlen` : "Ziel erreicht!"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
