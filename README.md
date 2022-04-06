# Coloringbook

## How to deploy to firebase

Grab your credentials from firebase and put them into the config.example.js file inside the firebae folder. Rename the config.example.js file to config.js.

**Sign in to Google**
```bash
firebase login
```

It should open a browser where you have to grant the permissions to the project.

**Initialize the project**
```bash
firebase init
```

Select to use an existing project. If asked what you want to use it for, select Hosting. If the setup asks for your public folder, type in **build**. If asked to configure it as a single-page-app answer **yes**.

**Build the project**
```bash
npm run build
```
**Deploy the project**
```bash
firebase deploy
```

## "Backend"

The project is bound to the firebase as a backend. The example database structure is available in the **animals.json** file. Images should be uploaded to the storage and their links should be populated in the animals.json. Once finished, import the animals.json file in the realtime database.

### Solving CORS issues

If the application is throwing CORS errors (might show up as Illegal Operations on canvas), do the following.

Go to your Google Cloud Admin Page https://console.cloud.google.com/security/command-center

Select your project. Activate Google Cloud Shell (should be a button somwhere in the top right corner) and type in the following command.

```bash
touch cors_config.json
```

Now open up the newly created file in the Google Cloud Editor with the following command
```bash
edit cors_config.json
```

Paste in the following text:
```json
[
    {
      "origin": ["*"],
      "method": ["GET"],
      "maxAgeSeconds": 3600
    }
]
```

Save the file and click on the "Open Terminal" button.
Type in the following command to apply the CORS settings. Keep in mind that you will have to change the <YOUR_PROJECT_NAME> part to the name of your project.
```bash
gsutil cors set cors_config.json gs://<YOUR_PROJECT_NAME>.appspot.com
```

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