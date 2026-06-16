import Image from "next/image";
// Aufgabe 7.1.3 - Erstellen von Routes
export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 pt-10">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold">
          Über die <span className="text-accent">App</span>
        </h1>
        <p className="text-muted leading-relaxed">
          SaveSmart hilft dabei Sparziele zu erstellen,
          Fortschritte zu verfolgen und motiviert beim Sparen zu bleiben.
        </p>
        <Image
          src="/TestatMTEAul.png"
          alt="Testat"
          width={200}
          height={200}
          className="rounded-lg shadow-lg mt-6"
        />
      </div>
    </main>
  );
}