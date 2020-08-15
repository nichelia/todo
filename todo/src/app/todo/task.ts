import { Timestamp } from '@firebase/firestore-types';

export class Task
{
  id: number;
  title: string = '';
  description: string = '';
  category: string = '';
  dateCreated: Date = new Date();
  dateCompleted: Date = null;
  dueDate: Date = null;
  priority: number = 0;
  isFocused: boolean = false;
  isDone: boolean = false;

  constructor(values: Object = {})
  {
    Object.assign(this, values);
  }
}
