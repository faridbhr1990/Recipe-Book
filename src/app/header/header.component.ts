import { Component , OnInit ,OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  isAuthenticated = false ;
  private usersub !: Subscription ;

  constructor(private dataStorage:DataStorageService , private authService : AuthService){}

  ngOnInit(){
    this.dataStorage.fetchRecipes().subscribe();
    this.usersub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    
  }

  // onFetchData(){
  //   this.dataStorage.fetchRecipes().subscribe();
  // }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.usersub.unsubscribe();
  }

}
