import { QueryInterface, DataTypes } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('apartments', {
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
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('apartments');
  },
};
