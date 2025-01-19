import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateClientDto, UpdateClientDto } from "@/clients/lib/client.dto";
// Models \\
import { Client } from "@/clients/lib/client.model";
// Services \\
import { ClientsService } from "@/clients/clients.service";

@ApiTags("Clients")
@Controller({})
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) {}

	@Post("/clients")
	@ApiOperation({ summary: "Create a new client" })
	@ApiResponse({ status: 201, description: "The client has been successfully created.", type: Client })
	async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
		return this.clientsService.create(createClientDto);
	}

	@Get("/clients")
	@ApiOperation({ summary: "Get all clients" })
	@ApiResponse({ status: 200, description: "Return all clients.", type: Object })
	async findAll(): Promise<{ clients: Client[] }> {
		return this.clientsService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Get a client by id" })
	@ApiResponse({ status: 200, description: "Return the client.", type: Client })
	async findOne(@Param("id") id: string): Promise<Client> {
		return this.clientsService.findOne(+id);
	}

	@Put(":id")
	@ApiOperation({ summary: "Update a client" })
	@ApiResponse({ status: 200, description: "The client has been successfully updated.", type: Client })
	async update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
		return this.clientsService.update(+id, updateClientDto);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a client" })
	@ApiResponse({ status: 200, description: "The client has been successfully deleted." })
	async remove(@Param("id") id: string): Promise<void> {
		return this.clientsService.remove(+id);
	}
}
