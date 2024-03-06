//Injectable service for fetching product data from a remote API.
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  public url = 'https://dummyjson.com/products';
  public http: HttpClient = inject(HttpClient);
  ngOnInit(): void {
    this.get();
  }
  get() {
    return this.http.get(this.url);
  }
}
