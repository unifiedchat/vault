import { ArrayNotEmpty } from "class-validator";

export abstract class PostDTO {
	@ArrayNotEmpty()
	secrets: UnifiedChat.SecretsPayload[];
}
