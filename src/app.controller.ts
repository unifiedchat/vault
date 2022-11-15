import { Controller, Get, HttpStatus } from "@nestjs/common";

@Controller()
export class AppController {
	@Get()
	async getHello(): Promise<UnifiedChat.APIRes<string>> {
		return {
			statusCode: HttpStatus.OK,
			message: "Ping,",
			data: "Pong!",
		};
	}
}
