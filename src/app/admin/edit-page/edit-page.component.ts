import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../shared/post.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  uSub: Subscription;
  constructor(
      private route: ActivatedRoute,
      private postService: PostService,
      private router: Router
  ) { }

  ngOnInit() {
    this.route.params.pipe(
        switchMap((params: Params) => {
          return this.postService.getById(params['id'])
        })
    ).subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          value: new FormControl(post.value, Validators.required),
        })
    })
  }

  submit() {
     if(this.form.invalid) {
       return
     }
     this.submitted = true;

     this.postService.update(
         this.post._id,
         this.post.priority,
         this.post.checked,
         this.form.value.value
     ).subscribe(() => {
       this.submitted = false;
       this.router.navigate(['/admin', 'dashboard']);
     })

  }

  ngOnDestroy(): void {
    if(this.uSub) {
      this.uSub.unsubscribe();
    }
  }

}
