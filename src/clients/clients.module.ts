import { Module } from "@nestjs/common";
// Modules \\
import { PrismaModule } from "@/prisma/prisma.module";
// Services \\
import { ClientsService } from "@/clients/clients.service";
// Controllers \\
import { ClientsController } from "@/clients/clients.controller";

@Module({
	imports: [PrismaModule],
	controllers: [ClientsController],
	providers: [ClientsService],
})
export class ClientsModule {}
