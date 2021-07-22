export function getIdent(len: number): string {
	return ' '.repeat(len)
}

export function addIdent(str: string, ident: number) : string {
	return getIdent(ident)+str.replace(/\n/g, '\n'+getIdent(ident))
}
