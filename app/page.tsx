import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto p-6 pt-10">
      <div className="animate-fade-up space-y-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-subtle-strong via-card to-background border border-accent-border p-8 md:p-12">
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/8 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative space-y-6 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Sparen leicht <br />
              gemacht mit <span className="text-accent">SaveSmart</span>
            </h1>
            <p className="text-muted text-lg max-w-lg leading-relaxed">
              Verwalte deine Sparziele, verfolge jeden Schritt und erreiche deine Ziele – mit Stil und Übersicht.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/goals"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] active:scale-95"
              >
                Zu meinen Zielen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Sparziele erstellen",
              desc: "Definiere deine Ziele und verfolge jeden Euro, den du sparst.",
              icon: (
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              ),
            },
            {
              title: "Fortschritt verfolgen",
              desc: "Sieh auf einen Blick, wie nah du deinem Ziel schon bist.",
              icon: (
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
              href: "/fortschritt",
            },
            {
              title: "Motiviert bleiben",
              desc: "Erreiche deine Sparziele mit Spaß und Übersicht.",
              icon: (
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              ),
            },
          ].map((feature, i) =>
            feature.href ? (
              <Link
                key={feature.title}
                href={feature.href}
                className="bg-card border border-border rounded-2xl p-6 hover:border-accent-border transition-all duration-200 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent-subtle-strong flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{feature.desc}</p>
              </Link>
            ) : (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-accent-border transition-all duration-200 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent-subtle-strong flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{feature.desc}</p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
