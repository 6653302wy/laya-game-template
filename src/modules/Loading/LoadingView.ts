import { BaseView } from '../../supports/BaseView';
import { DebugLog } from '../../supports/DebugLog';
import { Helper } from '../../supports/Helper';

export class LoadingView extends BaseView {
  private proTxt: fgui.GTextField;
  private bar: fgui.GProgressBar;

  constructor() {
    super('loading', 'UI_loading');
  }

  onInit() {
    // this.displayObject.loadImage('res/bg/bg_wating.png');
    // this.contentPane.getChild('bg').asLoader.icon = 'res/bg/bg_wating.png';
    const proBar = this.contentPane.getChild('n2').asCom;
    this.proTxt = proBar.getChild('title').asTextField;
    this.bar = proBar.getChild('bar').asProgress;
  }

  onShown() {
    DebugLog.log('onShown...');
  }

  updatePro(pro: number) {
    this.proTxt.text = `${pro.toFixed(0)}%`;
    this.bar.tweenValue(pro, 0.2);
  }

  onClose() {
    super.onClose();
    Helper.toggleView(LoadingView, 0);
  }
}
