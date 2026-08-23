export type ErrorResponse = {
	success: false;
	message?: string;
	errors?: Record<string, string>;
};
