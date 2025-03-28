import { Table, Model, Column, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true,
})
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare price: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare availability: boolean;
}

export default Product;
