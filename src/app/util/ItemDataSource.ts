import { DataSource } from "@angular/cdk/collections";
import { Observable, ReplaySubject } from "rxjs";

export class ItemDataSource extends DataSource<string> {
    private dataStream = new ReplaySubject<string[]>();
  
    constructor(initialData: string[]) {
      super();
      this.setData(initialData);
    }
  
    connect(): Observable<string[]> {
      return this.dataStream;
    }
  
    disconnect() {
    }
  
    setData(data: string[]) {
      this.dataStream.next(data);
    }
  }