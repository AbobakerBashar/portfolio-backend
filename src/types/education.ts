export interface EducationEntry {
	school: string;
	degree: string;
	period: string;
	location: string;
	description: string;
	icon: string;
	color: string;
}

export interface EducationRes {
	success: boolean;
	message?: string;
	education?: EducationEntry;
	errors?: Record<string, string>;
}

export interface EducationsRes {
	success: boolean;
	message?: string;
	educations?: EducationEntry[];
	errors?: Record<string, string>;
}
