import { fileURLToPath } from 'url';
import { dirname } from 'path';

const getFileName = (urlToPath: string = import.meta.url): string => {
	return fileURLToPath(urlToPath);
}

const getDirName = (urlToPath: string = import.meta.url): string => {
	return dirname(getFileName(urlToPath));
}
/**
 * TODO: Refactorizar el uso de las constantes para una manera mas limpia
 */
const ROOTDIR = `${getDirName()}/..`;
const USERFILESDIR = `${ROOTDIR}/user_files`;
const EXPENSESFILE = `${USERFILESDIR}/expenses.json`;

const mesesString = [
	'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
	'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
export { getFileName, getDirName, mesesString, ROOTDIR, USERFILESDIR, EXPENSESFILE };
