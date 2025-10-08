import fs from 'node:fs/promises';
import type { Expense } from '../interfaces/Expense.js';
import { EXPENSESFILE, mesesString } from '../Constanst.js';
import { randomUUID } from 'node:crypto';
import { readExpensesFromFile } from '../IO/FileHandler.js';

const summary = async ({ month }: any) => {
  try {
    // leemos gastos
    let expenses: Array<Expense> = await readExpensesFromFile();

    // filtramos por mes (si existe argumento mes)
    let monthNum: number = parseInt(month) - 1;
    let monthString: string = mesesString[monthNum];
    expenses = month
      ? expenses.filter((value) => value.create_at.getMonth() === monthNum)
      : expenses;

    // calculamos total de gastos
    let initialExpense: Expense = {
      id: 999,
      amount: 0,
      description: 'Total de todos los gastos',
      create_at: month ? new Date(1, month) : new Date
    }
    const totalExpense = expenses.reduce(({ amount, ...other }, currentExpense) => ({
      amount: amount + currentExpense.amount,
      ...other
    }), initialExpense);

    let outputMessage: string = `Total gasto ${monthString ?? ''}: ${totalExpense.amount}`
    console.log(outputMessage)
  } catch (error) {
    console.error(error)
  }
}

export default summary