import { prisma } from "@/lib/prisma";

async function main() {
  // Bestehende Daten löschen
  await prisma.savingGoal.deleteMany();
  await prisma.category.deleteMany();

  // Kategorien + Sparziele erstellen
  const reise = await prisma.category.create({
    data: {
      name: "Reise",
      goals: {
        create: [
          {
            title: "Japan Reise",
            targetAmount: 3000,
            currentAmount: 1200,
          },
          {
            title: "Sommerurlaub",
            targetAmount: 1000,
            currentAmount: 600,
          },
        ],
      },
    },
    include: {
      goals: true,
    },
  });

  const technik = await prisma.category.create({
    data: {
      name: "Technik",
      goals: {
        create: [
          {
            title: "Neuer Laptop",
            targetAmount: 1800,
            currentAmount: 400,
          },
        ],
      },
    },
    include: {
      goals: true,
    },
  });

  const notfall = await prisma.category.create({
    data: {
      name: "Notfall",
      goals: {
        create: [
          {
            title: "Notgroschen",
            targetAmount: 5000,
            currentAmount: 2100,
          },
        ],
      },
    },
    include: {
      goals: true,
    },
  });
    const willhaben = await prisma.category.create({
    data: {
      name: "WillHaben",
      goals: {
        create: [
          {
            title: "Supra MK3",
            targetAmount: 23000,
            currentAmount: 0,
          },
        ],
      },
    },
    include: {
      goals: true,
    },
  });

  console.log("Seed-Daten erstellt:", {
    reise,
    technik,
    notfall,
    willhaben,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());