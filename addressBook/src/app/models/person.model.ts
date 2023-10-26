import { Name } from './name.model';
import { Location } from './location.model';
import { Contacts } from './contacts.model';

export interface Person {
  name: Name;
  gender: string;
  location: Location;
  birthdate: string;
  registered: string;
  contacts: Contacts;
  nationality: string;
  thumbnail: string;
  portrait: string;
}
