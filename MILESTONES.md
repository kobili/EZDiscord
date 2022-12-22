# Project1Group2
## Milestone 1
**Brief description of your planned DSL idea**
- Create a DSL that would allow user with some programming experience set up and deploy discord bots
- Users would be able to set up multiple bots for multiple servers
- DSL would wrap around Discord.js library

**Ideas so far for main language features**
- Ability to set bot name
```
create bot FredBot
```
- Create basic variables
```
create string a_string= "hello"
create string todo_list = ["todo1", "todo2"]
create boolean a_boolean = true
```
- Create commands
```
create command add_to_list(item): 
    todo_list.add(item)

create command remove_from_list(index): 
    todo_list.remove(index)
```
- Use previosly created commands in other commands in nested way
```
create command is_guess_correct(start, end, guess): 
    create number random_number = random(start, end)
    return random_number == guess

create command test_guess(): 
    create number start = 0
    create number end = 10
    create number guess = 5
    create boolean is_correct = is_guess_correct(start, end, guess)
    # or pass the values directly: create boolean is_correct = is_guess_correct(0, 10, 5)
    if is_correct:
        print("correct")
    else:
        print("incorrect")
```
- Looping
```
create command print_1_10(): 
    create number a_number = 1
    10 times:
        print(a_number)
        a_number += 1

create command print_list(): 
    # normal loop
    # index is optional to get the index of the loop kinda like how .map() in javascript allows you to get the index optionally
    todo_list.length times index:
        print(todo_list[index])

    # or 

    # for each loop for lists
    todo_list.each(item):
        print(item)
```
- Add events that can trigger and repeat
```
# Time is a standard library that we will implement
use cron from Time
create command create_timer(): 
    cron("0 0 0 * * *", print_1_10)
```
- Add bots to servers using list of discord tokens
```
# add both to all servers in list
add bot FredBot to servers [DISCORD_TOKEN_1, DISCORD_TOKEN_2]
```
- Will provide a standard library of various functionalities built into the language
```
# example of importing a function from the Math standard library (we will support a bunch of common Math functions)
use random from Math
```
Example Program:
```
create bot FredBot

create string a_string= "hello"
create string todo_list = ["todo1", "todo2"]
create boolean a_boolean = true

# this is a comment

create command print_1_10(): 
    create number a_number = 1
    10 times:
        print(a_number)
        a_number += 1

create command print_list(): 
    # normal loop
    # index is optional to get the index of the loop kinda like how .map() in javascript allows you to get the index optionally
    todo_list todo_list.length times index:
        print(todo_list[index])

    # or 

    # for each loop for lists
    todo_list.each(item):
        print(item)

create command add_to_list(item): 
    todo_list.add(item)

create command remove_from_list(index): 
    todo_list.remove(index)

# example of importing a function from the Math standard library (we will support a bunch of common Math functions)
use random from Math

create command is_guess_correct(start, end, guess): 
    create number random_number = random(start, end)
    return random_number == guess

create command test_guess(): 
    create number start = 0
    create number end = 10
    create number guess = 5
    create boolean is_correct = is_guess_correct(start, end, guess)
    # or pass the values directly: create boolean is_correct = is_guess_correct(0, 10, 5)
    if is_correct:
        print("correct")
    else:
        print("incorrect")

# add event that calls repeats
# Time is a standard library that we will implement
use cron from Time
create command create_timer(): 
    cron("0 0 0 * * *", print_1_10)

# add both to all servers in list
add bot FredBot to servers [DISCORD_TOKEN_1, DISCORD_TOKEN_2]
```


**Notes of any important changes/feedback from TA discussion**
- TA suggested enriching our language by adding variables, standard math functions and ability to call previosly created functions
- TA suggested a good way to test complexity of the language is to see if the user is capable of creating a simple game like rock/paper/scissors or slot machine

**Any planned follow-up tasks or features still to design**
- Still need to discuss the limitations of the language
- Planning to further develop language example to be more natural english

## Milestone 2

**Planned division of responsibilities**

- Split up into small teams when starting to implement:
    - team for lexer/parser
    - team for ast tree design
    - team for compiler

**Roadmap**

- make discord bot based on popular discord bots
    - use this to help further restrict and simplify our language
