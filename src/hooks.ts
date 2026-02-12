import * as fs from 'fs';
import * as path from 'path';

export const createPreCommitHook = (root: string, protectedFiles: string[]) => {
    const hookPath = path.join(root, '.git', 'hooks', 'pre-commit');

    const files = protectedFiles.length > 0
        ? protectedFiles
        : ['.env', '.env.local', '.env.production', '.env.development'];

    const pattern = files
        .map(file => file.replace(/\./g, '\\.'))
        .join('|');

const content = `#!/bin/sh

PROTECTED_FILES=$(git diff --cached --name-only | grep -E "${pattern}")

if [ -n "$PROTECTED_FILES" ]
then
  echo ""
  echo "========================================"
  echo "Commit blocked by OverConfident"
  echo "----------------------------------------"
  echo "The following protected file(s) were detected:"
  echo "$PROTECTED_FILES"
  echo ""
  echo "Remove these files from staging before committing."
  echo "========================================"
  echo ""
  exit 1
fi
`;


    fs.writeFileSync(hookPath, content, { mode: 0o755 });
};
