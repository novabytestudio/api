import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";
// Modules \\
import { AppModule } from "@/app.module";

async function init() {
	dotenv.config();
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.setGlobalPrefix("/v0");
	const config = new DocumentBuilder()
		.setTitle("Novabyte Studio API")
		.setVersion(process.env.API_VERSION)
		.addTag("Home")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/v0/docs", app, document, {
		customJs: [
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.js",
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-bundle.js",
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-bundle.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-standalone-preset.min.js",
		],
		customCssUrl: [
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.css",
			"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css",
		],
	});
	await app.listen(3000);
}

init();
