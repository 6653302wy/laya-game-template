/*
 * 游戏初始化配置;
 */

/** 运行环境 */
export enum Env {
  /** 测试环境 */
  ENV_DEV,
  /** 正式环境 */
  ENV_PRD,
}

/** 平台 */
export enum PlatForm {
  /** h5 */
  UNDEFINED,
  /** h5 */
  H5,
  /** 微信小游戏 */
  WECHAT_GAME,
}

/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
export class GameConfig {
  static width: number = 640;
  static height: number = 1136;
  static scaleMode: string = 'fixedwidth';
  static screenMode: string = 'none';
  static alignV: string = 'top';
  static alignH: string = 'left';

  static debug: boolean = true;
  static env: Env = Env.ENV_DEV;
  static platForm: PlatForm;
}
