
export interface IRentalRequest {
	car_id: string;
	user_id: string;
	expected_return_date: Date;
	end_date?: Date;
	total?: number;
	id?: string;
}