import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    // DataTypes,
    // type Sequelize, 
    type ForeignKey,
  } from 'sequelize';


import{User} from './user';

export class History extends Model<InferAttributes<History>,
InferCreationAttributes<History>>
{
  declare id: CreationOptional<number>;
  declare numOfpeople: string;
  declare receipeName: string;
  declare instruction: string;
  declare userRecipeRefID: ForeignKey<User['id']>;
  
}

  export function HistoryFactory(sequelize: Sequelize)
  {
    History.init(
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
        modelName: 'history',
      }



  );

   
  return History;
    
}