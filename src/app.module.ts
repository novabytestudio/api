import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
// Middleware \\

// Modules \\
import { ClientsModule } from "@/clients/clients.module";
// Controllers \\
import { AppController } from "@/app.controller";

@Module({
	imports: [ClientsModule],
	controllers: [AppController],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {}
}
