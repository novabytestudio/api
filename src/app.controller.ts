import { Controller, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags("Home")
@Controller({})
export class AppController {
	@Get("/")
	getStatus(@Res() response: Response) {
		response.status(200).json({
			NovabyteAPI: `Version: ${process.env.API_VERSION}`,
			Author: "https://github.com/fedetomassini",
			Documentation: "/v1/docs",
		});
	}
}