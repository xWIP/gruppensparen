import { getGoals } from "@/actions";
import type { SavingGoal } from "@/types/SavingGoal";

function formatProgress(goal: SavingGoal) {
  if (goal.targetAmount <= 0) return 0;
  return Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
}

export default async function FortschrittPage() {
  const goals = await getGoals();
  const chartGoals = goals.map((goal) => ({
    ...goal,
    progress: formatProgress(goal),
  }));

  return (
    <main className="max-w-6xl mx-auto p-6 pt-10">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Fortschritt verfolgen
          </h1>
          <p className="text-muted text-lg max-w-2xl leading-relaxed">
            Hier kannst du deinen aktuellen Sparfortschritt einsehen und prüfen, wie nah du deinem Ziel bist.
          </p>
        </div>

        <section className="bg-card border border-border rounded-3xl p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Fortschrittsdiagramm</h2>
                <p className="text-sm text-muted">X-Achse: Sparziele, Y-Achse: Prozentsatz von 0 bis 100 %</p>
              </div>
              <div className="text-sm text-muted">{chartGoals.length} Ziele</div>
            </div>

            {chartGoals.length === 0 ? (
              <div className="rounded-3xl border border-border bg-background/80 p-6 text-center text-sm text-muted">
                Es sind noch keine Sparziele angelegt.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="relative min-w-[520px] rounded-3xl border border-border bg-surface/50 p-4">
                  <div className="grid h-72 grid-rows-5 gap-2">
                    {[100, 75, 50, 25, 0].map((value) => (
                      <div key={value} className="relative border-t border-border/70">
                        <span className="absolute -left-10 top-0 w-8 text-right text-[11px] text-muted">&nbsp;</span>
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 left-4 right-4 flex items-end gap-4 pb-8">
                    {chartGoals.map((goal) => (
                      <div key={goal.id} className="flex w-24 flex-col items-center gap-2">
                        <div className="relative flex h-56 w-full items-end justify-center overflow-hidden rounded-3xl bg-white/10">
                          <div
                            className="w-full rounded-t-3xl bg-gradient-to-t from-accent to-accent-light shadow-[0_10px_30px_rgba(139,92,246,0.25)] transition-all duration-500"
                            style={{ height: `${goal.progress}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-foreground">{goal.progress}%</span>
                        <span className="text-center text-[11px] text-muted break-words">{goal.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
