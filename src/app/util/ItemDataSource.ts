import { DataSource } from "@angular/cdk/collections"
import { Observable, ReplaySubject } from "rxjs"

export class ItemDataSource<T> extends DataSource<T> {
  private dataStream = new ReplaySubject<T[]>()

  constructor(initialData: T[]) {
    super()
    this.setData(initialData)
  }

  connect(): Observable<T[]> {
    return this.dataStream
  }

  disconnect() {
    // empty
  }

  setData(data: T[]) {
    this.dataStream.next(data)
  }
}
