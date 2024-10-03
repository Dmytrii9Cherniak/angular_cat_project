import { CatActionTypes } from '../../enums/cat.actions.enum';

export class LoadBreeds {
  static readonly type = CatActionTypes.LoadBreeds;
}

export class LoadCatsByBreed {
  static readonly type = CatActionTypes.LoadCatsByBreed;
  constructor(public breedId: string, public limit: number) {}
}

export class LoadCatsError {
  static readonly type = CatActionTypes.LoadCatsError;
  constructor(public error: string) {}
}

export class SetLoadingCats {
  static readonly type = CatActionTypes.SetLoadingCats;
  constructor(public isLoading: boolean) {}
}
