import {generateTSCode} from "./generator";
import * as fs from "fs";
import * as yargs from 'yargs'

const {hideBin} = require('yargs/helpers')

function cli(argv) {
	return yargs(hideBin(argv))
	.usage('Usage: $0 generate [abiFile] [contractName] [outputFile]')
	.command({
		command: 'generate [abiFile] [contractName] [outputFile]',
		describe: 'generate TS class for given ABI',
		builder: (yargs) => {
			return yargs
			.positional('abiFile', {
				describe: 'Input ABI JSON file',
				type: 'string'
			})
			.positional('contractName', {
				describe: 'Contract name',
				type: 'string'
			})
			.positional('outputFile', {
				describe: 'Output TS file',
				type: 'string'
			})
		},
		handler: (argv: { abiFile: string, contractName: string, outputFile: string }) => {
			let abi;
			try {
				let file = fs.readFileSync(argv.abiFile).toString('utf-8');
				abi = JSON.parse(file)
			} catch (e) {
				console.error('Cannot read/parse input ABI file')
				return;
			}
			const code = generateTSCode(argv.contractName, abi);
			fs.writeFileSync(argv.outputFile, code);
		}
	}).help().argv;
}

cli(process.argv);
