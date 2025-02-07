import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize, 
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

