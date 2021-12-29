import { GameConfig } from './GameConfig';
class Main {
  constructor() {
    //根据IDE设置初始化引擎
    Laya.init(GameConfig.width, GameConfig.height, Laya['WebGL']);

    Laya.stage.scaleMode = GameConfig.scaleMode;
    Laya.stage.screenMode = GameConfig.screenMode;
    Laya.stage.alignV = GameConfig.alignV;
    Laya.stage.alignH = GameConfig.alignH;
    //兼容微信不支持加载scene后缀场景
    Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    Laya.ResourceVersion.enable(
      'version.json',
      Laya.Handler.create(this, this.onVersionLoaded),
      Laya.ResourceVersion.FILENAME_VERSION,
    );

    this.initFgui();
  }

  private initFgui() {
    fgui.UIConfig.packageFileExtension = 'gz';
    Laya.stage.addChild(fgui.GRoot.inst.displayObject);
  }

  private onVersionLoaded(): void {
    //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    Laya.AtlasInfoManager.enable('fileconfig.json', Laya.Handler.create(this, this.onConfigLoaded));
  }

  private onConfigLoaded(): void {
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
