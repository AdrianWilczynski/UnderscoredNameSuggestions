#load "_shared.csx"

using System.Text.RegularExpressions;

// source: https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netcore-2.2
var lines = File.ReadAllLines("collections.input.txt");

var names = lines.Where(t => Regex.Match(t, @"<\w+>").Success)
    .Select(t => t.Split('.').Last())
    .Select(t => Regex.Replace(t, @"<.*>", string.Empty))
    .Append("IEnumerable")
    .Append("DbSet")
    .Distinct();

File.WriteAllText("collections.output.txt", ToTypeScriptArray(names, 4));