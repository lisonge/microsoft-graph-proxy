/*
 * @Date: 2021-02-21 20:39:01
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-02-21 22:30:12
 */

import TOML from '@iarna/toml';
import { readFileSync } from 'fs';

interface Config {
  accessKey_id: string;
  accessKey_secret: string;
  account_id: string;
  allow_route_list: string[];
  bucket: string;
  auth_file_name: string;
  author: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  region: string;
}

let config: Config = (TOML.parse(
  readFileSync('./config.toml', 'utf-8')
) as unknown) as any;

export { config };
