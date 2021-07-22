import {ABIArgument} from "./abiArgument";

export enum ABIStateMutability {
	View = 'view',
	NonPayable = 'nonpayable',
	Payable = 'payable'
}

export enum ABIType {
	Constructor = 'constructor',
	Function = 'function',
	Event = 'event'
}

export interface ABI{
	name?: string;
	inputs: Array<ABIArgument>
	outputs: Array<ABIArgument>
	stateMutability: ABIStateMutability,
	type: ABIType
}
