import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const token = req.query.token;

		switch (true) {
			case !token:
				return res.status(401).send({ NovabyteStudioAPI: "No se proporcionó un token de acceso." });

			case token !== process.env.ACCESS_TOKEN:
				return res.status(401).send({ NovabyteStudioAPI: "Token de acceso incorrecto." });

			case token === process.env.ACCESS_TOKEN:
				return next();

			default:
				return res.status(401).send({ NovabyteStudioAPI: "No autorizado." });
		}
	}
}
