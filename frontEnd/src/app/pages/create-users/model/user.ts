export class User {
  constructor(public id: string, public email: string, public username: string, public password: string,
              public firstname: string, public lastname: string, public authorities: {},public enabled:boolean) {
  }
}

//
// const user = {
//   "username": "mbar", "firstname": "sezar", "lastname": "sezar", "email": "sezar@sezar.com",
//   "password": "sezar", "authorities": [{"name": "ROLE_USER"}, {"name": "ROLE_ADMIN"}], "enabled": true
// }
