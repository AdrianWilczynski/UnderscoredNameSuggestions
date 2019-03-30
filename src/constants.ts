export function isGenericCollection(name: string) {
    return collectionTypes.includes(name);
}

export function isKeyword(name: string) {
    return keywords.includes(name);
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

const keywords = ['abstract', 'as', 'base', 'break', 'case',
    'catch', 'checked', 'class', 'const', 'continue',
    'default', 'delegate', 'do', 'else', 'enum',
    'event', 'explicit', 'extern', 'false', 'finally',
    'fixed', 'for', 'foreach', 'goto', 'if',
    'implicit', 'in', 'interface', 'internal', 'is',
    'lock', 'namespace', 'new', 'null', 'operator',
    'out', 'override', 'params', 'private', 'protected',
    'public', 'readonly', 'ref', 'return', 'sealed',
    'sizeof', 'stackalloc', 'static', 'struct', 'switch',
    'this', 'throw', 'true', 'try', 'typeof',
    'unchecked', 'unsafe', 'using', 'virtual', 'void',
    'volatile', 'while', 'add', 'alias', 'ascending',
    'async', 'await', 'by', 'descending', 'dynamic',
    'equals', 'from', 'get', 'global', 'group',
    'into', 'join', 'let', 'nameof', 'on',
    'orderby', 'partial', 'remove', 'select', 'set',
    'value', 'var', 'when', 'where', 'yield'];