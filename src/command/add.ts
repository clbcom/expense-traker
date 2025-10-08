import type { Expense } from '../interfaces/Expense.js';
import fs from 'node:fs/promises'
import { EXPENSESFILE, USERFILESDIR } from '../Constanst.js';
import { readExpensesFromFile, writeExpensesToFile } from '../IO/FileHandler.js';

async function add({ description, amount }: any): Promise<void> {

	try {
		if (!description || !amount) {
			return Promise.reject('Error: debe ingresar la descripcion y el monto del gasto.')
		}

		await fs.mkdir(USERFILESDIR, { recursive: true }); // crea el directorio para datos de usuario si no existe

		const expenses: Array<Expense> = await readExpensesFromFile();
		const newExpense: Expense = {
			id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
			description,
			amount: parseFloat(amount),
			create_at: new Date(),
		}
		expenses.push(newExpense);

		await writeExpensesToFile(expenses);
		console.log(`Gasto agregado: ID[${newExpense.id}]`);
	} catch (error) {
		console.error(error);
	}

}

export default add;