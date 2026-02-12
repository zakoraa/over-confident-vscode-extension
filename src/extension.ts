import * as vscode from 'vscode';
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

    const detected = scanProtectedFiles(config.protectedFiles);

    if (detected.length > 0) {

        vscode.window.showErrorMessage(
            `Protected file detected: ${detected.join(', ')}`,
            'Add to .gitignore'
        ).then(selection => {

            if (selection === 'Add to .gitignore' && config.autoAddToGitignore) {
                const gitignorePath = `${root}/.gitignore`;

                let content = '';
                try {
                    content = require('fs').readFileSync(gitignorePath, 'utf8');
                } catch {}

                detected.forEach(file => {
                    if (!content.includes(file)) {
                        content += `\n${file}`;
                    }
                });

                require('fs').writeFileSync(gitignorePath, content);
                vscode.window.showInformationMessage('.gitignore updated');
            }
        });

        if (config.enablePreCommitHook) {
            createPreCommitHook(root, config.protectedFiles);
        }
    }
}

export function deactivate() {}
