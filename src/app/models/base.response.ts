export interface BaseResponse<T> {
	success: boolean;
	errors: string[];
	result: T;
}
