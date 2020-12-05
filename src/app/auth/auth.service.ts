import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";

import { AngularFireAuth } from  "@angular/fire/auth";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  userSubject= new Subject<any>();
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        this.userSubject.next(user)
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log(1);
        
      } else {
        localStorage.setItem('user', null);
        console.log(3);
      }
    })
  }

  async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    console.log('result ');
    
    console.log(result);
    
    this.router.navigate(['home']);
  }
  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
    this.router.navigate(['home']);
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
}
