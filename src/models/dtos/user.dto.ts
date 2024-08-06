export class UserProfileDTO {
  name: string;
  email: string;
  birthdate: Date;
  phone: string;
  gender: string;
}

export class UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}
