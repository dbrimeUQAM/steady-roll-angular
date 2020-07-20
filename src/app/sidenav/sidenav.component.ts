import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navLinks: any[];
  navAdminLinks: any[];

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']);
    } else {

      if (this.tokenStorage.getUser().role === 'user') {
        this.navLinks = [
          {
              label: 'Accueil',
              link: '/home',
              icon: 'home'
          }, {
              label: 'Mes Articles',
              link: '/articles/my-articles',
              icon: 'article'
          }, {
              label: 'Magasiner',
              link: '/articles/all',
              icon: 'storefront'
          }, {
              label: 'Médicaments',
              link: '/articles/drugs',
              icon: 'local_pharmacy'
          }, {
              label: 'Fournitures',
              link: '/articles/supplies',
              icon: 'healing'
          }, {
              label: 'Équipements',
              link: '/articles/equipments',
              icon: 'biotech'
          }, {
              label: 'Commandes',
              link: '/my-orders',
              icon: 'shopping_cart'
          }, {
              label: 'Contactez-nous',
              link: '/contact',
              icon: 'support_agent'
          }
        ];
      }

      if (this.tokenStorage.getUser().role === 'admin') {

        this.navAdminLinks = [
          {
              label: 'Dashboard',
              link: '/admin/admin-users',
              icon: 'settings'
          }
        ];

      }

    }
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

}
