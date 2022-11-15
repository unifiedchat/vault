import { PostDTO } from "@dto/post.dto";
import { SecretModel } from "@models/secret.model";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { decrypt, encrypt } from "src/crypto";

@Injectable()
export class SecretsService {
	constructor(
		@InjectModel(SecretModel)
		private readonly secretModel: typeof SecretModel,
	) {}

	public async postSecrets({
		secrets,
	}: PostDTO): Promise<UnifiedChat.APIRes<boolean>> {
		for (const secret of secrets) {
			await this.secretModel.upsert({
				key: secret.key,
				value: encrypt(secret.value),
			});
		}

		return {
			data: true,
			message: "Secrets posted successfully.",
			statusCode: HttpStatus.OK,
		};
	}

	public async getSecrets(): Promise<
		UnifiedChat.APIRes<UnifiedChat.SecretsPayload[]>
	> {
		const secrets = await this.secretModel.findAll();

		return {
			message: "Secrets fetched successfully.",
			statusCode: HttpStatus.OK,
			data: secrets.map((secret) => ({
				key: secret.key,
				value: decrypt(secret.value),
			})),
		};
	}
}
