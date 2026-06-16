// Aufgabe 7.1.3 - Erstellen von Routes
// Aufgabe 7.2.2 - Server Component erstellen, die Daten lädt
// Aufgabe 8.4.1 - Server Actions
//"use client";

import { getGoals } from "@/actions";
// import { useState, useEffect } from "react";
import GoalsClient from "@/components/GoalsClient";


/*async function getGoals(): Promise<SavingGoal[]> {
    const response = await fetch("http://localhost:3000/api/goals", {
        cache: "no-store",
    });
    if (!response.ok){
        throw new Error("Fehler beim Laden der Sparziele");
    }
    return response.json();
}*/

function StatCard({ title, value, subtitle, icon }: { title: string; value: string; subtitle?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-card/60 border border-border rounded-2xl p-5 flex items-center gap-4 hover:border-accent-border transition-colors">
      <div className="w-11 h-11 rounded-xl bg-accent-subtle-strong flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted font-medium uppercase tracking-wider">{title}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}

// Aufgabe 8.4 - Server Actions
export default async function GoalsPage() {
  const goals = await getGoals();

  const totalGoals = goals.length;
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const avgProgress = totalGoals > 0 ? Math.round(goals.reduce((sum, g) => sum + Math.round((g.currentAmount / g.targetAmount) * 100), 0) / totalGoals) : 0;

  return (
    <main className="max-w-6xl mx-auto p-6 pt-10">
      <div className="animate-fade-up space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Meine <span className="text-accent">Sparziele</span>
            </h1>
            <p className="text-muted text-sm mt-1">Verwalte und verfolge deine Ziele</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {totalGoals} aktive Ziele
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Gespart"
            value={`${totalSaved.toLocaleString()} €`}
            subtitle={`von ${totalTarget.toLocaleString()} €`}
            icon={
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Durchschnitt"
            value={`${avgProgress}%`}
            subtitle="erreicht im Schnitt"
            icon={
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <StatCard
            title="Ziele geschafft"
            value={`${goals.filter(g => (g.currentAmount / g.targetAmount) >= 1).length} / ${totalGoals}`}
            subtitle="bereits erreicht"
            icon={
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
          />
        </div>
        <GoalsClient goals={goals}/>
      </div>
    </main>
  );
}
/*
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

        <GoalsClient goals={goals} searchTerm={searchTerm} onSearch={setSearchTerm} />*/