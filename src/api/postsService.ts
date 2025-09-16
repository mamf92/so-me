import { get, post, put, del } from './apiClient.js';
import { showErrorPopup } from '../components/Popups.js';

/* Media object representing a media item (image, video, etc.) associated with a post. */
export interface Media {
  url: string;
  alt: string;
}

/** An author object representing the creator of a post.
 */
export interface Author {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}

/**
 * A post object representing a social media post.
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: Media;
  /** ISO 8601 date string representing the date and time when the post was created. */
  created: string;
  /** ISO 8601 date string representing the date and time when the post was last updated. */
  updated: string;
  author?: Author;
  reactions?: { symbol: string; count: number; reactors: string[] }[];
  comments?: {
    body: string;
    replyToId: number | null;
    id: number;
    postId: number;
    owner: string;
    created: string;
    author: {
      name: string;
      email: string;
      bio: string;
      avatar: Media;
      banner: Media;
    };
  }[];
  _count: { comments: number; likes: number };
}

/** Pagination metadata for paginated API responses. */
export interface PaginationMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

/** Response structure for fetching multiple posts, including pagination metadata. */
export interface PostsResponse {
  data: Post[];
  meta: PaginationMeta;
}

/** Response structure for fetching a single post. */
export interface SinglePostResponse {
  data: Post;
  meta: Record<string, unknown>;
}

/**
 * Fetches posts from the API with pagination and returns them
 * @param {number} page - The page number to fetch (1-based).
 * @param {number} limit - The number of posts to fetch per page.
 * @returns {Promise<PostsResponse | void>} The posts data or void if an error occurs
 */

export async function getPosts(
  page: 1,
  limit: 10
): Promise<PostsResponse | void> {
  try {
    const response = await get<PostsResponse>(
      `/social/posts?page=${page}&limit=${limit}`
    );
    if (!response) {
      throw new Error('Could not get posts.');
    }
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    if (error instanceof Error) {
      showErrorPopup('Error fetching posts', error.message);
    } else {
      showErrorPopup('Error fetching posts', 'An unknown error occurred');
    }
    throw error;
  }
}

export async function getPostById() {
  //TODO
}

export async function getPostsFromFollowedUsers() {
  //TODO
}

export async function searchPosts(query: string): Promise<PostsResponse> {
  //TODO
}
export async function createPost(
  data: Partial<Post>
): Promise<SinglePostResponse> {
  //TODO
}
export async function updatePost(
  id: number,
  data: Partial<Post>
): Promise<SinglePostResponse> {
  //TODO
}
export async function deletePost(id: number): Promise<void> {
  //TODO
}
