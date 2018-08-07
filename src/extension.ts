'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


import {LocalRandom} from './localRandom';
import {RandomOrg} from './randomOrg';

import TextEditor = vscode.TextEditor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    // console.log('Congratulations, your extension "vscode-randomizer" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let getRandom = vscode.commands.registerCommand('extension.getRandom', () => {
        let max,min;
        let editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showInformationMessage("Please open any editor window");
            return;
        };
        let selection = editor.selection;
        let selectionRange = new vscode.Range(selection.start, selection.end);
        let publish = (result: any) => {
            let ed = vscode.window.activeTextEditor;
            function edit(e: TextEditor) {
                e.edit(
                    function (edit) {
                        edit.replace(selectionRange, result + "");
                    });
            }
            edit(ed);
        }
        let checkRequestTimeout = new Promise((resolve,reject)=> {
            setTimeout(reject, 800);
        });
        if (!selection.isSingleLine) {
            let selectedMultilines = editor.document.getText(selection).split('\n');

            let selectedMultilinesWithoutEmpty = [];
            selectedMultilines.map((line) => {
                if (line.replace(/\s+/g, '') != '')
                    selectedMultilinesWithoutEmpty.push(line);
            });
            selectedMultilines = selectedMultilinesWithoutEmpty;

            let lineCount = selectedMultilines.length;
           let req = RandomOrg.getRandomNumOnRange(0,lineCount-1);
           Promise.race([checkRequestTimeout, req])
            .then((data)=>publish(selectedMultilines[data[0]]))
            .catch(()=>{publish(selectedMultilines[LocalRandom.getRandomNumOnRange(0,lineCount-1)]);});
            return;
        }
        let selectedText = editor.document.getText(selection).trim().replace(/\s+/g, ' ');
        let result;

        if (selectedText === "") {
            vscode.window.showInformationMessage("Please select some text");
            return;
        }
        switch (selectedText) {
            case "rgb": {
                let req = RandomOrg.getRandomRGB();
                Promise.race([req,checkRequestTimeout])
                .then((data)=>{
                    // console.log(data);
                    publish(`rgb(${data[0]}, ${data[1]}, ${data[2]})`);
                })
                .catch(()=>{publish(LocalRandom.getRandomRGB())});
               
            }
            break;
            case "hex":{
                
                let req = RandomOrg.getRandomHexColor();
                Promise.race([req,checkRequestTimeout])
                .then((data)=>{
                    let hex = `#${data[0]+data[1]+data[2]}`
                    publish(hex);
                })
                .catch(()=>{publish(LocalRandom.getRandomHexColor())});
            }
            default: {
                let range = selectedText.split(' ');
                if(range[0]>range[1]){
                    max = range[0];
                    min = range[1];
                }else{
                    min = range[0];
                    max = range[1];
                }
                let cond = (isNaN(+min) || isNaN(+max));
                if (range.length != 2 || cond) {
                    vscode.window.showInformationMessage('Selected text should be like one of the template: "number number" or "rgb" or multiline selection');
                    break;
                }

                let req = RandomOrg.getRandomNumOnRange(parseInt(min), parseInt(max));
                Promise.race([req,checkRequestTimeout])
                .then((data)=>publish(data[0]+""))
                .catch(()=>{publish(LocalRandom.getRandomNumOnRange(parseInt(min), parseInt(max))+"")});;
            } break;
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