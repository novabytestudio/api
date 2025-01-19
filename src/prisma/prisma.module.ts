import { Module } from "@nestjs/common";
// Services \\
import { PrismaService } from "@/prisma/prisma.service";

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
