parser grammar EZDiscordParser;
import ConfigParser, VariableParser, CommandParser;
options { tokenVocab=EZDiscordLexer; }

bot : config statement* EOF;

statement
    : variableDeclare
    | command
    ;
