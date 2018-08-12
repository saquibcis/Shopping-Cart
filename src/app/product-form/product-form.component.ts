import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  title;
  price;
  imageUrl;
  category;
  id;
  constructor(private router: Router ,
              private route: ActivatedRoute,
              private categoryService: CategoryService, 
              private productService: ProductService) {
   
    this.categories$ = categoryService.getCategories();
    this.id =this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).take(1).subscribe(p => {
      this.title = p.title;
      this.price = p.price;
      this.imageUrl = p.imageUrl;
      this.category = p.category;
      }
    )
  }

   save(product){
    if(this.id){this.productService.update(product,this.id)}
    else{this.productService.create(product);}
     
     this.router.navigate(['/admin/products']);

   }
   delete(){
    if(confirm('Do you want to delete this product?')){
     this.productService.delete(this.id);
     this.router.navigate(['/admin/products']);
    }
   }
  ngOnInit() {
  }

}
