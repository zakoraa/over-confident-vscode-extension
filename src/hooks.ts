import * as fs from 'fs';
import * as path from 'path';

export const createPreCommitHook = (root: string, protectedFiles: string[]) => {
    const hookPath = path.join(root, '.git/hooks/pre-commit');

    const content = `#!/bin/sh
FILES=$(git diff --cached --name-only)
for file in ${protectedFiles.join(' ')}
do
  echo "$FILES" | grep -q "$file"
  if [ $? -eq 0 ]; then
    echo "❌ Commit blocked: Protected file detected ($file)"
    exit 1
  fi
done
`;

    fs.writeFileSync(hookPath, content, { mode: 0o755 });
};
