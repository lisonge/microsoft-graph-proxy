/*
 * @Date: 2021-02-21 20:05:53
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-02-21 21:16:13
 */

export class BaseError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
  stringify(): string {
    const { message, name, stack } = this;
    return JSON.stringify({ message, name, stack }, undefined, 2);
  }
  static from(message: string, statusCode: number) {
    return new this(message, statusCode);
  }
}
