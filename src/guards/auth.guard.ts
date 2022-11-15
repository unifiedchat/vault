import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Octokit } from "@octokit/core";

@Injectable()
export class AuthGuard implements CanActivate {
	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const req = ctx.switchToHttp().getRequest();

		let token: string =
			req.headers["x-access-token"] ||
			req.headers["authorization"] ||
			req.query["access_token"];
		if (!token) throw new UnauthorizedException("Access token expected.");
		token = token.startsWith("Bearer")
			? token.match(/[^Bearer]\S+/g)[0].trim()
			: token;

		const octokit = new Octokit({ auth: token });

		const {
			data: { login },
		} = await octokit.request("GET /user").catch(() => {
			throw new UnauthorizedException("Invalid access token.");
		});

		await octokit
			.request("GET /orgs/unifiedchat/memberships/{login}", {
				login,
			})
			.catch(() => {
				throw new UnauthorizedException("Not a member.");
			});

		return true;
	}
}
