import { compare, genSalt, hash } from 'bcryptjs';
import { Document, model, Schema} from 'mongoose';

const userSchema = new Schema<IUser>({
  username: {type: String , unique: true },
  password: String,
  role: String,
  permissions: [String],
});

// Before saving the user, hash the password
userSchema.pre<IUser>('save', function(next): void {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    hash(user.password, salt, (error, hashedPassword) => {
      if (error) { return next(error); }
      user.password = hashedPassword;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback): void {
  compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

export interface IUser extends Document {
  _id: any;
  username: string;
  password: string;
  role: string;
  permissions: String[];
  isModified(password: string): boolean;
}

const User = model<IUser>('User', userSchema);

export default User;
