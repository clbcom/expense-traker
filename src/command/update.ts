import { Expense } from "../interfaces/Expense.js";
import { readExpensesFromFile, writeExpensesToFile } from "../IO/FileHandler.js";

/**
 * Actualiza un gasto existente en el archivo de gastos.
 *
 * Busca el gasto por su identificador (`id`) y actualiza su monto (`amount`) y/o descripción (`description`).
 * Si no se proporciona ningún cambio, lanza un error indicando que se requiere al menos una modificación.
 * Si el gasto no se encuentra, lanza un error indicando que el gasto no existe.
 * Al finalizar, guarda los cambios en el archivo y muestra un mensaje de éxito por consola.
 *
 * @param {Object} params - Parámetros para la actualización del gasto.
 * @param {number|string} params.id - Identificador único del gasto a editar.
 * @param {number} [params.amount] - Nuevo monto del gasto (opcional).
 * @param {string} [params.description] - Nueva descripción del gasto (opcional).
 * @returns {Promise<void>} Una promesa que se resuelve cuando la operación ha finalizado.
 */

interface updateArguments {
  id: string,
  amount?: string,
  description?: string
}
const update = async ({ id, amount, description }: updateArguments) => {
  try {
    if (!amount && !description)
      throw new Error('Sin cambios, debe ingresar una nueva descripcion o monto del gasto.')

    const numericId = parseInt(id);
    const expenses = await readExpensesFromFile();
    const expense: Expense | undefined = expenses.find((value) => value.id === numericId);
    const indexExpense: number = expense
      ? expenses.indexOf(expense)
      : -1

    if (!expense)
      throw new Error(`Gasto con el [${numericId}] no encontrado`)

    const newAmount = amount !== undefined ? parseFloat(amount) : expense.amount;
    const editExpense: Expense = {
      id: numericId,
      amount: isNaN(newAmount) ? expense.amount : newAmount,
      description: description ?? expense.description,
      create_at: expense.create_at
    }

    expenses[indexExpense] = editExpense;

    await writeExpensesToFile(expenses);
    console.log(`Gasto [${id}] editado correctamente`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
  }
}

export default update;