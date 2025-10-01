import { fileURLToPath } from 'url';
import { dirname } from 'path';

const getFileName = (urlToPath: string = import.meta.url): string => {
	return fileURLToPath(urlToPath);
}

const getDirName = (urlToPath: string = import.meta.url): string => {
	return dirname(getFileName(urlToPath));
}

const ROOTDIR = `${getDirName()}/..`;
const USERFILESDIR = `${ROOTDIR}/user_files`;
const EXPENSESFILE = `${USERFILESDIR}/expenses.json`;

export { getFileName, getDirName, ROOTDIR, USERFILESDIR, EXPENSESFILE };
