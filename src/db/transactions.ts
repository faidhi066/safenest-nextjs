import { getMonth } from "date-fns";

import { db } from "@/lib/prisma";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const userId = parseInt(process.env.USER_ID as string);

export async function getAllIncomesByUser() {
  const rawIncomes = await db.income.findMany();
  const incomes = rawIncomes.filter((e) => e.user_id === userId);
  return incomes;
}

export async function getAllExpensesByUser() {
  const rawExpenses = await db.expenses.findMany();
  const expenses = rawExpenses.filter((e) => e.user_id === userId);
  return expenses;
}

export async function getSchemaedExpensesByUser() {
  const rawExpenses = await db.expenses.findMany();
  const expenses = rawExpenses
    .filter((item) => item.user_id === userId)
    .map((item) => ({
      id: item.expense_id,
      transactionName: item.description ?? "Untitled",
      category: item.expense_category ?? "Uncategorized",
      amount: item.monthly_amount?.toFixed(2) ?? "0.00",
    }));
  return expenses;
}

export async function getCashFlowSummaryByUser() {
  const incomes = await getAllIncomesByUser();

  const expenses = await getAllExpensesByUser();

  // Create base map
  const monthlySummary = new Array(12).fill(null).map((_, index) => ({
    month: MONTHS[index],
    inflow: 0,
    outflow: 0,
  }));

  // Find the latest month
  const maxMonth = expenses.reduce((latest, current) => {
    const currentDate = new Date(current.timestamp!);
    return currentDate > latest ? currentDate : latest;
  }, new Date(0)); // start with the earliest possible date

  const maxMonthIndex = maxMonth.getMonth(); // 0 = Jan, 11 = Dec
  // const maxMonthName = maxMonth.toLocaleString("default", { month: "long" });

  // Aggregate incomes and expenses
  for (const expense of expenses) {
    if (!expense.timestamp) continue;
    const monthIndex = getMonth(new Date(expense.timestamp));
    const amount = Number(expense.monthly_amount ?? 0);
    monthlySummary[monthIndex].outflow += amount;
  }

  for (let i = 0; i < monthlySummary.length; i++) {
    const income = Number(incomes[0].monthly_income ?? 0);
    monthlySummary[i].inflow += income;
  }
  return monthlySummary.slice(0, maxMonthIndex + 1);
}

export async function getCurrentMthNetCashFlowByUser() {
  const cashFlow = await getCashFlowSummaryByUser();

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  }); // e.g., "May"

  const current = cashFlow.find((entry) => entry.month === currentMonthName);
  console.log(current);
  if (!current) return "No data available";

  const netCashFlow = current.inflow - current.outflow;
  return netCashFlow;
}

function isSameMonth(date: Date, target: Date): boolean {
  return (
    date.getMonth() === target.getMonth() &&
    date.getFullYear() === target.getFullYear()
  );
}

export async function getCurrentMthTransactionsAmount() {
  const today = new Date();
  const expenses = (await getAllExpensesByUser()).filter(
    (e) => e.timestamp && isSameMonth(new Date(e.timestamp), today)
  );

  const incomes = await getAllIncomesByUser();

  return incomes.length + expenses.length;
}

export async function getPreviousMthTransactionsAmount() {
  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1); // First day of previous month

  const expenses = (await getAllExpensesByUser()).filter((e) => {
    if (!e.timestamp) return false;
    const ts = new Date(e.timestamp);
    return (
      ts.getMonth() === prevMonth.getMonth() &&
      ts.getFullYear() === prevMonth.getFullYear()
    );
  });

  const incomes = await getAllIncomesByUser();

  return incomes.length + expenses.length;
}
