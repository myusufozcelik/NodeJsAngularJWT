import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { Author } from './author';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  constructor(private authorService:AuthorService) { }

  authors: Author[]

  ngOnInit(): void {
    this.getAuthor();
  }


  getAuthor() {
    this.authorService.getAuthors().subscribe(data=>{
      this.authors = data
    })
  }
}
