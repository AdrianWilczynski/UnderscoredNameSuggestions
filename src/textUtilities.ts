export function toPartialNames(name: string) {
	const partialNames: string[] = [];

	let accumulator = '';
	for (const word of splitIntoWords(name)) {
		accumulator += word;

		partialNames.push(accumulator);
	}

	return partialNames;
}

export function splitIntoWords(name: string) {
	return name.split(/(?<=[a-zA-Z])(?=[A-Z][a-z])/);
}

export function trimInterfacePrefix(name: string) {
	return /^I[A-Z]/.test(name) ? name.substring(1) : name;
}

export function toPluralized(name: string) {
	return name.endsWith('s') ? name : name + 's';
}

export function toUnderscored(name: string) {
	return name.startsWith('_') ? name : '_' + name;
}

export function toCamelCased(name: string) {
	const underscore = name.match(/^_*/)![0];

	const matches = name.match(/^_*([^_].*)$/);
	if (!matches) {
		return name;
	}

	let rest = matches[1];
	rest = rest.replace(/^[A-Z](?![A-Z])/, rest[0].toLowerCase());

	return underscore + rest;
}