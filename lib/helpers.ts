// removes empty query params from query obj
export const filterQuery = (query: any) =>
	Object.keys(query).reduce<any>((obj, key) => {
		if (query[key]?.length) {
			obj[key] = query[key];
		}
		return obj;
	}, {});

export function parseTimeRanges(ranges: any) {
	const result: { start: number; end: number }[] = [];
	for (let i = 0; i < ranges.length; i++) {
		result.push({
			start: ranges.start(i),
			end: ranges.end(i)
		});
	}
	return result;
}

// 3rd party iframe handling
type cleanRemoteIframeProps = {
	height: string | number;
	html: string;
	width: string | number;
};

export function cleanRemoteIframe({
	height,
	html,
	width
}: cleanRemoteIframeProps) {
	// extract src url via regex
	const source = html.match(/(src="([^"]+)")/gi);

	return `<iframe
		${source}
		allow="autoplay"
		height=${height}
		loading="lazy"
		referrerpolicy="no-referrer"
		title="iframe"
		width=${width}
	  />`;
}

// strip trailing and leading slash of pathname types (as opposed to slugs)
export const getSlug = (path: string) =>
	path.replace(/^\/|\/$/g, '');

// remove one of two uniting middle slashes otherwise invaldating utility of concatenated paths
export const resolvePathConcatDoubleSlash = (path: string) =>
	path.replace(/^\/|$/g, '');

// email validator regex -- future outlook -- authentication/POST/PUT/DELETE user actions
export function validEmail(email: string) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export const deleteUndefined = (
	obj: Record<string, any> | undefined
): void => {
	if (obj) {
		Object.keys(obj).forEach((key: string) => {
			if (obj[key] && typeof obj[key] === 'object') {
				deleteUndefined(obj[key]);
			} else if (typeof obj[key] === 'undefined') {
				delete obj[key]; // eslint-disable-line no-param-reassign
			}
		});
	}
};

export async function swrFetcher(path: string) {
	const res = await fetch(path);
	return res.json();
}
