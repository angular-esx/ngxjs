### Installation
Run yarn command to instal node modules then cross link packages by using `lerna` automatically.
```
yarn install
```

When you start write unit test, make sure `custom.js` is created in `./_tests` folder.
```
touch ./_tests/custom.js
```

### Lint
`eslint` && `stylelint` are enabled for the source code.
Because they take more time for executing, I don't integrate them into `webpack`. It mean `lint` won't run every `webpack` re-build, it help you to save times for development.

I setup `pre-commit` to only execute `lint` for staged files when you do commit.
**Recommend** you run `lint-staged` yourself to check lint errors, because errors will be printed in console, it's easier for reading.

In order to get the best environment for development, you also need editor extensions for `lint` and I **recommend you should use Visual Code** becauce I'm working on it, so I only suggest you useful extensions for it.
If you like working on other editor, try to find out correct extensions for it yourself :)
You need to install these extensions for `Visual Code`:
- ESLint (Dirk Baeumer)
- styleLint (Shinnosuke Watanabe)

Config for those extensions is written in shared `.vscode/settings.json`.
If you setup as I remcommend, `stylelint` will run every you type, `eslint` will run and try to fix error every you save.

### Npm Scripts
- **build:** Build source code for develop environment without starting `webpack-dev-server`. It's useful to review code  in built files.

- **start:** Start `webpack-dev-server` with enabled `HotModuleReplacement` with `WebpackDashboard`.

- **start:aot:** Do building aot then start `lite-server` to view result in browser. It isn't supported for HMR.

- **start:universal:** Do buiding universal then start `express server` to view result in browser. It isn't supported for HMR.

- **test** Start `karma` for all files `spec.ts`

- **test:custom** Start `karma` for required files in `_tests/custom.js`. `custom.js` is added into .gitignore, so if you need to run custom test, create it yourself then wrire code to require necessary files.
