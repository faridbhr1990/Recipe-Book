import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ToastService } from './shared/toast.service';
import { DataStorageService } from './shared/data-storage.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipebook';
  classShow=false;
  bodyText = '';

  constructor(private authService : AuthService,
              private toastService : ToastService,
              private dataStorage: DataStorageService) {
               }

  ngOnInit() {
        this.dataStorage.fetchRecipes().subscribe();
        this.authService.autoLogin();

        this.toastService.toast$.pipe(filter((toast) => !!toast)).subscribe((toast) => 
        {
          this.bodyText = toast.bodyText;
          this.classShow = true;
          setTimeout(() => {this.classShow = false;}, 5000); 
        });
            }

}
