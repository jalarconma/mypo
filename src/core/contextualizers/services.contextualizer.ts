import React, { useContext } from "react";
import ProvidedServices from "../enums/provided-services.enum";

const contexts = new Map<ProvidedServices, React.Context<any | undefined>>();

const ServicesContextualizer = {
  createContext: <T>(service: ProvidedServices): React.Context<any | undefined> => {
    const context = React.createContext<T | undefined>(undefined);
    contexts.set(service, context);
    return context;
  },

  useMe: <T>(services: ProvidedServices): T => {
    const context = contexts.get(services);

    if(!context) {
      throw new Error(`${ProvidedServices[services]} was not created.`)
    }

    const service = useContext(context);

    if(!service) {
      throw new Error(`You must use ${ProvidedServices[services]} from within is service.`)
    }

    return service;
  },

  clear() {
    contexts.clear();
  }
}

export default ServicesContextualizer;