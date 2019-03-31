import { parseFieldDeclaration } from './parser';
import { toPartialNames, trimInterfacePrefix, toUnderscored, toCamelCased, toPluralized } from './textUtilities';
import { isGenericCollection } from './constants';

export function getCompletionsTexts(linePrefix: string, lineSuffix: string) {
	const type = parseFieldDeclaration(linePrefix, lineSuffix);
	if (!type) {
		return [];
	}

	if (type.isArray) {
		return toCompletionTexts(type.baseName, true);
	}

	const completions = toCompletionTexts(type.baseName, false);

	if (type.isGeneric && isGenericCollection(type.baseName) && type.genericArgument) {
		completions.push(...toCompletionTexts(type.genericArgument, true));
	}

	return completions;
}

function toCompletionTexts(name: string, pluralize: boolean) {
	return toPartialNames(trimInterfacePrefix(name)).map(n => {
		let name = toUnderscored(toCamelCased(n));

		if (pluralize) {
			name = toPluralized(name);
		}

		return name;
	});
}