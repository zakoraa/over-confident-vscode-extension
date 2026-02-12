import * as fs from 'fs';
import * as path from 'path';

export const createPreCommitHook = (root: string) => {
    const hookPath = path.join(root, '.git', 'hooks', 'pre-commit');

    const content = `#!/bin/sh

PROTECTED_FILES=$(git diff --cached --name-only | grep -E '(^|/)\\.env($|\\.)')

if [ -n "$PROTECTED_FILES" ]
then
  echo ""
  echo "================================================="
  echo "❌ Commit blocked by Over Confident"
  echo "-------------------------------------------------"
  echo "The following environment file(s) were detected:"
  echo "$PROTECTED_FILES"
  echo ""
  echo "Environment files must not be committed."
  echo "Remove them from staging before committing."
  echo "================================================="
  echo ""
  exit 1
fi
`;

    fs.writeFileSync(hookPath, content, { mode: 0o755 });
};
