// from
// - 2018 http://www.gov.cn/zhengce/content/2017-11/30/content_5243579.htm
// - 2019 http://www.gov.cn/zhengce/content/2018-12/06/content_5346276.htm
// - 2019调整 http://www.gov.cn/zhengce/content/2019-03/22/content_5375877.htm
// - 2020 http://www.gov.cn/zhengce/content/2019-11/21/content_5454164.htm

"use strict";

module.exports = {
  isWorkday: isWorkday,
  isHoliday: isHoliday,
  getFestival: getFestival,
  isAddtionalWorkday: isAddtionalWorkday,
};

var HOLIDAYS = {
  "2018-02-15": "春节",
  "2018-02-16": "春节",
  "2018-02-17": "春节",
  "2018-02-18": "春节",
  "2018-02-19": "春节",
  "2018-02-20": "春节",
  "2018-02-21": "春节",
  "2018-04-05": "清明节",
  "2018-04-06": "清明节",
  "2018-04-07": "清明节",
  "2018-04-29": "劳动节",
  "2018-04-30": "劳动节",
  "2018-05-01": "劳动节",
  "2018-06-18": "端午节",
  "2018-09-24": "中秋节",
  "2018-10-01": "国庆节",
  "2018-10-02": "国庆节",
  "2018-10-03": "国庆节",
  "2018-10-04": "国庆节",
  "2018-10-05": "国庆节",
  "2018-10-06": "国庆节",
  "2018-10-07": "国庆节",
  "2018-12-30": "元旦",
  "2018-12-31": "元旦",
  "2019-01-01": "元旦",
  "2019-02-04": "春节",
  "2019-02-05": "春节",
  "2019-02-06": "春节",
  "2019-02-07": "春节",
  "2019-02-08": "春节",
  "2019-02-09": "春节",
  "2019-02-10": "春节",
  "2019-04-05": "清明节",
  "2019-04-06": "清明节",
  "2019-04-07": "清明节",
  "2019-05-01": "劳动节",
  "2019-05-02": "劳动节",
  "2019-05-03": "劳动节",
  "2019-05-04": "劳动节",
  "2019-06-07": "端午节",
  "2019-06-08": "端午节",
  "2019-06-09": "端午节",
  "2019-09-13": "中秋节",
  "2019-09-14": "中秋节",
  "2019-09-15": "中秋节",
  "2019-10-01": "国庆节",
  "2019-10-02": "国庆节",
  "2019-10-03": "国庆节",
  "2019-10-04": "国庆节",
  "2019-10-05": "国庆节",
  "2019-10-06": "国庆节",
  "2019-10-07": "国庆节",
  "2020-01-01": "元旦",
  "2020-01-24": "春节",
  "2020-01-25": "春节",
  "2020-01-26": "春节",
  "2020-01-27": "春节",
  "2020-01-28": "春节",
  "2020-01-29": "春节",
  "2020-01-30": "春节",
  "2020-04-04": "清明节",
  "2020-04-05": "清明节",
  "2020-04-06": "清明节",
  "2020-05-01": "劳动节",
  "2020-05-02": "劳动节",
  "2020-05-03": "劳动节",
  "2020-05-04": "劳动节",
  "2020-05-05": "劳动节",
  "2020-06-25": "端午节",
  "2020-06-26": "端午节",
  "2020-06-27": "端午节",
  "2020-10-01": "国庆节",
  "2020-10-02": "国庆节",
  "2020-10-03": "国庆节",
  "2020-10-04": "国庆节",
  "2020-10-05": "国庆节",
  "2020-10-06": "国庆节",
  "2020-10-07": "国庆节",
  "2020-10-08": "国庆节",
  "2021-01-01": "元旦",
  "2021-02-11": "春节",
  "2021-02-12": "春节",
  "2021-02-13": "春节",
  "2021-02-14": "春节",
  "2021-02-15": "春节",
  "2021-02-16": "春节",
  "2021-02-17": "春节",
  "2021-04-03": "清明节",
  "2021-04-04": "清明节",
  "2021-04-05": "清明节",
  "2021-05-01": "劳动节",
  "2021-05-02": "劳动节",
  "2021-05-03": "劳动节",
  "2021-05-04": "劳动节",
  "2021-05-05": "劳动节",
  "2021-06-12": "端午节",
  "2021-06-13": "端午节",
  "2021-06-14": "端午节",
  "2021-09-19": "中秋节",
  "2021-09-20": "中秋节",
  "2021-09-21": "中秋节",  
  "2021-10-01": "国庆节",
  "2021-10-02": "国庆节",
  "2021-10-03": "国庆节",
  "2021-10-04": "国庆节",
  "2021-10-05": "国庆节",
  "2021-10-06": "国庆节",
  "2021-10-07": "国庆节",
};

var WEEKENDS_WORKDAY = {
  "2018-02-11": "补春节",
  "2018-02-24": "补春节",
  "2018-04-08": "补清明节",
  "2018-04-28": "补劳动节",
  "2018-09-29": "补国庆节",
  "2018-09-30": "补国庆节",
  "2018-12-29": "补元旦",
  "2019-02-02": "补春节",
  "2019-02-03": "补春节",
  "2019-04-28": "补劳动节",
  "2019-05-05": "补劳动节",
  "2019-09-29": "补国庆节",
  "2019-10-12": "补国庆节",
  "2020-01-19": "补春节",
  "2020-02-01": "补春节",
  "2020-04-26": "补劳动节",
  "2020-05-09": "补劳动节",
  "2020-06-28": "补端午节",
  "2020-09-27": "补国庆节",
  "2020-10-10": "补国庆节",
  "2021-02-07": "补春节",
  "2021-02-20": "补春节",  
  "2021-04-25": "补劳动节", 
  "2021-05-08": "补劳动节", 
  "2021-09-18": "补中秋节", 
  "2021-09-26": "补国庆节", 
  "2021-10-09": "补国庆节", 
};

function isWorkday(day) {
  var fd = formatDate(day);
  if (WEEKENDS_WORKDAY[fd.date]) {
    return true;
  } else if (HOLIDAYS[fd.date]) {
    return false;
  }
  return !fd.weekends;
}

function isHoliday(day) {
  return !isWorkday(day);
}

function isAddtionalWorkday(day) {
  var fd = formatDate(day);
  return !!WEEKENDS_WORKDAY[fd.date];
}

function getFestival(day) {
  var fd = formatDate(day);
  if (WEEKENDS_WORKDAY[fd.date]) {
    return WEEKENDS_WORKDAY[fd.date];
  } else if (HOLIDAYS[fd.date]) {
    return HOLIDAYS[fd.date]
  }
  return fd.weekends ? '周末' : '工作日';
}

function formatDate(day) {
  var d = new Date(day),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month
  };
  if (day.length < 2) {
    day = "0" + day
  };

  return {
    date: [year, month, day].join("-"),
    weekends: [0, 6].indexOf(d.getDay()) > -1
  };
}
