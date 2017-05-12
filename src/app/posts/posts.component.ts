import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { FileUploader } from 'ng2-file-upload';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // instantiate posts to an empty array
  //public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/api/uploadData'});
  posts: any = [];
  public hideForm = true;
  data: any = {};
  constructor(private postsService: PostsService , private domSanitizer : DomSanitizer) { }

  addPostData = function(data){
    this.postsService.addMorePosts(data).subscribe(result => {
      console.log(result);
      this.posts = result
    });
  }

  uploadStatus: Boolean = true;
  uploadExcelStatus: Boolean = true;
  getFile = function(event){
    this.uploadStatus = false;
      //console.log(event);
       this.files = event.srcElement.files;
    console.log(this.files[0]);
  }

  getExcelFile = function(event){
    this.uploadExcelStatus = false;
      //console.log(event);
       this.ExcelFiles = event.srcElement.files;
    console.log(this.ExcelFiles[0]);
  }

  uploadFile = function(){
    console.log(this.files[0]);
     var fd = new FormData();
        fd.append('file',this.files[0]);
      this.postsService.uploadFileService(fd).subscribe(result => {
      console.log(result);
      this.photoData = this.domSanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64,"+result.data);
      
      //this.posts = result
    });
  }

  uploadExcelFile = function(){
    console.log(this.ExcelFiles[0]);
     var reader:any,
     target:EventTarget;
     reader= new FileReader();

	        reader.onload = function(e){
	             var lines=e.target.result.split("\n");

	              var result = [];

	              var headers=lines[0].split(",");

	              for(var i=1;i<lines.length;i++){

	                  var obj = {};
	                  var currentline=lines[i].split(",");

	                  for(var j=0;j<headers.length;j++){
	                     
	                      
	                          obj[headers[j]] = currentline[j];
	                          
	                  }

	                  result.push(obj);
	                  
	              }
                result.pop();
                console.log(result);
  }
          reader.onerror = function(ex){
	            console.log(ex);
	        };

	        reader.readAsBinaryString(this.ExcelFiles[0]);
  }

  
  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
