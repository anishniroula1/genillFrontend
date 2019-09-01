/*
export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    // date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + '=' + value + '; path=/';
    // it will expire in 7 days
    // document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
}

export function getCookie(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    // tslint:disable-next-line:triple-equals
    if (parts.length != 2) {
    } else {
        return parts.pop().split(';').shift();
    }
}

export function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
}

import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { concat } from 'rxjs/observable/concat';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concat'
import { catchError, filter, first, map, mapTo, switchMap, switchMapTo, tap } from 'rxjs/operators'
*/
