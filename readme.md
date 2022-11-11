## Simple To-do app

app that displays at initial empty todo list. You can add to-dos by using a form with a simple description field.
All changes to the list is saved on localStorage. You can edit and delete current to-dos.

### Setup

#### Available scripts

```JSON
{
    "test": "jest --verbose --forceExit", //Simple runs test. You can pass additional jest params
    "coverage": "jest --coverage --forceExit", // Run coverage
    "lint": "eslint --ignore-path .eslintignore ./src", // run linting for hole project.
    "lint:fix": "eslint --ignore-path .eslintignore ./src --fix", // Linting with fix param
    "dev": "webpack-dev-server --open --mode development --hot --config=./config/webpack.config.js",// Run web dev server
    "build": "webpack --mode production --config=./config/webpack.config.js",
    "build:local" : "yarn run build --env NODE_ENV=production",// Build run locally with custom envs.
  }
```

### Next steps

- [] Add husky
- [] Add CommitLinting
- [] Add cd/ci with github pages or Web server with koa or express
- [] Add github workflows
- [] change webpack for rollup or similar
