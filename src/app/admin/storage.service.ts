import { Injectable, OnInit } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { BehaviorSubject } from "rxjs";
import {  last, switchMap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})

export class StorageService implements OnInit {
    downloadURL = new BehaviorSubject({})
    //downloadURL:Observable<number>
    constructor(private storage: AngularFireStorage) {
   
     }

    ngOnInit(){
        this.downloadURL.subscribe(x=>{
            console.log(x);
            
        })
    }
    uploadimageToStorage(file) {
        //console.log(file);

        let date = new Date().getTime()
        const filePath = `ProductsImages/${date}`;
        const sorageRef = this.storage.ref(filePath)
        const task = sorageRef.put(file)
        
        // task.percentageChanges().subscribe(x=>{
        //     this.downloadURL.next(x)
        // })

        const downloadURL=  task.snapshotChanges().pipe(
            last(),
            switchMap(() => sorageRef.getDownloadURL())
          )

        return downloadURL
        //return combineLatest([downloadURL, upload])

    }

    deleteImageFromStorage(){
        
    }
}