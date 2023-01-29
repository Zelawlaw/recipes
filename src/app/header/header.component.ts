import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeTab: String = 'recipes';
  @Output('actTab') emitActiveTab = new EventEmitter<String>();
  private userSub!: Subscription;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private dsService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = user.id != 'null';
      },
    });
  }

  onSaveData() {
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
