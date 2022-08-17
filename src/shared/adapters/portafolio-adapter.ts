import { UserPortafolio } from "../../API";
import { StringUtils } from "../utils/string-utils";

export class PortafolioAdapter {

  static portafolioActionDateAdapter(portafolio: UserPortafolio[]): UserPortafolio[] {

    if(!portafolio) {
      return portafolio;
    }

    return portafolio.map(item => {
      return {...item, action_date: StringUtils.stringDateToStringDateWithoutTimezone(item.action_date)}
    });
  }
}