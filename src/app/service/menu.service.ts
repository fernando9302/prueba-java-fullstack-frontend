import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../model/menu';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu> {

  private menuChange = new Subject<Menu[]>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/menus`);
  }

  getMenusByUser(username: string){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.post<Menu[]>(`${this.url}/user`, username, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }


  getMenuChange(){
    return this.menuChange.asObservable();
  }

  setMenuChange(menus: Menu[]){
    this.menuChange.next(menus);
  }
}
