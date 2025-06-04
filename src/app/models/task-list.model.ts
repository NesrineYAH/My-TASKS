import { Task } from './Task';

export interface TaskList {
  _id?: string;       // optionnel (donc pas obligatoire lors de la création) //Le ? signifie que la propriété est optionnelle 
  name: string;       // requis
  cssClass?: string;  // optionnel (utilisé pour l'affichage)
  tasks?: Task[]; // Assure-toi que cette propriété existe
  showTasks?: boolean; // 👈 pour afficher ou masquer
}
