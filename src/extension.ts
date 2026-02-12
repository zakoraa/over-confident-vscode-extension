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

    // 🔥 Always create hook if enabled
    if (config.enablePreCommitHook) {
        createPreCommitHook(root, config.protectedFiles);
    }

    // Scan existing protected files
    const detected = scanProtectedFiles(config.protectedFiles);

    if (detected.length > 0) {

        vscode.window.showErrorMessage(
            `Protected file detected: ${detected.join(', ')}`,
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

                detected.forEach(file => {
                    if (!content.includes(file)) {
                        content += `\n${file}`;
                    }
                });

                fs.writeFileSync(gitignorePath, content);
                vscode.window.showInformationMessage('.gitignore updated');
            }
        });
    }
}

export function deactivate() {}
