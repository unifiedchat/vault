import { factory } from "@config";
import { AuthGuard } from "@guards/auth.guard";
import { HealthModule } from "@modules/health/health.module";
import { SecretsModule } from "@modules/secrets/secrets.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AppController } from "./app.controller";

@Module({
	imports: [
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 10,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [factory],
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				dialect: "postgres",
				autoLoadModels: true,
				synchronize: true,
				host: config.get("POSTGRES.host"),
				port: config.get("POSTGRES.port"),
				username: config.get("POSTGRES.username"),
				password: config.get("POSTGRES.password"),
				database: config.get("POSTGRES.database"),
			}),
			inject: [ConfigService],
		}),
		HealthModule,
		SecretsModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
