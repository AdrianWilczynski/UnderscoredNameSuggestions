#r "nuget: morelinq, 3.1.0"

using MoreLinq;

private static IEnumerable<string> ToArrayLines(this IEnumerable<string> items, int itemsPerLine)
    => items.Select(i => $"'{i}'")
        .Batch(itemsPerLine)
        .Select(i => string.Join(", ", i));

string ToTypeScriptArray(IEnumerable<string> items, int itemsPerLine)
    => $"[ {string.Join($",{Environment.NewLine}", items.ToArrayLines(itemsPerLine))} ]";