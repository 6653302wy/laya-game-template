import { SinglonUtil } from './SinglonUtil';

export class AudioMgr {
  readonly musicVlo = 0.3;
  private _isMusted: boolean;

  private _music: any;
  private _curSound: any;

  static get inst(): AudioMgr {
    return SinglonUtil.getSinglon(AudioMgr);
  }

  init() {
    Laya.SoundManager.autoStopMusic = true;
    Laya.SoundManager.useAudioMusic = true;
  }

  playMusic(url: string) {
    if (!url) return;
    if (this._isMusted) return;

    this.setMusicVolume(this.musicVlo);
    Laya.loader.load(
      [{ url: url, type: Laya.Loader.SOUND }],
      Laya.Handler.create(this, () => {
        this._music = Laya.SoundManager.playMusic(url, 0);
      }),
    );
  }

  playSound(url: string, cb?: () => void) {
    if (!url) return;
    if (this._isMusted) return;

    Laya.loader.load(
      url,
      Laya.Handler.create(this, (e: boolean) => {
        if (!e) {
          cb?.();
          return;
        }
        Laya.SoundManager.stopAllSound();
        this._curSound = Laya.SoundManager.playSound(
          url,
          1,
          Laya.Handler.create(this, () => {
            cb?.();
          }),
        );
      }),
    );
  }

  pauseSound() {
    if (this._curSound) {
      this._curSound.pause();
    }
  }

  resumeSound() {
    if (this._curSound) {
      this._curSound.resume();
    }
  }

  pauseMusic() {
    if (this._music) {
      this._music.pause();
    }
  }

  resumeMusic() {
    if (this._music) {
      this._music.resume();
    }
  }

  setMusicVolume(volume: number) {
    Laya.SoundManager.setMusicVolume(volume);
  }

  setSoundVolume(volume: number) {
    Laya.SoundManager.setSoundVolume(volume);
  }

  stopAllSound() {
    Laya.SoundManager.stopAllSound();
  }

  setSoundMuted(ismute: boolean) {
    Laya.SoundManager.soundMuted = ismute;
    Laya.SoundManager.setSoundVolume(ismute ? 0 : 1);
  }

  setMusicMuted(ismute: boolean) {
    Laya.SoundManager.musicMuted = ismute;
    Laya.SoundManager.setMusicVolume(ismute ? 0 : this.musicVlo);
  }

  setAllMuted(ismute: boolean) {
    this._isMusted = ismute;

    this.setSoundMuted(ismute);
    this.setMusicMuted(ismute);
  }
}
