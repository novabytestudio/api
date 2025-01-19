import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateClientDto, UpdateClientDto } from "@/clients/lib/client.dto";
// Services \\
import { ClientsService } from "@/clients/clients.service";

@ApiTags("Clients")
@Controller("clients")
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) {}

	@Post()
	@ApiOperation({ summary: "Create a new client" })
	@ApiResponse({ status: 201, description: "The client has been successfully created." })
	async create(@Body() createClientDto: CreateClientDto) {
		return this.clientsService.create(createClientDto);
	}

	@Get()
	@ApiOperation({ summary: "Get all clients" })
	@ApiResponse({ status: 200, description: "Return all clients." })
	async findAll() {
		return this.clientsService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Get a client by id" })
	@ApiResponse({ status: 200, description: "Return the client." })
	async findOne(@Param("id") id: string) {
		return this.clientsService.findOne(+id);
	}

	@Put(":id")
	@ApiOperation({ summary: "Update a client" })
	@ApiResponse({ status: 200, description: "The client has been successfully updated." })
	async update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
		return this.clientsService.update(+id, updateClientDto);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a client" })
	@ApiResponse({ status: 200, description: "The client has been successfully deleted." })
	async remove(@Param("id") id: string) {
		await this.clientsService.remove(+id);
	}
}
