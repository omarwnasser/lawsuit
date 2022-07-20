import ResolutionRoutes from "./router/resolution";
import LawsuitRoutes from "./router/lawsuit.router";
import UserRoutes from "./router/user.router";


function setRoutes(app): void {
 
  UserRoutes(app);
  LawsuitRoutes(app);
  ResolutionRoutes(app);

}

export default setRoutes;
