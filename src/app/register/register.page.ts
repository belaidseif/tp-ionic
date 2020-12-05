import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email = ''
  password = ''
  constructor(private alertCtrl: AlertController, private authService: AuthService) { }

  ngOnInit() {
  }
  async onRegister(form: NgForm){
    console.log(form.valid);
    if(form.valid){
      this.authService.register(form.value.email, form.value.password).catch(async err => {
        const alert = await this.alertCtrl.create({
          header: 'error',
          message: err.message,
          buttons: ['OK']
        })
        await alert.present()
      })
    }else{
      const alert = await this.alertCtrl.create({
        header: 'email not valid',
        buttons: ['OK']
      })
      await alert.present()
    }
    
  }
}
