import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { RecipeFactory } from './recipe.js';

//init the models
const User = UserFactory(sequelize);
const Recipe = RecipeFactory(sequelize);


//create associations between models

User.hasMany(Recipe, { //user having many recipes.

    onDelete: 'CASCADE',
});

Recipe.belongsTo(User);



export { sequelize, User, Recipe };
