import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentDate :string;
  newTask: string;
  allTasks = []
  constructor(private angFire: AngularFireDatabase) {
    const todayDate = new Date()
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
    this.currentDate = todayDate.toLocaleDateString('en-en', options)
  }
  ngOnInit(){
    this.getTask()
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
          date: element.payload.exportVal().date.substring(11, 16)
        })
      })
      
    })
  }
  addNewTask(){
    this.angFire.list('Tasks/').push({
      text:this.newTask,
      checked: false,
      date: new Date().toISOString()
    })
    this.newTask = ''
  }
  changeCheckedState(task){
    this.angFire.object(`Tasks/${task.key}/checked`).set(task.checked)
  }

}
