import { ClientId } from './ClientId';
import { ASTVisitor } from '../../visitors/ASTVisitor';
import { ASTNode } from '../ASTNode';
import { Token } from './Token';
import { GuildId } from './GuildId';

export class Config implements ASTNode {
	constructor(
		private readonly _token: Token,
		private readonly _clientId: ClientId,
		private readonly _guildId: GuildId
	) {}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitConfig(this, params);
	}

	get token() {
		return this._token;
	}

	get clientId() {
		return this._clientId;
	}

	get guildId() {
		return this._guildId;
	}
}
