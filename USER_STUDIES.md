# User Study (Kobe)

- User thought the language was pretty straightforward and intuitive if you're familiar with other languages
- User comes from a salesforce background and defines strings using single quotes
- User thought that the `start bot` and `end bot` blocks were a sort of main function rather than an encapsulation of the entire program
  - This could probably be handled via documentation

## What we made

```js
start bot
command helloWorld(ntimes?: int){
    var message = "Hello world!";

    if (ntimes == undefined OR ntimes <= 0){
        reply(message);
    }
    else{
        var counter = 0;
        while (counter !== ntimes){
            reply(message);
            couter = counter + 1;
        }
    }
}

var names = ["Lee Roy", "Kobe", "Saad"];

command greet(){

    var message = "Hello ";

    var count = 0;
    foreach(name : names){
        message = message + name;
        count = count + 1;
        if (len(names) >= count){
            message = message + ", ";
        }
        else{
            message = message + ".";
        }
    }
    reply(message);
}

end bot

token = TOKEN,
clientID = client_id,
guildId = guild_Id
```

# User Study (Valdi)

user - Computer Science Major from Purdue University

## Can they understand the code

- arguments:
  - can understand the optional argument
- body:
  - able to understand / infer what built in functions can do from name of functions
  - able to understand what the code does

## Can they write

- Prompt: A bot with an echo command that echos the users input
- notes:
  - pretty fast set up (start end token, etc)
  - made the echo command very fast
- Prompt: global counter that gets add up via a sum command
- notes:
  - able to assume other types like Numbers
  - able to finish the add sum function very fast
- Promt: ToDoList
- notes:
  - able to make a global variable for list
  - easily did the `addToDo` command
  - able to use for each to do a complex `seeToDo` command
  - add `stop` keyword to stop command early?
  - able to implement `deleteToDo` even using 1-base indexing and even doing early returns

## Overall thoughts

- build in functions of reply, followUp, edit is very useful
- Thinks the dsl achieves its goal of simplifying the process
- misses objects from javascript
- certain stuff like only having one `reply` is not explicit
- wants more explicit control flow (i.e when to stop the command)
- the ability to make helper functions would be nice
- people with a solid programming background is able to pick up the language very fast and already create somewhat complex commands for bots

## Code they wrote

```js
start bot

// token, etc.

var todoList = []

// Iterate the todo list, list out all items with index
command seeTodo() {
    var i = 0
    var replyString
    for (item in todoList) {
        replyString += (i + 1) + ': ' + get(todoList, i) + '\n'
        i++
    }
    reply(replyString)
}

// Append arg item to the end of todo list
command addTodo(item: String) {
    add(todoList, item)
    reply(item + ' added!')
}

command deleteTodo(index: Number) {
    if (index <= 0) {
        reply('Index must be greater than 0')
    }

    if (index > len(todoList)) {
        reply('Index must be less than or equal to the number of items in the list: ' + len(todoList))
    }
    
    var removedItem = get(todoList, index - 1)
    remove(todoList, index - 1)
    reply('Item: ' + removedItem + ' at index ' + index + ' was removed')
}

end bot
```

# User Study (Asad)

- User found the language to be very intuitive and easy to understand because of the similarities to Js and Ts
- User was able to implement a simple joke bot in a short amount of time using simple array operations and in-built functions
- User thought that `start bot` and `end bot` should be removed entirely
- User was able to condense the joke bot into a single line after the initial implementation
- User liked the idea that data can be potentially be imported from csv files

## User's Code

```js
start bot

token = TOKEN
clientID = CLIENT_ID
guildId = GUILD_ID

var jokes = [
    "I don’t have a carbon footprint.\nI just drive everywhere.",
    "The most corrupt CEOs are those of the pretzel companies.\nThey’re always so twisted.",
    "When we were kids, we used to be afraid of the dark.\nBut when we grew up, the electricity bill made us afraid of the light!",
    "An apple a day keeps the doctor away…\nOr at least it does if you throw it hard enough.",
    "I visited my friend at his new house. He told me to make myself at home.\nSo I threw him out. I hate having visitors."
]
// var jokes = csvToArray("jokes.csv")

command joke() {
    reply(get(jokes, random(0, len(jokes))))
}

command addJoke(joke: String) {
    add(jokes, joke)
    reply("Joke added!")
}

addCommand("tell-me-a-joke", joke)
addCommand("add-joke", addJoke)

end bot
```


# User Study (Akim)
- User only uses coding for research purposes (Python + R)
- User tried to write a code to pick random restaurant from restaurants.csv
- Couldn't do it without an example
- Was confused about optional arguments
- config part was confusing but they ignored it since the code never uses it

users code:
```
start bot

command pickToEat() {
    restaurant = csvToArray("restaurants.csv")
    restaurant.get(random(0, length(restaurant))) 
}

addCommant("pickFood", pickToEat)
```

# User Study (Alex)
User: CPSC major from UBC, not in 410

## Can they understand the code:

They can understand the code and the grammar, but also point out some ambiguous in the grammar design

## Can they write:

They ca use the grammar to write a bot.

## Feedback:

- command must has reply()
- Need to mention we support float.


