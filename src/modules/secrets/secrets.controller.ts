import { PostDTO } from "@dto/post.dto";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { SecretsService } from "./secrets.service";

@Controller("secrets")
export class SecretsController {
	constructor(private readonly secretsService: SecretsService) {}

	@Post()
	async postSecrets(
		@Body() postDTO: PostDTO,
	): Promise<UnifiedChat.APIRes<boolean>> {
		return this.secretsService.postSecrets(postDTO);
	}

	@Get()
	async getSecrets(): Promise<
		UnifiedChat.APIRes<UnifiedChat.SecretsPayload[]>
	> {
		return this.secretsService.getSecrets();
	}
}
