import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import AuthRoute from '@routes/auth.route';
import RolesRoute from './roles.route';
import PermissionRoutes from './permissions.route';
import UserRolesRoute from './userRole.route';
import RolePermissionRoute from './rolePermission.route';
import InvoiceDirectoriesRoute, { InvoiceDirectoryDashboardRoute } from './invoiceDirectories.route';
import InvoiceRoute, { InvoiceDashboardRoute } from './invoice.route';
import TransactionRoute from './transaction.route';
const ALL_REGISTERED_ROUTES = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new RolesRoute(),
  new PermissionRoutes(),
  new UserRolesRoute(),
  new RolePermissionRoute(),
  new InvoiceDirectoriesRoute(),
  new InvoiceRoute(),
  new InvoiceDashboardRoute(),
  new InvoiceDirectoryDashboardRoute(),
  new TransactionRoute(),
];

export default ALL_REGISTERED_ROUTES;
