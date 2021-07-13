
export default {
  ChartColor: {
    START: ['#5498FF', '#38DF7B', '#FEAC54', '#BA81FF', '#F986FA', '#86e0fa'],
    END: ['#2466E6', '#25B860', '#FB962A', '#8E30FF', '#E94FEF', '#3cd8ff'],
    BG: ['#EEE', '#EEE', '#EEE', '#EEE', '#EEE', '#EEE'],
    ALL: ['#4F94FD', '#35D877', '#FEAC54', '#A459FF', '#FE54F0', '#38D9FB', '#6974F9', '#F53679', '#ADD469', '#FFDC52'],
    AREA_RGBA: ["rgba(0,255,127)", "rgba(255,165,0)", "rgba(255, 0, 255)", "rgba(255,255,0)", "rgba(123,104,238)",
      "rgba(0,0,255)", "rgba(0,255,255)", "rgba(220, 20, 60)", "rgba(128,0,128)", "rgba(128,128,128)"],
  },

  Code: {
    SUCCESS: 200,
    REQUEST_ERROR: 501,
    RESPONSE_ERROR: 502,
    TIMEOUT: 699,
  },

  Sign: {
    key: "signature",
    accesskey_id: "stockroom_web",
    accesskey_secret: "123456",
  },

  QueryType: {
    number: 'number', // 成交套数
    area: 'area', // 面积
  },

  StatType: {
    day: 'day', // 按天统计
    month: 'month', // 按月统计
  }
}
