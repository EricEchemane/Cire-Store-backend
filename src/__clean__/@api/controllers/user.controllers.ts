import { Request } from 'express';
import UserCreatesAccountUseCase from "@usecases/user-creates-account";
import { RequestError } from 'utils/exceptions';

const controllers = {

    userCreatesAccount: async (req: Request) => {
        const newUser = await UserCreatesAccountUseCase(req.body)
            .execute()
            .catch(err => {
                throw new RequestError(400, err.message);
            });
        return newUser;
    }
};

export default controllers;