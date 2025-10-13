import type { Expense } from '../interfaces/Expense.js';
import Table from 'cli-table3';
import { readExpensesFromFile } from '../IO/FileHandler.js';

interface listArguments {
  month?: string
}

/**
 * Lista los gastos de un mes específico en una tabla formateada.
 *
 * Lee los gastos desde un archivo, los filtra por el mes indicado (si se proporciona),
 * y los muestra en formato de tabla en la línea de comandos.
 *
 * @param {listArguments} args - Los argumentos para listar los gastos.
 * @param {string} args.month - El mes (1-12) por el que filtrar los gastos. Si no se indica, lista todos los gastos.
 * @returns {Promise<void>} Una promesa que se resuelve cuando los gastos han sido listados.
 *
 * @throws {Error} Si ocurre un error al leer los gastos o mostrar la tabla.
 */
const list = async ({ month }: listArguments) => {
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
  } catch (error: any) {
    console.error(`Error al listar: ${error.message}`)
  }
}

export default list;