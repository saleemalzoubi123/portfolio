import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';
import {LanguageService} from 'src/app/services/language/language.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private languageService: LanguageService
    ){
    }
  ngOnInit(): void{

    this.languageService.initLanguage();


    this.titleService.setTitle('Saleem Alzoubi | Chief Technology Officer & Solution Architect');

    this.metaService.addTags([
      {name: 'keywords', content: 'Chief Technology Officer, CTO, solution architect, Azure solutions architect, technical project manager, engineering leadership, fintech, AI, Riyadh, Saudi Arabia'},
    ]);


    AOS.init();

  }
}
