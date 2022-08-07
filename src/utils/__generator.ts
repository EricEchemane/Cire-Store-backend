import { IUser } from "@entities/user.entity";
import { faker } from "@faker-js/faker";

function generateUser() {
    const user: IUser = {
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        phone_number: faker.phone.phoneNumber(),
    };
    console.log(JSON.stringify(user, null, 4));
}

generateUser();