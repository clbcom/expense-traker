import type { Expense } from '../interfaces/Expense.js';
import { readExpensesFromFile, writeExpensesToFile } from '../IO/FileHandler.js';

const remove = async ({ id }: any) => {
  try {
    const allExpenses: Array<Expense> = await readExpensesFromFile();

    // Filtra todos los elementos diferentes del id, asi eliminando el id pasado como argumento
    const expensesSaved = allExpenses.filter((expense) => expense.id !== parseInt(id));
    await writeExpensesToFile(expensesSaved)

    let outputMessage: string = expensesSaved.length < allExpenses.length
      ? `Gasto [ID: ${id}] eliminado.`
      : `Sin cambios (id: ${id} no existe).`
    console.log(outputMessage)
  } catch (error) {
    console.error(error);
  }
}

export default remove;