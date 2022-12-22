parser grammar PrimitiveParser;
options { tokenVocab=EZDiscordLexer; }

string: S_QUOTE STRING_VALUE? STRING_CLOSE;
boolean: BOOLEAN;
number: NUMBER;
varName: VAR_NAME;
