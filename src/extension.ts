import * as vscode from 'vscode';
import { getCompletionsTexts } from './completionTextProvider';

export function activate(context: vscode.ExtensionContext) {
	const nameCompletionProvider = vscode.languages.registerCompletionItemProvider('csharp', {
		provideCompletionItems(document, position) {
			return getCompletionItems(getCompletionsTexts(getLinePrefix(document, position), getLineSuffix(document, position)));
		}
	});
	context.subscriptions.push(nameCompletionProvider);
}

export function deactivate() { }

function getLinePrefix(document: vscode.TextDocument, position: vscode.Position) {
	return document.lineAt(position).text.substr(0, position.character);
}

function getLineSuffix(document: vscode.TextDocument, position: vscode.Position) {
	return document.lineAt(position).text.substr(position.character);
}

function getCompletionItems(texts: string[]) {
	return texts.map(t => new vscode.CompletionItem(t, vscode.CompletionItemKind.Variable));
}