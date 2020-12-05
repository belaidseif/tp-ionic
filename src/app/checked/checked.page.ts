import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.page.html',
  styleUrls: ['./checked.page.scss'],
})
export class CheckedPage implements OnInit {
  allTasks = []
  currentDate :string;
  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit() {
    const todayDate = new Date()
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
    this.currentDate = todayDate.toLocaleDateString('en-en', options)
    
  }
  ionViewWillEnter(){
    this.allTasks = this.taskService.getTasks().filter(task => task.checked === true)
  }
  logout(){
    this.authService.logout()
  }
}
