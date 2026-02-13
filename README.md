# Over Confident 😏

> **Because confidence doesn’t secure your secrets.**

**Over Confident** is a security-focused VS Code extension that prevents
accidental commits of sensitive files like `.env` before your confidence
turns into a security incident.

We all trust our commits.  
Sometimes… a little too much.

------------------------------------------------------------------------

# 📦 Installation

## 🔧 Manual Install (VSIX)

This extension has not been published to the Microsoft Marketplace yet
(Azure Publisher token and payment verification are still required).  
For now, installation is done manually using the `.vsix` file.

Make sure you have:

    overconfident-0.0.1.vsix

Then run the following command in your terminal:

``` bash
code --install-extension overconfident-0.0.1.vsix
```

If successful, restart VS Code.

### Alternative via VS Code UI

1.  Open VS Code  
2.  Go to Extensions  
3.  Click the three-dot menu (…)  
4.  Select **Install from VSIX**  
5.  Choose `overconfident-0.0.1.vsix`

------------------------------------------------------------------------

# 🚀 What Over Confident Does

Over Confident helps prevent secret leaks by:

-   🔍 Detecting sensitive files like `.env`
-   ⚠️ Showing warnings directly inside VS Code
-   🛠 Automatically adding protected files to `.gitignore`
-   🚫 Creating a Git `pre-commit` hook to block dangerous commits
-   ⚙️ Allowing full customization through Settings

------------------------------------------------------------------------

# 🛡 Why This Extension Exists

Accidentally committing `.env` files is one of the most common mistakes.

That usually leads to:

-   Exposed API keys
-   Leaked database credentials
-   Revoked tokens
-   Emergency key rotations
-   Mild panic

Over Confident stops that before it happens.

------------------------------------------------------------------------

# ✨ Features

## 1️⃣ Sensitive File Detection

By default, all files that start with:

    .env*

are protected automatically.

Examples:

-   `.env`
-   `.env.local`
-   `.env.production`
-   `.env.development`
-   `.env.staging`
-   `.env.test`

Fully customizable in settings.

------------------------------------------------------------------------

## 2️⃣ Automatic `.gitignore` Integration

If a protected file is detected and not listed in `.gitignore`, the
extension can automatically add it.

------------------------------------------------------------------------

## 3️⃣ Git Pre-Commit Protection

When enabled, the extension generates a hook at:

    .git/hooks/pre-commit

If you attempt to commit protected files:

    =================================================
    ❌ Commit blocked by Over Confident
    ----------------------------------------
    The following environment file(s) were detected:
    .env.local
    .env.production
    .env.staging

    Environment files must not be committed.
    Remove them from staging before committing.
    =================================================

Your secrets stay local.

------------------------------------------------------------------------

## 4️⃣ Workspace-Aware Activation

The extension activates only when:

-   A `.git` directory exists  
-   A workspace is opened

No unnecessary background processing.

------------------------------------------------------------------------

# ⚙️ Extension Settings

## `overConfident.enabled`

Enable or disable the extension.

Default:

    true

------------------------------------------------------------------------

## `overConfident.protectedFiles`

List of files that must never be committed.

Default:

    [
      ".env",
      ".env.local",
      ".env.production",
      ".env.development"
    ]

------------------------------------------------------------------------

## `overConfident.autoAddToGitignore`

Automatically add detected files to `.gitignore`.

Default:

    true

------------------------------------------------------------------------

## `overConfident.enablePreCommitHook`

Automatically create a Git pre-commit hook.

Default:

    true

------------------------------------------------------------------------

# 🧪 How To Test

1.  Open a Git project in VS Code  
2.  Create a `.env` file  
3.  Run:

<!-- -->

    git add .env

4.  Then commit:

<!-- -->

    git commit -m "test"

If protection is enabled, the commit will be blocked.

------------------------------------------------------------------------

# 📦 Performance & Safety

-   Lightweight  
-   No telemetry  
-   No external network calls  
-   No performance overhead during editing

------------------------------------------------------------------------

# 🐛 Known Limitations

-   Pre-commit hooks work per repository  
-   If Git hooks are overridden by other tooling, behavior may differ

------------------------------------------------------------------------

# 📜 Release Notes

## 0.0.1

Initial release:

-   Sensitive file detection  
-   Git hook generation  
-   `.gitignore` integration  
-   Configurable protection rules

------------------------------------------------------------------------

# 😏 Final Words

Be confident.  
Just not *that* confident.
