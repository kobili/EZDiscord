parser grammar ConditionAndLoopParser;
import BinaryParser, FunctionCallParser, VariableParser;
options { tokenVocab=EZDiscordLexer; }

condition: IF conditionBlock (ELSE statementBlock)?;
conditionBlock: L_PAREN VAR_NAME R_PAREN statementBlock;

loop
    : WHILE whileBlock
    | FOR forEachBlock
    ;

whileBlock: L_PAREN VAR_NAME R_PAREN statementBlock;
forEachBlock: L_PAREN forEachBlockLoopVar IN forEachBlockArray R_PAREN statementBlock;
forEachBlockArray: VAR_NAME;
forEachBlockLoopVar: VAR_NAME;

statementBlock: L_CURLY (blockStatement)* R_CURLY;

blockStatement
    : functionCall
    | condition
    | variableAssign
    | variableDeclare
    | loop
    ;
