import { DebugLog } from './DebugLog';
import { Helper } from './Helper';
import { SinglonUtil } from './SinglonUtil';

export interface IProgerssInfo {
  pro: number;
}

export interface UIAssetsLoaderInfo {
  pkgName: string;
  atlasLen: number;
}

export class AssetsLoader {
  static get inst() {
    return SinglonUtil.getSinglon(AssetsLoader);
  }

  /**
   * 加载ui所需资源
   * @param uis
   * @param pkgName ui包名
   * @param altlasLen ui导出的图片资源数量
   */
  onUILoad(uis: UIAssetsLoaderInfo[], cb?: () => void): IProgerssInfo {
    const list = uis.map((item) => {
      const uiName = item.pkgName;
      const uiAssets = [{ url: `res/ui/${uiName}.gz`, type: Laya.Loader.BUFFER }];
      let imgLen = item.atlasLen;
      while (imgLen) {
        imgLen -= 1;
        uiAssets.push({ url: `res/ui/${uiName}_atlas${imgLen}.png`, type: Laya.Loader.IMAGE });
      }
      return uiAssets;
    });
    const total = list.flat();

    let curPro: number;
    Laya.loader.load(
      total,
      Helper.Handler(this, () => {
        cb?.();
      }),
      Helper.Handler(
        this,
        (pro: number) => {
          curPro = pro * 100;
        },
        null,
        false,
      ),
    );

    DebugLog.log('加载进度===', curPro);
    return { pro: curPro };
  }
}
