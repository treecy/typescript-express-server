import {
  Schema, Model, Document, model,
} from 'mongoose';

export interface IPost {
  id?: any;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export const PostSchema: Schema = new Schema({
  createdAt: Date,
  title: String,
  author: { type: String, ref: 'User' },
  lastName: String,
});

PostSchema.pre('save', (next) => {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }
  next();
});

export interface IPostModel extends IPost, Document {}
export const Post: Model<IPostModel> = model<IPostModel>('Post', PostSchema);

export function find(options: IPost = {}, populateFields = []) {
  const query = Post.find(options);
  populateFields.forEach((field) => {
    query.populate(field);
  });
  return query.exec();
}
