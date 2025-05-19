import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { MatCardModule, } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatCardActions,MatIconModule,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchText: string = '';

constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  getRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 90%)`; // soft pastel colors
}

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.tasks.forEach(task => {
    task.color = this.getRandomColor();
  });
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

filteredTasks() {
  const text = this.searchText?.trim().toLowerCase() || '';
  if (!text) return this.tasks;

  return this.tasks.filter(task =>
    task.title?.toLowerCase().includes(text) ||
    task.description?.toLowerCase().includes(text) ||
      task.priority?.toLowerCase().includes(text)
  );
}

onAddTask() {
  const dialogRef = this.dialog.open(AddTaskDialogComponent, {
    width: '400px'
  }); // ✅ Closing ) and }

  dialogRef.afterClosed().subscribe((result: Task) => {
    if (result) {
      this.taskService.addTask(result).subscribe(newTask => {
        this.tasks.push(newTask); // Add to local list
      });
    }
  });
}

onEditTask(task: Task) {
  const dialogRef = this.dialog.open(AddTaskDialogComponent, {
    width: '400px',
    data: task  // 👈 MUST pass data
  });

  dialogRef.afterClosed().subscribe((result: Task) => {
    if (result) {
      this.taskService.updateTask(result).subscribe(updated => {
        const index = this.tasks.findIndex(t => t.id === updated.id);
        if (index !== -1) this.tasks[index] = updated;
      });
    }
  });
}

 
  
}
