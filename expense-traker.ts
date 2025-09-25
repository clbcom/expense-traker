import { Command } from "commander"

const program = new Command();

interface newGasto {
  description: string,
  amount: string
}

program
  .name("expense-traker")
  .description("CLI para gestionar los gastos.")
  .version("0.1.0");

program.command("add",)
  .description("Agrega un nuevo gasto")
  .option("--description <DESC>", "Descripcion del gasto")
  .option("--amount <AMOUNT>", "Monto del gasto")
  .action((args: newGasto) => {
    // TODO: Crear un validador para cuando no se ingresen datos
  });

program.command('update')
  .description('Edita la descripcion o el monto de un gasto con el ID pasado como argumento')

program.command('delete')
  .description('Elimina una gasto con el id pasado por argumento')

program.command('summary')
  .description('Muestra la suma total de todos los gastos, asi como tambien de cada mes')

program.command('list')
  .description('Lista todas los gastos del mas nuevo al mas viejo')

program.parse();