- First draft of DST
    - [ ]  Have grammar ready and code examples
    - [ ]  Pick a simple goal that our language can accomplish and write psuedo code with our language that fulfills said goal
    - [ ]  Give DST to user with code example and see if they can explain what the code example does and get feedback
        - can they understand what the code does/makes? why or why not?
    - [ ]  Give DST to users and see if they are able to achieve goal using our language
        - were they able to do it? how long did it take?
    - [ ]  get feedback from user

- implementation
    - [ ]  After getting feedback, start with actual implementation of language

**Draft Grammar**

```python
Setting program start/end
`start bot` `end bot`--> keywords
Variables 
`var name = <value>`
Loops:
Only use WHILE
`while (counter<10) {}`
Binary logic:
Numerical comparison (>, ==, <, <=, >=, !=)
AND/OR/NOT
If/else
If (true) {}
else  {}
Commands: → “/” commands
`command <name>(arg, arg2, …): {STATEMENTS+}`
If a command is added to the bot (via `addCommand(command1, “command1”)`) then it cannot be called from within another command
STATEMENTS:
Can be variable initialization
Binary logic
if/else
Loop
Math operation
Adding commands as `/` callable
`addCommand(command1, “command1”)`
Math operations:
operators: +, -, *, /
NUM operator NUM
Array operations
Adding elements: push(<arrayName>, <value>)
Removing elements: remove(<arrayName>, <index>)
Accessing elements: get(<arrayname>, <index>)
Access length of array: len(<arrayName>
In-built functions
print(<text> : string)Setting program start/end
```

**TA feedback  (already applied to draft grammar):**

- Types can be removed
- Array operations good
- Figure out what specific bot we want -> write example program -> cut off what we dont need
- Zone in on what specific bot we want to make and specialize our DSL on that
    - Looked at the most popular bots and found some trends. Used this info to decide on bot ideas for now


## Milestone 3

