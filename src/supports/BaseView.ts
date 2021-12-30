import { UIWindowMgr } from './UIWindowMgr';

export class BaseView extends fgui.Window {
  protected _data: any;
  constructor(pkgName: string, uiName: string, isModel?: boolean) {
    super();

    UIWindowMgr.creatWinCom(pkgName, uiName, this, isModel || true);
  }

  set initData(data: any) {
    this._data = data;
  }

  get initData() {
    return this._data;
  }

  removeEvent() {}

  onClose() {
    this.removeEvent();
  }
}
