export class SinglonUtil {
  public constructor() {}

  static getSinglon<T>(clazz: { new (): T; __instance?: T }): T {
    let instance = clazz.__instance;
    if (!instance) {
      instance = clazz.__instance = new clazz();
    }
    return instance;
  }

  static hasSinglon<T>(clazz: { new (): T; __instance?: T }): boolean {
    let b = false;
    if (clazz.__instance) {
      b = true;
    }
    return b;
  }
}
