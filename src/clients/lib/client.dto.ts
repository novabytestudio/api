import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class DomainDto {
	@ApiProperty()
	@IsString()
	default: string;

	@ApiProperty()
	@IsString()
	owned: string;
}

class UrlDto {
	@ApiProperty()
	@ValidateNested()
	@Type(() => DomainDto)
	domains: DomainDto;

	@ApiProperty()
	@IsBoolean()
	hasOwnDomain: boolean;

	@ApiProperty()
	@IsString()
	expiry: string;
}

export class CreateClientDto {
	@ApiProperty()
	@IsNumber()
	repoId: number;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	status: string;

	@ApiProperty({ type: [UrlDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UrlDto)
	url: UrlDto[];

	@ApiProperty()
	@IsArray()
	updates: any[];
}

export class UpdateClientDto extends CreateClientDto {}
