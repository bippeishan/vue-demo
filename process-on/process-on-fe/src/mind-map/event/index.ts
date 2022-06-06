import EventEmitter from 'eventemitter3';
import MindMap from '..';

import { Opt } from './type';

class Event extends EventEmitter {
  mindMap: MindMap;

  constructor(opt = {} as Opt) {
    super();
    this.mindMap = opt.mindMap;
  }
}

export default Event;
