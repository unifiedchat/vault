import { config } from "dotenv";
import { Snowlfake } from "generate-snowflake";

config();

const EPOCH = new Date("2022-11-15T00:00:00Z").getTime();

export const factory = () => {
	return {
		PORT: parseInt(process.env.PORT),
		API_VERSION: process.env.API_VERSION,
		POSTGRES: {
			host: process.env.POSTGRES_HOST,
			port: parseInt(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB_NAME,
		},
		SECRET: process.env.SECRET,
		EPOCH,
		SNOWFLAKE: new Snowlfake(EPOCH),
	};
};

export const CONFIG = factory();
