import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSignIn(){
    this.authService.login(this.email, this.password)
    .then(() => console.log('success'))
    .catch(err => console.log('err '+ err))
    
  }

}
