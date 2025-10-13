import type { Expense } from '../interfaces/Expense.js';
import { mesesString } from '../Constanst.js';
import { readExpensesFromFile } from '../IO/FileHandler.js';

interface summaryArguments {
  month?: string
}
/**
 * Genera y muestra un resumen de los gastos para un mes específico o para todos los meses si no se especifica el mes.
 *
 * @param {Object} params - Objeto de parámetros.
 * @param {string} [params.month] - El mes (como número en formato string, por ejemplo "1" para enero) para filtrar los gastos. Si se omite, se resumen todos los gastos.
 * @returns {Promise<void>} Resuelve cuando el resumen ha sido mostrado por consola.
 *
 * @throws Imprime cualquier error encontrado durante la lectura o el procesamiento de los gastos.
 */
const summary = async ({ month }: summaryArguments) => {
  try {
    // leemos gastos
    let expenses: Array<Expense> = await readExpensesFromFile();

    // filtramos por mes (si existe argumento mes)
    let monthNum: number = month ? (parseInt(month) - 1) : -1;
    let monthString: string = mesesString[monthNum];
    if (isNaN(monthNum)) {
      throw Error(`Argumento <<${month}>> invalido`)
    }
    expenses = monthNum
      ? expenses.filter((value) => value.create_at.getMonth() === monthNum)
      : expenses;

    // calculamos total de gastos
    let initialExpense: Expense = {
      id: 999,
      amount: 0,
      description: 'Total de todos los gastos',
      create_at: month ? new Date(1, monthNum) : new Date
    }
    const totalExpense = expenses.reduce(({ amount, ...other }, currentExpense) => ({
      amount: amount + currentExpense.amount,
      ...other
    }), initialExpense);

    let outputMessage: string = `Total gasto ${monthString ?? ''}: ${totalExpense.amount}`
    console.log(outputMessage)
  } catch (error: any) {
    console.error(`Error al obtener el total: ${error.message}`)
  }
}

export default summary