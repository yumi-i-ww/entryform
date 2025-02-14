export class HTTPError extends Error {
	public code: string;
	public message: string;

	constructor(public response: Response) {
		super(`HTTP Error: ${response.status} ${response.statusText}`);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}

		Object.setPrototypeOf(this, new.target.prototype);

		this.code = "";
		this.message = "";
	}

	async parseErrorData(): Promise<void> {
		if (this.response.headers.get("Content-Type")?.includes("application/json")) {
			const responseText = await this.response.text();
			try {
				const errorData = JSON.parse(responseText);
				this.code = this.response.status.toString();
				this.message = errorData.result;
			} catch (error) {
				console.error("Failed to parse error response", error);
			}
		}
	}
}
