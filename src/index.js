/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env) {
		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json;charset=UTF-8",
		};

		const path = new URL(request.url).pathname;
		switch (path) {
			case "/.well-known/matrix/client":
				return new Response(
					`{"m.homeserver": {"base_url": "${env.HOMESERVER_URL}"}, "m.identity_server": {"base_url": "${env.IDENTITY_SERVER_URL}"}}`,
					{ headers: headers }
				);
			case "/.well-known/matrix/server":
				return new Response(`{"m.server": "${env.FEDERATION_SERVER}"}`, { headers: headers });
			default:
				return new Response("Invalid request", { headers: headers });
		}
	},
};
