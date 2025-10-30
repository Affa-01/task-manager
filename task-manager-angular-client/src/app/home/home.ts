import { Component, signal } from '@angular/core';
import { TasksViewer } from '../tasks-viewer/tasks-viewer';

@Component({
  selector: 'app-home',
  imports: [TasksViewer],
  templateUrl: './home.html'
})
export class Home {
  
}
