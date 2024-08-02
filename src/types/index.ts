export interface IMovie {
  Title: string;
  Year?: string;
  imdbID: string;
  Type: string;
  Poster?: string;
}

export interface SearchResponse {
  Search?: IMovie[];
  totalResults?: string;
  Response?: string;
}

export interface Filters {
  Type: string;
  Year: string;
}
