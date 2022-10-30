import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategoryId: number = 1;

  // pagination properties
  pageNumber : number = 1;
  pageSize : number = 5;
  totalElements : number = 0;

  previousKeyword: string = "" 
  

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
   
  }
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const keyWord :string = this.route.snapshot.paramMap.get('keyword')!;

    // this is where pagination for searching is implemented 
    if (this.previousKeyword != keyWord) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyWord;
    console.log(this.previousKeyword); 

    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize , keyWord).subscribe(
      this.processResults());

  }
    
  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the id as a string and convert it to a number to be used in the array of routes
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // set it to 1 if category not available
      this.currentCategoryId = 1;
    }
    // a check for category id
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log( "persistent id", this.currentCategoryId, "page number:", this.pageNumber);

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(
      this.processResults());

  }
  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();
    }
  processResults() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }
}
