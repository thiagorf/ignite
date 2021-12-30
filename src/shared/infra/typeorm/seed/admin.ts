import { getConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

import createConnection from "../index"

async function create() {
	const conection = await createConnection("localhost");

	const id = uuidv4()
	const password = await hash("admin", 8);

	await conection.query(
		`INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_license)
		values('${id}', 'admin', 'admin@gmail', '${password}', 'true', 'now()', 'test')
		`
		);
	await conection.close()
}

create().then(() => console.log("admin created!"));