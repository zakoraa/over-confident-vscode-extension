# Over Confident 😏

> **Because confidence doesn’t secure your secrets.**

**Over Confident** is a security-focused VS Code extension that prevents accidental commits of sensitive files such as `.env` before your confidence turns into a security incident.

We all trust our commits.
Sometimes… a little too much.

---

## 🚀 What Over Confident Does

Over Confident helps you avoid leaking secrets by:

* 🔍 Detecting sensitive files like `.env`
* ⚠️ Warning you immediately inside VS Code
* 🛠 Automatically adding protected files to `.gitignore`
* 🚫 Generating a Git `pre-commit` hook to block dangerous commits
* ⚙️ Allowing full customization through VS Code Settings

---

## 🛡 Why This Extension Exists

Accidentally committing `.env` files is one of the most common beginner (and not-so-beginner) mistakes.

That usually leads to:

* Exposed API keys
* Leaked database credentials
* Revoked tokens
* Emergency key rotations
* Mild panic

Over Confident stops that before it happens.

---

## ✨ Features

### 1️⃣ Sensitive File Detection

By default, Over Confident protects:

* `.env`
* `.env.local`
* `.env.production`
* `.env.development`

You can customize this list in settings.

---

### 2️⃣ Automatic `.gitignore` Integration

If a protected file is detected and not ignored, Over Confident can automatically add it to:

```
.gitignore
```

---

### 3️⃣ Git Pre-Commit Protection

When enabled, Over Confident generates a `pre-commit` hook inside:

```
.git/hooks/pre-commit
```

If you try to commit a protected file:

```
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
```

Your secrets stay local.

---

### 4️⃣ Workspace-Aware Activation

The extension only activates when:

* A `.git` directory exists
* A workspace is opened

No unnecessary background processing.

---

## ⚙ Extension Settings

Over Confident adds the following configuration options:

### `overConfident.enabled`

Enable or disable the extension.

Default:

```
true
```

---

### `overConfident.protectedFiles`

List of files that should never be committed.

Default:

```
[
  ".env",
  ".env.local",
  ".env.production",
  ".env.development"
]
```

---

### `overConfident.autoAddToGitignore`

Automatically add detected protected files to `.gitignore`.

Default:

```
true
```

---

### `overConfident.enablePreCommitHook`

Automatically create a Git pre-commit hook to block protected files.

Default:

```
true
```

---

## 🧪 How To Test

1. Open a Git project in VS Code
2. Create a `.env` file
3. Stage it:

```
git add .env
```

4. Commit:

```
git commit -m "test"
```

If protection is enabled, the commit will be blocked.

---

## 🧠 Best Practice Recommendation

For maximum protection, combine Over Confident with:

* Proper `.gitignore` usage
* Environment variable management
* Secret scanning tools in CI/CD
* Private repositories for sensitive projects

Over Confident is your first safety net — not your only one.

---

## 📦 Performance & Safety

* Lightweight
* No telemetry
* No external network calls
* No performance overhead during normal editing

Runs only when needed.

---

## 🐛 Known Limitations

* Pre-commit hook works per repository (as intended by Git)
* If Git hooks are overridden by custom tooling, behavior may differ

---

## 📜 Release Notes

### 0.0.1

Initial release of Over Confident:

* Sensitive file detection
* Git hook generation
* `.gitignore` integration
* Configurable protection rules

---

## 😏 Final Words

Be confident.
Just not *that* confident.
