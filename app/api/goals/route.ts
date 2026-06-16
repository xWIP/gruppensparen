import { NextResponse } from "next/server";

const goals = [
    {
        id: 1,
        title: "Japan Reise",
        targetAmount: 3000,
        currentAmount: 1200,
    },
    {
        id: 2,
        title: "Neuer Laptop",
        targetAmount: 1800,
        currentAmount: 400,
    },
    {
        id: 3,
        title: "Notgroschen",
        targetAmount: 5000,
        currentAmount: 2100,
    },
    {
        id: 4,
        title: "Supra MK3",
        targetAmount: 23000,
        currentAmount: 0,
    },
];

export async function GET() {
    return NextResponse.json(goals);
}