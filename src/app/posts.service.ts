import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get('/api/posts')
      .map(res => res.json());
  }

  addMorePosts(data) {
    return this.http.post('/api/addPost',data)
      .map(res => res.json());
  }

  uploadFileService(file){
     return this.http.post('/api/uploadData',file)
      .map(res => res.json());
  }
}
