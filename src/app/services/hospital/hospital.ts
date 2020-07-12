export class Hospital {
  _id: string;
  name: string;
  address: {
    street: string,
    city: string,
    province: string,
    postalCode: string
  };
  phoneNumber: string;
}
