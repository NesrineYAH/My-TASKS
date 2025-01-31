export class categorie {

  location?: string;// location  peut ne pas avoir une valeur peux etre undefined
  id : string;
constructor(public title: string, 
    public description: string,
    public imageUrl: string,
    public createdAt: Date,
    public snaps: number,) {
      this.id =crypto.randomUUID().substring(0, 8);
      console.log(this);
    }

    addSnap(): void {
      this.snaps++;
    }
    removeSnap():  void {
      this.snaps--;
    }
    setLocation(location: string): void {
     this.location = location; 
    }
    withLocation(location: string): categorie {
      this.setLocation(location);
      return this;
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
