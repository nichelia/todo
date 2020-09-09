import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { Platform } from '@angular/cdk/platform';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Task } from './task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  private maxDoneItems = 100;
  private focusedTasksCollection: AngularFirestoreCollection<Task>;
  private backlogTasksCollection: AngularFirestoreCollection<Task>;
  private doneTasksCollection: AngularFirestoreCollection<Task>;
  focusedTasks: Observable<Task[]>;
  backlogTasks: Observable<Task[]>;
  doneTasks: Observable<Task[]>;
  addTaskForm: FormGroup;

  constructor(
    public platform: Platform,
    private firestore: AngularFirestore, public fb: FormBuilder) { }

  ngOnInit(): void
  {
    this.init();
  }

  private init()
  {
    this.setupDB();
    this.setupAddTaskForm();
    // this.setupData();
  }

  private setupDB()
  {
    this.focusedTasksCollection = this.firestore.collection<Task>('tasks',
      ref => ref.where('isFocused', '==', true)
                .orderBy('priority'));
    this.backlogTasksCollection = this.firestore.collection<Task>('tasks',
      ref => ref.where('isFocused', '==', false)
                .where('isDone', '==', false)
                .orderBy('dueDate'));
    this.doneTasksCollection = this.firestore.collection<Task>('tasks',
      ref => ref.where('isDone', '==', true)
                .orderBy('dateCompleted', 'desc')
                .limit(this.maxDoneItems));

    this.focusedTasks = this.focusedTasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.backlogTasks = this.backlogTasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.doneTasks = this.doneTasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  private setupAddTaskForm()
  {
      this.addTaskForm = this.fb.group({
        title: ['', [Validators.required]],
        description: [''],
        category: [''],
        dueDate: [null],
      })
  }

  private setupData()
  {
    for (let i=0; i<10; i++)
    {
      const task = new Task({
        title: 'Example '+String(i),
        description: 'Description filed for example '+String(i),
        category: 'Category Sample'
      });
      this.addBacklogDocument(task);
    }
  }

  private addFocusedDocument(task: Task)
  {
    this.focusedTasksCollection.add({...task});
  }

  private addBacklogDocument(task: Task)
  {
    this.backlogTasksCollection.add({...task});
  }

  private updateDocument(task: Task)
  {
    const taskDoc = this.firestore.doc<Task>('tasks/'+task.id);
    taskDoc.update(task);
  }

  private changeToFocused(task: Task, newIndex: number)
  {
    task.priority = newIndex;
    task.isFocused = true;
    task.isDone = false;
    task.dateCompleted = null;
    this.updateDocument(task);
  }

  private changeToBacklog(task: Task)
  {
    task.priority = 0;
    task.isFocused = false;
    task.isDone = false;
    task.dateCompleted = null;
    this.updateDocument(task);
  }

  private changeToDone(task: Task)
  {
    task.priority = 0;
    task.isFocused = false;
    task.isDone = true;
    task.dateCompleted = new Date();
    this.updateDocument(task);
  }

  private delay(ms: number)
  {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async onDoneChange(event, task: Task)
  {
    const delayInMs = 500
    await this.delay(delayInMs);

    if (event.checked)
    {
      this.changeToDone(task);
    }
    else
    {
      this.changeToBacklog(task);
    }
  }

  async onFocusChange(event, task: Task)
  {
    const delayInMs = 200
    await this.delay(delayInMs);

    if (task.isFocused)
    {
      this.changeToBacklog(task);
    }
    else
    {
      const newIndex = 0;
      this.changeToFocused(task, newIndex);
    }
  }

  onDateChange(event)
  {
    const dueDate = event.target.value
    this.addTaskForm.get('dueDate').setValue(dueDate, {
      onlyself: true
    });
  }

  drop(event: CdkDragDrop<Task[]>)
  {
    if (event.previousContainer === event.container)
    {
      event.item.data.priority = event.currentIndex;
      this.updateDocument(event.item.data);
    }
    else
    {
      if (event.container.id === 'focused-list')
      {
        this.changeToFocused(event.item.data, event.currentIndex);
      }
      if (event.container.id === 'backlog-list')
      {
        this.changeToBacklog(event.item.data);
      }
      if (event.container.id === 'done-list')
      {
        this.changeToDone(event.item.data);
      }
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.addTaskForm.controls[control].hasError(error);
  }

  resetForm()
  {
    this.addTaskForm.reset();
  }

  submitTask()
  {
    if (!this.addTaskForm.valid)
    {
      return;
    }
    const values = this.addTaskForm.value;
    const newTask = new Task(values);
    this.addBacklogDocument(newTask);
  }

}
