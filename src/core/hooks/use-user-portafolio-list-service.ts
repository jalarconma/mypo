import ServicesContextualizer from "../contextualizers/services.contextualizer";
import ProvidedServices from "../enums/provided-services.enum";
import { UserPortafolioListService } from "../interfaces/user-portafolio-list.service";

export const useUserPortafolioListService = () => ServicesContextualizer.useMe<UserPortafolioListService>(ProvidedServices.UserPortafolioListServiceImpl);