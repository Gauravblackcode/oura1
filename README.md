## Table of Contents

- [Run/Build the application ](#run/build-the-application)
- [Coding standards ](#coding-standards)
- [Project Structure](#project-structure)

---

## Run/Build the application

- Install Dependencies & Initial Pre Commit Hooks (Note: We use yarn as a package manager so please install yarn before proceeding)

```bash
yarn
yarn run prepare
npx husky add .husky/pre-commit "yarn run husky"
```

- Run the development server:

```bash
yarn dev
```

- Production build

```bash
npm run build
```

- Lint

```bash
npm run lint
```


- Types Codegen (Create codegen.yml in root folder , paste the below code)
   
    To create the tyoes in the types file for provided graphql schema

```
> schema: https://dev-api.shyftcommerce.com/graphql
> documents: '**/*.graphql'
> headers: <replace with you bearer toekn>
> generates:
>   types.ts:
>     plugins:
>       - typescript
>       - typescript-operations
>       - typed-document-node
```

```


- Debug
  - Create `.vscode/launch.json` in root of the project.
  - Paste the following contents in `launch.json`

```


```


{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3001"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

- Run Command

```bash
npm run dev:debug
```

---

## VSCode Settings

- Create another file `.vscode/settings.json` in the root of the project.
- Paste the following contents in `settings.json`.
- This will be required if the auto formatting shortcut (cmd+shit+i) is not working

```
{
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## React Coding standards

Following are the coding standards that one must follow while working on this boilerplate.

- VS Code should be used strictly for any kind of development. Install following extensions in VSCode. (\* marked are mandatory)

  - \*Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
  - \*EditorConfig: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
  - \*Eslint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
  - Import Cost: https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost
  - Gitlens: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens

- Mandatory to follow AirBnB [AirBnB coding standards](https://github.com/airbnb/javascript/blob/master/README.md)

- JS Linting before every commit `npm run lint`. AirBnB lint configurations are already loaded.

- Do not modify linter rules without consulting.

- Follow 2 space indentation rule. Install `ext install EditorConfig.EditorConfig` VS Code plugin. The `.editorconfig` in project root dir will overwrite default indentation settings of VS code to meet project standards.

- HOC patterns at places where necessary e.g. Login and authentication

- Use optional chaining when parsing nested level objects or ES6 use destructor pattern wherever possible and use ES6 as a standard everywhere possible.

- All external url’s and configurations should be env based.

- All api responses should be wrapped and referenced in the frontend

- Use propTypes and defaultProps for specifying props meta in all components. This will reduce `undefined` errors.

- Use React 16 concepts, Context API, Hooks etc wherever possible

- Have discussion before putting stuff to redux store keep a store document do not overuse REDUX.

- Do not mix and match local state and redux state keep a single source fo truth.

- Consult before installing any new npm packages.

- Use only camelCase variable names do not mix with underscore names, For constants name use uppercase and underscore.

- Avoid using and 3rd party css library and based on timelines avoid even using any component library. React Material UI is fine based on the use case.

- Scss -> Use a global scss file to define all common and global css and import and override at the component level.

- Only theming properties should be written in resources.scss file. (scss mixins, variables etc)

- Strictly follow BEM css/scss standards for all styles.

- File naming conventions
  - Layout should be named as `.layout.tsx`
  - Shared/Independent Components should be named as `.component.tsx`
  - Services should be named as `.service.ts`

---

## Project Structure

- All the images, icons, fonts and external assets should be kept inside `public/assets` directory.

The entire application code and logic should be inside `/src` dir

- Directory structure of `/src`

  > /common

  > /components

  > /layout

  > /pages

  > /redux

  > /services

  > /styles

  > /types

- Application level shared component should be written inside `/components` directory.
- Application constants, helpers, envs etc should be written inside `/common` directory.
- `/layouts` directory is for keeping application level layouts
- `/pages` directory is where your entire application logic will be written. All the routes/pages will be added inside this directory. See the example in the boilerplate.
- All the Http API calls of the application should be added `/services` directory. **_Component should never directly make an API call instead it should load the respective service and handle HTTP requests_**.
- To make API call use axios helper `HttpClient`. Ref: `/services/network/http.service.ts`.
- Redux reducers import and store configurations should be added in `/store` directory.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Git Flow

### Branch Naming Convention

- Branches should be named as per the type of JIRA ticket.

```
{ticket_no}/{ticket_type}/{title}
```

**Example:**

- For a given JIRA ticket number `RMN-154: Ad Platform Base Setup` the branch naming convention would be

**story**: RMN-154/story/ad-platform-base-setup
**task**: RMN-154/task/ad-platform-base-setup
**bug**: RMN-154/bug/ad-platform-base-setup
**epic**: RMN-154/epic/ad-platform-base-setup

### Commit Message Format

- Always make a commit only on feature branches. Never commit directly on release branches.
- The commit message format should be as follows

```
git commit -m "{ticket-no}: Summary about the changes"
```

### Merge Requests

- Following [MR Template](./PULL_REQUEST_TEMPLATE.md) should be used when creating an MR.
- MR title format should follow `[TICKET_NO]: {SUMMARY}`

Example:

```
[RMN-154]: Ad Platform Base Setup
```

- Always check the option of **Squash Commit** when creating the PR
