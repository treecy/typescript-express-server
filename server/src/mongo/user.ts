import {
  Schema, Model, Document, model,
} from 'mongoose';

export interface IUser {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  lastName: String,
});

UserSchema.pre('save', (next) => {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }
  next();
});

UserSchema.methods.fullName = () => `${this.firstName.trim()} ${this.lastName.trim()}`;

export interface IUserModel extends IUser, Document {
  fullName(): string;
}
export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export function find(options: IUser = {}) {
  return User.find(options).exec();

  // return [{
  //   id: '1',
  //   email: 'mick@gmail.com',
  //   firstName: 'Mick',
  //   lastName: 'Foo',
  // }, {
  //   id: '2',
  //   email: 'sarah@gmail.com',
  //   firstName: 'Sarah',
  //   lastName: 'Bar',
  // }];
}
