import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct = new Subject<Product>()

  constructor(private fs:AngularFirestore) {
    // this.getAllProducts().subscribe(p=>{
    //   p.forEach(x=>{
    //     this.editProduct(x.id, {isFavorite:false})
    //   })
    // })

   }

  getAllProducts(){
    return this.fs.collection<Product>('products')
    .snapshotChanges()
    .pipe(
      map((allProducts)=>{

          //create a new array for products
        let products:Product[] = []

        allProducts.map((item:any) =>{
          
          const product = {
            id: item.payload.doc.id,
            ...item.payload.doc.data(),
            colors: item.payload.doc.data().attrVariables.color,
            sizes: item.payload.doc.data().attrVariables.size
          }
          products.push(new Product(product))

        })
        
        return products
      })
    )
  }


  getProduct(id){
    //return this.fs.doc(`/products/${id}`).valueChanges()

    return this.fs.doc(`/products/${id}`)
    .snapshotChanges()
    .pipe(
      map((item: any)=>{
        
          const product = {
            id: item.payload.id,
            ...item.payload.data(),
            colors: item.payload.data().attrVariables.color,
            sizes: item.payload.data().attrVariables.size
          }
        return new Product(product)
      })
    )
  }

  createProduct(product){
    return this.fs.collection(`products/`).add(product)
  }

  editProduct(id, data){
    
    return this.fs.doc(`/products/${id}`).update(data)
  }

  deleteProduct(id){
    this.fs.doc(`/products/${id}`).delete()
  }

  // Handel Product Name Split
  splitString(string: string , separator , limit, status){
    
    if(!string) return undefined;
    
    if(status ==="sub"){

      
      let strArr = string.split(separator, limit).splice(2)
      
      return strArr.join(' ')
    }else{
      let strArr = string.split(separator, limit)
      return strArr.join(' ')
    }
  }
  
}
