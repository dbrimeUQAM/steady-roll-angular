import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { ArticleService } from '../services/article/article.service';
import { Article } from '../services/article/article';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  articles: Article[] = [];
  articleNum: Number = 0 ;

  name: String ;
  hospitalId: String ;
  constructor(private articleService: ArticleService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log('user', this.tokenStorage.getUser());
    this.name = this.tokenStorage.getUser().name;
    this.hospitalId = this.tokenStorage.getUser().hospitalId;

    this.articleService.getAll().subscribe(data => {
      this.articles= data ;
    }, err =>{
      console.log(err);
    },()=> {
      this.articleNum = this.articles.length ;
    }
    )
  }
  onClick($event) {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
  

}
