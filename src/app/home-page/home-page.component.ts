import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  slides = [];

  constructor(private router: Router) { }

  ngOnInit(): void {

    // Slider Images
    this.slides = [

      {
        image: '../../assets/carousel/136934.jpg'
      },
      {
        image: '../../assets/carousel/136949.jpg'
      },
      {
        image: '../../assets/carousel/624116.jpg'
      },
      {
        image: '../../assets/carousel/740196.jpg'
      },
      {
        image: '../../assets/carousel/740225.jpg'
      },
      {
        image: '../../assets/carousel/911463.jpg'
      },
      {
        image: '../../assets/carousel/itl.cat_medical-wallpaper_2908573.png'
      }
    ];

  }

}
