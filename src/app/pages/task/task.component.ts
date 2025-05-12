import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from '../new-task/new-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router'; 
import { TaskListsComponent } from '../task-lists/task-lists.component'; // ajuste le chemin si nécessaire
import { TaskList } from '../../models/task-list.model';
import { ListService } from '../../services/List.service';


@Component({
  selector: 'app-task',
  standalone: true,
    imports: [CommonModule, FormsModule, TaskListsComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  lists: TaskList[] = []; // ✅ bien typé ici
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  priority: 'low' | 'medium' | 'high' = 'medium';
  listIds: string[] = []; // instead of: listId: number -04/05
  selectedCategory: string = '';

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private listService: ListService,
  ) {}

  ngOnInit(): void {
  // Charger les listes au démarrage
  this.listService.getLists().subscribe(lists => {
    this.lists = lists; // 👈 stocke les listes récupérées
    console.log('Listes récupérées depuis l’API :', this.lists);
  });

  // Ensuite charger les tâches selon l’ID passé dans l’URL
  this.route.params.subscribe(params => {
    const listId = params['listId'];

    if (listId) {
      this.listIds = [listId]; // 👈 store it in array form
      this.loadTasksByList();
    } else {
      this.loadTasks(); // fallback
    }
  });
}

loadTasksByList(): void {
  this.taskService.getTasks().subscribe((tasks) => {
    this.tasks = tasks.filter(task => 
      task.listId !== undefined && this.listIds.includes(task.listId)
    );  });
}

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  changeStatus(task: Task, status: 'todo' | 'in_progress' | 'done' ): void {
    this.taskService.updateTask(task._id!, { status }).subscribe(updated => {
      task.status = updated.status;
      task.updatedAt = updated.updatedAt;
    });
  }

    updateTaskFull(task: Task): void {
   const updatedFields = {
    title: task.title,
    category: task.category,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
    status: task.status,
    listId: task.listId  // <-- Important si tu veux changer la liste
  };

  this.taskService.updateTask(task._id!, updatedFields).subscribe(updated => {
    // Met à jour l'objet local avec les nouvelles valeurs
    Object.assign(task, updated);
  });
}


  toggleReminder(task: Task): void {
    const newReminder = !(task.reminder ?? false);
    this.taskService.updateTask(task._id!, { reminder: newReminder }).subscribe(updatedTask => {
      task.reminder = updatedTask.reminder;
      task.updatedAt = updatedTask.updatedAt;
    });
  }

    deleteTask(task: Task): void {
      this.taskService.deleteTask(task._id!).subscribe(() => {
        this.tasks = this.tasks.filter(t => t._id !== task._id);
      });
    }
    
  addTask(): void {
    if (!this.listIds[0]) {
      alert("Erreur : aucune liste sélectionnée pour la tâche.");
      return;
    }
    const newTask : Task = {
     title: this.newTaskTitle, 
      description: this.newTaskDescription,
      status: 'todo',
      listId: this.listIds[0],
      priority : this.priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      reminder: false,   
      category: '',  
  } as Task;
  console.log("Tâche envoyée au backend :", newTask);

  this.taskService.addTask(newTask).subscribe({
    next: (createdTask) => {
      this.tasks.push(createdTask);
      alert('✅ Tâche ajoutée avec succès');
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    },
    error: (err) => {
      console.error("Erreur lors de l'ajout :", err);
      alert("❌ Échec de l'ajout de la tâche");
    }
  });
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '500px',
      data: { listId: this.listIds[0] } //// 👈 même logique
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadTasksByList();  // 👈 déjà corrigée
      }
    });
  }

  get categories(): string[] {
    const categories = this.tasks
      .map((t: Task) => t.category)
      .filter((cat): cat is string => !!cat);
    return Array.from(new Set(categories));
  }

  filteredTasks(): Task[] {
    if (!this.selectedCategory) return this.tasks;
    return this.tasks.filter(t => t.category === this.selectedCategory);
  }
 
  onSelectList(list: TaskList): void {
    console.log('Liste sélectionnée :', list);
    this.listIds = [list._id];
    this.loadTasksByList(); // recharge les tâches
  }
  

  ////////////////////// création d'un modal pour modifer une tache edit-tasks 
  
  editingTask: Task | null =null;

  startEdit(task: Task): void {
    this.editingTask = { ...task };  // clone pour éviter les effets de bord
  }
  closeEdit(): void {
    this.editingTask = null; 

  }

  saveEdit(): void {
    if(!this.editingTask) return;


  this.taskService.updateTask(this.editingTask._id!, this.editingTask).subscribe(updated => {
const index = this.tasks.findIndex(t => t._id  === updated._id)
if (index !== -1) this.tasks[index] = updated;
this.closeEdit();
  })
  }
}
