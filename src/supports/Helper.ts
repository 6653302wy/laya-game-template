import { SinglonUtil } from './SinglonUtil';

export class Helper {
  /** 创建handler */
  public static Handler(caller: any, fun: Function, args: any[] = null, once = true): Laya.Handler {
    return Laya.Handler.create(caller, fun, args, once);
  }

  /** 打开或关闭ui */
  static togglePanel<T>(panel: { new (): T }, isShow = 1, data?: any, dispose?: boolean): T {
    let view;
    if (isShow) {
      view = SinglonUtil.getSinglon(panel);
      if (data) {
        view['initData'] = data;
      }
      view['show']();
    } else {
      if (SinglonUtil.hasSinglon(panel)) {
        view = SinglonUtil.getSinglon(panel);
        view['hide']();
        if (dispose) {
          view['dispose']();
        }
      }
    }
    return view;
  }

  static showToast(str: string) {
    const toastView = fgui.UIPackage.createObject('basic', 'toast').asCom;
    if (toastView) {
      toastView.getChild('txt').text = str;

      fgui.GRoot.inst.addChild(toastView);
      toastView.x = fgui.GRoot.inst.width * 0.5;
      toastView.y = fgui.GRoot.inst.height * 0.5;

      toastView.getTransition('play').play(
        Helper.Handler(this, () => {
          fgui.GRoot.inst.removeChild(toastView);
        }),
      );
    }
  }
}
