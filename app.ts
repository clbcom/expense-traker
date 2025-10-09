import { Command } from "commander"
import { add, list, remove, summary } from './src/command/index.js'
import update from "./src/command/update.js";

const program = new Command();

program
  .name("expense-traker")
  .description("CLI para gestionar los gastos.")
  .version("0.1.0");

program.command("add")
  .description("Agrega un nuevo gasto")
  .option("-d, --description <DESC>", "Descripcion del gasto")
  .option("-a, --amount <AMOUNT>", "Monto del gasto")
  .action(function (opts) {
    add(opts).catch(err => this.error(err))
  })

program.command('update')
  .description('Edita la descripcion o el monto de un gasto con el ID pasado como argumento')
  .option('--id <ID>', 'ID del gasto a editar')
  .option('-d, --description <DESCRIPTION>', 'Nueva descripcion')
  .option('-a, --amount <AMOUNT>', 'Nuevo monto')
  .action(update);

program.command('delete')
  .description('Elimina una gasto con el id pasado por argumento')
  .option('--id <ID>', 'ID del gasto a eliminar.')
  .action(remove);

program.command('summary')
  .description('Muestra la suma total de todos los gastos, asi como tambien de cada mes')
  .option('-m, --month <MONTH>', 'Obtiene el total de gastos del mes (Enero = 1)')
  .action(summary)

program.command('list')
  .description('Lista todas los gastos del mas nuevo al mas viejo')
  .option('-m, --month <MONTH>', 'Lista los gastos del mes pasado como argumento (Enero = 1)')
  .action(list)

program.parse();
