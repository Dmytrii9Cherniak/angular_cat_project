import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { LoadBreeds, LoadCatsByBreed } from '../../store/cat/cat.actions';
import { CatSelectors } from '../../store/cat/cat.selectors';
import { Breed } from '../../models/breed.model';
import { CatImage } from '../../models/cat.image.model';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.scss']
})
export class CatSearchComponent implements OnInit {

  form: FormGroup;

  combined$: Observable<[Breed[], CatImage[], boolean, string | null]>;
  searchPerformed = false;
  selectedBreed: Breed | null = null; // Зберігаємо вибрану породу як об'єкт

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      breed: ['', Validators.required],
      limit: [10, [Validators.required, Validators.min(1), Validators.max(50)]]
    });

    this.store.dispatch(new LoadBreeds());

    this.combined$ = combineLatest([
      this.store.select(CatSelectors.breeds),
      this.store.select(CatSelectors.cats),
      this.store.select(CatSelectors.isLoadingCats),
      this.store.select(CatSelectors.error)
    ]);
  }

  search(): void {
    const { breed, limit } = this.form.value;

    this.combined$.subscribe(([breeds]) => {
      this.selectedBreed = breeds.find(b => b.id === breed) || null;
    });

    if (this.form.valid && breed && limit != null) {
      this.searchPerformed = true;
      this.store.dispatch(new LoadCatsByBreed(breed, limit));
    }
  }
}
