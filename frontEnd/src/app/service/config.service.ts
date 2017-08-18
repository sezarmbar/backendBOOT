import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

    // private _api_url = '/api';
    private adress = '';

    // private adress = '/rating-app';
    private _api_url = '/api';



    private _find_user_url = '/findUser';

    private _user_url = this.adress + '/user';

    private _refresh_token_url = this.adress + '/refresh';

    private _login_url = this.adress + '/auth';

    private _logout_url = this.adress + '/logout';

    private _whoami_url = this.adress + '/user';

    private _users_url = this.adress + '/all-User';

    private _registration_url = this.adress + '/registration';

    private _users_rating_url = this.adress + this._api_url + '/userRating';

    private _users_rating_delete_all_url = this.adress + this._api_url + '/deleteByUserName';

    private _user_update_url = this.adress + '/update';

    private _creatt_Rating_url = this.adress + this._api_url + '/create-rating';

    private _rating_url = this.adress + this._api_url + '/rating';

    private _delete_rating_url = this.adress + this._api_url + '/delete-rating';

    private _rating_by_name_url = this.adress + this._api_url + '/ratingName';

    private _all_rating_url = this.adress + this._api_url + '/all-rating';

    private _all_review_url = this.adress + this._api_url + '/all-reviews';

    private _review_url = this.adress + this._api_url + '/review';

    private _rating_by_userName_url = this.adress + this._api_url + '/ratingByUserName';

    private _rating_some_url = this.adress + this._api_url + '/rating-some-status';

    private _rating_some_info_url = this.adress + this._api_url + '/rating-some-info';

    get rating_by_userName_url() {
        return this._rating_by_userName_url;
    }
    get review_url() {
        return this._review_url;
    }
    get all_review_url() {
        return this._all_review_url;
    }
    get rating_by_name_url() {
        return this._rating_by_name_url;
    }
    get all_rating_url() {
        return this._all_rating_url;
    }
    get delete_rating_url() {
        return this._delete_rating_url;
    }

    get rating_url() {
        return this._rating_url;
    }
    get creatt_Rating_url() {
        return this._creatt_Rating_url;
    }

    get api_url(): string {
        return this._api_url;
    }

    get refresh_token_url(): string {
        return this._refresh_token_url;
    }

    get whoami_url(): string {
        return this._whoami_url;
    }

    get users_url(): string {
        return this._users_url;
    }
    get user_url(): string {
        return this._user_url;
    }

    get login_url(): string {
        return this._login_url;
    }

    get logout_url(): string {
        return this._logout_url;
    }

    get registration_url(): string {
        return this._registration_url;
    }

    get user_rating_url() {
        return this._users_rating_url;
    }

    get users_rating_delete_all_url() {
        return this._users_rating_delete_all_url;
    }

    get user_update_url() {
        return this._user_update_url;
    }

    get find_user_url() {
        return this._find_user_url;
    }
    get rating_some_url() {
        return this._rating_some_url;
    }
    get rating_some_info_url() {
        return this._rating_some_info_url;
    }
}
