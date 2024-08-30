"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureModel = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
// Definição do modelo MeasureModel que implementa a interface MeasureAttributes
class MeasureModel extends sequelize_1.Model {
}
exports.MeasureModel = MeasureModel;
// Inicialização do modelo MeasureModel com a definição das colunas da tabela
MeasureModel.init({
    measure_uuid: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    customer_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    measure_datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    measure_type: {
        type: sequelize_1.DataTypes.ENUM('WATER', 'GAS'),
        allowNull: false,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    measure_value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    has_confirmed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: 'measures',
    timestamps: true,
});
