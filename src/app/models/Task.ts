export class Task {
  _id?: string; //  Dans MongoDB, l’identifiant _id est généralement de type string, car il est une chaîne hexadécimale (ex: "6631717e66eafc2e4cb5f1b3"), pas un nombre. id?: number; // ❌ Faux avec MongoDB
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  reminder?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  category?: string;
  listId?: string; 
  completed?: boolean;
  notes?: string;
  projectId?: string;
  parentTaskId?: string;
  subTasks?: Task[];
  attachments?: string[]; // ou File[] si tu veux stocker les fichiers côté frontend temporairement

  constructor(
    title: string,   
    status: 'todo' | 'in_progress' | 'done',
    description?: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    dueDate?: Date, 
    category?: string,
    listId?: string,
    completed?: boolean,
    notes?: string,
    projectId?: string,
    parentTaskId?: string,
    subTasks?: Task[],
    attachments?: string[],

  ) {
    this.title = title;
    this.status = status;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.category = category;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.listId = listId;
    this.completed = completed;
    this.notes = notes,
    this.projectId = projectId,
    this.parentTaskId = parentTaskId,
    this.subTasks = subTasks,
    this.attachments = attachments

  }
}


/**
 import { v4 as uuidv4 } from 'uuid';

export class Task {
  _id?: string; // MongoDB ID (string)
  title: string;
  private _status: 'todo' | 'in_progress' | 'done';
  description?: string;
  priority: 'low' | 'medium' | 'high';
  private _dueDate?: Date;
  reminder?: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  listId?: string;

  constructor(
    title: string,
    status: 'todo' | 'in_progress' | 'done',
    description?: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    dueDate?: Date,
    category?: string,
    listId?: string
  ) {
    this._id = uuidv4(); // Génération d’un ID temporaire
    this.title = title;
    this._status = status;
    this.description = description;
    this.priority = priority;
    this.category = category;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.listId = listId;

    if (dueDate && dueDate < this.createdAt) {
      throw new Error('La date d’échéance ne peut pas être antérieure à la date de création.');
    }

    this._dueDate = dueDate;
  }

  // Getter et setter pour status avec mise à jour automatique de updatedAt
  get status() {
    return this._status;
  }

  set status(newStatus: 'todo' | 'in_progress' | 'done') {
    this._status = newStatus;
    this.touch();
  }

  // Getter et setter pour dueDate avec validation
  get dueDate() {
    return this._dueDate;
  }

  set dueDate(date: Date | undefined) {
    if (date && date < this.createdAt) {
      throw new Error('La date d’échéance ne peut pas être antérieure à la date de création.');
    }
    this._dueDate = date;
    this.touch();
  }

  // Met à jour updatedAt
  private touch() {
    this.updatedAt = new Date();
  }

  // Méthode pour changer le statut
  updateStatus(newStatus: 'todo' | 'in_progress' | 'done') {
    this.status = newStatus;
  }

  // Méthode de sérialisation propre (utile pour l’export ou l’affichage)
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      status: this._status,
      description: this.description,
      priority: this.priority,
      dueDate: this._dueDate,
      reminder: this.reminder,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      category: this.category,
      listId: this.listId,
    };
  }
}

 */

/*
npm install uuid

*/