import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IUserModel } from './../user/user.model';
import { UserService } from './../user/user.service';
import { DomController } from './../../shared/controllers/dom/dom-controller';
import { IFeedModel } from './../../../backend/modules/feed/models/feed.model'
import { FeedService } from './feed.service'

@Component({
    selector: 'feed',
    styleUrls: ['./feed.component.scss'],
    templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {

    private user: IUserModel;
    private posts: IFeedModel[];
    private newPost: IFeedModel;

    constructor(private _userService: UserService, private _feedService: FeedService) {
        this.user = _userService.getUserDetails();
        this.newPost = <IFeedModel>{};
    }

    public ngOnInit() {
        console.log('hello `Feed` component');
    }

    ngAfterViewInit() {
        
    }

    getFeeds() {
        this._feedService.getUserFeeds(this.user.user_id).subscribe(feeds => {
            this.posts = feeds;
        });
    }

    post() {
        debugger
        if (this.newPost && this.newPost.text) {
            this._feedService.postFeed(this.newPost).subscribe(post => {
                this.posts.push(post);
                this.newPost = <IFeedModel>{};
            });
        }
    }

    like(post: IFeedModel) {

    }

    loadComments(post: IFeedModel) {

    }

    comment(post: IFeedModel) {

    }
}

