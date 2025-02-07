import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { RecipeFactory } from './recipe.js';
import { HistoryFactory } from './history.js';

//init the models
const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);
const History = HistoryFactory(sequelize);


//create associations between models

User.hasMany(Recipe, { //user having many recipes.

    onDelete: 'CASCADE',
});

Recipe.belongsTo(User);

User.hasMany(History, { //user having many history.

    onDelete: 'CASCADE',
});

History.belongsTo(User);



export { sequelize, User, Recipe, History };
