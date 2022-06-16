export function isObject(value: any) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function isArray(value: any) {
  return Array.isArray(value);
}

export function isString(value: any) {
  return Object.prototype.toString.call(value) === "[object String]";
}

export const getApiDomainByFullUrl = (fullUrl: string, apiName: string) => {
  let apiDomain = "";

  if (
    fullUrl.indexOf("://") > 0 &&
    apiName &&
    apiName !== "img-upload" &&
    fullUrl.indexOf("m.domain.cn") === -1 &&
    fullUrl.indexOf("m.domain.com") === -1 &&
    fullUrl.indexOf("m.domain.me") === -1 &&
    fullUrl.indexOf("t.domain.cn") === -1 &&
    fullUrl.indexOf("localhost:4449") === -1 &&
    fullUrl.indexOf("127.0.0.1:4449") === -1 &&
    fullUrl.indexOf(":4449") === -1
  ) {
    const [protocal, path] = fullUrl.split("://");
    console.log("protocal", protocal);
    const host = path.split("/")[0];
    const [projectName, envName, ...extraArgs] = host.split(".");
    const urlArgs = [envName, ...extraArgs];
    const isHhc = path.indexOf("haohaoce") !== -1;
    const isGray = path.indexOf("domain") !== -1;

    if (
      !(
        process.env.API_ENV === "dev" &&
        (projectName.startsWith("localhost") || /^[0-9]+$/.test(projectName))
      )
    ) {
      apiDomain = `${isHhc ? "http" : "https"}://${apiName}.${urlArgs.join(
        "."
      )}`.replace(":8880", "");

      if (isHhc && host.startsWith("m.qa")) {
        const hhcEnv = host.split(".")[1].replace("qa", "") || "1";
        apiDomain = `http://${apiName}.qa${hhcEnv}.domain.com`; //测试环境
      }
      if (isGray && host.startsWith("m.gray")) {
        const hhcEnv = host.split(".")[1].replace("gray", "") || "1";
        apiDomain = `https://${apiName}.gray${hhcEnv}.domain.me`;
      }
    }
  }
  return apiDomain;
};

/**
 * 这里的FormData指的是npm包form-data，不是指浏览器端的FormData
 * @param obj
 * @returns {boolean}
 */
export function isFormDataInstance(obj: any) {
  return !!(obj && obj.getHeaders);
}

export const checkServer = () =>
  Object.prototype.toString.call(global.process) === "[object process]";

export function getValue(obj: any, path: string, defaultValue?: string) {
  const result = path
    .split(".")
    .reduce((lastObj, key) => (lastObj ? lastObj[key] : undefined), obj);
  if (
    defaultValue !== undefined &&
    Object.prototype.toString.call(result) !==
      Object.prototype.toString.call(defaultValue)
  ) {
    return defaultValue;
  }
  return result === undefined ? defaultValue : result;
}

/**
 * 递归格式化obj
 * @param {*} obj
 * @param {*} format
 */
export function formatObj(obj: any, format: Function) {
  if (isArray(obj)) {
    return obj.map((item: any) => {
      return formatObj(item, format);
    });
  }
  if (isObject(obj)) {
    const result: any = {};
    Object.keys(obj).forEach((key) => {
      result[key] = formatObj(obj[key], format);
    });
    return result;
  }
  return format(obj);
}

export function formatPicturePath(src = ""): string {
  return src.replace("fmt=webp", "");
  // .replace('http://img.hhz1.cn', 'https://img.hhz.cn');
}
