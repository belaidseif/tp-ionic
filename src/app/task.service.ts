import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = []
  unchecked = new Subject<number>()
  constructor(private authService: AuthService) { }

  getTasks(){
    return this.tasks
  }
  setTask(allTask){
    this.tasks = allTask
    this.updateUnchecked()
  }
  updateUnchecked(){
    var count = this.tasks.filter(task => task.checked === false).length
    this.unchecked.next(count)
  }
}
