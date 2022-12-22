# EZDiscord
A simple, easy way to create Discord bots.

## Why EZDiscord?
Are you a Discord user who has wanted to make bots for your own servers? But when you looked into making one, you were faced with the hundreds of pages long Discord API documentation full of technical jargon, not knowing even where to start. Looking even further you might have found some libraries that wrap around the behemoth that is the Discord API to hopefully make it simpler, however said libraries also require other prerequisite knowledge on server run times such as Node.Js and asynchronous programming, something that you just do not have the time to go into.

If this is you then EZDiscord is your solution. EZDiscord is a DSL that heavily simplifies the process of creating Discord Bots, allowing anyone with very basic programming knowedlge to program their very own discord bot!

## Setting up a Development Environment

- Run `yarn install` to download dependencies
- Run `yarn antlr` to generate the antlr files required by the parse tree to AST converter.

## Documentation

Read the [Getting Started Guide](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/Getting-Started)

Documentation for the EZDiscord Language can be found [here](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/Language-Documentation).

## Compiling DSL code to TypeScript code

- create/modify the `bot.ezd` file in the root directory. 
  - Include the bot `Token`, `ClientID` and `GuildID`s taken from the Discord Developer Portal and Discord client.
  - Define the commands and variables according to the [documentation](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/Language-Documentation).

![](https://media.github.students.cs.ubc.ca/user/10171/files/58805e5c-486e-45d3-8dc0-241148cedb39)

- run `yarn ezd-compile` to generate a `.env` file and an `output.ts` sourcefile
<img width="247" alt="image" src="https://media.github.students.cs.ubc.ca/user/808/files/0efbcdf7-9497-472b-9eb0-4f6c5efd6f8b">

## Running the bot

- After generating the `.env` file and the TypeScript code, run `yarn ezd-run` to start the bot

<img width="795" alt="image" src="https://media.github.students.cs.ubc.ca/user/808/files/31a430ae-652e-49c5-907f-3923db7d5197">

## Compiling and running in one step

- run `yarn ezd-start` to compile the DSL code and run the bot

## Testing

- You can find the test suite within `./test` directory
- Current test suite includes (1) parser/lexer tests, (2) static error tests, (3) integration tests
- Run `yarn test` to run all 3 test suites
- Run `yarn test-parser` to run parser and lexer tests only
  - The tests were set up using JSON files which include input string and whether it's valid or invalid
  - There are 38 tests which require reading 38 JSON files, so the test might take some time
- Run `yarn test-static` to run static error checks only
  - Similarly to parser tests, static tests use input strings from JSON inputs and checks whether they raise static errors
- Run `yarn test-integration` to run integration tests only
  - Tests will use input file and attempt to create output file 
  - In valid case, the `valid.ts` will be generated and in invalid case the file will not be generated at all

## Syntax Highlighting

- Syntax highlighting is available for EZDiscord. You can install the [extension](https://marketplace.visualstudio.com/items?itemName=AsadDhorajiwala.ezdiscord-syntax-highlighter) from the VS Code Marketplace.

## Organization
- The tasks were created and assigned using issues
- The issues were then organized by project boards
- (AST/Compiler Team Project Board)[https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/projects/4]
- (Lexer/Compiler Team Project Board)[https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/projects/3]
- All boards are currently either empty or all done since the project has been completed
- Look into archived issues to see the progress
