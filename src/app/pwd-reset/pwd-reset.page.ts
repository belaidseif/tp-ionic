import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pwd-reset',
  templateUrl: './pwd-reset.page.html',
  styleUrls: ['./pwd-reset.page.scss'],
})
export class PwdResetPage implements OnInit {

  constructor(private alertCtrl: AlertController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  async onReset(form: NgForm){
    console.log(form.value.email);
    if(form.valid){
      this.authService.sendPasswordResetEmail(form.value.email).then(()=> this.router.navigate(['login']))
    }else{
      const alert = await this.alertCtrl.create({
        header: 'email not valid',
        buttons: ['OK']
      })
      await alert.present()
    }
    
  }
}
