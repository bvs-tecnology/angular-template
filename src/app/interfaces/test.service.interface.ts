import { BaseResponse } from '@models/base.response';

export abstract class ITestService {
	abstract free(): Promise<BaseResponse<object>>;
	abstract token(): Promise<BaseResponse<object>>;
	abstract authorize(): Promise<BaseResponse<object>>;
}
