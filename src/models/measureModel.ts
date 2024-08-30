import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

// Interface que define os atributos de uma medida (Measure)
interface MeasureAttributes {
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
  image_url: string;
  measure_value: number;
  has_confirmed: boolean;
}

// Interface que permite alguns atributos serem opcionais na criação de uma nova medida
interface MeasureCreationAttributes extends Optional<MeasureAttributes, 'has_confirmed'> {}

// Definição do modelo MeasureModel que implementa a interface MeasureAttributes
export class MeasureModel extends Model<MeasureAttributes, MeasureCreationAttributes> implements MeasureAttributes {
  public measure_uuid!: string;
  public customer_code!: string;
  public measure_datetime!: Date;
  public measure_type!: 'WATER' | 'GAS';
  public image_url!: string;
  public measure_value!: number;
  public has_confirmed!: boolean;

  // Timestamps automáticos
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicialização do modelo MeasureModel com a definição das colunas da tabela
MeasureModel.init({
  measure_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  customer_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  measure_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  measure_type: {
    type: DataTypes.ENUM('WATER', 'GAS'),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  measure_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  has_confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'measures',
  timestamps: true,
});

export { MeasureAttributes };
