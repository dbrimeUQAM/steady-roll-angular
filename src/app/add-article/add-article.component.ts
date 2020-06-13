import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../services/articles.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  public articleFrom: FormGroup;
  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleFrom = this.formBuilder.group ({
      articleType: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      expirationDate: ['', Validators.required],
      hospitalName: ['', Validators.required],
      condition: ['', Validators.required],
      offerType: ['', Validators.required],
      quantity: [ null, Validators.required],
      price: [null, Validators.required],
    })
  }
  submit(){
  //this.articleService
  }
}
export class DatepickerCustomIconExample {}
export class RadioOverviewExample {}
