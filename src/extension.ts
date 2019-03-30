import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const nameCompletionProvider = vscode.languages.registerCompletionItemProvider('csharp', {
        provideCompletionItems(document, position, token, context) {
            const linePrefix = getLinePrefix(document, position);
            getCompletions(linePrefix);
            return null;
        }
    });
    context.subscriptions.push(nameCompletionProvider);
}

export function deactivate() { }

function getLinePrefix(document: vscode.TextDocument, position: vscode.Position) {
    return document.lineAt(position).text.substr(0, position.character);
}

function getCompletions(line: string) {
    const type = parse(line);
    if (!type) {
        return undefined;
    }

}

function parse(line: string) {
    //                                              modifiers                                            qualifiers          name  generic_arguments  array_brackets                                 
    const regex = /^ *((public|private|protected|internal|new|volatile|unsafe|static|readonly) +)*((\w+(<[\w ,.<>[\]]+>)?\.)*(\w+)(<([\w ,.<>[\]]+)>)?(\[[ ,]*])*) +$/;

    const matches = line.match(regex);
    if (!matches) {
        return undefined;
    }

    const isGeneric = !!matches[7];
    let genericArguments: string | undefined;
    let firstGenericArgument: string | undefined;
    if (isGeneric) {
        genericArguments = matches[8];
        if (genericArguments) {
            firstGenericArgument = getFirstGenericArgument(genericArguments);
        }
    }

    return {
        fullType: matches[3],
        baseName: matches[6],
        genericArguments: genericArguments,
        firstGenericArgument: firstGenericArgument,
        isArray: !!matches[9],
        isGeneric: isGeneric
    };
}

function getFirstGenericArgument(args: string) {
    const matches = args.match(/^ *(\w+(<[\w ,.<>[\]]+>)?\.)*(\w+)/);
    if (!matches) {
        return undefined;
    }

    return matches[3];
}