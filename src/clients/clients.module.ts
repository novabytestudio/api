import { Module } from "@nestjs/common";
// Services \\
import { ClientsService } from "@/clients/clients.service";
// Controllers \\
import { ClientsController } from "@/clients/clients.controller";

@Module({
	controllers: [ClientsController],
	providers: [ClientsService],
})
export class ClientsModule {}
