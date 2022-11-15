import { HttpStatus } from "@nestjs/common";

export {};

declare global {
	namespace UnifiedChat {
		interface APIRes<T> {
			statusCode: HttpStatus;
			message: string;
			data: T;
		}

		interface SecretsPayload {
			key: string;
			value: string;
		}
	}
}
