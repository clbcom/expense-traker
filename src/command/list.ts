import type { Expense } from '../interfaces/Expense.js';
import Table from 'cli-table3';
import { readExpensesFromFile } from '../IO/FileHandler.js';

const list = async ({ month }: any) => {
  try {
    let expenses: Array<Expense> = await readExpensesFromFile();
    expenses = month // filtra de acuerdo al mes indicado 
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