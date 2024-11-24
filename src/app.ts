import express from 'express';
import UsersRoutes from './routes/users.routes';
import AuthRoutes from './routes/auth.routes';
import CompaniesRoutes from './routes/companies.routes';
import BranchesRoutes from './routes/branches.routes';
import ItemsRoutes from './routes/items.routes';
import MenusRoutes from './routes/menus.routes';
import jwtMiddleware from './middlewares/jwt.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';
import httpLogger from './middlewares/http-logger.middleware';

const app = express();
app.use(express.json());

app.use(httpLogger);

app.get('/test', (_, res) => {
  res.json({ test: true });
});

app.use('/users', UsersRoutes);

app.use('/auth', AuthRoutes);

app.use(jwtMiddleware);

app.use('/companies', CompaniesRoutes);
app.use('/branches', BranchesRoutes);
app.use('/items', ItemsRoutes);
app.use('/menus', MenusRoutes);

app.get('/profile', (req, res) => {
  res.json({
    profile: true,
    user: req.user,
  });
});

app.use(errorHandler);

export { app };
