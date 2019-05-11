export interface CreateCompetitionDTO {
  owner: string;
  title: string;
  image?: string;
  description?: string;
  location?: IGeometry;
}

export interface UpdateCompetitionDTO {
  title: string;
  image?: string;
  description?: string;
  location?: IGeometry;
}

export enum competitorStatus {
  Entered,
  Withdrawn,
  Present
}

export interface UpdateCompetitorDTO {
  competitor: string;
  status: competitorStatus
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
