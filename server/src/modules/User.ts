import * as R from 'ramda'

export interface User {
  id: number,
  name: string,
  email: string,
}

const fakeUsers: User[] = [{
  id: 1,
  name: 'Damian',
  email: 'damian@damian.pl',
}, {
  id: 2,
  name: 'Admin',
  email: 'admin',
}]

export function getUserById(id: number): User {
  return R.find(R.whereEq({ id }), fakeUsers)
}

export function getUserByEmail(email: string): User {
  return R.find(R.whereEq({ email }), fakeUsers)
}

export function addUser({ email }): Promise<User> {
  const id = R.head(R.sort(R.prop('id'), fakeUsers)).id + 1
  fakeUsers.push({
    id,
    email,
    name: '',
  })
  return new Promise((resolve) => resolve(getUserById(id)))
}

export function checkPassword(userId: number, password: string): boolean {
  // TODO
  return true
}
