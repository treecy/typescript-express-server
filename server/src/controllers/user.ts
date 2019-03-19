import { find } from 'mongo/user';

export function getUsers() {
  return find();
}
