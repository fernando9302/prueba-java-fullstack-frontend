import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  username:string=''
  rol:string=''

  constructor() { }

  ngOnInit(): void {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.username = decodedToken.user_name;
    this.rol = decodedToken.authorities.join(' | ');
  }
}
