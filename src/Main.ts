import { Env, GameConfig, PlatForm } from './GameConfig';
import { Helper } from './supports/Helper';

class Main {
  constructor() {
    //根据IDE设置初始化引擎
    Laya.init(GameConfig.width, GameConfig.height, Laya['WebGL']);

    Laya.stage.scaleMode = GameConfig.scaleMode;
    Laya.stage.screenMode = GameConfig.screenMode;
    Laya.stage.alignV = GameConfig.alignV;
    Laya.stage.alignH = GameConfig.alignH;
    //兼容微信不支持加载scene后缀场景
    Laya.URL.exportSceneToJson = true;

    this.initConfig();
    this.initFgui();

    //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    Laya.ResourceVersion.enable(
      'version.json',
      Laya.Handler.create(this, this.onVersionLoaded),
      Laya.ResourceVersion.FILENAME_VERSION,
    );

    // Laya.URL.basePath = 'bin/';
  }

  private initConfig() {
    const cfUri = 'res/config.json';
    Laya.loader.load(
      [{ url: cfUri, type: Laya.Loader.JSON }],
      Helper.Handler(this, () => {
        const cfg = Laya.loader.getRes(cfUri);
        GameConfig.env = cfg?.env || Env.ENV_DEV;
        GameConfig.debug = GameConfig.env === Env.ENV_DEV;
        GameConfig.platForm = cfg?.platForm || PlatForm.UNDEFINED;

        Laya.loader.clearRes(cfUri);
      }),
    );
  }

  private initFgui() {
    fgui.UIConfig.packageFileExtension = 'gz';
    Laya.stage.addChild(fgui.GRoot.inst.displayObject);
  }

  private onVersionLoaded(): void {
    this.startGame();
  }

  private startGame(): void {
    const txt = new Laya.Text();
    txt.text = 'Hello World !';
    txt.fontSize = 30;
    txt.color = '#ffffff';
    Laya.stage.addChild(txt);
    txt.x = (Laya.stage.width - txt.width) >> 1;
    txt.y = Laya.stage.height / 2;
  }
}
//激活启动类
new Main();
