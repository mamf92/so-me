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
