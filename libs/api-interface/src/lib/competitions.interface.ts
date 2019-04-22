export interface CreateCompetitionDTO {
  owner: string;
  title: string;
  image?: string;
  description?: string;
  location?: IGeometry;
}

export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  bbox?: number[];
  properties?: any;
}
