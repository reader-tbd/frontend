export interface Manga {
  id: number;
  title: string;
  alt_title?: string;
  rating?: number;
  thumbnail?: string;
  image?: string;
  description: string;
  source?: string;
  authors?: string[];
  genres?: string[];
  categories?: string[];
  status?: string;
  year?: string;
  detailNeedsUpdate?: boolean;
}
export interface MangaList extends Array<Manga> {}
export interface MangaList_ extends Array<Manga> {}
export interface MangaChapter extends String {}
export interface MangaChapterImage extends String {}
export interface MangaChapterImages extends Array<MangaChapterImage> {}
export interface MangaVolume extends Array<MangaChapter> {}
export interface MangaVolumes {
  [key: string]: MangaVolume;
}
export interface VerifyToken {
  token: string;
}
export interface AccessToken {
  access: string;
}
export interface RefreshToken {
  refresh?: string;
}
export interface UserCredentials {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  password: string;
}
export interface TokenResponse {
  refresh: string;
  access: string;
  username: string;
}
