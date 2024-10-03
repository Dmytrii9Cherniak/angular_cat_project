import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { LoadBreeds, LoadCatsByBreed, LoadCatsError, SetLoadingCats } from './cat.actions';
import { CatStateModel } from '../../models/cat.state.model';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@State<CatStateModel>({
  name: 'cat',
  defaults: {
    breeds: [],
    cats: [],
    loadingBreeds: false,
    loadingCats: false,
    searchPerformed: false,
    error: null
  }
})
@Injectable()
export class CatState {
  constructor(private catService: CatService) {}

  @Action(LoadBreeds)
  loadBreeds(ctx: StateContext<CatStateModel>) {
    return this.catService.getBreeds().pipe(
      tap(breeds => {
        ctx.patchState({
          breeds,
          loadingBreeds: false
        });
      }),
      catchError(error => {
        return of(ctx.patchState({ error }));
      })
    );
  }

  @Action(LoadCatsByBreed)
  loadCatsByBreed(ctx: StateContext<CatStateModel>, action: LoadCatsByBreed) {
    ctx.dispatch(new SetLoadingCats(true));
    return this.catService.getCatsByBreed(action.breedId, action.limit).pipe(
      tap(cats => {
        ctx.patchState({
          cats,
          loadingCats: false,
          searchPerformed: true
        });
      }),
      catchError(error => {
        ctx.dispatch(new LoadCatsError(error));
        return of(ctx.patchState({ loadingCats: false }));
      })
    );
  }

  @Action(LoadCatsError)
  loadCatsError(ctx: StateContext<CatStateModel>, action: LoadCatsError) {
    ctx.patchState({
      error: action.error,
      loadingCats: false
    });
  }

  @Action(SetLoadingCats)
  setLoadingCats(ctx: StateContext<CatStateModel>, action: SetLoadingCats) {
    ctx.patchState({
      loadingCats: action.isLoading
    });
  }
}
