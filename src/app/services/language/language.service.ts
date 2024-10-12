import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: string;
  textDirection: string;

  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {}

  initLanguage(){
    this.translateService.addLangs(['en', 'es']);
    let language = navigator.language || (navigator as any).userLanguage;
    language = language.split('-').includes('es') ? 'es' : 'en';
    this.translateService.setDefaultLang(language);

    // Change the URL without navigate:
    this.location.go(language);

    this.language = language;
    this.textDirection = this.language === 'es' ? 'RTL' : 'LTR';
    document.documentElement.dir = this.textDirection;
    document.documentElement.setAttribute('dir', this.textDirection);
  }

  changeLanguage(language: string) {
    this.translateService.setDefaultLang(language);
    this.location.go(language);
    this.language = language;

    // Set the text direction based on language
    this.textDirection = this.language === 'es' ? 'rtl' : 'ltr';

    // Apply the correct direction to the document
    document.documentElement.setAttribute('dir', this.textDirection);
  }

}
