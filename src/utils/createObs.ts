import { Observable } from 'rxjs/Observable';

export function createObs(value: any) {
  return new Observable((observer: any) => {
    observer.next(value);
    observer.complete();
  });
}
