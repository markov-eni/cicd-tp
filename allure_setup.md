1. `npm install -g allure-commandline`
2. Add `C:\Users\<username>\AppData\Roaming\npm` to PATH
3. Vérifier l'ajout en ouvrant une nouvelle fenetre: `allure --version`
3. Add `jest.config.js`
```js
/** @type {import('jest').Config} */
const config = {
  testEnvironment: "allure-jest/jsdom",
};

module.exports = config;
```
4. `npm install allure-jest --save-dev`
5. `npm install jest-environment-jsdom --save-dev`
5. `npm run test`
6. `allure serve allure-results`
