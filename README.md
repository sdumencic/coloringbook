# Coloringbook

## Code Quality

Code quality is ensured by using pre-commit hooks with linter and formatter.

### **Code Quality plugins**

The following plugins for VS Code should be configured out-of-the-box:

ESLint https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint<br>
Prettier - Code formatter  https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

### **Code Quality scripts**
Format the code with Prettier:
```bash
npm run format
```

Run ESLint and report errors and warnings:
```bash
npm run lint
```
Run ESlint and automatically attempt to fix errors and warnings:
```bash
npm run lint-fix
```

### **Pre-commit hooks**

Pre-commit hooks are installed and run using Husky. By doing an npm install husky should automatically set everything up.

To test if the hook will pass before commiting, you can run the linter and formatter on the staged files by using the following command:
```bash
 npx pretty-quick --staged && npx lint-staged
```