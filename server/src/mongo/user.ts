import {Schema, Model, Document, model} from "mongoose";
import {IUser} from "types/user";

export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export const UserSchema: Schema = new Schema({
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String
});

UserSchema.pre('save', next => {
    const now = new Date();
    this.createdAt || this.createAt = now;
    next();
});

UserSchema.methods.fullName = ():string => this.firstName.trim() + " " + this.lastName.trim();

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);