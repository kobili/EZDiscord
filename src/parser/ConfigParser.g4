parser grammar ConfigParser;
import PrimitiveParser;
options { tokenVocab=EZDiscordLexer; }

config
    : token (clientID guildID | guildID clientID)
    | clientID (token guildID | guildID token)
    | guildID (token clientID | clientID token)
    ;

token: TOKEN ASSIGNMENT_OP string;

clientID: CLIENT_ID ASSIGNMENT_OP string;

guildID: GUILD_ID ASSIGNMENT_OP guildIDArray;

guildIDArray: L_SQUARE string (COMMA string)* R_SQUARE;
