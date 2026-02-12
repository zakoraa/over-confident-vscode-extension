import * as vscode from 'vscode';

export const getConfig = () => {
    const config = vscode.workspace.getConfiguration('envSentinel');

    return {
        enabled: config.get<boolean>('enabled', true),
        protectedFiles: config.get<string[]>('protectedFiles', []),
        autoAddToGitignore: config.get<boolean>('autoAddToGitignore', true),
        enablePreCommitHook: config.get<boolean>('enablePreCommitHook', true),
    };
};
