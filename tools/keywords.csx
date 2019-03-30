#load "_shared.csx"

using System.Text.RegularExpressions;

// source: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/
var keywordsText = File.ReadAllText("keywords.input.txt");

// source: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/built-in-types-table
var typesLines = File.ReadAllLines("types.input.txt");

var types = typesLines.Select(t => Regex.Split(t, @"\s+").First());
var keywords = Regex.Replace(Regex.Replace(keywordsText, @"\(.*\)", string.Empty), @"\s+", " ")
    .Split(" ")
    .Distinct()
    .Except(types);

File.WriteAllText("keywords.output.txt", ToTypeScriptArray(keywords, 5));
