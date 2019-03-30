#r "nuget: morelinq, 3.1.0"

using MoreLinq;
using System.Text.RegularExpressions;

private static IEnumerable<string> ToArrayLine(this IEnumerable<string> items, int countPerLine)
    => items.Select(i => $"'{i}'")
    .Batch(countPerLine)
    .Select(i => string.Join(", ", i));

string ToTypeScriptArray(IEnumerable<string> items, int perLine)
    => $"[ {string.Join($",{Environment.NewLine}", items.ToArrayLine(perLine))} ]";

// source: https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netcore-2.2
var collections = File.ReadAllLines("collections.input.txt");

var types = collections
    .Where(t => Regex.Match(t, @"<\w+>").Success)
    .Select(t => t.Split('.').Last())
    .Select(t => Regex.Replace(t, @"<.*>", string.Empty))
    .Append("IEnumerable")
    .Append("DbSet")
    .Distinct();

File.WriteAllText("collections.output.txt", ToTypeScriptArray(types, 4));