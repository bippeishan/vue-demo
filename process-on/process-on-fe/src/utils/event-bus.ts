/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import emitter from 'tiny-emitter/instance';

export default {
  on: (...args: any) => emitter.on(...args),
  once: (...args: any) => emitter.once(...args),
  off: (...args: any) => emitter.off(...args),
  emit: (...args: any) => emitter.emit(...args),
};
