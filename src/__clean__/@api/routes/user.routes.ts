import controllers from '@api/controllers/user.controllers';
import { Router } from 'express';
import makeCallback from 'utils/makeCallback';

const userRoutes = Router();

userRoutes.route('/').post(makeCallback(controllers.userCreatesAccount, false));

export default userRoutes;