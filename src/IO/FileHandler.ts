import fs from 'node:fs/promises';
import { EXPENSESFILE } from '../Constanst.js';
import { Expense } from '../interfaces/Expense.js';

const readExpensesFromFile = async (): Promise<Array<Expense>> => {
  const data = await fs.readFile(EXPENSESFILE, { encoding: 'utf8' });
  const expenses: Array<Expense> = data
    ? JSON.parse(data, (key, value) => key === 'create_at' ? new Date(value) : value)
    : []

  return expenses;
}

const writeExpensesToFile = async (expenses: Array<Expense>): Promise<void> => {
  const expensesJSON = JSON.stringify(expenses);
  return fs.writeFile(EXPENSESFILE, expensesJSON, { encoding: 'utf8' });
}

export { readExpensesFromFile, writeExpensesToFile };