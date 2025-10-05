import fs from 'fs/promises';
import { EXPENSESFILE } from '../Constanst.js';
import type { Expense } from '../interfaces/Expense.js';
import Table from 'cli-table3';

const list = async ({ month }: any) => {
  try {
    let data = await fs.readFile(EXPENSESFILE, { encoding: 'utf-8' });
    let expenses: Array<Expense> = data
      ? JSON.parse(data, (key, value) => key === 'create_at'
        ? new Date(value)
        : value)
      : [];
    expenses = month
      ? expenses.filter(({ create_at }) => create_at.getMonth() === parseInt(month) - 1)
      : expenses;

    let table = new Table({ head: ['ID', 'Amount', 'Description', 'Date'] })
    for (let expense of expenses) {
      table.push([expense.id, `$ ${expense.amount}`, expense.description, expense.create_at.toString()]);
    }
    console.log(table.toString());
  } catch (error) {
    console.error(error)
  }
}

export default list;