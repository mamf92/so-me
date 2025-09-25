import { get } from './apiClient';
import type { Media, PaginationMeta, PostsResponse } from './postsService';

export interface Profile {
  name: string;
  email: string;
  bio: string;
  banner: Media;
  avatar: Media;
  _count: { posts: number; followers: number; following: number };
}

export interface ProfileResponse {
  data: Profile;
  meta: Record<string, unknown>;
}

export interface ProfilesResponse {
  data: Profile[];
  meta: PaginationMeta;
}

export interface PostsByProfileProps {
  name: string;
  page?: number;
  limit?: number;
}

export async function getProfiles(): Promise<ProfilesResponse> {
  //TODO
}

export async function getProfileByName(name: string): Promise<ProfileResponse> {
  //TODO
}

export async function getPostsByProfile(
  props: PostsByProfileProps
): Promise<PostsResponse> {
  try {
    const response = await get<PostsResponse>(
      `/social/profiles/${props.name}/posts?page=${props.page || 1}&limit=${
        props.limit || 10
      }&_author=true`
    );
    if (!response) {
      throw new Error('Could not fetch posts by profile.');
    }
    return response;
  } catch (error) {
    console.error('Error fetching posts by profile:', error);
    throw error;
  }
}

export async function updateProfile(
  name: string,
  data: Partial<Profile>
): Promise<ProfileResponse> {
  //TODO
}

export async function followProfile(name: string): Promise<void> {
  //TODO
}

export async function unfollowProfile(name: string): Promise<void> {
  //TODO
}

export async function searchProfiles(query: string): Promise<ProfilesResponse> {
  //TODO
}