### Concrete Grammar Design used for the user study
_The grammar already includes feedback from the TA_
```python
# Setting program start/end (also reserved, key words)
`start bot` `end bot`

# Variables 
`var name = <value>`

# Loops:
`while (counter<10) {}`
`for (<item> in <arrayName>) {}`

# Numerical comparison
(>, ==, <, <=, >=, !=)

# Logical operators
`AND/OR/NOT`

# If/else (conditional statement)
`If (true) {}`
`else  {}`

# Math operations:
`operators: +, -, *, /`
`NUM operator NUM`

# Array operations
# Adding elements: 
`push(<arrayName>, <value>)`
# Removing elements: 
`remove(<arrayName>, <index>)`
# Accessing elements:
`get(<arrayname>, <index>)`
# Access length of array: 
`len(<arrayName>`
# Return the index of first match. Return -1 if can't find
find(<arrayName>, <value>)

# Commands. They will be callable from Discord using /<command name>
`command <name>(arg, arg2, …): {STATEMENTS+}`

# STATEMENTS:
# Can be variable initialization
# Binary logic
# if/else
# Loop
# Math operation
# Built in function

# In-built functions
# Bot will reply in channel with the input string
reply (<text> : string)
# Returns random number between min and max (inclusive) 
random (min, max)

# Allowed types in language
String
Number # will think of everything as float
Boolean
Array
```

### TA feedback
- Due to time constraints, remove majority of built-in functions and focus on reply and random
- Special classes like User and Role can be removed for now. Only implement if there is enough time
- Goal for MVP is to implement a simple bot e.g. rock paper scissors, random item from array, etc. 
- User studies looked good

### User studies
[Our user studies](USER_STUDIES.md)

### Plan for week 4
- Lexer team start on implementing parser for everything that can be used outside of commands and loops
- Implementation team will start building architecture for the project



## Milestone 4

### Status of implementation
#### Lexer and Parser team
- This week Lexer & Parser team has completed implementation for majority of the features
- Main priority is now testing the parser and lexer
Team Board bellow:

![Lexer & Parser Team Board](https://media.github.students.cs.ubc.ca/user/10171/files/fc8114f4-ab6e-4d37-989f-9bb0dd6963b7)

#### AST and Compiler team
- The team has completed implementation of features such as:
  - Generating .env config file
  - Comments
  - Variable declaration
  - Math operations
  - Binary operations
- Final features are yet to be implemented:
  - Parsing conditions
  - Parsing loops
  - Parsing functions
Team Board bellow:

![AST & Compiler Team Board](https://media.github.students.cs.ubc.ca/user/10171/files/92cd76f3-84c5-4f57-830e-c94b056f9bbe)


### Plans for final user study
- Majority of the project will be finalized by Wednesday, October 12th
- The final user study will take place right after
- Goals:
  - Have at least 2 users
  - Provide documentation and basic instructions
  - Ask the users to implement a bot of their liking or provide some ideas for them, e.g. rock-paper-scissors bot, random item in array bot, etc.
  - Record user study
  - Note to what extent were the users able to utilize the language features
- The final video will include the user studies


### Planned timeline for the remaining days
- Complete AST and Compiler team final tickets
- Testing
- Create a thorough documentation
- Main dates:
  - October 12th, complete majority of functionality
  - October 12th - October 14th, conduct final user study
  - October 14th-17th, work on the final video

### TA feedback
- Attempt to do user study earlier to allow for some time to tweak the last few things
- Had a conversation about [TS-morph](https://ts-morph.com/)
  - Bulk of evaluation will be done by TS-morph (like math operations)
  - The TA said it should be OK to use as long as other project details are up to standard


## Milestone 5
### Status of Implementation
- Parser and Lexer rules completed
- AST, Evaluator, Static Checks completed
- Parser, Lexer, Static checks tests added
- All tests pass
- Added Documentation and README.md overview
- [Documentation](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/)
- [Overview](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/blob/main/README.md)


### Status/results of final user study
- Completed 3 user studies
- All users were able to write and compile EZD code and test the bots on the server
- Things users were confused about:
  - Conditionals and loops work only with variables
    - Many user wanted to do `if (a > 10)` instead of `if (var_name)`
  - Some were confused about the difference between `'` and `"`
    - Some tried to set up strings with `"` but thanks to the syntax highlighting they were able to figure it out
  - Some users thought there should also be a way to string concatenation
    - Some tried to use `a = a + "fff"` however it was not supported in our language design
  - One user thought `else if` should be present 
    - One user wanted to use `else if` but quickly realized that everything his bot needed to do could be done with just `if` and `else`

## Reflecting on User studies
- One big point of confusion was the lack of binary expressions inside conditionals
  - After much deliberation among the team members we decided that we will still not allow binary expressions inside conditionals or loops
  - The main reasoning behind it is the posibility of more errors on run time
  - For instance:
  - ```
    arr = [TRUE, '1', FALSE]
    a = get(arr, 1)
    if (a > 10) {
      <code>
    }
  - This code will generate run time error since we won't know what the value of `a` is until we actually reach conditional statement
  - Thus, this might increase error-proneness
  - Furthermore, our current implementation can still do everything the users need even without allowing the binary expressions in conditionals
  - Hence, we decided to stick with our current implementation
- Another point of confusion was the lack of string concatenation
  - We added a new built-in function `concat()` which can take any type of arguments and return a string concatenation of them
  - [More in documentation](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/Language-Documentation#concatargs) 
- There was small confusion about lack of `else if`
  - After some deliberation, we decided to not include `else if`
  - Our current implementation allows for the same functionality even without `elsee if`
  - Furthermore, only 1 user wanted the change and was still able to write the code without `else if`
- Finally, some people were confused about `'` vs `"`
  - As a team we decided to keep `'` instead of using `"`
  - The functionality is the same whether it's `'` or `"`
  - Furthermore, our syntax highlighter allows for the users to see if they make this mistake

## Any changes to the language design
- After the user study, we added `concat` function
  - [More information about it](https://github.students.cs.ubc.ca/CPSC410-2022W-T1/Project1Group2/wiki/Language-Documentation#concatargs)

## Planned timeline for the remaining days 
- Add integration tests on Friday night
- Complete the script for the video on Saturday
- Film video and voice-over on Saturday
- Complete editing and submit the video on Saturday

## TA feedback
- TA was satisfied with progress
- Suggested we include user studies in the video