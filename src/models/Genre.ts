export interface Genre {
  id: number;
  name: string;
  picture?: string;
  picture_medium?: string;
}

export interface GenreDto extends Pick<Genre, "id" | "name"> {}
