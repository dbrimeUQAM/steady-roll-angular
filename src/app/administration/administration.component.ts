import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../services/hopital/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from '../services/hopital/hopital';
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {


  hospital: Hospital;

  public hospitalFrom: FormGroup;
  labelPosition: string;
  constructor(private router: Router, private formBuilder: FormBuilder, private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.hospital = new Hospital;

    this.hospitalFrom = this.formBuilder.group({

      name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],

    })
    this.hospitalFrom.get('name').valueChanges.subscribe(data => {
      this.hospital.name = data;
    });
    this.hospitalFrom.get('street').valueChanges.subscribe(data => {
      this.hospital.street = data;
    });
    this.hospitalFrom.get('province').valueChanges.subscribe(data => {
      this.hospital.province = data;
    });
    this.hospitalFrom.get('city').valueChanges.subscribe(data => {
      this.hospital.city = data;
    });
    this.hospitalFrom.get('postalCode').valueChanges.subscribe(data => {
      this.hospital.postalCode = data;
    });
    this.hospitalFrom.get('phoneNumber').valueChanges.subscribe(data => {
      this.hospital.phoneNumber = data;
    });

    console.log('this.hospital', this.hospital)

  }

  submit() {

    this.hospitalService.addHospital(this.hospital).subscribe(data => {
      //const id = data._id;
      //console.log('id', id);
      console.log('data', data)
      console.log('this.hospitalFrom.value', this.hospitalFrom.value);
      this.router.navigate(['/home']);

    })
  }
}

