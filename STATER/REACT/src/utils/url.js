import { history } from 'redux/store';
import { isObject } from './object';

export const updateHashUrl = (hash = '') => {
  if (!history) return;
  const { location } = history;
  history.push({ ...location, hash });
};

export const updateSearchUrl = (search = '') => {
  if (!history) return;
  const { location } = history;
  history.push({ ...location, search });
};

export const convertJsonToQueryString = params => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(
      k =>
        `${esc(k)}=${esc(
          isObject(params[k]) ? JSON.stringify(params[k]) : params[k],
        )}`,
    )
    .join('&');
};

export const URLJoin = (...args) =>
  args
    .join('/')
    .replace(/[\/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?');

// URLJoin('http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'); // 'http://www.google.com/a/b/cd?foo=123&bar=foo'

export const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

// isAbsoluteURL('https://google.com'); // true
// isAbsoluteURL('www.example.com'); // false

export const isURL = path =>
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(
    path,
  );

// isURL('https://google.com'); // true
// isURL('www.example.com'); // true

export const getQueryParams = (params, url) => {
  let href = url;
  //this expression is to get the query strings
  let reg = new RegExp('[?&]' + params + '=([^&#]*)', 'i');
  let queryString = reg.exec(href);
  return queryString ? queryString[1] : null;
};

// getQueryParams('data', 'http://another-example.com?example=something&data=13'); // "13"

export const getQueryAllParams = url => {
  let queryParams = {};
  //create an anchor tag to use the property called search
  let anchor = document.createElement('a');
  //assigning url to href of anchor tag
  anchor.href = url;
  //search property returns the query string of url
  let queryStrings = anchor.search.substring(1);
  let params = queryStrings.split('&');

  for (var i = 0; i < params.length; i++) {
    var pair = params[i].split('=');
    queryParams[pair[0]] = decodeURIComponent(pair[1]);
  }
  return queryParams;
};

// getQueryAllParams('http://another-example.com?example=something&data=13'); //{"example": "something", "data": 13}

export const getQueryString = url => {
  return url.split('?')[1];
};

// getQueryString // http://codexworld.com/index.php?type=product&id=1234 => type=product&id=1234
