export class QueryStringHelper {
	public static MapParams(params: object) {
		const urlParams: string[] = [];
		Object.entries(params).map(([key, value]: [string, unknown]) => {
			if (value !== undefined && value !== null) {
				urlParams.push(this.MapSingleParam(value, key, false));
			}
		});
		return urlParams.join('&');
	}

	private static MapSingleParam<T>(value: T | T[], name: string, concated = true): string {
		if (value === undefined || value === null) {
			return '';
		}
		if (!Array.isArray(value)) {
			return `${concated ? '&' : ''}${name}=${value}`;
		}
		if (value.length > 0) {
			return (concated ? '&' : '') + value.map(x => `${name}=${x}`).reduce((acc, v) => `${acc}&${v}`);
		}
		return '';
	}
}
