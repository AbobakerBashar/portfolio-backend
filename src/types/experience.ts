export interface ExperienceEntry {
	company: string;
	position: string;
	period: string;
	type: string;
	location: string;
	description: string;
	responsibilities: string[];
	tech: string[];
	color: string;
}

export interface ExperienceResponse {
	success: boolean;
	message?: string;
	experience?: ExperienceEntry & { id: string };
	errors?: Record<string, string>;
}

export interface ExperiencesResponse {
	success: boolean;
	message?: string;
	experiences?: (ExperienceEntry & { id: string })[];
	errors?: Record<string, string>;
}
