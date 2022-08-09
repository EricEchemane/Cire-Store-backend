import User, { IUser } from "@entities/user.entity";

export default function UserCreatesAccountUseCase(interactor: IUser) {
    return {
        execute: async () => {
            const user = new User(interactor);
            let newUser: any = await user.save();
            newUser = newUser.toObject();
            delete newUser.password;
            return newUser;
        }
    };
}