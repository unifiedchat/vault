import { CONFIG } from "@config";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
	comment: "Secret Model",
})
export class SecretModel extends Model {
	@Column({
		allowNull: false,
		comment: "Secret ID",
		type: DataType.STRING,
		unique: true,
		primaryKey: true,
		defaultValue: () => CONFIG.SNOWFLAKE.generate(),
	})
	id: string;

	@Column({
		allowNull: false,
		comment: "Secret Key",
		type: DataType.STRING,
		unique: true,
	})
	key: string;

	@Column({
		allowNull: false,
		comment: "Secret Value",
		type: DataType.STRING,
	})
	value: string;
}
