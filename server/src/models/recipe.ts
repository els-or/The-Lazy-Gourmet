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
    ForeignKey,
  } from 'sequelize';
  
import { User } from './user';

  export class recipe extends Model<InferAttributes<recipe>,
  InferCreationAttributes<recipe>>
  {
    declare id: CreationOptional<number>;
    declare numOfpeople: string;
    declare receipeName: string;
    declare instruction: string;
    declare recipeRefID: ForeignKey<User['id']>;
    
  }

  export function RecipeFactory(sequelize: Sequelize)
  {
    recipe.init(
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

   
  return recipe;
    
}
