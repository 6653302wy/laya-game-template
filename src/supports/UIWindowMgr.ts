export class UIWindowMgr {
  private static windowslist: Map<string, fgui.Window> = new Map();

  // 创建窗口组件
  public static creatWinCom(pkgName: string, resName: string, view: fgui.Window, isModel?: boolean): fgui.GComponent {
    if (!fgui.UIPackage.getByName(pkgName)) {
      fgui.UIPackage.addPackage(`res/ui/${pkgName}`);
    }

    if (UIWindowMgr.windowslist.has(resName)) {
      return UIWindowMgr.windowslist.get(resName).contentPane;
    }
    const acom: fgui.GComponent = fgui.UIPackage.createObject(pkgName, resName).asCom;
    if (view) {
      view.contentPane = acom;
      view.setSize(acom.width, acom.height);
      view.center();
      view.name = resName;
      if (isModel) view.modal = true;
    }
    UIWindowMgr.windowslist.set(resName, view);
    return acom;
  }

  // 获得窗口
  public static getWindow(winName: string): fgui.Window {
    if (UIWindowMgr.windowslist.has(winName)) {
      return UIWindowMgr.windowslist.get(winName);
    }
    return null;
  }

  public static hideWindow(winName: string, isdispose?: boolean) {
    if (UIWindowMgr.windowslist.has(winName)) {
      const win: fgui.Window = UIWindowMgr.windowslist.get(winName);
      if (!isdispose) {
        win.hide();
      } else {
        win.dispose();
        UIWindowMgr.windowslist.delete(winName);
      }
    }
  }
}
