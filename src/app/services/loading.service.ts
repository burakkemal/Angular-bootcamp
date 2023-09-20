import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  //Abone olunabilen değişkenler, abone olunduntan sonra diğer componentlere haber edilen mekanizmadır.

  // isLoadingSubject: Subject<boolean> = new Subject<boolean>();
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  //eğer başlangıç değeri vermek istiyorduk Behavior subject kullanmalıyız.
  constructor() {}

  startLoading() {
    this.isLoadingSubject.next(true);
  }

  stopLoading() {
    this.isLoadingSubject.next(false);
  }
}
