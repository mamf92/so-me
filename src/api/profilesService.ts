import { get, put } from './apiClient';
import type { Media, PaginationMeta, PostsResponse } from './postsService';

export interface ShortProfile {
  name: string;
  email: string;
  bio: string;
  banner: Media;
  avatar: Media;
}

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

export interface FollowingResponse {
  data: {
    followers: ShortProfile[];
    following: ShortProfile[];
  };
  meta: Record<string, unknown>;
}

export interface ProfileWithRelations extends Profile {
  followers?: ShortProfile[];
  following?: ShortProfile[];
}

export interface ProfileWithRelationsResponse {
  data: ProfileWithRelations;
  meta: Record<string, unknown>;
}

export async function getProfiles(): Promise<ProfilesResponse> {
  try {
    const response = await get<ProfilesResponse>('/social/profiles');
    if (!response) {
      throw new Error('Could not fetch profiles.');
    }
    return response;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
}

export async function getProfileByName(name: string): Promise<ProfileResponse> {
  try {
    const response = await get<ProfileResponse>(`/social/profiles/${name}`);
    if (!response) {
      throw new Error('Could not fetch profile by name.');
    }
    return response;
  } catch (error) {
    console.error('Error fetching profile by name:', error);
    throw error;
  }
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

// export async function updateProfile(
//   name: string,
//   data: Partial<Profile>
// ): Promise<ProfileResponse> {
//   //TODO
// }

export async function followProfile(name: string): Promise<FollowingResponse> {
  console.log(`Calling followProfile for: ${name}`);
  try {
    const response = await put<FollowingResponse>(
      `/social/profiles/${name}/follow`
    );
    if (!response) {
      throw new Error('Could not follow profile.');
    }
    return response;
  } catch (error) {
    console.error('Error following profile:', error);
    throw error;
  }
}

export async function unfollowProfile(
  name: string
): Promise<FollowingResponse> {
  try {
    const response = await put<FollowingResponse>(
      `/social/profiles/${name}/unfollow`
    );
    if (!response) {
      throw new Error('Could not unfollow profile.');
    }
    return response;
  } catch (error) {
    console.error('Error fetching posts by profile:', error);
    throw error;
  }
}

export async function getFollowingNames(me: string): Promise<Set<string>> {
  try {
    const response = await get<ProfileWithRelationsResponse>(
      `/social/profiles/${me}?_following=true`
    );
    if (!response || !response.data) {
      throw new Error('Could not fetch following names.');
    }

    const names = response.data.following?.map((profile) => profile.name) || [];
    return new Set(names);
  } catch (error) {
    console.error('Error fetching following names:', error);
    throw error;
  }
}

// export async function searchProfiles(query: string): Promise<ProfilesResponse> {
//   //TODO
// }
