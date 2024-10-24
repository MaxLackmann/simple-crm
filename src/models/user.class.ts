export class User {
  [x: string]: any;
  toJson(): any {
    throw new Error('Method not implemented.');
  }
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  street: string;
  zipCode: string;
  city: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }

  get birthDateAsDate(): Date | null {
    return this.birthDate ? new Date(this.birthDate * 1000) : null; // Umwandlung in Date-Objekt
  }
}
