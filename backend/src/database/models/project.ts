import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ProjectAttributes {
  id: number;
  name: string;
  location?: string | null;
  developerId: number,
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public name!: string;
  public location!: string | null;
  public developerId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    Project.belongsTo(models.Developer, {
      foreignKey: 'developerId',
      as: 'developer',
    });

    Project.hasMany(models.Apartment, {
      foreignKey: 'projectId',
      as: 'apartments',
    });
  }

  static initModel(sequelize: Sequelize): typeof Project {
    Project.init(
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
        location: {
          type: DataTypes.STRING,
        },
        developerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'developers',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
        modelName: 'Project',
        tableName: 'projects',
        timestamps: true,
      }
    );
    return Project;
  }
}
