parser grammar FunctionCallParser;
import PrimitiveParser;
options { tokenVocab=EZDiscordLexer; }

functionCall: FUNCTION params;
params: L_PAREN (param ( COMMA param )*)? R_PAREN;
param
    : varName
    | boolean
    | number
    | string
    | functionCall
    ;
