import { app } from "../../../../app";
import request from "supertest"
import { Connection } from "typeorm";
import createConnection from "@shared/infra/typeorm"
import { v4 as uuidv4 } from "uuid";
import { hash } from 'bcrypt';

let connection: Connection;

/*
async function closeConnections() {
	await connection.dropDatabase()
	await connection.close()
} 

async function innitConnections() {
	connection = await createConnection()
	await connection.runMigrations()

	const id = uuidv4()
	const password = await hash("admin", 8);

	await connection.query(
		`INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_license)
		values('${id}', 'admin', 'admin@gmail', '${password}', 'true', 'now()', 'test')
		`
		);
}*/

describe("Create Category Controller",  () => {

	jest.setTimeout(10000)

	beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const password = await hash("1234", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_license ) 
        values('${id}', 'admin', 'admin@gmail', '${password}', true, 'now()', 'XXXXXX')
      `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

	it("should be able to create a new category", async () => {
		const tokenResponse = await request(app).post('/sessions').send({
			email: "admin@gmail",
			password: "1234"
		});

		const { token } = tokenResponse.body
		
		const response = await request(app)
			.post("/categories")
			.send({
				name: "Eletrics!kk!j",
				description: "It's good"
			})
			.set({
				Authorization: `Bearer ${token}`
			});


		expect(response.status).toBe(201);	
	
	})
	
	it("should not be able to create a new category with the same name", async () => {
		const tokenResponse = await request(app).post('/sessions').send({
			email: "admin@gmail",
			password: "1234"
		});

		const { token } = tokenResponse.body
		
		const response = await request(app)
			.post("/categories")
			.send({
				name: "Eletrics!kk!j",
				description: "It's good"
			})
			.set({
				Authorization: `Bearer ${token}`
			});

		const secondCategory = await request(app)
			.post("/categories")
			.send({
				name: "Eletrics!kk!j",
				description: "It's good"
			})
			.set({
				Authorization: `Bearer ${token}`
			});



		expect(secondCategory.status).toBe(400);	
	
	})

})