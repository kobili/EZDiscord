parser grammar BinaryParser;
import FunctionCallParser, PrimitiveParser;
options { tokenVocab=EZDiscordLexer; }

binary: binaryExpr;

binaryExpr
    : L_PAREN (binaryExpr | boolean | string) R_PAREN binaryExprRight?
    | NOT (binaryExpr | binaryAtom) binaryExprRight?
    | binaryAtom binaryExprRight
    ;

binaryAtom
    : boolean
    | number
    | varName
    | string
    | functionCall 
    ;

binaryExprRight
    : BINARY_COMPARE (binaryExpr | binaryAtom) binaryExprRight?
    | BINARY_OP (binaryExpr | binaryAtom) binaryExprRight?
    ;
