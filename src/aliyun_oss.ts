/*
 * @Date: 2021-02-21 22:22:04
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-02-22 00:03:42
 */

import OSS from 'ali-oss';
import { aliyun } from './config';
const { accessKey_id, accessKey_secret, bucket, region } = aliyun;

const client = new OSS({
  region: `oss-${region}`,
  accessKeyId: accessKey_id,
  accessKeySecret: accessKey_secret,
  bucket,
});
client.useBucket(bucket);

export async function writeText(name: string, text: string) {
  await client.put(name, Buffer.from(text, 'utf-8'));
}

export async function readText(name: string): Promise<string> {
  return ((await client.get(name)).content as Buffer).toString('utf-8');
}
