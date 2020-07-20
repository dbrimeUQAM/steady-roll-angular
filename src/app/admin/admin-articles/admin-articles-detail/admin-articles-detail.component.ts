import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../services/article/article.service';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Router } from '@angular/router';
import { Article } from '../../../services/article/article';
import { Hospital } from '../../../services/hospital/hospital';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-articles-detail',
  templateUrl: './admin-articles-detail.component.html',
  styleUrls: ['./admin-articles-detail.component.css']
})
export class AdminArticlesDetailComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private hospitalService: HospitalService,
              private articleService: ArticleService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }


  article: Article = new Article();
  articleTypes: string[] = ['médicament', 'fourniture', 'équipement'];
  articleConditions: string[] = ['nouveau', 'très bon état', 'bon', 'acceptable', 'mauvais'];
  offerTypes: string[] = ['don', 'vente'];
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';
  hospitals: Hospital[];
  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };

  ngOnInit(): void {

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
      this.openSnackBarSuccess('Article mis à jour!');
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

openSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'fermer', this.configSuccess);
  }

}


