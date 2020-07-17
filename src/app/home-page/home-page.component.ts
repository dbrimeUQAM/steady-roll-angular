import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  slides = [];
  role;

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getUser().role === 'admin') {
        this.router.navigate(['/admin/admin-users']);
      }
    } else {
      this.router.navigate(['/login']);
    }

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
