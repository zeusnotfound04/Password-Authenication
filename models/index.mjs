import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

import user from './users.model.mjs';
import role from './role.model.mjs';

db.user = user;
db.role = role;

db.ROLES = ["user", "admin", "moderator"];

export default db;
