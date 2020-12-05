import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  count = 0;
  countSubscription: Subscription
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.countSubscription = this.taskService.unchecked.subscribe(c => {
      this.count = c
    })
  }
  ngOnDestroy(){
    this.countSubscription.unsubscribe()
  }

}
