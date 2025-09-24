import type { Media, PaginationMeta } from './postsService';

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

export async function getProfiles(): Promise<ProfilesResponse> {
  //TODO
}

export async function getProfileByName(name: string): Promise<ProfileResponse> {
  //TODO
}

export async function getAllPostsByProfile(
  name: string
): Promise<PostsResponse> {
  //TODO
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
