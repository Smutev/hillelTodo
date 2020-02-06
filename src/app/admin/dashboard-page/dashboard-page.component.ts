import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {log} from 'util';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  post: Post;
  form: FormGroup;
  pSub: Subscription;
  dSub: Subscription;
  cSub: Subscription;
  searchStr = '';

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAll().subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post._id !== id)
    })
  }

  ngOnDestroy() {
    if(this.pSub) {
      this.pSub.unsubscribe();
    }
    if(this.dSub) {
      this.dSub.unsubscribe();
    }
    if(this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  changeStatus(post) {
   this.cSub = this.postService.changeStatus(
        post._id,
        post.priority,
        post.checked,
        post.value
    ).subscribe()
  }
}
