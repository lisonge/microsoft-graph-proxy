/*
 * @Date: 2021-02-21 20:06:22
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-02-21 20:53:54
 */

function testRoutePath(route: string, path: string): boolean {
  const a1 = route.split('/');
  const a2 = path.split('/');
  if (a1.length != a2.length) {
    return false;
  } else {
    for (let i1 = 0; i1 < a1.length; i1++) {
      if (a1[i1] == '{}') {
      } else {
        if (a1[i1] != a2[i1]) {
          return false;
        }
      }
    }
  }
  return true;
}

function testComplexRoutePath(complexRoute: string, path: string): boolean {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (!complexRoute.startsWith('/')) {
    complexRoute = '/' + complexRoute;
  }
  const strArr: string[] = [];
  for (let i = 0, flag = false; i < complexRoute.length; i++) {
    const el = complexRoute[i];
    if (el == '{') {
      flag = true;
      strArr.push(el);
    } else if (el == '}') {
      flag = false;
      strArr.push(el);
    } else if (!flag) {
      strArr.push(el);
    }
  }
  const a1 = strArr.join('').split(':/');
  const a2 = path.split(':/');
  console.log(a1, a2);
  if (a1.length != a2.length) {
    return false;
  } else {
    for (let i1 = 0; i1 < a1.length; i1++) {
      if (a1[i1] == '{}') {
      } else {
        if (!testRoutePath(a1[i1], a2[i1])) {
          return false;
        }
      }
    }
  }
  return true;
}

// const path1 = '/v1.0/drives/{}/root:/{}:/children';
// const path2 = '/v1.0/drives/5646wx46w!sxw/root:/fold1/fold2:/children';
// console.log(testComplexRoutePath(path1, path2));

function matchRoute(path: string, ...allow_route_list: string[]): boolean {
  return allow_route_list.some((v) => testComplexRoutePath(v, path));
}

export { matchRoute };
