export type UserRole = "user" | "host" | "admin";
export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

// export interface Database {
export type Database = {
	public: {
		Tables: {
			users: {
				Row: {
					id: string;
					email: string;
					full_name: string | null;
					university: string | null;
					phone_number: string | null;
					role: UserRole;
					profile_picture_url: string | null;
					kyc_status: string | null;
					kyc_document_url: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					email: string;
					full_name?: string | null;
					university?: string | null;
					phone_number?: string | null;
					role?: UserRole;
					profile_picture_url?: string | null;
					kyc_status?: string | null;
					kyc_document_url?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					full_name?: string | null;
					university?: string | null;
					phone_number?: string | null;
					role?: UserRole;
					profile_picture_url?: string | null;
					kyc_status?: string | null;
					kyc_document_url?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
		};
	};
};

// export type UserRole = "user" | "host" | "admin";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// export type Json =
// 	| string
// 	| number
// 	| boolean
// 	| null
// 	| { [key: string]: Json | undefined }
// 	| Json[];

// export interface Database {
// 	public: {
// 		Tables: {
// 			users: {
// 				Row: {
// 					id: string;
// 					email: string;
// 					full_name: string | null;
// 					university: string | null;
// 					phone_number: string | null;
// 					role: UserRole;
// 					profile_picture_url: string | null;
// 					kyc_status: string | null;
// 					kyc_document_url: string | null;
// 					created_at: string;
// 					updated_at: string;
// 				};
// 				Insert: {
// 					id?: string;
// 					email: string;
// 					full_name?: string | null;
// 					university?: string | null;
// 					phone_number?: string | null;
// 					role?: UserRole;
// 					profile_picture_url?: string | null;
// 					kyc_status?: string | null;
// 					kyc_document_url?: string | null;
// 					created_at?: string;
// 					updated_at?: string;
// 				};
// 				Update: {
// 					id?: string;
// 					email?: string;
// 					full_name?: string | null;
// 					university?: string | null;
// 					phone_number?: string | null;
// 					role?: UserRole;
// 					profile_picture_url?: string | null;
// 					kyc_status?: string | null;
// 					kyc_document_url?: string | null;
// 					created_at?: string;
// 					updated_at?: string;
// 				};
// 			};
// 			// Add other tables as needed
// 			// [_: string]: {
// 			// 	Row: { [_: string]: any };
// 			// 	Insert: { [_: string]: any };
// 			// 	Update: { [_: string]: any };
// 			// };
// 		};
// 		Views: {
// 			[_: string]: {
// 				Row: { [_: string]: any };
// 			};
// 		};
// 		Functions: {
// 			[_: string]: {
// 				Args: { [_: string]: any };
// 				Returns: any;
// 			};
// 		};
// 		Enums: {
// 			[_: string]: any;
// 		};
// 	};
// }

// export type UserRole = "user" | "host" | "admin";
