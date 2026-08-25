export type ErrorResponse = {
	success: false;
	message?: string;
	errors?: Record<string, string>;
};

export interface AppError extends Error {
	statusCode?: number;
	code?: number;
}
