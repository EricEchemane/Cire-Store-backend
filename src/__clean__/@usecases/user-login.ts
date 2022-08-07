import User from "@entities/user.entity";
import { RequestError } from "utils/exceptions";
import Hasher from "utils/hasher";

interface UserLoginInteractor {
    email: string;
    password: string;
}

export default function UserLoginUseCase({ email, password }: UserLoginInteractor) {
    return {
        execute: async () => {
            let user: any = await User.findOne({ email });
            if (!user) throw new RequestError(404, "User not found");

            const passwordMatched = Hasher.verify(password, user.password);
            if (!passwordMatched) throw new RequestError(401, "Password does not match");

            user = user.toObject();
            delete user.password;

            return user;
        }
    };
}