import type { Expense } from '../interfaces/Expense.js';
import fs from 'node:fs/promises'
import { USERFILESDIR } from '../Constanst.js';
import { readExpensesFromFile, writeExpensesToFile } from '../IO/FileHandler.js';

interface addArguments {
	description: string,
	amount: string
}
/**
 * Agrega un nuevo gasto al archivo de gastos del usuario.
 *
 * Esta función valida los argumentos recibidos, crea el directorio de usuario si no existe,
 * lee los gastos actuales, agrega el nuevo gasto y guarda la lista actualizada en el archivo.
 * Si ocurre algún error durante el proceso, se muestra un mensaje en consola.
 *
 * @param {addArguments} param0 - Objeto con la descripción y el monto del gasto.
 * @param {string} param0.description - Descripción del gasto.
 * @param {string} param0.amount - Monto del gasto como cadena.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el gasto ha sido agregado.
 * @throws {Error} Si la descripción o el monto no son válidos, o si ocurre un error al escribir el archivo.
 */
const add = async ({ description, amount }: addArguments): Promise<void> => {

	try {
		if (!description || !amount) {
			throw new Error('Debe ingresar la descripcion y el monto del gasto.')
		}

		await fs.mkdir(USERFILESDIR, { recursive: true }); // crea el directorio para datos de usuario si no existe

		const expenses: Array<Expense> = await readExpensesFromFile();
		const parseAmount = parseFloat(amount)
		if (isNaN(parseAmount))
			throw new Error('Valor de monto invalido')

		const newExpense: Expense = {
			id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
			description,
			amount: parseAmount,
			create_at: new Date(),
		}
		expenses.push(newExpense);

		await writeExpensesToFile(expenses);
		console.log(`Gasto agregado: ID[${newExpense.id}]`);
	} catch (error: any) {
		console.error(`Error al agregar: ${error.message}`);
	}

}

export default add;