import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  public url = 'https://dummyjson.com/products';
  public http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    console.log('hello hardik');
    this.get();
  }
  get() {
    return this.http.get(this.url);
  }
}
