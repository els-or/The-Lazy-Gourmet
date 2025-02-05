//ingredients text
// num of people integer
//entrydate  timestamp  
//receipe name varchar(100)
//instructions  text

/*interface receipeTemp
{
    id: number;
    entryDate: string;
    numOfpeople: number;
    receipeName: string;
    instruction: string;
}
*/


import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize, 
    type ForeignKey,
  } from 'sequelize';

import { User } from './user';

  export class Recipe extends Model<InferAttributes<Recipe>,
  InferCreationAttributes<Recipe>>
  {
    declare id: CreationOptional<number>;
    declare numOfpeople: string;
    declare receipeName: string;
    declare instruction: string;
    declare userRecipeRefID: ForeignKey<User['id']>;
    
  }

  export function RecipeFactory(sequelize: Sequelize)
  {
    Recipe.init(
    {
      id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },

      numOfpeople: {
        type: DataTypes.STRING,
        allowNull: false,
      },


      receipeName: {

        type: DataTypes.STRING,
        allowNull: false,
      },

      instruction: {
        type: DataTypes.STRING,
        allowNull: false,


      },
    },

      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'recipe',
      }



  );

   
  return Recipe;
    
}
