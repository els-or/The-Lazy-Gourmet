import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';

const User = UserFactory(sequelize);

export { User };
