import { keyMap } from './keyMap';

// 获取快捷键对应的键值数组
const getKeyCodeArr = (key: string) => {
  const keyArr = key.split(/\s*\+\s*/);
  const arr: number[] = [];
  keyArr.forEach((item) => {
    arr.push(keyMap[item]);
  });
  return arr;
};

// 获取事件对象里的键值数组
const getOriginEventCodeArr = (e: any) => {
  const arr: number[] = [];
  if (e.ctrlKey || e.metaKey) {
    arr.push(keyMap.Control);
  }
  if (e.altKey) {
    arr.push(keyMap.Alt);
  }
  if (e.shiftKey) {
    arr.push(keyMap.Shift);
  }
  if (!arr.includes(e.keyCode)) {
    arr.push(e.keyCode);
  }
  return arr;
};

// 检查键值是否符合
const checkKey = (e: any, key: string) => {
  const o = getOriginEventCodeArr(e);
  const k = getKeyCodeArr(key);

  if (o.length !== k.length) {
    return false;
  }
  for (let i = 0; i < o.length; i += 1) {
    const index = k.findIndex((item) => item === o[i]);
    if (index === -1) {
      return false;
    }
    k.splice(index, 1);
  }
  return true;
};

export { getKeyCodeArr, getOriginEventCodeArr, checkKey };
