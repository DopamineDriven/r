import { Media } from 'snoowrap/dist/objects/Submission';
import { UndefinedAsNull, JSONified } from './json';
import Comment from 'snoowrap/dist/objects/Comment';
import { Listing } from 'snoowrap';
import { Submission } from 'snoowrap/dist/objects';
import {
	SecureMediaEmbed,
	MediaEmbed
} from 'snoowrap/dist/objects/Submission';
export interface RedditVideoProps {
	fallback_url: string;
	height: number;
	is_gif: boolean;
	scrubber_media_url: string;
	dash_url: string;
	transcoding_status: string;
}

export interface RedditVideoParent {
	reddit_video: RedditVideoProps | null;
}

export interface RedditImagesSource {
	url: string;
	width: number;
	height: number;
}

export interface RedditImagesImage {
	source: RedditImagesSource;
	id: string;
}

export interface RedditImagesImagesArr {
	images: RedditImagesSource[] | RedditImagesImage;
	enabled: boolean;
}

export interface RedditImages {
	preview: RedditImagesImagesArr;
}

export interface SubmissionVidProps {
	post_hint: string;
	stickied: boolean;
	is_video: boolean;
	hls_url: string;
	is_self: boolean;
	is_reddit_media_domain: boolean;
	fallback_url: string;
	height: number | string;
	is_gif: boolean;
	scrubber_media_url: string;
	dash_url: string;
	transcoding_status: string;
}

export interface MediaEmbedProps {
	content?: string;
	height?: number;
	width?: number;
}
export interface SubmissionProps extends SubmissionVidProps {
	created: number;
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
	num_comments: number;
}

export type SubredditPostProps = {
	root?: string;
	id: string;
	title: string;
	description: string;
	active_user_count: string | number;
	banner_img: string;
	description_html: string;
	public_description_html: string;
	display_name_prefixed: string;
	display_name: string;
	icon_img: string;
	banner_size: [number, number] | null;
	icon_size: [number, number] | null;
};

/* --- Interfaces below are used in /r/[display_name].tsx on server and client --- */
export interface CustomSubmissionType {
	dash_url: string | null;
	author_fullname: string;
	duration: number;
	secureMediaEmbedUrl: SecureMediaEmbed;
	fallback_url: string;
	height: number;
	media: Media | null;
	media_embed: MediaEmbed;
	url: string;
	id: string;
	thumbnail_height: number | null | undefined;
	thumbnail_width: number | null | undefined;
	thumbnail: string;
	hls_url: string;
	created: number;
	num_comments: number;
	is_gif: boolean;
	scrubber_media_url: string;
	transcoding_status: string;
	title: string;
	selftext: string;
	selftext_html: string | null;
	ups: number;
	downs: number;
	post_hint: string;
	is_video: boolean;
	is_reddit_media_domain: boolean;
	is_self: boolean;
	stickied: boolean;
	subreddit_subscribers: number;
	subreddit_name_prefixed: string;
}

export interface CustomSubredditType {
	id: string;
	title: string;
	description: string;
	active_user_count: number;
	banner_img: string;
	created: number;
	description_html: string;
	public_description_html: string;
	url: string;
	banner_size: [number, number] | null;
	icon_size: [number, number] | null;
	display_name: string;
	display_name_prefixed: string;
	icon_img: string;
}

export interface SubmissionJSONified
	extends Array<
		UndefinedAsNull<JSONified<CustomSubmissionType>>
	> {}

export interface SubredditJSONified
	extends Array<
		UndefinedAsNull<JSONified<CustomSubredditType>>
	> {}

export interface IndexSubmissionJSONified
	extends Array<UndefinedAsNull<JSONified<Submission>>> {}

export interface CommentArrJsonified
	extends Array<UndefinedAsNull<JSONified<Comment>>> {}

export interface ListingWithFetch
	extends Array<
		UndefinedAsNull<JSONified<Listing<Submission>>>
	> {}
