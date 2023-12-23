import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';

import { CountriesServices } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private countriesServices: CountriesServices
    ){}

    public countriesByRegion: SmallCountry[] = [];


    public myForm: FormGroup = this.fb.group({
      region:  ['', Validators.required],
      country: ['', Validators.required],
      borders: ['', Validators.required],

    });

    get regions(): Region[] {
      return this.countriesServices.regions;
    }

    ngOnInit(): void {
        this.onRegionChanged();
      }

      onRegionChanged(): void {
        this.myForm.get('region')!.valueChanges
        .pipe(
          switchMap(region => this.countriesServices.getCountriesByRegion(region)),
        )
        .subscribe(countries => {
          this.countriesByRegion = countries;
          console.log({countries})
        });
      }
}
