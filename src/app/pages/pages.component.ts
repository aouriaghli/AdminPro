import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

    // private defaultTheme = `./assets/css/colors/purple-dark.css`;
    public linkTheme = document.querySelector('#theme');

    ngOnInit(): void {
        // if(localStorage.getItem('theme')){
        //   this.linkTheme?.setAttribute('href', localStorage!.getItem('theme')!)
        // }else{
        //   this.linkTheme?.setAttribute('href', this.defaultTheme)
        // }

        const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
        this.linkTheme?.setAttribute('href', url);
    }

    year = new Date().getFullYear();
}
