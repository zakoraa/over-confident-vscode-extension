import * as vscode from 'vscode';

export const getGitAPI = async () => {
    const extension = vscode.extensions.getExtension('vscode.git');
    if (!extension) {
        return null;
    }

    const gitExtension = await extension.activate();
    return gitExtension.getAPI(1);
};
