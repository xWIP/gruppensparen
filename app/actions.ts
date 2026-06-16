"use server";

import { prisma } from "./lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGoals(){
    return prisma.savingGoal.findMany({
        include: {category: true,},
        orderBy: {createdAt: "desc",},
    });
}

export async function getGoal(id: number){
    return prisma.savingGoal.findUnique({
        where: {id,},
        include: {category: true,},
    });
}

export async function createGoal(title: string, targetAmount: number, currentAmount:number, categoryId: number){
    await prisma.savingGoal.create({
        data: {title, targetAmount, currentAmount, categoryId,},
    });
    revalidatePath("/goals");
}

export async function updateGoal(id: number, title: string, targetAmount: number, currentAmount: number){
    await prisma.savingGoal.update({
        where: {id,},
        data: {title, targetAmount, currentAmount,},
    });
    revalidatePath("/goals");
}

export async function deleteGoal(id: number){
    await prisma.savingGoal.delete({
        where: {id,},
    });
    revalidatePath("/goals");
}
