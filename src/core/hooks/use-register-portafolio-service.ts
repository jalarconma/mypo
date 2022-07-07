import ServicesContextualizer from "../contextualizers/services.contextualizer";
import ProvidedServices from "../enums/provided-services.enum";
import { RegisterPortafolioService } from "../interfaces/register-portafolio.service";

export const useRegisterPortafolioService = () => ServicesContextualizer.useMe<RegisterPortafolioService>(ProvidedServices.UserAuthServiceImpl);