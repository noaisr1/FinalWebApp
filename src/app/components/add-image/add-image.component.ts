import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService, UserData } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  subs: Subscription[] = [];
  user: UserData;
  imgFile: string;
  fileFormat: boolean = false;
  fileIsNull: boolean = false;

  constructor(public authService: AuthService,
              private httpClient: HttpClient,
              private afs: AngularFirestore) { }

  async ngOnInit(): Promise<void> {
    this.subs.push(this.authService.CurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    }));
  }


  uploadForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   file: new FormControl('', [Validators.required]),
   imgSrc: new FormControl('', [Validators.required])
 });
 
 get uf(){
   return this.uploadForm.controls;
 }
  
 onImageChange(e: any) {
   const reader = new FileReader();
   
   if(e.target.files && e.target.files.length) {
     const [file] = e.target.files;
     reader.readAsDataURL(file);
   
     reader.onload = () => {
       this.imgFile = reader.result as string;
       this.uploadForm.patchValue({
         imgSrc: reader.result
       });
  
     };
   }
 }
  
  checkIfImageExists(url: string) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      return true;
    } else {
      return false;
    }
  }

  upload(){
    this.fileFormat = false;
    this.fileIsNull = false;
    var newPic = this.uploadForm.value.imgSrc;
    
    if(!newPic){
      this.fileIsNull = true;
    }
    
    if(!this.checkIfImageExists(newPic)){
      this.fileFormat = true;
    }

    if(this.fileFormat || this.fileIsNull) return;
    else{
      this.afs.collection<UserData>('users')
      .doc<UserData>(this.user.uid)
      .update({picture:newPic}).then(()=>{
        console.log("changed successfully")
      });
        }
    }
}
