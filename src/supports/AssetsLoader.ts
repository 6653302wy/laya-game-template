import { Helper } from './Helper';
import { SinglonUtil } from './SinglonUtil';

export interface UIAssetsLoaderInfo {
  pkgName: string;
  imgCount: number;
}

export class AssetsLoader {
  static get inst() {
    return SinglonUtil.getSinglon(AssetsLoader);
  }

  /**
   * 加载ui所需资源
   * @param uis
   * @param pkgName ui包名
   * @param imgCount ui导出的图片资源数量
   */
  onUILoad(uis: UIAssetsLoaderInfo[], loadComplete?: () => void, loadProgress?: Laya.Handler) {
    const list = uis.map((item) => {
      const uiName = item.pkgName;
      const uiAssets = [{ url: `res/ui/${uiName}.gz`, type: Laya.Loader.BUFFER }];
      let imgLen = item.imgCount;
      while (imgLen) {
        imgLen -= 1;
        uiAssets.push({ url: `res/ui/${uiName}_atlas${imgLen}.png`, type: Laya.Loader.IMAGE });
      }
      return uiAssets;
    });
    const total = list.flat();

    Laya.loader.load(
      total,
      Helper.Handler(this, () => {
        loadComplete?.();
      }),
      Helper.Handler(
        this,
        (pro: number) => {
          loadProgress?.runWith(pro);
        },
        null,
        false,
      ),
    );
  }
}
