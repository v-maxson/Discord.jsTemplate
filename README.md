# Discord.js Template
------------------------------------------------

## About:
This is a simple template for Discord bots written in TypeScript with the `discord.js-light` library. It comes with a basic set of features including Command and Event handlers. It also includes code snippets for Visual Studio Code (if you'd like to add snippets for other editors, please submit a pull request).

------------------------------------------------

### Requirements: 
- Node.js 16.9.0 or higher.
- TypeScript 4.5.4 or higher. (`npm install -g typescript`)*. 

<sub><sup>*Soft-requirment. Installing Typescript globally is not required, however recommended.</sup></sub>

### Getting Started:
1. Clone this project with `git clone https://github.com/gam03/Discord.jsTemplate`.
2. Navigate to the cloned directory (usually with `cd Discord.jsTemplate`).
3. Install required dependencies with `npm i` or `npm ci`.
4. Work from there. You can change or remove any existing project files.

### Running:
There are two ways to run this project. 

##### Method 1 (recommended when running locally): 

Simply run `npm run run` in this directory.


##### Method 2 (recommended when deploying):
- Run `npm run build` to transpile typescript files.
- Run `npm run start`* to run the transpiled files.

<sub><sup>*If, for some reason, `npm run start` fails, attempt to start the transpiled `index.js` files with `node bin/index.js`</sup></sub>


------------------------------------------------

### Contribution Guidelines:
If you'd like to contribute to this in any way, please ensure you follow the guidelines below.

- Contributions should focus on adding or improving infrastructure rather than creating new commands, events, etc. unless strictly necessary.
- Contributions should be thoroughly tested before creating a pull request.