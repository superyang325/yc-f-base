let provinceObj = {
  "5": "粤",
  "2": "京",
  "3": "闽",
  "30": "浙",
  "24": "沪",
  "12": "鄂",
  "13": "湘",
  "16": "赣",
  "8": "琼",
  "26": "津",
  "31": "渝",
  "9": "冀",
  "10": "豫",
  "1": "皖",
  "6": "桂",
  "25": "川",
  "7": "黔",
  "22": "晋",
  "17": "辽",
  "14": "吉",
  "11": "黑",
  "15": "苏",
  "21": "鲁",
  "29": "云",
  "23": "陕",
  "4": "甘",
  "20": "青",
  "18": "蒙",
  "19": "宁",
  "28": "新",
  "27": "藏",
}

export default function(code){
  return provinceObj[code]
}
