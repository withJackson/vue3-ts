module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 750, // UI设计稿的宽度
      unitPrecision: 3, // 转换后的精度，即小数点位数
      propList: ["*", "!font-size"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: "vmin", // 指定需要转换成的视窗单位，默认vw
      // fontViewportUnit: "px", // 指定字体需要转换成的视窗单位，默认vw
      landscapeUnit: "vh", // 横屏时使用的单位
      landscapeWidth: 667, // 横屏时使用的视口宽度
      selectorBlackList: [".ignore-px"], // 指定不转换为视窗单位的类名
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      // landscape: false, // 是否处理横屏情况
      exclude: /(\/|\\)(node_modules)(\/|\\)/,
    },
  },
};
