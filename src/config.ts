/*
 * @Date: 2021-02-21 20:39:01
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-02-22 00:01:30
 */

import TOML from '@iarna/toml';
import { readFileSync } from 'fs';

interface Config {
  author: string;
  aliyun: Aliyun;
  microsoft: Microsoft;
}

interface Microsoft {
  allow_route_list: string[];
  client_id: string;
  client_secret: string;
  redirect_uri: string;
}

interface Aliyun {
  accessKey_id: string;
  accessKey_secret: string;
  account_id: string;
  auth_file_name: string;
  bucket: string;
  region: string;
}

let { aliyun, microsoft }: Config = (TOML.parse(
  readFileSync('./config.toml', 'utf-8')
) as unknown) as any;

export { aliyun, microsoft };
