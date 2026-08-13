export interface Project {
	title: string;
	category: "Full Stack" | "Frontend" | "Backend";
	description: string;
	features: string[];
	tech: string[];
	github: string;
	demo: string;
}

export interface ProjectInput extends Project {
	image: File;
}

export interface ProjectResponse {
	success: boolean;
	message?: string;
	errors?: Record<string, string>;
	project?: Project & {
		id: string;
		image: string;
	};
}

export type GetProjectsResponse = {
	success: boolean;
	message?: string;
	error?: string;
	projects?: (Project & {
		id: string;
		image: string;
	})[];
};
