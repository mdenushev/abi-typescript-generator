import {ContractABI} from "../types/contract";
import {addIdent} from "../utils";
import {ABI, ABIStateMutability, ABIType} from "../types/abi";
import {ABIArgument, ABIArgumentType, ABITypesJS} from "../types/abiArgument";

const defaultConstructor =
	'constructor(web3Instance: Web3, abi: any[], address: string){\n' +
	'  this.web3 = web3Instance;\n' +
	'  this.abi = abi;\n' +
	'  this.contract = new this.web3.eth.Contract(this.abi, address)\n'+
	'}'

function prepareTSInputs(inputArgs: Array<ABIArgument>) : string {
	return inputArgs.map((arg, i) => `${arg.name !== '' ? arg.name : 'id_'+(i+1)}: ${prepareArgType(arg)}`).join(', ')
}

function prepareArgType(arg: ABIArgument): string {
	if (arg.type === ABIArgumentType.Tuple) {
		return '{\n' +
			arg.components.map(field =>
				addIdent(`${field.name}: ${ABITypesJS[field.type]}`, 2)
			).join(',\n')
			+ '\n}'
	}
	else if (arg.type === ABIArgumentType.Tuple+'[]'){
		return '{\n' +
			arg.components.map(field =>
				addIdent(`${field.name}: ${ABITypesJS[field.type]}`, 2)
			).join(',\n')
			+ '\n}[]'
	}
	else if (arg.type.includes('[]')) {
		const itemAbiType = arg.type.replace('[]', '')
		return `(${ABITypesJS[itemAbiType]})[]`
	}
	else {
		return ABITypesJS[arg.type]
	}
}

function prepareCallOutput(outputArgs: Array<ABIArgument>): string {
	// Check if only 1 output field
	if(outputArgs.length === 1){
		return prepareArgType(outputArgs[0])
	}
	else if (outputArgs.length === 0) {
		return 'void'
	}
	else {
		return '[\n' + outputArgs.map(arg => addIdent(prepareArgType(arg), 2) + `,  // ${arg.name}`).join('\n') + '\n]'
	}
}

function generateContractFunction(abi: ABI) : string {
	const optionsType = abi.stateMutability === ABIStateMutability.View
		? 'CallOptions'
		: 'SendOptions'
	const outputType = abi.stateMutability === ABIStateMutability.View
	  ? `Promise<${prepareCallOutput(abi.outputs)}>`
		: `PromiEvent<Contract>`
	const callFunction = abi.stateMutability === ABIStateMutability.View
	  ? `call(options)`
		: `send(options)`

	if (abi.inputs.length === 0) {
		return `${abi.name}(options?: ${optionsType}): ${outputType} {\n`+
			`  return this.contract.methods.${abi.name}().${callFunction};\n`+
			`}\n`
	}
	return `${abi.name}(${prepareTSInputs(abi.inputs)}, options?: ${optionsType}): ${outputType} {\n`+
		     `  return this.contract.methods.${abi.name}(\n` +
		     `    ${abi.inputs.map((arg, i) => arg.name !== '' ? arg.name : 'id_'+(i+1)).join(',\n    ')}\n`+
		     `  ).${callFunction};\n`+
				 `}\n`

}

export function generateTSCode(contractName: string, abi: ContractABI): string {
	let res = '';

	// Imports
	res += 'import Web3 from "web3"\n'+
				 'import {Contract, CallOptions, SendOptions} from "web3-eth-contract"\n'+
				 'import {PromiEvent} from "web3-core";\n'+
				 'import BigNumber from "bignumber.js";\n\n'

	// Start class declaration
	res += `class ${contractName}Contract {\n` +
				 '  web3: Web3;\n' +
				 '  abi: any[];\n' + // TODO: Add abi interface
		     '  contract: Contract;\n\n'+
		     addIdent(defaultConstructor, 2)+'\n\n';

	// Add contract functions
	res += abi.filter(f => f.type === ABIType.Function).map(f => addIdent(generateContractFunction(f), 2)).join('\n')

	// Close class
	res += '\n}'
	return res;
}
