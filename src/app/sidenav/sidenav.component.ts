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

  constructor(private router: Router, private tokenStorage: TokenStorageService) {
    this.navLinks = [
      {
          label: 'Accueil',
          link: '/home',
          icon: 'home'
      },
      {
          label: 'Utilisateurs',
          link: '/admin/admin-users',
          icon: 'account_circle'
      }, {
          label: 'Hôpitaux',
          link: '/admin/admin-hospitals',
          icon: 'medical_services'
      }, {
          label: 'Articles',
          link: '/articles',
          icon: 'content_copy'
      }, {
          label: 'Commandes',
          link: '/admin/admin-orders',
          icon: 'shopping_cart'
      }, {
          label: 'Factures',
          link: '/admin/admin-invoices',
          icon: 'monetization_on'
      },
    ];


    if (this.tokenStorage.getUser().role === 'admin') {

      this.navAdminLinks = [
        {
            label: 'Dashboard',
            link: '/admin',
            icon: 'settings'
        },
      ];

    }

  }

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

}
