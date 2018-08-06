'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { Randomizer } from './randomizer';
import TextEditor = vscode.TextEditor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-randomizer" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let getRandom = vscode.commands.registerCommand('extension.getRandom', () => {
        let editor = vscode.window.activeTextEditor;

        if(!editor){
            vscode.window.showInformationMessage("Please open any editor window");
            return;
        };
        let selection = editor.selection;
        let selectionRange = new vscode.Range(selection.start,selection.end);
        let publish = (result:any) => {
            let ed =vscode.window.activeTextEditor;
            function edit(e:TextEditor){
                e.edit(
                    function(edit){
                    edit.replace(selectionRange,result+"");
                });
            }
            edit(ed);
        }
        if(!selection.isSingleLine){
            let selectedMultilines = editor.document.getText(selection).split('\n');
            let lineCount = selectedMultilines.length;
            publish(selectedMultilines[Randomizer.getRandomNumOnRange(0,lineCount-1)]);
            return;
        }
        let selectedText = editor.document.getText(selection[0]).trim().replace(/\s+/g,' ');
        let result;

        if(selectedText === ""){
            vscode.window.showInformationMessage("Please select some text");
            return;
        }
        switch (selectedText) {
            case "rgb":{
                result = Randomizer.getRandomRGB();
                publish(result);
            }break;
        
            default:{
                let range = selectedText.split(' ');
               
                let cond =(isNaN(+range[0]) || isNaN(+range[1]));
                // console.log(`range ${range}; cond: ${cond} all:${range.length!=2 || cond}`);
                if (range.length!=2 || cond) {
                    vscode.window.showInformationMessage('Selected text should be "number number" format\n Example: "1 10"' );
                    break;
                }
                result = Randomizer.getRandomNumOnRange(parseInt(range[0]),parseInt(range[1]));
                publish(result);
            }break;
        }

    });
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });
    context.subscriptions.push(getRandom);
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}