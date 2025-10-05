import type { Expense } from '../interfaces/Expense.js';
import fs from 'node:fs/promises'
import { EXPENSESFILE, USERFILESDIR } from '../Constanst.js';

async function add({ description, amount }: any): Promise<void> {

	try {
		if (!description || !amount) {
			return Promise.reject('Error: debe ingresar la descripcion y el monto del gasto.')
		}
		let fileHandle: fs.FileHandle;
		await fs.mkdir(USERFILESDIR, { recursive: true });
		fileHandle = await fs.open(EXPENSESFILE, 'a+',);
		const data = await fileHandle.readFile({ encoding: 'utf-8' });
		const expenses: Expense[] = data ? JSON.parse(data) : [];
		const newExpense: Expense = {
			id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
			description,
			amount: parseFloat(amount),
			// TODO: solucionar problema de guardar la fecha como date o number
			create_at: new Date(),
		}
		expenses.push(newExpense);
		await fileHandle.truncate(0); // Limpiar el contenido del archivo
		await fileHandle.writeFile(JSON.stringify(expenses), { encoding: 'utf-8' });
		console.log(`Gasto agregado: ID[${newExpense.id}]`);
	} catch (error) {
		console.error(error);
	}

}

export default add;