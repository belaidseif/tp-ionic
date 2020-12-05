import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentDate :string;
  newTask: string;
  allTasks = []
  onAdd = true;
  user = {email:'', id: ''};
  constructor(private angFire: AngularFireDatabase, private authService: AuthService) {
    const todayDate = new Date()
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
    this.currentDate = todayDate.toLocaleDateString('en-en', options)
  }
  ngOnInit(){
    this.authService.userSubject.subscribe(user => {
      console.log(user);
      this.user.email = user.email
      this.user.id = user.uid
      this.getTask()
    })
  }
  getTask(){
    this.angFire.list('Tasks/').snapshotChanges(['child_added']).subscribe(reponse => {
      this.allTasks = []
      reponse.forEach(element => {
        console.log(element.payload);
        this.allTasks.push({
          key: element.key,
          text: element.payload.exportVal().text,
          checked: element.payload.exportVal().checked,
          date: element.payload.exportVal().date.substring(11, 16),
          user: element.payload.exportVal().user
        })
      })
      console.log(this.allTasks);
      
      this.allTasks = this.allTasks.filter(task => task.user === this.user.id)
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
  }

  logout(){
    this.authService.logout()
  }
}
