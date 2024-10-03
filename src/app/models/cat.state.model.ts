import { Breed } from './breed.model';
import { CatImage } from './cat.image.model';

export interface CatStateModel {
  breeds: Breed[];
  cats: CatImage[];
  loadingBreeds: boolean;
  loadingCats: boolean;
  searchPerformed: boolean;
  error: string | null;
}
