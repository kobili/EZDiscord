parser grammar CommandParser;
import FunctionCallParser, VariableParser, ConditionAndLoopParser;
options { tokenVocab=EZDiscordLexer; }

command: COMMAND VAR_NAME L_PAREN (argument (COMMA argument)*)? R_PAREN statementBlock;

argument: VAR_NAME COLON type;

type
    : BOOL
    | NUM
    | STR
    ;
