import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

export default plugin;
