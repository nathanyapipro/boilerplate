interface ModelBase {
	id: string;
	type: string;
}

export interface User {
	id: string;
	username?: string;
	name?: string;
	email: string;
	isAdmin: boolean;
	createdDate: string;
}
