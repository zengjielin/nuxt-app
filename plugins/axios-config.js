export default function({ $axios, redirect }) {
  $axios.interceptors.request.use(config => {
    config.data = config.data || {};
    // 如果上传文件必须是FormData，Content-Type = 'multipart/form-data
    let hasFiles = false;
    for (let i in config.data) {
      if (config.data[i] instanceof Array) {
        for (let j in config.data[i]) {
          if (
            config.data[i][j] instanceof File ||
            config.data[i][j] instanceof Blob
          ) {
            hasFiles = true;
            break;
          }
        }
      }
      if (config.data[i] instanceof File || config.data[i] instanceof Blob) {
        hasFiles = true;
        break;
      }
    }
    hasFiles
      ? (config.headers["Content-Type"] = "multipart/form-data")
      : (config.headers["Content-Type"] = "application/json;charset=utf-8");
    if (hasFiles) {
      const formdata = new FormData();
      for (let i in config.data) {
        if (config.data[i] instanceof Array) {
          for (let j in config.data[i]) {
            formdata.append(i, config.data[i][j]);
          }
        } else {
          formdata.append(i, config.data[i]);
        }
      }
      config.data = formdata;
    }
    // config.headers.TOKEN = getToken();
    // config.url = process.env.BASE_URL
    config.timeout = 10000;
    return config;
  });
  $axios.interceptors.response.use(
    response => {
      if (response.data.success == false) {
        console.log("请求失败");
        return;
      }
      console.log(response);
      return response;
    },
    err => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = "请求错误(400)";
            break;
          case 401:
            // return history.push("/login");
            break;
          case 403:
            err.message = "拒绝访问(403)";
            break;
          case 404:
            err.message = "请求出错(404)";
            break;
          case 408:
            err.message = "请求超时(408)";
            break;
          case 500:
            err.message = "服务器错误(500)";
            break;
          case 501:
            err.message = "服务未实现(501)";
            break;
          case 502:
            err.message = "网络错误(502)";
            break;
          case 503:
            err.message = "服务不可用(503)";
            break;
          case 504:
            err.message = "网络超时(504)";
            break;
          case 505:
            err.message = "HTTP版本不受支持(505)";
            break;
          default:
            err.message = `连接出错!`;
        }
      } else {
        err.message = "连接服务器失败!";
      }
      message.error(err.message);
      return Promise.reject(err);
    }
  );
}
