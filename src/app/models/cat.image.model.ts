import { Breed } from './breed.model';

export interface CatImage {
  id: string;
  url: string;
  breeds: Breed[];
}
