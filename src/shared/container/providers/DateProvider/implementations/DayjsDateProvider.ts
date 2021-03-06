import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider{
	compareInHours(start_date: Date, end_date: Date): number {
		const start_date_utc = this.convertToUTC(start_date)
		const end_date_utc = this.convertToUTC(end_date)
		return dayjs(end_date_utc).diff(start_date_utc, "hours")
	}

	convertToUTC(date: Date): string {
		return dayjs(date).utc().local().format();
	}

	dateNow(): Date {
		return dayjs().toDate();
	}

	compareInDays(start_date: Date, end_date: Date): number {
		const start_date_utc = this.convertToUTC(start_date)
		const end_date_utc = this.convertToUTC(end_date)
		return dayjs(end_date_utc).diff(start_date_utc, "days")
	}

	addDays(days: number): Date {
		const date = dayjs().add(days, "days").toDate();

		return date;
	}

	addHours(hours: number): Date {
		const date = dayjs().add(hours, "hour").toDate();

		return date;
	}

	checkExpiresDate(start_date: Date, end_date: Date): boolean {
		const date =  dayjs(start_date).isBefore(end_date);
		const date2 = dayjs(end_date).isBefore(start_date)
		
		return date;
	}
}

export { DayjsDateProvider }