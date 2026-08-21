export type AboutType = {
	heading: string;
	intro: string;
	background: string;
	mindset: string;
	careerGoal: string;
};

export type AboutResponse = {
	success: boolean;
	about?: AboutType & { image: { url: string; publicId: string } };
	errors?: Record<string, string>;
	message?: string;
};
