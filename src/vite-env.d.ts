/// <reference types="vite/client" />

interface ImportMetaEnv {
	// APIのエンドポイントBaseURL
	readonly VITE_API_URL: string;
	readonly VITE_APP_KEY: string;
	readonly VITE_AWS_REGION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
