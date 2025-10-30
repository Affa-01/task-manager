import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { DataApi, List} from '../data-api/data-api';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListViewer } from '../list-viewer/list-viewer';

@Component({
  selector: 'tasks-viewer',
  imports: [ReactiveFormsModule, FormsModule, ListViewer],
  templateUrl: './tasks-viewer.html'
})
export class TasksViewer {
  dataApi : DataApi;
  lists : List[] = []; 
  isListFormOpen = false;
  changeDetector : ChangeDetectorRef;
  currentlyOpen = "";

  newListForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(dataApi : DataApi, changeDetector : ChangeDetectorRef) {
    this.dataApi = dataApi;
    this.changeDetector = changeDetector;
  }

  ngOnInit() {
    this.dataApi.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
      this.changeDetector.detectChanges();
    });
  }

  toggleNewListForm() {
    this.isListFormOpen = !this.isListFormOpen;
  }

  onSubmitListForm(){
    let newListName = this.newListForm.value.name!;
    this.dataApi.createList(newListName).subscribe((response) => {
      this.lists.push(response as List);
      this.isListFormOpen = false;
      this.newListForm.reset();
      this.changeDetector.detectChanges();
    });
  }
  deleteList(listId: string){
    this.dataApi.deleteList(listId).subscribe((response) => {
      this.lists = this.lists.filter(list => list.id !== listId);
      this.changeDetector.detectChanges();
    });
  }

  openList(listId: string){
    if(this.currentlyOpen === listId){
      this.currentlyOpen = "";
      return;
    }
    this.currentlyOpen = listId;
  }
}
