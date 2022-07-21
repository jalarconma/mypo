import ServicesContextualizer from "../contextualizers/services.contextualizer";
import ProvidedServices from "../enums/provided-services.enum";
import { PortafolioHistoryService } from "../interfaces/portafolio-history.service";

export const usePortafolioHistoryService = () => ServicesContextualizer.useMe<PortafolioHistoryService>(ProvidedServices.PortafolioHistoryServiceImpl);