import { get, post, put, del } from './apiClient.js';
import { showPopup } from '../components/ui/Popups.js';

/* Media object representing a media item (image, video, etc.) associated with a post. */
export interface Media {
  url: string;
  alt: string;
}

/** An author object representing the creator of a post.
 */
export interface Author {
  name: string;
  email?: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
}

/**
 * A post object representing a social media post.
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: Media | null;
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
  _count: { comments: number; reactions: number };
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

export interface PaginationProps {
  page: number;
  limit: number;
}

/**  */
export interface CreatePostFormData {
  title: string;
  body: string;
  tags?: string[];
  media?: Media;
}

export interface CreatePostResponse {
  data: Post;
  meta: Record<string, unknown>;
}

/**
 * Fetches posts from the API with pagination and returns them
 * @param {number} page - The page number to fetch (1-based).
 * @param {number} limit - The number of posts to fetch per page.
 * @returns {Promise<PostsResponse | void>} The posts data or void if an error occurs
 */

export async function getPosts({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PostsResponse | void> {
  try {
    const response = await get<PostsResponse>(
      `/social/posts?page=${page}&limit=${limit}&_author=true`
    );
    if (!response) {
      throw new Error('Could not get posts.');
    }
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPostById(postId: number): Promise<SinglePostResponse> {
  try {
    const response = await get<SinglePostResponse>(
      `/social/posts/${postId}?_author=true`
    );
    if (!response) {
      throw new Error('Could not get post.');
    }
    return response;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export async function getPostsFromFollowedUsers({
  page = 1,
  limit = 10,
}: PaginationProps): Promise<PostsResponse | void> {
  try {
    const response = await get<PostsResponse>(
      `/social/posts/following?page=${page}&limit=${limit}&_author=true`
    );
    if (!response) {
      throw new Error('Error fetching posts from followed users.');
    }
    return response;
  } catch (error) {
    console.error('Error fetching posts from followed users:', error);
    throw error;
  }
}

export async function searchPosts(query: string): Promise<PostsResponse> {
  //TODO
}

export async function createPost(
  data: CreatePostFormData
): Promise<CreatePostResponse> {
  if (!validateCreatePostData(data)) {
    throw new Error('Validation failed');
  }
  try {
    const response = await post<CreatePostResponse>('/social/posts', data);
    if (!response) {
      throw new Error('Error creating post: No response data received.');
    }
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(
  id: number,
  data: Partial<Post>
): Promise<SinglePostResponse> {
  //TODO
}
export async function deletePost(id: number): Promise<void> {
  try {
    await del(`/social/posts/${id}`);
    showPopup({
      title: 'Post deleted',
      message: 'The post has been successfully deleted.',
      icon: 'success',
    });
  } catch (error) {
    if (error instanceof Error) {
      showPopup({
        title: 'Error deleting post.',
        message: error.message,
        icon: 'error',
      });
    }
    throw error;
  }
}

/**
 * Validates registration form data including name, email and password requirements
 * @param {Object} data - The form data object to validate
 * @param {string} data.name - The user's full name
 * @param {string} data.email - The user's email address
 * @param {string} data.password - The user's password
 * @returns {boolean} True if all validation passes, false otherwise
 */

function validateCreatePostData(data: CreatePostFormData): boolean {
  if (!data) {
    showPopup({
      title: 'No data provided.',
      message: 'Please check all fields, and try again.',
      icon: 'error',
    });
    return false;
  }

  if (!data.title || !data.body) {
    showPopup({
      title: 'Missing required fields.',
      message: 'Title and body are required.',
      icon: 'error',
    });
    return false;
  }
  const titleRegex = /^.{3,60}$/;
  const bodyRegex = /^.{3,}$/;
  const tagRegex = /^[a-zA-ZÀ-ÿ0-9]{3,}$/;
  const imageUrlRegex = /^.*\.(gif|jpe?g|png|webp)($|\?.*$|#.*$|\/.*$)$/;
  const imageAltRegex = /^.{3,150}$/;

  if (!titleRegex.test(data.title)) {
    showPopup({
      title: 'Invalid title format.',
      message:
        'Min 3 chars. Letters, numbers and special characters #?!@$%^&*- are allowed.',
      icon: 'warning',
    });
    return false;
  }

  if (!bodyRegex.test(data.body)) {
    showPopup({
      title: 'Invalid body format.',
      message:
        'Min 3 chars. Letters, numbers and special characters #?!@$%^&*- are allowed.',
      icon: 'warning',
    });
    return false;
  }

  if (data.tags) {
    for (const tag of data.tags) {
      if (!tagRegex.test(tag)) {
        showPopup({
          title: 'Invalid tag format.',
          message:
            'Each tag must be at least 3 characters long and can only contain letters and numbers.',
          icon: 'warning',
        });
        return false;
      }
    }
  }
  if (data.media) {
    if (!imageUrlRegex.test(data.media.url)) {
      showPopup({
        title: 'Invalid image URL format.',
        message: 'Image URL must be a valid image file (gif, jpeg, png, webp).',
        icon: 'warning',
      });
      return false;
    }
    if (!imageAltRegex.test(data.media.alt)) {
      showPopup({
        title: 'Invalid image alt text format.',
        message: 'Alt text must be 150 characters or less.',
        icon: 'warning',
      });
      return false;
    }
  }

  return true;
}
