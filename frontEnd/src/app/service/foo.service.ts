import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService2 } from './api.service';
import { ConfigService } from './config.service';

@Injectable()
export class FooService {

  constructor(
    private apiService: ApiService2,
    private config: ConfigService
  ) { }

  getFoo() {
    return this.apiService.get(this.config.foo_url);
  }

}
