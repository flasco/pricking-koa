import Koa from 'koa';
import path from 'path';
import { IOptions } from '../definitions/application';

import baseContext from '../extends/context';
import { getDirFiles } from '../utils/file-loader';

const originalPrototypes = {
  request: require('koa/lib/request'),
  response: require('koa/lib/response'),
  context: require('koa/lib/context'),
  application: require('koa/lib/application'),
};

const supportedDefine = ['context'];

export const loadContextExtends = (app: Koa, rootPath: string, options: IOptions) => {
  loadProperties({
    proto: app.context,
    target: baseContext,
    from: 'root',
    name: 'context',
    originalProto: originalPrototypes.context,
    debug: options.debug,
  });

  const ctxExtsFilePath = path.resolve(rootPath, 'extends');

  const files = getDirFiles(ctxExtsFilePath);

  if (!files.length) return;

  const supportedFiles = files.filter(file =>
    supportedDefine.some(spDefine => file.includes(`/${spDefine}.`))
  );

  for (const file of supportedFiles) {
    const name = supportedDefine.find(d => file.includes(d));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ctxExt = require(file);

    loadProperties({
      proto: app.context,
      target: ctxExt,
      from: '<ROOT>/' + path.relative(options.rootPath, file),
      name,
      originalProto: originalPrototypes[name],
      debug: options.debug,
    });
  }
};

const loadProperties = ({ proto, name, target = {}, from = '', originalProto, debug = false }) => {
  const properties = Object.getOwnPropertyNames(target);
  const mergeRecord = new Map();

  for (const property of properties) {
    if (mergeRecord.has(property)) {
      console.error(`multiple define with ${property} at ${from}`);
    }

    // Copy descriptor
    let descriptor = Object.getOwnPropertyDescriptor(target, property);
    let originalDescriptor = Object.getOwnPropertyDescriptor(proto, property);
    if (!originalDescriptor) {
      // try to get descriptor from originalPrototypes
      if (originalProto) {
        originalDescriptor = Object.getOwnPropertyDescriptor(originalProto, property);
      }
    }
    if (originalDescriptor) {
      // don't override descriptor
      descriptor = Object.assign({}, descriptor);
      if (!descriptor.set && originalDescriptor.set) {
        descriptor.set = originalDescriptor.set;
      }
      if (!descriptor.get && originalDescriptor.get) {
        descriptor.get = originalDescriptor.get;
      }
    }
    if (debug) console.log(name + '-load:', property, from);
    Object.defineProperty(proto, property, descriptor);
    mergeRecord.set(property, from);
  }
};
