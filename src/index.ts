/*
 * @Date: 2021-02-21 19:14:45
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-02-21 23:07:24
 */
// exnext
import 'core-js';
// exnext
import { config } from './config';
import { BaseError } from './error';
import { matchRoute } from './route';
import { aliyunReq2nodeReq, nodeResp2aliyunResp } from './util';
import { AliyunContext, AliyunRequest, AliyunResponse } from './@types/aliyun';
import { getAuthorization, requestNewAuth } from './auth';
import fetch from 'node-fetch';

export const handler = async (
  aliyunReq: AliyunRequest,
  aliyunResp: AliyunResponse,
  aliyuncontext: AliyunContext
) => {
  try {
    const { path } = aliyunReq;
    if (!matchRoute(path, ...config.allow_route_list)) {
      throw BaseError.from('invalid path', 403);
    }
    const req = await aliyunReq2nodeReq(aliyunReq);
    req.hostname = 'graph.microsoft.com';
    req.headers.set('authorization', await getAuthorization());
    let resp = await fetch(req.clone());
    if (resp.status == 401) {
      const error: { error: { message: string } } = await resp.clone().json();
      // google search <CompactToken validation failed with reason code: 80049228>
      if (error.error.message.includes('80049228')) {
        await requestNewAuth();
        resp = await fetch(req.clone());
      }
    }
    nodeResp2aliyunResp(resp, aliyunResp);
  } catch (error) {
    aliyunResp.setHeader('Content-Type', 'application/json; charset=utf-8');
    aliyunResp.setStatusCode(500);
    if (error instanceof Error) {
      const { message, stack, name } = error;
      if (error instanceof BaseError) {
        const { statusCode } = error;
        aliyunResp.setStatusCode(statusCode);
        aliyunResp.send(error.stringify());
      } else {
        aliyunResp.send(JSON.stringify({ message, name, stack }, undefined, 2));
      }
    } else {
      aliyunResp.send(
        JSON.stringify({ message: 'unknown error', error }, undefined, 2)
      );
    }
  }
};
