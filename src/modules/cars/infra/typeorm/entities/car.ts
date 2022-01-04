import { PrimaryColumn, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuidv4 } from "uuid"
import { Category } from './category';
import { Specification } from './specification';


@Entity("cars")
class Car {

	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	daily_rate: number;

	@Column()
	license_plate: string;

	@Column()
	fine_amount: number;

	@Column()
	brand: string;

	@Column()
	available: boolean;

	@ManyToOne(() => Category)
	@JoinColumn({ name: "category_id"})
	category: Category;

	@Column()
	category_id: string;

	@ManyToMany(() => Specification)
	@JoinTable({
		name: "specification_car",
		joinColumns: [{name: "car_id"}],
		inverseJoinColumns: [{name: "specification_id"}]
	})
	specifications: Specification[];

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if(!this.id) {
			this.id = uuidv4();
			this.available = true;
		}
	}
}

export { Car }