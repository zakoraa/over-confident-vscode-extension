import * as fs from 'fs';
import * as path from 'path';

export const createPreCommitHook = (root: string, protectedFiles: string[]) => {
    const hookPath = path.join(root, '.git', 'hooks', 'pre-commit');

    const pattern = protectedFiles
        .map(file => file.replace('.', '\\.'))
        .join('|');

    const content = `#!/bin/sh

if git diff --cached --name-only | grep -E "${pattern}" > /dev/null
then
  echo "❌ Commit blocked: Protected file detected"
  exit 1
fi
`;

    fs.writeFileSync(hookPath, content, { mode: 0o755 });
};
