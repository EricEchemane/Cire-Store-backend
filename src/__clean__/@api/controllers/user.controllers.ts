import { Request, Response } from 'express';
import UserCreatesAccountUseCase from "@usecases/user-creates-account";
import { RequestError } from 'utils/exceptions';
import UserLoginUseCase from '@usecases/user-login';
import Jwt from 'utils/jwt';
import environment from 'utils/environment';

const controllers = {

    userCreatesAccount: async (req: Request) => {
        const newUser = await UserCreatesAccountUseCase(req.body)
            .execute()
            .catch(err => {
                throw new RequestError(400, err.message);
            });
        return newUser;
    },
    userLogin: async (req: Request, res: Response) => {

        const user = await UserLoginUseCase(req.body)
            .execute()
            .catch(err => {
                res.status(err.code).json(err);
            });

        const token = Jwt.sign({ ...user }, environment.secret);
        const session: any = req.session;
        session.user = token;
        res.status(200).end();
    }
};

export default controllers;