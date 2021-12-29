import {  Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { StorageService } from '../../storage.service';
import { DashboardService } from '../../dashboard.service';
import { Observable, Subscription} from 'rxjs';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { Attribute } from 'src/app/shared/models/attribute.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy{
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  
  productForm: FormGroup;
  submitted= false

  productAttributes:Observable<Attribute[]>;
  selectedAttrs:Attribute[]= [];
  productData
  
  productImages=[]
  fileList: NzUploadFile[] = [];

  size: NzSelectSizeType = 'default';
  tags = ['summer', 'fashion', 'slimFit'];
  inputVisible = false;
  inputValue = '';

  selectedProduct:Product
  productId:string
  editMode:boolean=false;

  uploadSubscription:Subscription

  constructor(private msg: NzMessageService,
      private storageService: StorageService,
      private fb: FormBuilder,
      private dashboardservice: DashboardService,
      private productService: ProductService,
      private router: Router,
      private route: ActivatedRoute) {

    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: [''],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      discount: [0, [Validators.required]],
      attr: [[], [Validators.required]],
      
      attrVariables: this.fb.group({}),
      description: ['', [Validators.required]],
      tags: [''],
      isAvilable:['true']
    })
  }

  ngOnInit(): void {

    this.productAttributes=  this.dashboardservice.getAttributes()
    this.productId = this.route.snapshot.paramMap.get('id');

    if(this.productId){
      this.editMode = true

      this.productService.getProduct(this.productId)
      .pipe(take(1))
      .subscribe((p: Product) => {

        //set product attr variables
        this.selectedProduct = p
        this.selectedAttr(p.attr)
        
        const attrs =[]
        p.attr.map((el:any) => attrs.push(el.attrName));

        //set product values
        this.productForm.patchValue({...p, attr:attrs})


        //Set Product Images
        this.productImages = p.images
        p.images.forEach((imgUrl, i) =>{

          let imageData:NzUploadFile = {
            uid: `${i}`,
            name: `${p.name.toLocaleLowerCase()}.jpg`,
            status: 'done',
            url: imgUrl
          };
          this.fileList.push(imageData)
          
        })
        
      })
    }
  }

  get f(){return this.productForm.controls}

  /* ***** HANDEL PHOTO UPLOAD **********/

  customUploadReq = (item: NzUploadXHRArgs) => {
    
    return this.uploadSubscription = this.storageService.uploadimageToStorage(item.file)
            .subscribe(imageUrl => {

              item.onSuccess(item.name, item.file, item.headers)
              this.productImages.push(imageUrl)
            
          },
            (err) => { item.onError(err, item.file); })
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;

    if (status !== 'uploading') {
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  imageRemoved= (file:NzUploadFile)=>{
    this.storageService.deleteImageFromStorage()
    return true
  }

 
/*****  SET PRODUCT ATTRIBUTES **************/

  selectedAttr(attrs){

      attrs.forEach((attr) => {
        
        if(attr.attrName){
          this.selectedAttrs = attrs;
          (this.productForm.get('attrVariables') as FormGroup).addControl(attr.attrName, new FormControl([], Validators.required))

          return;
        }else{

          // this.productAttributes.subscribe(x=>{
          //    let arr = x.filter((x:Attribute)=> {return x.attrName === attr});            
          //   this.selectedAttrs.push(...arr)
          // });
          // (this.productForm.get('attrVariables') as FormGroup).addControl(attr.name, new FormControl([], Validators.required))
        }
      });      
    
  }


  /***** FORM TAGS **************/
  
  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    let inputValue= this.productForm.get('tags').value
    if (inputValue && this.tags.indexOf(inputValue) === -1) {
      this.tags = [...this.tags, inputValue];
    }
    inputValue = '';
    this.inputVisible = false;
  }


  /* ******* SUBMIT FORM ********/

  submitForm(productForm) {
    
    this.submitted = true

    for (const i in this.productForm.controls) {
      if (this.productForm.controls.hasOwnProperty(i)) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }

    if(this.productForm.valid){
      
      if(this.productImages.length > 0){
        console.log(this.productImages.length);

        this.productData ={images: this.productImages, ...productForm}

        //check if we on edit mode or not

        if(this.productId){
          this.productService.editProduct(this.productId, this.productData).then(x=>{
            this.msg.info("Product Updated Successfully")   
            this.router.navigate(["admin/dashboard/products"]);            
          })
        }else{
          this.productService.createProduct(this.productData).then(x=>{
            this.msg.info("Product Uploaded Successfully")    
          })
          this.productImages =[]
        }

        // rest image list after uploading a product successfully
      }else{

        this.msg.error(`Please Upload Product Images.`);
      }
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.productImages=[]
    this.productForm.reset();
    for (const key in this.productForm.controls) {
      this.productForm.controls[key].markAsPristine();
      this.productForm.controls[key].updateValueAndValidity();
    }

  }

  ngOnDestroy(){
    if(this.uploadSubscription) this.uploadSubscription.unsubscribe()
  }
}