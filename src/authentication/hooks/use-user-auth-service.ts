import ServicesContextualizer from "../../core/contextualizers/services.contextualizer";
import ProvidedServices from "../../core/enums/provided-services.enum";
import { UserAuthService } from "../interfaces/user-auth.interface"

export const useUserAuthService = () => ServicesContextualizer.useMe<UserAuthService>(ProvidedServices.UserAuthServiceImpl);