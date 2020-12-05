import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  onSignIn(){
    this.authService.login(this.email, this.password).catch( async (err) => {
      const alert = await this.alertCtrl.create({
        header: 'error',
        message: err.message,
        buttons: ['OK']
      })
      await alert.present()
    })
  }

}
