import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IUserModel } from './../user/user.model';
import { UserService } from './../user/user.service';
import { DomController } from './../../shared/controllers/dom/dom-controller';
import { IFeedModel, IPostLikeModel } from './../../../backend/modules/feed/models/feed.model'
import { FeedService } from './feed.service'
import { IChat } from './../chat/chat-list/chat-list.model';

@Component({
    selector: 'feed',
    styleUrls: ['./feed.component.scss'],
    templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {

    private user: IUserModel;
    private posts: IFeedModel[];
    private newPost: IFeedModel;

    private pageNumber: number;
    private pageSize: number;
    private chats: IChat[];
    private hasPosts = false;

    constructor(private _userService: UserService, private _feedService: FeedService) {
        this.user = _userService.getUserDetails();
        this.newPost = <IFeedModel>{};
        this.posts = null;
        this.pageNumber = 1;
        this.pageSize = 20;
    }

    public ngOnInit() {
        console.log('hello `Feed` component');
        this.getFeeds();
    }

    ngAfterViewInit() {

    }

    onChatRoomSelect(chats: IChat[]): void {
        this.chats = chats;
    }

    getFeeds(pageNumber?: number) {
        this.hasPosts = false;
        pageNumber = pageNumber || this.pageNumber;
        this._feedService.getUserFeeds(this.user.user_id, this.pageSize, pageNumber).subscribe(feeds => {
            feeds = feeds || [];
            if (feeds.length !== 0) {
                this.hasPosts = true;
            }
            this.posts = this.posts || [];
            feeds.forEach(x => this.posts.push(x));
        });
    }

    loadMore() {
        this.pageNumber++;
        this.getFeeds(this.pageNumber);
    }

    post() {
        if (this.newPost && this.newPost.text) {
            this.newPost.from = this.user.user_id;
            this.newPost.comments = [];
            this.newPost.images = [];
            this.newPost.likes = [];
            this._feedService.postFeed(this.newPost).subscribe(post => {
                this.posts = this.posts || [];
                this.posts.push(post);
                this.newPost = <IFeedModel>{};
            });
        }
    }

    like(post: IFeedModel) {
        debugger
        this._feedService.addLike(post._id, this.user.user_id).subscribe(likesCount => {
            (<any>this.newPost).likesCount = likesCount;
        });
    }

    loadComments(post: IFeedModel) {

    }

    comment(post: IFeedModel) {

    }
}

