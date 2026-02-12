import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const scanProtectedFiles = (files: string[]) => {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        return [];
    }

    const root = workspace.uri.fsPath;

    return files.filter(file =>
        fs.existsSync(path.join(root, file))
    );
};
