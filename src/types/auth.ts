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

export type ISettings = {
	profile: {
		name: string;
		title: string;
		bio: string;
		avatar: string;
	};

	contact: {
		email: string;
		phone: string;
		location: string;
	};

	socialLinks: {
		github: string;
		linkedin: string;
		twitter: string;
		instagram: string;
	};

	resume: {
		url: string;
	};

	availability: {
		status: boolean;
		message: string;
	};

	typingTexts: string[];
};

export interface ISettingsRes {
	settings?: ISettings;
	success: boolean;
	message?: string;
	error?: string;
}
