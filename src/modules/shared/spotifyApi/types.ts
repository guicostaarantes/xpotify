export type SearchResult = {
  albums?: { items: Array<Album> };
  artists?: { items: Array<Artist> };
  tracks?: { items: Array<Track> };
};

export type Album = {
  id: string;
  name: string;
  artists: Array<Artist>;
  images: Array<Image>;
  tracks: { items?: Array<Track> };
};

export type Artist = {
  id: string;
  name: string;
  images: Array<Image>;
};

export type Track = {
  id: string;
  name: string;
  album: Album;
  artists: Array<Artist>;
  images: Array<Image>;
  track_number: number;
  duration_ms: number;
  preview_url: string | null;
};

type Image = {
  url: string;
};
