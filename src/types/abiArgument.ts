export enum ABIArgumentType {
	Uint = 'uint',
	Uint8 = 'uint8',
	Uint16 = 'uint16',
	Uint32 = 'uint32',
	Uint64 = 'uint64',
	Uint128 = 'uint128',
	Uint256 = 'uint256',
	Int = 'int',
	Int8 = 'int8',
	Int16 = 'int16',
	Int32 = 'int32',
	Int64 = 'int64',
	Int128 = 'int128',
	Int256 = 'int256',
	String = 'string',
	Address = 'address',
	Bool = 'bool',
	Bytes = 'bytes',
	Bytes32 = 'bytes32',
	Bytes64 = 'bytes64',
	Tuple = 'tuple',
	// TODO: describe all
}

// TODO: maybe should change
export const ABITypesJS = {
	[ABIArgumentType.Uint]: 'string | BigNumber',
	[ABIArgumentType.Uint8]: 'number | string | BigNumber',
	[ABIArgumentType.Uint16]: 'string | BigNumber',
	[ABIArgumentType.Uint32]: 'string | BigNumber',
	[ABIArgumentType.Uint64]: 'string | BigNumber',
	[ABIArgumentType.Uint128]: 'string | BigNumber',
	[ABIArgumentType.Uint256]: 'string | BigNumber',
	[ABIArgumentType.Int]: 'string | BigNumber',
	[ABIArgumentType.Int8]: 'number | string | BigNumber',
	[ABIArgumentType.Int16]: 'number | string | BigNumber',
	[ABIArgumentType.Int32]: 'number | string | BigNumber',
	[ABIArgumentType.Int64]: 'string | BigNumber',
	[ABIArgumentType.Int128]: 'string | BigNumber',
	[ABIArgumentType.Int256]: 'string | BigNumber',
	[ABIArgumentType.String]: 'string',
	[ABIArgumentType.Address]: 'string',
	[ABIArgumentType.Bool]: 'boolean',
	[ABIArgumentType.Bytes]: 'string | BigNumber',
	[ABIArgumentType.Bytes32]: 'string | BigNumber',
	[ABIArgumentType.Bytes64]: 'string | BigNumber',
}

export interface ABIArgument {
	components?: Array<ABIArgument>
	internalType: string;
	name: string;
	type: ABIArgumentType
}
