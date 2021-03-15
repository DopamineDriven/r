import {
	UndefinedAsNull,
	JSONified,
	JSONifiedObject
} from './json';
import {
	Media,
	MediaEmbed,
	SecureMediaEmbed
} from 'snoowrap/dist/objects/Submission';
import { SubmissionProps } from './data-handling';

export interface ChildButtonProps {
	display_name_prefixed: string;
	url: string;
	id: string;
	title: string;
	display_name: string;
}

export interface ChildButtonPropsNoUndefinedJSONified
	extends Array<UndefinedAsNull<JSONified<ChildButtonProps>>> {}

// for future use -----------
export interface LandingProps {
	url: string;
	display_name: string;
	display_name_prefixed: string;
	title: string;
	id: string;
}
export interface LandingPropsNonNullJSONified
	extends Array<UndefinedAsNull<JSONified<LandingProps>>> {}

export interface GetHotCarousel {
	display_name_prefixed: string;
	url: string;
	title: string;
	display_name: string;
	icon_img: string;
}

export interface MediaExtend extends Partial<SubmissionProps> {
	secureMediaEmbedUrl: JSONifiedObject<SecureMediaEmbed>;
	className?: string;
	media: Media | null;
	selftext_html: string | null;
	selftext: string;
	id: string;
	ups: number;
	downs: number;
	title: string;
	thumbnail: string;
	thumbnail_height?: number | null;
	thumbnail_width?: number | null;
	media_embed?: MediaEmbed;
	url?: string;
	width?: string | number;
	height: string | number;
}

export interface MediaExtendLanding {
	media: Media | null;
	post_hint: string;
	stickied: boolean;
	id: string;
	is_video: boolean;
	is_self: boolean;
	secureMediaEmbed: SecureMediaEmbed;
	media_embed: MediaEmbed;
	is_reddit_media_domain: boolean;
	url: string;
	ups: number;
	downs: number;
	title: string;
	selftext: string;
	selftext_html: string | null;
	thumbnail: string;
}

export interface MediaExtendedJSONified
	extends Array<UndefinedAsNull<JSONified<MediaExtendLanding>>> {}
