import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from '../../../services/hospital/hospital';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-hospitals-detail',
  templateUrl: './admin-hospitals-detail.component.html',
  styleUrls: ['./admin-hospitals-detail.component.css']
})
export class AdminHospitalsDetailComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  hospital: Hospital = new Hospital();
  provinces: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private hospitalService: HospitalService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getUser().role !== 'admin') {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }

    if (this.route.snapshot.params.id === 'new') {
      this.hospital = new Hospital();
      console.log(this.hospital);
    } else {
      this.hospitalService.getHospitalById(this.route.snapshot.params.id)
      .subscribe((res: any) => {
        console.log(res);
        this.hospital = res;
      }, err => {
        console.log(err);
      });
    }

  }

  private updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital).subscribe(data => {
      this.isSuccessful = true;
      this.isSaveFailed = false;
      this.snackBar.openFromComponent(PizzaPartyComponent, {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
      });
      this.router.navigate(['/admin/admin-hospitals']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSaveFailed = true;
    });
  }

  private addHospital(hospital: Hospital) {
    this.hospitalService.addHospital(hospital).subscribe(data => {
      this.isSuccessful = true;
      this.isSaveFailed = false;
      this.router.navigate(['/admin/admin-hospitals']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSaveFailed = true;
    });
  }

  deleteHospital() {
    this.hospitalService.deleteHospital(this.hospital._id).subscribe(data => {
      this.router.navigate(['/admin/admin-hospitals']);
    });
  }

  onSubmit() {
    if (this.hospital) {
      if (this.hospital._id) {
        this.updateHospital(this.hospital);
      }
      else {
        this.addHospital(this.hospital);
      }
    }
  }

}

@Component({
  selector: 'app-snack-bar-hospital-updated',
  templateUrl: '../../../snack-bar-messages/snack-bar-updated.html',
})
export class PizzaPartyComponent {}
