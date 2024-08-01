export interface Network {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  };
  officialSite?: string;
}

export interface IMovieCard {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime?: number;
  averageRuntime?: number;
  premiered: string;
  ended?: string;
  officialSite?: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average?: number;
  };
  weight: number;
  network?: Network;
  webChannel?: {
    id: number;
    name: string;
  };
  dvdCountry?: string;
  externals: {
    tvrage?: string;
    imdb?: string;
  };
  image: {
    medium?: string;
    original?: string;
  };
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode?: {
      href: string;
      name: string;
    };
  };
}

export interface IMovie {
  Title: string;
  Year?: string;
  imdbID: string;
  Type: string;
  Poster?: string;
}

interface SearchResponse {
  Search?: IMovie[];
  totalResults?: string;
  Response?: string;
}
