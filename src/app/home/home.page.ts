import { Component, OnDestroy, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  currentDate :string;
  newTask: string;
  allTasks = []
  onAdd = true;
  user = {email:'', id: ''};
  userSubject: Subscription
  constructor(private angFire: AngularFireDatabase,
     private authService: AuthService,
     private taskService: TaskService) {
    const todayDate = new Date()
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
    this.currentDate = todayDate.toLocaleDateString('en-en', options)
  }
  ngOnInit(){

      console.log(this.authService.user);
      if(this.authService.user){
        this.user.email = this.authService.user.email
        this.user.id = this.authService.user.uid
        this.getTask()
      }
      this.userSubject = this.authService.userSubject.subscribe(user => {
        this.user.email = user.email
        this.user.id = user.uid
        this.getTask()
      })
  
  }

  getTask(){
    this.angFire.list('Tasks/').snapshotChanges(['child_added']).subscribe(reponse => {
      this.allTasks = []
      reponse.forEach(element => {
        this.allTasks.push({
          key: element.key,
          text: element.payload.exportVal().text,
          checked: element.payload.exportVal().checked,
          date: element.payload.exportVal().date.substring(11, 16),
          user: element.payload.exportVal().user
        })
      })
      this.allTasks = this.allTasks.filter(task => task.user === this.user.id)
      this.taskService.setTask(this.allTasks)
            
    })
  }
  addNewTask(){
    this.angFire.list('Tasks/').push({
      text:this.newTask,
      checked: false,
      date: new Date().toISOString(),
      user: this.user.id
    })
    this.newTask = ''
  }
  changeCheckedState(task){
    this.angFire.object(`Tasks/${task.key}/checked`).set(task.checked)
    
    this.taskService.updateUnchecked()
  }

  logout(){
    this.authService.logout()
  }
  ngOnDestroy(){
    this.userSubject.unsubscribe()
  }
}
