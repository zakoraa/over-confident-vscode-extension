import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { getConfig } from './config';
import { scanProtectedFiles } from './scanner';
import { createPreCommitHook } from './hooks';

export async function activate(context: vscode.ExtensionContext) {

    const config = getConfig();

    if (!config.enabled) {
        return;
    }

    const workspace = vscode.workspace.workspaceFolders?.[0];

    if (!workspace) {
        return;
    }

    const root = workspace.uri.fsPath;

    if (config.enablePreCommitHook) {
        createPreCommitHook(root);
    }

    const detected = scanProtectedFiles(['.env']);

    if (detected.length > 0) {

        vscode.window.showErrorMessage(
            `Environment file detected: ${detected.join(', ')}`,
            'Add to .gitignore'
        ).then(selection => {

            if (selection === 'Add to .gitignore' && config.autoAddToGitignore) {

                const gitignorePath = path.join(root, '.gitignore');

                let content = '';

                try {
                    content = fs.readFileSync(gitignorePath, 'utf8');
                } catch {
                    content = '';
                }

                if (!content.includes('.env')) {
                    content += `\n.env`;
                }

                fs.writeFileSync(gitignorePath, content);
                vscode.window.showInformationMessage('.gitignore updated');
            }
        });
    }
}

export function deactivate() {}
