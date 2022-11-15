import { SecretModel } from "@models/secret.model";
import { SecretsController } from "@modules/secrets/secrets.controller";
import { SecretsService } from "@modules/secrets/secrets.service";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
	imports: [SequelizeModule.forFeature([SecretModel])],
	controllers: [SecretsController],
	providers: [SecretsService],
	exports: [SequelizeModule],
})
export class SecretsModule {}
