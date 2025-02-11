
import { Model, DataTypes, type Sequelize, type Optional } from 'sequelize';


interface recipeData
{
    id: number;
    entryDate: Date;
    recipeData: string|null;
}

interface recipeCreationData extends Optional<recipeData, 'id'> {}

export class Recipe extends Model<recipeData, recipeCreationData> implements recipeData
  {
    public id!: number;
    public entryDate!: Date;
    public recipeData!: string|null; 
  }

  export function RecipeFactory(sequelize: Sequelize): typeof Recipe
  {
    Recipe.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        entryDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        recipeData: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },

      {
        sequelize,
        tableName: 'recipes',
      }

  );

   
  return Recipe;
    
}


// //ingredients text
// // num of people integer
// //entrydate  timestamp  
// //receipe name varchar(100)
// //instructions  text

// /*interface receipeTemp
// {
//     id: number;
//     entryDate: string;
//     numOfpeople: number;
//     receipeName: string;
//     instruction: string;
// }
// */


// import {
//     Model,
//     type InferAttributes,
//     type InferCreationAttributes,
//     type CreationOptional,
//     DataTypes,
//     type Sequelize, 
//     type ForeignKey,
//   } from 'sequelize';

// import { User } from './user';

//   export class Recipe extends Model<InferAttributes<Recipe>,
//   InferCreationAttributes<Recipe>>
//   {
//     declare id: CreationOptional<number>;
//     declare numOfpeople: string;
//     declare receipeName: string;
//     declare instruction: string;
//     declare userRecipeRefID: ForeignKey<User['id']>;
    
//   }

//   export function RecipeFactory(sequelize: Sequelize)
//   {
//     Recipe.init(
//     {
//       id: { 
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       },

//       numOfpeople: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },


//       receipeName: {

//         type: DataTypes.STRING,
//         allowNull: false,
//       },

//       instruction: {
//         type: DataTypes.STRING,
//         allowNull: false,


//       },
//     },

//       {
//         sequelize,
//         timestamps: false,
//         underscored: true,
//         modelName: 'recipe',
//       }



//   );

   
//   return Recipe;
    
// }
