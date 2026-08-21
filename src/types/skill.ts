export type SkillType = {
	id: string;
	name: string;
	category:
		| "Frontend"
		| "Backend"
		| "Database"
		| "DevOps"
		| "Cloud"
		| "Mobile"
		| "Programming Language"
		| "Tools"
		| "Other";

	proficiency: number;
	icon?: string;
	featured?: boolean;
	order?: number;
	color: string;
};
