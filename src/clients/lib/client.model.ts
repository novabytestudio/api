import { ApiProperty } from "@nestjs/swagger";

class Domain {
	@ApiProperty()
	default: string;

	@ApiProperty()
	owned: string;
}

class Url {
	@ApiProperty()
	domains: Domain;

	@ApiProperty()
	hasOwnDomain: boolean;

	@ApiProperty()
	expiry: string;
}

export class Client {
	@ApiProperty()
	id: number;

	@ApiProperty()
	repoId: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	status: string;

	@ApiProperty()
	createdAt: string;

	@ApiProperty({ type: [Url] })
	url: Url[];

	@ApiProperty({ type: [Object] })
	updates: any[];
}
