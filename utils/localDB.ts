
import localforage from "localforage";

// 数据
interface IData {
  type: string;
  expires: number | null;
  data: any;
}
class LocalDB {

  public instance: LocalForage;

  constructor(opts: LocalForageOptions) {
    this.instance = localforage.createInstance(opts);
  }

  // 读取数据，读不到返回 null
  async get(key: string) {
    const result = await this.instance.getItem<IData>(key);
    if (result === null) {
      return null;
    }
    if (result.expires && result.expires < Date.now()) {
      // 过期
      await this.instance.removeItem(key);
      return null;
    }

    return result.data;

  }

  // 添加数据，过期时间单位分钟
  async set(key: string, value: any, expires?: number) {
    let type = Object.prototype.toString.call(value)

    const data: IData = {
      type,
      expires: null,
      data: null,
    };

    if (expires) {
      // 如果有传入过期时间，则记录过期时间戳
      data.expires = Date.now() + (expires * 60 * 1000);
    }
    data.data = value;
    return await this.instance.setItem(key, data);
  }

  async clear() {
    return await this.instance.clear();
  }

  async remove(key: string) {
    return await this.instance.removeItem(key);
  }

  async length() {
    return await this.instance.length();
  }

  async keys() {
    return await this.instance.keys();
  }
}



export default {
  upload:  new LocalDB({
    name: '_boost_upload'
  }),
  remove: new LocalDB({
    name: '_boost_remove'
  }),
  imageGeneration: new LocalDB({
    name: '_boost_image_generation'
  }),
  titleGeneration: new LocalDB({
    name: '_boost_title_generation'
  })
}
