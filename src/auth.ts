/*
 * @Date: 2021-02-21 20:06:35
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-02-21 22:58:12
 */

import { BaseError } from './error';
import { config } from './config';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { readText, writeText } from './aliyun_oss';
interface Auth {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
let auth: Auth | undefined = undefined;

export async function getAuthorization(): Promise<string> {
  if (auth == undefined) {
    auth = await readAuth();
  }
  return `${auth.token_type}\x20${auth.access_token}`;
}

async function readAuth(): Promise<Auth> {
  return JSON.parse(await readText(config.auth_file_name)) as Auth;
}

async function writeAuth(auth: Auth) {
  await writeText(config.auth_file_name, JSON.stringify(auth));
}

export async function requestNewAuth() {
  if (auth == undefined) {
    throw BaseError.from('auth: expect <auth>, got <undefined>', 500);
  }
  const u = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
  const { client_id, redirect_uri, client_secret } = config;
  const data = {
    client_id,
    redirect_uri,
    client_secret,
    refresh_token: auth.refresh_token,
    grant_type: 'refresh_token',
  };
  const response = await fetch(u, {
    method: 'POST',
    body: new URLSearchParams(data),
  });
  auth = (await response.json()) as Auth;
  await writeAuth(auth);
}
