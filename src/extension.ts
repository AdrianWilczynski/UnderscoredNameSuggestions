import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const nameCompletionProvider = vscode.languages.registerCompletionItemProvider('csharp', {
        provideCompletionItems(document, position) {
            return getCompletionItems(getCompletionsTexts(getLinePrefix(document, position)));
        }
    });
    context.subscriptions.push(nameCompletionProvider);
}

export function deactivate() { }

function getLinePrefix(document: vscode.TextDocument, position: vscode.Position) {
    return document.lineAt(position).text.substr(0, position.character);
}

function getCompletionItems(texts: string[]) {
    return texts.map(t => new vscode.CompletionItem(t, vscode.CompletionItemKind.Variable));
}

function getCompletionsTexts(line: string) {
    const type = parse(line);
    if (!type) {
        return [];
    }

    if (type.isArray) {
        return toCompletionTexts(type.baseName, true);
    }

    const completions = toCompletionTexts(type.baseName, false);

    if (type.isGeneric && isGenericCollection(type.baseName)) {
        let arg = parseGenericArgument(type.genericArguments);

        if (arg) {
            completions.push(...toCompletionTexts(arg, true));
        }
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

function parse(line: string) {
    //                                              modifiers                                            qualifiers          name  generic_arguments  array_brackets                                 
    const regex = /^ *((public|private|protected|internal|new|volatile|unsafe|static|readonly) +)*((\w+(<[\w ,.<>[\]]+>)?\.)*(\w+)(<([\w ,.<>[\]]+)>)?(\[[ ,]*])*) +$/;

    const matches = line.match(regex);
    if (!matches) {
        return undefined;
    }

    return {
        fullType: matches[3],
        baseName: matches[6],
        genericArguments: matches[8],
        isGeneric: !!matches[7],
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

const collectionTypes = ['ArraySegment', 'BlockingCollection', 'ConcurrentBag', 'ConcurrentQueue',
    'ConcurrentStack', 'IProducerConsumerCollection', 'HashSet', 'ICollection',
    'IList', 'IReadOnlyCollection', 'IReadOnlyList', 'ISet',
    'LinkedList', 'List', 'Queue', 'SortedSet',
    'Stack', 'SynchronizedCollection', 'SynchronizedReadOnlyCollection', 'IImmutableList',
    'IImmutableQueue', 'IImmutableSet', 'IImmutableStack', 'Builder',
    'ImmutableArray', 'ImmutableHashSet', 'ImmutableList', 'ImmutableQueue',
    'ImmutableSortedSet', 'ImmutableStack', 'Collection', 'ReadOnlyCollection',
    'EnumerableRowCollection', 'TypedTableBase', 'EntitySet', 'ISingleResult',
    'ITable', 'Table', 'IObjectSet', 'ObjectQuery',
    'ObjectResult', 'ObjectSet', 'EntityCollection', 'DataServiceQuery',
    'QueryOperationResponse', 'PrincipalSearchResult', 'PrincipalValueCollection', 'FileSystemEnumerable',
    'EnumerableQuery', 'IOrderedEnumerable', 'IOrderedQueryable', 'IQueryable',
    'ParallelQuery', 'HttpHeaderValueCollection', 'Tensor', 'ReadOnlyCollectionBuilder',
    'ExtensionCollection', 'IExtensionCollection', 'ServiceModelExtensionCollectionElement', 'IMessageFilterTable',
    'MessageFilterTable', 'MessageQueryTable', 'XPathMessageFilterTable', 'FreezableCollection',
    'TextElementCollection', 'XmlQuerySequence', 'IEnumerable', 'DbSet'];

function isGenericCollection(name: string) {
    return collectionTypes.includes(name);
}

function toPartialNames(name: string) {
    const partialNames: string[] = [];

    let accumulator = '';
    for (const word of splitIntoWords(name)) {
        accumulator += word;

        partialNames.push(accumulator);
    }

    return partialNames;
}

function splitIntoWords(name: string) {
    return name.split(/(?<=[a-zA-Z0-9])(?=[A-Z][a-z])/);
}

function trimInterfacePrefix(name: string) {
    return /^I[A-Z]/.test(name) ? name.substring(1) : name;
}

function toPluralized(name: string) {
    return name.endsWith('s') ? name : name + 's';
}

function toUnderscored(name: string) {
    return name.startsWith('_') ? name : '_' + name;
}

function toCamelCased(name: string) {
    const underscore = name.match(/^_*/)![0];

    let rest = name.match(/^_*([^_]*)/)![1];
    rest = rest.replace(/^[A-Z](?![A-Z])/, rest[0].toLowerCase());

    return underscore + rest;
}