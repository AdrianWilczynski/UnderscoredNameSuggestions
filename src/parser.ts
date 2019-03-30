import { isKeyword } from './constants';

export function parse(line: string) {
    //                                              modifiers                                            qualifiers          name  generic_arguments  array_brackets                                 
    const regex = /^ *((public|private|protected|internal|new|volatile|unsafe|static|readonly) +)*((\w+(<[\w ,.<>[\]]+>)?\.)*(\w+)(<([\w ,.<>[\]]+)>)?(\[[ ,]*])*) +$/;

    const matches = line.match(regex);
    if (!matches) {
        return undefined;
    }

    const baseName = matches[6];
    if (isKeyword(baseName)) {
        return undefined;
    }

    const isGeneric = !!matches[7];

    return {
        fullType: matches[3],
        baseName: baseName,
        genericArgument: isGeneric ? parseGenericArgument(matches[8]) : undefined,
        isGeneric: isGeneric,
        isArray: !!matches[9]
    };
}

function parseGenericArgument(args: string) {
    const matches = args.match(/^ *(\w+(<[\w ,.<>[\]]+>)?\.)*(\w+)/);
    if (!matches) {
        return undefined;
    }

    return matches[3];
}