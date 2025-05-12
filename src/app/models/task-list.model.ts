// src/app/models/task-list.model.ts
export interface TaskList {
  _id: string;       // optionnel (donc pas obligatoire lors de la création) //Le ? signifie que la propriété est optionnelle 
  name: string;       // requis
  cssClass?: string;  // optionnel (utilisé pour l'affichage)
}
