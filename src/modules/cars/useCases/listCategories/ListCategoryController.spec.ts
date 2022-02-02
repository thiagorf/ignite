import { app } from "../../../../app";
import request from "supertest"
import { Connection } from "typeorm";
import createConnection from "@shared/infra/typeorm"
import { v4 as uuidv4 } from "uuid";
import { hash } from 'bcrypt';

let connection: Connection;

describe("List Category Controller",  () => {

	jest.setTimeout(100000)

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

	it("should be able to list all categories", async () => {
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

		const response2 = await request(app)
			.post("/categories")
			.send({
				name: "Eletrics",
				description: "It's good"
			})
			.set({
				Authorization: `Bearer ${token}`
			});
		
		const categories = await request(app).get("/categories")	

		expect(categories.status).toBe(200);
		expect(categories.body).toHaveLength(2)
		expect(categories.body[0]).toHaveProperty("id")
		expect(categories.body[0].name).toEqual("Eletrics!kk!j")
	
	})
	

})