import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto, UpdateClientDto } from "@/clients/lib/client.dto";
// Models \\
import { Client } from "@/clients/lib/client.model";

@Injectable()
export class ClientsService {
	private clients: Client[] = [];

	create(createClientDto: CreateClientDto): Client {
		const newClient: Client = {
			id: this.clients.length > 0 ? Math.max(...this.clients.map((c) => c.id)) + 1 : 1,
			...createClientDto,
			createdAt: new Date().toISOString(),
		};
		this.clients.push(newClient);
		return newClient;
	}

	findAll(): { clients: Client[] } {
		return { clients: this.clients };
	}

	findOne(id: number): Client {
		const client = this.clients.find((client) => client.id === id);
		if (!client) {
			throw new NotFoundException(`Client with ID ${id} not found`);
		}
		return client;
	}

	update(id: number, updateClientDto: UpdateClientDto): Client {
		const clientIndex = this.clients.findIndex((client) => client.id === id);
		if (clientIndex === -1) {
			throw new NotFoundException(`Client with ID ${id} not found`);
		}
		const updatedClient = { ...this.clients[clientIndex], ...updateClientDto };
		this.clients[clientIndex] = updatedClient;
		return updatedClient;
	}

	remove(id: number): void {
		const clientIndex = this.clients.findIndex((client) => client.id === id);
		if (clientIndex === -1) {
			throw new NotFoundException(`Client with ID ${id} not found`);
		}
		this.clients.splice(clientIndex, 1);
	}
}
