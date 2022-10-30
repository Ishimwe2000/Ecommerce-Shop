import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';


  constructor(private httpClient: HttpClient) { }

  getProductList(CategoryId: number): Observable<Product[]> {
    // this way of writing the url reminds me of Lina's code with her team! anything is possible now! I will get a job for sure!
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${CategoryId}`;
    return this.getProducts(searchUrl);
    // return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));

  }
  getProductListPaginate(page: number, pageSize: number, CategoryId: number): Observable<GetResponseProducts> {
    // this way of writing the url reminds me of Lina's code with her team! anything is possible now! I will get a job for sure!
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${CategoryId}` + `&page= ${page} &size=${pageSize} `;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
    // return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));

  }


  searchProducts(keyWord: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyWord}`;

    return this.getProducts(searchUrl);
  }
  searchProductsPaginate(page: number, pageSize: number, keyWord: string): Observable<GetResponseProducts> {
    // this way of writing the url reminds me of Lina's code with her team! anything is possible now! I will get a job for sure!
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyWord}` + `&page= ${page} &size=${pageSize} `;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
    // return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));

  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  getProduct(productId: number): Observable<Product> {
    // make a get endpoint url with id as the parameter
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

