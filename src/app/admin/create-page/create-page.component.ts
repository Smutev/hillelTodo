import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {PostService} from '../../shared/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

    form: FormGroup;

  constructor(
      private postService: PostService,
      private router: Router
      ) { }

  ngOnInit() {
    this.form = new FormGroup({
      value: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if(this.form.invalid){
      return;
    }

    const post: Post = {
      priority: 1,
      value: this.form.value.value,
      // text: this.form.value.text
    }

    this.postService.create(post).subscribe((res) => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard']);
    })
  }

}
