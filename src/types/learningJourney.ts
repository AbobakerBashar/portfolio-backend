export type ILearningJourney = {
	title: string;
	description: string;
	year: string;
	color: string;
	order: number;
};

export type LearningJourneyRes = {
	message?: string;
	learningJourney?: ILearningJourney;
	success: boolean;
	errors?: Record<string, string>;
};

export type LearningJourneysRes = {
	message?: string;
	learningJourneys?: (ILearningJourney & { id: string })[];
	success: boolean;
	errors?: Record<string, string>;
};
