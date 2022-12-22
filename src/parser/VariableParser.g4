parser grammar VariableParser;
import FunctionCallParser, BinaryParser, MathParser, PrimitiveParser;
options { tokenVocab=EZDiscordLexer; }

variableDeclare: VAR VAR_NAME ASSIGNMENT_OP value;
variableAssign: VAR_NAME ASSIGNMENT_OP value;
value
    : boolean
    | number
    | string
    | varName
    | functionCall
    | array
    | math
    | binary
    ;

array: L_SQUARE (element (COMMA element)*)? R_SQUARE;
element
    : string
    | varName
    | number
    | boolean
    | functionCall
    ;
