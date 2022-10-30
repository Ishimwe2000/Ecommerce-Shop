import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    // const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    // if (hasCategoryId) {
    //   // get the "id" param string. convert string to a number using the "+" symbol
    //   this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    // }
    // else {
    //   // not category id available ... default to category id 1
    //   this.currentCategoryId = 1;
    // get id param and convert string to number
    const hasProductId: boolean = this.route.snapshot.paramMap.has('id');
    if (!!hasProductId){
      const productId: number = +this.route.snapshot.paramMap.get('id')!;
      console.log(productId, 'id');
      this.productService.getProduct(productId).subscribe(
        product => {
          this.product = product;
         
        }
        
      )
    }
   
  }

}
