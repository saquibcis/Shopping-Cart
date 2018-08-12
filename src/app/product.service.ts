import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable   } from 'angularfire2/database'
@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { 
    
  }

  create(product){
    this.db.list('/products').push(product);
  }
  getAll(){
    return this.db.list('/products');
  }
  get(productId){
    return this.db.object('/products/'+productId);
  }
  update(product, productId){
    this.db.object('/products/'+productId).update(product);
  }
  delete(productId){
    this.db.object('/products/'+productId).remove();
  }
}
