import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto, UpdateClientDto } from "@/clients/lib/client.dto";
// Services \\
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class ClientsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createClientDto: CreateClientDto) {
		const { url, updates, ...clientData } = createClientDto;

		return await this.prisma.client.create({
			data: {
				...clientData,
				createdAt: new Date(),
				url: {
					create: url.map((urlItem) => ({
						...urlItem,
						domains: {
							create: urlItem.domains,
						},
					})),
				},
				updates: {},
			},
			include: { url: { include: { domains: true } } },
		});
	}

	async findAll() {
		const clients = await this.prisma.client.findMany({
			include: { url: { include: { domains: true } } },
		});
		return { clients };
	}

	async findOne(id: number) {
		const client = await this.prisma.client.findUnique({
			where: { id },
			include: { url: { include: { domains: true } } },
		});
		if (!client) {
			throw new NotFoundException(`Client with ID ${id} not found`);
		}
		return client;
	}

	async update(id: number, updateClientDto: UpdateClientDto) {
		const { url, updates, ...clientData } = updateClientDto;

		const existingClient = await this.prisma.client.findUnique({ where: { id } });
		if (!existingClient) {
			throw new NotFoundException(`Client with ID ${id} not found`);
		}

		// Actualiza el cliente
		return await this.prisma.client.update({
			where: { id },
			data: {
				...clientData,
				url: {
					deleteMany: {},
					create: url.map((urlItem) => ({
						...urlItem,
						domains: {
							create: urlItem.domains,
						},
					})),
				},
				updates: {},
			},
			include: { url: { include: { domains: true } } },
		});
	}

	async remove(id: number) {
		// Verifica si el cliente existe
		const existingClient = await this.prisma.client.findUnique({ where: { id } });
		if (!existingClient) {
			throw new NotFoundException(`Client with ID ${id} not found`);
		}

		await this.prisma.client.delete({ where: { id } });
	}
}
