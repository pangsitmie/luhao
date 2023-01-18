import { tokens } from "../theme";

export const mockDataUser = [
  {
    id: 0,
    status: "正常",
    reason: "None",
    enable: true,
    uid: 0,
    username: "Name 0",
    imgURL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    phone: "1-234-567-89",
    password: "pass123",
    sex: 0, //0=male , 1 = female
    birthday: "1990-01-01"
  },
  {
    id: 1,
    status: "正常",
    reason: "None",
    enable: true,
    uid: 1,
    username: "Name 1",
    imgURL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    phone: "1-234-567-89",
    password: "pass123",
    sex: 1, //0=male , 1 = female
    birthday: "1990-01-01"
  },
  {
    id: 2,
    status: "封鎖",
    reason: "Invalid email address",
    enable: true,
    uid: 2,
    username: "Name 2",
    imgURL: "https://www.healthiummedtech.com/codefiles/NewTheme/img/team-imgs/ramesh-subrahmanian.jpg",
    phone: "2-345-678-90",
    password: "pass2",
    sex: 0, //0=male , 1 = female
    birthday: "1990-02-02"
  },
  {
    id: 3,
    status: "正常",
    reason: "",
    enable: true,
    uid: 3,
    username: "Name 3",
    imgURL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    phone: "3-456-789-01",
    password: "pass3",
    sex: 1, //0=male , 1 = female
    birthday: "1990-03-03"
  },


];

export const mockBrandData = [
  {
    id: 0,
    logoImgURL: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    coverImgURL: "https://i.imgur.com/4YQqX2m.png",
    brandName: "Brand 0",
    brandDesc: "Brand 0 description",
    brandManager: "Manager 0",
    brandManagerPhone: "097-123-4567",
    brandManagerEmail: "manager@gmail.com",
    brandManagerLine: "@manager",
    brandTax: "123-456-789",
    brandExpireDate: "2020-12-31",
    status: "正常",
    review: "通過",
  },
  {
    id: 1,
    logoImgURL: "https://i.imgur.com/4YQqX2m.png",
    coverImgURL: "https://i.imgur.com/4YQqX2m.png",
    brandName: "Brand 1",
    brandDesc: "Brand 1 description",
    brandManager: "Manager 1",
    brandManagerPhone: "097-123-4561",
    brandManagerEmail: "manager@gmail.com",
    brandManagerLine: "@manager",
    brandTax: "123-456-789",
    brandExpireDate: "2020-12-31",
    status: "停用",
    review: "待審核",
  },
  {
    id: 2,
    logoImgURL: "https://i.imgur.com/4YQqX2m.png",
    coverImgURL: "https://i.imgur.com/4YQqX2m.png",
    brandName: "Brand 2",
    brandDesc: "Brand 2 description",
    brandManager: "Manager 2",
    brandManagerPhone: "097-123-4567",
    brandManagerEmail: "manager@gmail.com",
    brandManagerLine: "@manager",
    brandTax: "123-456-789",
    brandExpireDate: "2020-12-31",
    status: "正常",
    review: "封鎖",
  },
  {
    id: 3,
    logoImgURL: "https://i.imgur.com/4YQqX2m.png",
    coverImgURL: "https://i.imgur.com/4YQqX2m.png",
    brandName: "Brand 3",
    brandDesc: "Brand 3 description",
    brandManager: "Manager 3",
    brandManagerPhone: "097-123-4567",
    brandManagerEmail: "manager@gmail.com",
    brandManagerLine: "@manager",
    brandTax: "123-456-789",
    brandExpireDate: "2020-12-31",
    status: "正常",
    review: "通過",
  },
  {
    id: 4,
    logoImgURL: "https://i.imgur.com/4YQqX2m.png",
    coverImgURL: "https://i.imgur.com/4YQqX2m.png",
    brandName: "Brand 4",
    brandDesc: "Brand 4 description",
    brandManager: "Manager 4",
    brandManagerPhone: "097-123-4567",
    brandManagerEmail: "manager@gmail.com",
    brandManagerLine: "@manager",
    brandTax: "123-456-789",
    brandExpireDate: "2020-12-31",
    status: "正常",
    review: "通過",
  },
  {
    id: 5,
    logoImgURL: "https://i.imgur.com/4YQqX2m.png",
    coverImgURL: "https://i.imgur.com/4YQqX2m.png",
    brandName: "Brand 5",
    brandDesc: "Brand 5 description",
    brandManager: "Manager 5",
    brandManagerPhone: "097-123-4567",
    brandManagerEmail: "manager@gmail.com",
    brandManagerLine: "@manager",
    brandTax: "123-456-789",
    brandExpireDate: "2020-12-31",
    status: "正常",
    review: "待審核",
  }
];

export const citiesData = [
  {
    id: 0,
    name: "基隆市",
  },
  {
    id: 1,
    name: "台北市",
  },
  {
    id: 2,
    name: "新北市",
  },
  {
    id: 3,
    name: "桃園市",
  },
  {
    id: 4,
    name: "新竹市",
  },
  {
    id: 5,
    name: "新竹縣",
  },
  {
    id: 6,
    name: "苗栗縣",
  },
  {
    id: 7,
    name: "台中市",
  },
  {
    id: 8,
    name: "彰化縣",
  },
  {
    id: 9,
    name: "南投縣",
  },
  {
    id: 10,
    name: "雲林縣",
  },
  {
    id: 11,
    name: "嘉義市",
  },
  {
    id: 12,
    name: "嘉義縣",
  },
  {
    id: 13,
    name: "台南市",
  },
  {
    id: 14,
    name: "高雄市",
  },
  {
    id: 15,
    name: "屏東縣",
  },
  {
    id: 16,
    name: "宜蘭縣",
  },
  {
    id: 17,
    name: "花蓮縣",
  },
  {
    id: 18,
    name: "台東縣",
  },
  {
    id: 19,
    name: "澎湖縣",
  },
  {
    id: 20,
    name: "金門縣",
  },
  {
    id: 21,
    name: "連江縣",
  }
];

export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "plane",
        y: 101,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 216,
      },
      {
        x: "subway",
        y: 35,
      },
      {
        x: "bus",
        y: 236,
      },
      {
        x: "car",
        y: 88,
      },
      {
        x: "moto",
        y: 232,
      },
      {
        x: "bicycle",
        y: 281,
      },
      {
        x: "horse",
        y: 1,
      },
      {
        x: "skateboard",
        y: 35,
      },
      {
        x: "others",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "plane",
        y: 212,
      },
      {
        x: "helicopter",
        y: 190,
      },
      {
        x: "boat",
        y: 270,
      },
      {
        x: "train",
        y: 9,
      },
      {
        x: "subway",
        y: 75,
      },
      {
        x: "bus",
        y: 175,
      },
      {
        x: "car",
        y: 33,
      },
      {
        x: "moto",
        y: 189,
      },
      {
        x: "bicycle",
        y: 97,
      },
      {
        x: "horse",
        y: 87,
      },
      {
        x: "skateboard",
        y: 299,
      },
      {
        x: "others",
        y: 251,
      },
    ],
  },
  {
    id: "us",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];