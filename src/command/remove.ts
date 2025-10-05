import fs from 'node:fs/promises';
import type { Expense } from '../interfaces/Expense.js';
import { EXPENSESFILE } from '../Constanst.js';

const remove = async ({ id }: any) => {
  try {
    // abrir archivo
    let fileHandle: fs.FileHandle = await fs.open(EXPENSESFILE, 'a+');

    // leer gastos
    const data: string = await fileHandle.readFile({ encoding: 'utf8' });
    const allExpenses: Array<Expense> = data
      ? JSON.parse(data, (key, value) => key === 'create_at' ? new Date(value) : value)
      : []
    // Filtra todos los elementos diferentes del id, asi eliminando el id pasado como argumento
    const expensesSaved = allExpenses.filter((expense) => expense.id !== parseInt(id));

    // escribir cambios
    fileHandle.truncate(0);
    fileHandle.writeFile(JSON.stringify(expensesSaved), { encoding: 'utf8' })
    fileHandle.close();

    let outputMessage: string = expensesSaved.length < allExpenses.length
      ? `Gasto [ID: ${id}] eliminado.`
      : `Sin cambios (id: ${id} no existe).`
    console.log(outputMessage)
  } catch (error) {
    console.error(error);
  }
}

export default remove;