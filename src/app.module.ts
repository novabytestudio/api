import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
// Middleware \\

// Modules \\

// Controllers \\
import { AppController } from "@/app.controller";

@Module({
	imports: [],
	controllers: [AppController],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {}
}
