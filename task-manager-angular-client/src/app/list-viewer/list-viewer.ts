import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DataApi, List, Task} from '../data-api/data-api';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'list-viewer',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './list-viewer.html'
})
export class ListViewer {
  dataApi : DataApi;
  tasks : Task[] = []; 
  isTaskFormOpen = false;
  changeDetector : ChangeDetectorRef;
  @Input({required: true}) listId! : string;

  newTaskForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(dataApi : DataApi, changeDetector : ChangeDetectorRef) {
    this.dataApi = dataApi;
    this.changeDetector = changeDetector;
  }

  ngOnChanges() {
    this.dataApi.getTasksFromList(this.listId).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.changeDetector.detectChanges();
    });
  }

  ngOnInit() {
    this.dataApi.getTasksFromList(this.listId).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.changeDetector.detectChanges();
    });
  }

  toggleNewTaskForm() {
    this.isTaskFormOpen = !this.isTaskFormOpen;
  }

  onSubmitTaskForm(){
    let newTaskName = this.newTaskForm.value.name!;
    this.dataApi.createTask(newTaskName, this.listId).subscribe((response) => {
      this.tasks.push(response as Task);
      this.isTaskFormOpen = false;
      this.newTaskForm.reset();
      this.changeDetector.detectChanges();
    });
  }
  deleteTask(taskId: string){
    this.dataApi.deleteTask(taskId).subscribe((response) => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.changeDetector.detectChanges();
    });
  }
}
