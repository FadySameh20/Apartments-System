import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface DeveloperAttributes {
  id: number;
  name: string;
  logo?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface DeveloperCreationAttributes extends Optional<DeveloperAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Developer extends Model<DeveloperAttributes, DeveloperCreationAttributes> implements DeveloperAttributes {
  public id!: number;
  public name!: string;
  public logo!: string | null;
  public createdAt!: Date;
  public updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Developer {
    Developer.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        logo: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'Developer',
        tableName: 'developers',
        timestamps: true,
      }
    );
    return Developer;
  }
}
