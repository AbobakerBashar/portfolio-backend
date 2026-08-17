export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

export type LoginInput = {
	email: string;
	password: string;
};

export type AuthResponse = {
	token?: string;
	user?: {
		name: string;
		id: string;
		email: string;
	};
	success: boolean;
	message?: string;
	errors?: Record<string, string>;
};
