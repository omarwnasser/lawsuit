import LawsuitRoutes from "./router/lawsuit.router";
import UserRoutes from "./router/user.router";


function setRoutes(app): void {
 
  UserRoutes(app);
  LawsuitRoutes(app);

}

export default setRoutes;
