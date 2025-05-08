import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

interface ApartmentAttributes {
  id: number;
  unitName: string;
  unitNumber: string;
  description?: string | null;
  price: number;
  area: number;
  bedroomsCount: number;
  bathroomsCount: number;
  floor: number;
  isFinished: boolean;
  images?: string[] | null;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ApartmentCreationAttributes extends Optional<ApartmentAttributes, 'id' | 'description' | 'images' | 'createdAt' | 'updatedAt'> {}

export class Apartment extends Model<ApartmentAttributes, ApartmentCreationAttributes> implements ApartmentAttributes {
  public id!: number;
  public unitName!: string;
  public unitNumber!: string;
  public description!: string | null;
  public price!: number;
  public area!: number;
  public bedroomsCount!: number;
  public bathroomsCount!: number;
  public floor!: number;
  public isFinished!: boolean;
  public images!: string[] | null;
  public projectId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static associate(models: any) {
    Apartment.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });
  }

  static initModel(sequelize: Sequelize): typeof Apartment {
    Apartment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        unitName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        unitNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        area: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bedroomsCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bathroomsCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        floor: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isFinished: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          allowNull: true,
        },
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'projects',
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
        modelName: 'Apartment',
        tableName: 'apartments',
        timestamps: true,
      }
    );
    return Apartment;
  }
}
