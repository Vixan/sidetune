export interface Artist {
  id: number;
  name: string;
  picture_medium: string;
  picture_xl: string;
  tracklist: string;
  link: string;
}

export interface ArtistDto extends Pick<Artist, "id" | "name"> {}
