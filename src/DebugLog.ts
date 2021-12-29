import { GameConfig } from "./GameConfig";

/*
 * name;
 */
export class DebugLog {
  public static log<T>(message?: T, ...optionalParams) {
    if (!GameConfig.debug) return;

    if (optionalParams.length > 1) console.log(message, optionalParams);
    else if (optionalParams.length == 1)
      console.log(message, optionalParams[0]);
    else console.log(message);
  }

  public static err(message?: any, ...optionalParams) {
    if (!GameConfig.debug) return;

    if (optionalParams.length > 1) console.error(message, optionalParams);
    else if (optionalParams.length == 1)
      console.error(message, optionalParams[0]);
    else console.error(message);
  }

  public static alert(msg: string): void {
    if (!GameConfig.debug) return;

    alert(msg);
  }
}
