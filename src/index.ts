import "dotenv/config";
import App from "./app";
import IndexRoute from "./routes/index.route";
import UsersRoute from "./routes/users.route";
import PatientRoute from "./routes/patient.route";
import FileRoute from "./routes/file.route";

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new PatientRoute(),
  new FileRoute(),
]);

app.listen();
