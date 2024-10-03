import { Selector } from '@ngxs/store';
import { CatStateModel } from '../../models/cat.state.model';
import { CatState } from './cat.state';

export class CatSelectors {

  @Selector([CatState])
  static breeds(state: CatStateModel) {
    return state.breeds;
  }

  @Selector([CatState])
  static cats(state: CatStateModel) {
    return state.cats;
  }

  @Selector([CatState])
  static isLoadingCats(state: CatStateModel) {
    return state.loadingCats;
  }

  @Selector([CatState])
  static error(state: CatStateModel) {
    return state.error;
  }
}
