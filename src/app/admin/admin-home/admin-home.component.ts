import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  navLinks: any[];

  constructor(private router: Router) {
    this.navLinks = [
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
            link: '/admin/admin-articles',
            icon: 'content_copy'
        }, {
            label: 'Commandes',
            link: '/admin/admin-orders',
            icon: 'shopping_cart'
        }, {
            label: 'Factures',
            link: '/admin/admin-invoices',
            icon: 'monetization_on'
        }, {
          label: 'Contacts',
          link: '/admin/admin-contacts',
          icon: 'support_agent'
      }
    ];
  }

}
