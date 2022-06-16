/* eslint-disable max-statements */
import axios from "axios";
import getConfig from "next/config";
import isPlainObject from "lodash.isplainobject";
import asyncParallelLimit from "async/parallelLimit";
import asyncEachLimit from "async/eachLimit";
import querystring from "querystring";
import { SUCCESSFUL, CONTENT_DELETE } from "@/src/utils/constant";
import {
  isFormDataInstance,
  getApiDomainByFullUrl,
  checkServer,
  getValue,
  formatPicturePath,
  formatObj,
} from "@/src/utils/utils";
import { APIError } from "@/src/utils/error";
import { Toast } from "vant";

function getApiDomain(initialApiDomain: string, apiName: string) {
  if (initialApiDomain.startsWith("/f/")) {
    return initialApiDomain;
  }
  // const { publicRuntimeConfig = {} } = getConfig() || {};
  const { publicRuntimeConfig = {} } = getConfig() || {};
  return (
    getApiDomainByFullUrl(publicRuntimeConfig.fullOriginalUrl || "", apiName) ||
    initialApiDomain
  );
  // return getApiDomainByFullUrl('https://m.haohaozhu.cn/live-broadcast/channel', apiName) || initialApiDomain;
}

async function requestAPI(options: any) {
  if (options.baseURL.indexOf("://") !== -1) {
    // console.log('\norigin options: ', options.baseURL, '\n');
    // console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    // console.log('process.env.API_ENV: ', process.env.API_ENV);
    try {
      const [, host] = options.baseURL.split("://");
      const [apiName] = host.split(".");
      options.baseURL = getApiDomain(options.baseURL, apiName);
    } catch (error) {
      console.log("transfer baseURL error: ", options);
    }
    // console.log('\nfinal options: ', options, '\n');
  }
  let finalOptions;
  try {
    let { data, headers = {}, url } = options;
    if (options.data && options.data.headers) {
      headers = {
        ...options.data.headers,
      };
      // eslint-disable-next-line no-param-reassign
      delete options.data.headers;
    }
    if (Object.prototype.toString.call(options.data) === "[object FormData]") {
      headers = {
        ...headers,
        "Content-Type": "multipart/form-data",
      };
    } else if (isFormDataInstance(options.data)) {
      headers = {
        ...headers,
        ...options.data.getHeaders(),
      };
    }
    if (options.method === "post" && isPlainObject(data)) {
      data = querystring.stringify(data);
    }
    if (checkServer()) {
      if (url.indexOf("?") === -1) {
        url += "?";
      }
      if (url.indexOf("platform=node") === -1) {
        url += "&platform=node";
      }
    }
    if (!checkServer()) {
      delete headers.cookie;
      delete headers.Cookie;
      delete headers["User-Agent"];
    }
    finalOptions = {
      responseType: "json",
      timeout: checkServer() ? 8000 : 30000,
      ...options,
      url,
      headers,
      data,
    };

    if (checkServer()) {
      console.info("finalOptions", finalOptions);
    }
    const response = await axios(finalOptions);

    if (response.data && response.data.extend) {
      response.data.data = {
        extend: response.data.extend,
      };
    }
    let errorMessage = "";
    if (!response.data) {
      errorMessage = "数据为空";
    }
    if (!errorMessage && response.data.code !== SUCCESSFUL) {
      //根据返回的code显示对应的错误提示
      // errorMessage = CODE_MESSAGE_MAP[response.data.code] || response.data.msg;
    }
    if (errorMessage) {
      const error: any = new APIError(
        errorMessage,
        `${JSON.stringify(
          {
            url,
            res: response.data,
            req: finalOptions,
          },
          null,
          "\t"
        )}`
      );
      error.code = getValue(response, "data.code");
      // error.msg = getValue(response, 'data.msg');
      // error.res = response.data;
      // error.req = finalOptions;
      if (errorMessage.indexOf("删除") > -1) {
        error.code = CONTENT_DELETE;
        error.res = response.data;
        error.res.code = CONTENT_DELETE;
      }
      error.msg = getValue(response, "data.msg");
      error.req = finalOptions;
      throw error;
    }

    const result = formatObj(response.data.data, (value: any) => {
      if (typeof value === "string") {
        return formatPicturePath(value);
      }
      return value;
    });

    if (!checkServer() && result && result.extend) {
      Toast(result.extend);
    }

    return result;
  } catch (error: any) {
    let finalError = error;
    if (!(error instanceof APIError)) {
      finalError = new APIError(
        error.message,
        JSON.stringify(finalOptions, null, "\t")
      );
    }

    if (checkServer()) {
      console.error(finalError); // 不能删除，在sentry的面包屑中查看，方便定位问题
    }
    // if (typeof window === 'object') {
    //   console.info('cookie', document.cookie);
    // }
    finalError.message = finalError.message.replace("m:", "");
    throw finalError;
  }
}

function getRequestFn(baseURL: string, method = "get") {
  return async (options: any) => {
    const data = await requestAPI({
      baseURL,
      method,
      ...options,
    });
    return data;
  };
}

const getYAPI = getRequestFn(getApiDomain(process.env.Y_API, "yapi"));
const postYAPI = getRequestFn(getApiDomain(process.env.Y_API, "yapi"), "post");
const getTAPI = getRequestFn(getApiDomain(process.env.T_API, "tapi"));
const postTAPI = getRequestFn(getApiDomain(process.env.T_API, "tapi"), "post");
const getIAPI = getRequestFn(process.env.I_API);
const getIMAPI = getRequestFn(process.env.IM_API);
const postIMAPI = getRequestFn(process.env.IM_API, "post");
const postUploadAPI = getRequestFn(process.env.UPLOAD_API, "post");
const getOssAPI = getRequestFn(process.env.OSS_UPLOAD_API);
const getAPI = getRequestFn(getApiDomain(process.env.B_API, "api"));
const postAPI = getRequestFn(getApiDomain(process.env.B_API, "api"), "post");
const getHAPI = getRequestFn(process.env.H_API);
const postHAPI = getRequestFn(process.env.H_API, "post");
const getDAPI = getRequestFn(getApiDomain(process.env.D_API, "dapi"));
const postDAPI = getRequestFn(getApiDomain(process.env.D_API, "dapi"), "post");
const postStatAPI = getRequestFn(process.env.STAT_API, "post");
const get = getRequestFn("/api");
const post = getRequestFn("/api", "post");

export function getToken(ctx: any) {
  return ctx.cookies.get("web_token");
}

export function parallelLimit(requestList: any[]) {
  const taskList = requestList.map(
    (request: any) => (callback: Function) =>
      request()
        .then((result: any) => {
          callback(null, result);
        })
        .catch((error: any) => {
          callback(error);
        })
  );
  return new Promise((resolve, reject) => {
    asyncParallelLimit(taskList, 6, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export function eachlLimit(list: any[], fn: Function) {
  return new Promise((resolve, reject) => {
    asyncEachLimit(
      list,
      6,
      (item: any, callback: Function) => {
        fn(item)
          .then((result: any) => {
            callback(null, result);
          })
          .catch((error: any) => {
            callback(error);
          });
      },
      (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export {
  getYAPI,
  postYAPI,
  getTAPI,
  postTAPI,
  getAPI,
  postUploadAPI,
  getOssAPI,
  postAPI,
  getHAPI,
  postHAPI,
  getDAPI,
  postDAPI,
  getIAPI,
  postIMAPI,
  getIMAPI,
  get,
  post,
  postStatAPI,
};
