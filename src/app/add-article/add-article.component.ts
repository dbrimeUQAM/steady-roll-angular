import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../services/article/article.service';
import { Router } from '@angular/router';
import { Article } from '../services/article/article';
import { TokenStorageService } from '../services/token-storage/token-storage.service';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  article: Article;
  hospitalName: string;
  hospitalId: string;
  minDate: Date;

  public articleFrom: FormGroup;
  labelPosition: string;
  choix: string[] = ['donner', 'vendre'];
  name: boolean;
  type: boolean;
  description: boolean;
  condition: boolean;
  mode: boolean;
  qty: boolean;


  constructor(private router: Router, private formBuilder: FormBuilder, private articleService: ArticleService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDay();
    this.minDate = new Date(currentYear, currentMonth + 1, currentDay + 5);
    this.article = new Article;
    this.hospitalName = this.tokenStorage.getUser().hospital.name;
    this.hospitalId = this.tokenStorage.getUser().hospital._id;
    this.article.hospitalId = this.hospitalId;

    this.articleFrom = this.formBuilder.group({
      articleType: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: '',
      condition: ['', Validators.required],
      offerType: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.max(900)]],
      price: [0, [Validators.required, Validators.max(900)]],
    })
    this.articleFrom.get('name').valueChanges.subscribe(data => {
      this.article.name = data;
    });
    this.articleFrom.get('articleType').valueChanges.subscribe(data => {
      this.article.articleType = data;
    });
    this.articleFrom.get('description').valueChanges.subscribe(data => {
      this.article.description = data;
    });
    this.articleFrom.get('condition').valueChanges.subscribe(data => {
      this.article.condition = data;
    });
    this.articleFrom.get('quantity').valueChanges.subscribe(data => {
      this.article.quantity = data;
    });
    this.articleFrom.get('expirationDate').valueChanges.subscribe(data => {
      this.article.expirationDate = data;
    });
    this.articleFrom.get('offerType').valueChanges.subscribe(data => {
      this.article.offerType = data;
    });
    this.articleFrom.get('price').valueChanges.subscribe(data => {
      this.article.price = data;
    });
  }
  submit() {
    if (this.articleFrom.get('name').invalid) {
      this.name = true;
    }
    if (this.articleFrom.get('articleType').invalid) {
      this.type = true;
    }
    if (this.articleFrom.get('description').invalid) {
      this.description = true;
    }
    if (this.articleFrom.get('condition').invalid) {
      this.condition = true;
    }
    if (this.articleFrom.get('quantity').invalid) {
      this.qty = true;
    }
    if (this.articleFrom.get('offerType').invalid) {
      this.mode = true;
    }

    if (this.articleFrom.valid) {
      this.articleService.addArticle(this.article).subscribe(data => {
        const id = data._id;
        this.router.navigate(['/home']);

      })
    }

  }
}
export class DatepickerCustomIconExample { }
export class RadioOverviewExample { }
