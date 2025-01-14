export class categorie {
  location?: string; // location  peut ne pas avoir une valeur peux etre undefined
constructor(public title: string, 
    public description: string,
    public imageUrl: string,
    public createdAt: Date,
    public snaps: number,) {}

    addSnap(): void {
      this.snaps++;
    }
    removeSnap():  void {
      this.snaps--;
    }
    setLocation(location: string): void {
     this.location = location; 
    }
}




/*
//export class categorie {
constructor(public title: string,
 title!: string;
  description!: string;
  createdAt!: Date;
  snaps!: number;
  imageUrl!: string;
) {}
}
*/
