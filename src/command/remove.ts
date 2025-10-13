import type { Expense } from '../interfaces/Expense.js';
import { readExpensesFromFile, writeExpensesToFile } from '../IO/FileHandler.js';

interface removeArguments {
  id: string
}
/**
 * Elimina un gasto del archivo de gastos según el ID proporcionado.
 *
 * @param {removeArguments} params - Parámetros de entrada.
 * @param {number|string} params.id - El ID del gasto a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando la operación ha finalizado.
 *
 * @remarks
 * - Si el ID existe, el gasto será eliminado y se mostrará un mensaje de confirmación.
 * - Si el ID no existe, se mostrará un mensaje indicando que no hubo cambios.
 * - Los errores durante la operación se mostrarán en la consola.
 */
const remove = async ({ id }: removeArguments) => {
  try {
    const numericId = parseInt(id);
    if (isNaN(numericId))
      throw new Error(`ID <<${id}>> no valido.`)
    const allExpenses: Array<Expense> = await readExpensesFromFile();

    // Filtra todos los elementos diferentes del id, asi eliminando el id pasado como argumento
    const expensesSaved = allExpenses.filter((expense) => expense.id !== parseInt(id));

    const wasDelete = expensesSaved.length < allExpenses.length;
    if (wasDelete)
      await writeExpensesToFile(expensesSaved)

    let outputMessage: string = wasDelete
      ? `Gasto [ID: ${id}] eliminado.`
      : `Sin cambios (id: ${id} no existe).`
    console.log(outputMessage)
  } catch (error: any) {
    console.error(`Error al eliminar: ${error.message}`);
  }
}

export default remove;