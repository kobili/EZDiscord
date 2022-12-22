lexer grammar EZDiscordLexer;

// DEFAULT_MODE
WS: [\r\n\t ] -> skip;

// Configs
TOKEN: 'Token';
CLIENT_ID: 'ClientID';
GUILD_ID: 'GuildID';

// Types
BOOLEAN: TRUE | FALSE;
TRUE       : 'true' ;
FALSE      : 'false';
NUMBER     : [0-9]+ ( '.' [0-9]+ )? ;

// Binary Logic
BINARY_OP: AND | OR;
BINARY_COMPARE: GT | GE | LT | LE | EQ | NQ;
AND        : 'and' ;
OR         : 'or' ;
NOT        : 'not';
GT         : '>' ;
GE         : '>=' ;
LT         : '<' ;
LE         : '<=' ;
EQ         : '==' ;
NQ         : '!=' ;

// Math Operators
//MATH_OPERATOR: ADD | SUB | MULT | DIV | MOD;
ADD: '+';
SUB: '-';
MULT: '*';
DIV: '/';
MOD: '%';

// Variables
VAR: 'var';
ASSIGNMENT_OP: '=';

// Functions
FUNCTION: ('random' | 'add' | 'remove' | 'get' | 'set' | 'len' | 'find' | 'reply' | 'concat');

// Conditional
IF: 'if';
ELSE: 'else';

// Loops
WHILE: 'while';
FOR: 'for';
IN: 'in';

// Commands
COMMAND: 'command';
BOOL: 'boolean';
NUM: 'number';
STR: 'string';

// Brackets
L_CURLY : '{';
R_CURLY : '}';
L_SQUARE : '[';
R_SQUARE : ']';
L_PAREN : '(';
R_PAREN : ')';

// Other
COLON: ':';
S_QUOTE : '\'' -> pushMode(STRING_MODE);
COMMA : ',';
COMMENT: '//' ~[\r\n]* -> skip;

//  variable name (for assignment)
VAR_NAME: [a-zA-Z][a-zA-Z0-9_]*;

// String Mode
mode STRING_MODE;
STRING_VALUE: ~[']+;
STRING_CLOSE: '\'' -> popMode;
