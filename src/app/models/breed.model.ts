import { Image } from './image.model';

export interface Breed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  image?: Image;
}
