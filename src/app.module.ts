import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
// Middleware \\
import { AuthMiddleware } from "@/auth/auth.middleware";
// Modules \\
import { ClientsModule } from "@/clients/clients.module";
// Controllers \\
import { AppController } from "@/app.controller";
import { ClientsController } from "@/clients/clients.controller";

@Module({
	imports: [ClientsModule],
	controllers: [AppController],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(ClientsController);
	}
}
