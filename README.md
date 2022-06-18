# Discord.js Template
------------------------------------------------

## About:
This is a simple template for Discord bots written in TypeScript with the `discord.js-light` library. It comes with a basic set of features including Command and Event handlers. It also includes code snippets for Visual Studio Code (if you'd like to add snippets for other editors, please submit a pull request).

> Maintainers Note: This repository is not regularly maintained, and may not be completely up-to-date with new features/bugfixes for Discord.js (or other dependencies).

------------------------------------------------

### Requirements: 
- Node.js 16.9.0 or higher.
- TypeScript 4.5.4 or higher. (`npm install -g typescript`)*. 

> \* Soft-requirment. Installing Typescript globally is not required, however recommended.

------------------------------------------------

### Getting Started:
1. Clone this project with `git clone https://github.com/gam03/Discord.jsTemplate {folder name}`.
2. Navigate to the cloned directory (usually with `cd {folder name}`).
3. Install required dependencies with `npm i` or `npm ci`.
4. Work from there. You can change or remove any existing project files.

### Running:
There are two ways to run this project. 

##### Method 1 (recommended when running locally): 

Simply run `npm run run`* in this directory.

> \* `npm run run` is equivalent to `npm run build && npm run start`

##### Method 2 (recommended when deploying):
- Run `npm run build` to transpile typescript files.
- Run `npm run start`* to run the transpiled files.

> \* If, for some reason, `npm run start` fails, attempt to start the transpiled `index.js` files with `node bin/index.js`

------------------------------------------------

### Important:
- Currently, Slash Commands do NOT support permissions. If you have any commands that require permissions, you'll have to either implement that yourself or use text commands for any sensitive or moderation commands.

- TextCommands/SlashCommands/Events CAN be nested within subdirectories of their perspective directories. They will be recursively searched and found. This can help with project organization at scale. (**DISCLAIMER**: Snippets have been created with JUST the base directory in mind, so you have to change around some imports.)

- To create a seperate config (usually for debugging), create a `src/debug_config.ts` and copy/paste `src/config.ts` into it. Set `DebugMode` to `true` within `src/config.ts` to use the Debugging Config file.

- Buttons are **NOT** supported as of yet.

- In order for slash commands to work properly, you'll need to delete all of the data within `cache/application_commands.json` and replace it with just `[]`.

------------------------------------------------

### Contribution Guidelines:
If you'd like to contribute to this in any way, please ensure you follow the guidelines below.

- Contributions should focus on adding or improving infrastructure rather than creating new commands, events, etc. unless strictly necessary.
- Contributions should be thoroughly tested before creating a pull request.
