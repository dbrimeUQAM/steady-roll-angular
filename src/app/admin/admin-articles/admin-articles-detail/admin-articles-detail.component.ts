import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article/article.service';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Router } from '@angular/router';
import { Article } from '../../../services/article/article';
import { Hospital } from '../../../services/hospital/hospital';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-articles-detail',
  templateUrl: './admin-articles-detail.component.html',
  styleUrls: ['./admin-articles-detail.component.css']
})
export class AdminArticlesDetailComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  article: Article = new Article();
  articleTypes: string[] = ['médicament', 'fourniture', 'équipement'];
  articleConditions: string[] = ['nouveau', 'très bon état', 'bon', 'acceptable', 'mauvais'];
  offerTypes: string[] = ['don', 'vente'];
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';
  hospitals: Hospital[];

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private hospitalService: HospitalService,
              private articleService: ArticleService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);

    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getUser().role !== 'admin') {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }

    if (this.route.snapshot.params.id === 'new') {
      this.article = new Article();
    } else {
      this.articleService.getArticleById(this.route.snapshot.params.id)
      .subscribe((res: any) => {
        this.article = res;
      }, err => {
        console.log(err);
      });
    }

    this.hospitalService.getAll()
    .subscribe((res: any) => {
      this.hospitals = res;
    }, err => {
      console.log(err);
    });

  }

  private updateArticle(article: Article) {
    this.articleService.updateArticle(article._id, article).subscribe(data => {
      this.isSuccessful = true;
      this.isSaveFailed = false;
      this.snackBar.openFromComponent(PizzaPartyComponent, {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
      });
      this.router.navigate(['/admin/admin-articles']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSaveFailed = true;
    });
  }

  private addArticle(article: Article) {
    this.articleService.addArticle(article).subscribe(data => {
      this.isSuccessful = true;
      this.isSaveFailed = false;
      this.router.navigate(['/admin/admin-articles']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSaveFailed = true;
    });
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.article._id).subscribe(data => {
      this.router.navigate(['/admin/admin-articles']);
    });
  }

  onSubmit() {
    if (this.article) {
      if (this.article._id) {
        this.updateArticle(this.article);
      }
      else {
        this.addArticle(this.article);
      }
    }
  }

}

@Component({
  selector: 'app-snack-bar-article-updated',
  templateUrl: '../../../snack-bar-messages/snack-bar-updated.html',
})
export class PizzaPartyComponent {}
