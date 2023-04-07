export const taichung = [
    {
        id: 0,
        title: 'Fengjia Night Market',
        description: 'Fengjia Night Market is a night market in Taichung, Taiwan',
        location: '台灣, 臺中市, 南區',
        totalStores: 100,
        transaction: 10000,
        city: '臺中市',
        district: '逢甲區',
        coordinates: {
            lat: 24.1761475,
            lng: 120.6447767
        },
        stores: [
            {
                name: '多多龍遊樂園',
                address: '407台中市西屯區福星路368號',
                coordinates: {
                    lat: 24.1797432,
                    lng: 120.642787
                },
                facebookLink: 'https://www.facebook.com/people/%E5%A4%9A%E5%A4%9A%E9%BE%8D%E9%81%8A%E6%A8%82%E5%9C%92/100084066647630/',
                googleLink: 'https://goo.gl/maps/1EqwWpqXb1gwWDYy6',
            },
            {
                name: '多多龍遊樂園',
                address: '407台中市西屯區福星路368號',
                coordinates: {
                    lat: 24.191373,
                    lng: 120.6587974
                },
                facebookLink: 'https://www.facebook.com/dcoolcatchme/',
                googleLink: 'https://goo.gl/maps/XRCJuWRfjYKsUoi27',
            },

        ]
    },
    {
        id: 1,
        title: 'Yizhong Night Market',
        description: 'Yizhong Night Market is a night market in Taichung, Taiwan',
        location: '台灣, 臺中市, 南區',
        totalStores: 50,
        transaction: 500000,
        city: '臺中市',
        district: '一中區',
        coordinates: {
            lat: 24.1479583,
            lng: 120.6799787
        },
        stores: [
            {
                name: '多多龍遊樂園',
                address: '407台中市西屯區福星路368號',
                coordinates: {
                    lat: 24.1479401,
                    lng: 120.6856362
                },
                facebookLink: 'https://www.instagram.com/invites/contact/?i=o4w3f26i8h9v&utm_content=or8gmni',
                googleLink: 'https://goo.gl/maps/6CUetcCTaSGLhrRR6',
            },

        ]
    },
    {
        id: 2,
        title: 'Tunghai University',
        description: 'Tunghai University is a private university in Taichung, Taiwan',
        location: '台灣, 臺中市, 南區',
        totalStores: 50,
        transaction: 500000,
        city: '臺中市',
        district: '一中區',
        coordinates: {
            lat: 24.1824689,
            lng: 120.6003587
        },
        stores: [
            {
                name: '熊布丁親子樂園',
                address: '436台中市清水區中華路458號',
                coordinates: {
                    lat: 24.2745686,
                    lng: 120.5706354
                },
                facebookLink: null,
                googleLink: 'https://goo.gl/maps/AFuMtmwoT8coCi469',
            },

        ]
    },
    {
        id: 3,
        title: 'Fengyuan Miaodong Night Market',
        description: 'Fengyuan Miaodong Night Market is a night market in Taichung, Taiwan',
        location: '台灣, 臺中市, 南區',
        totalStores: 50,
        transaction: 500000,
        city: '臺中市',
        district: '一中區',
        coordinates: {
            lat: 24.2527868,
            lng: 120.7146718
        }
    },
]

export const changhua = [
    {
        id: 0,
        title: 'Changhua County',
        description: 'Changhua County is a county in Taiwan',
        location: '台灣, 彰化縣, 彰化市',
        totalStores: 50,
        transaction: 60000,
        city: '彰化縣',
        district: '彰化市',
        coordinates: {
            lat: 24.0209545,
            lng: 120.4793477
        }
    },
]

export const yunlin = [
    {
        id: 0,
        title: 'yunlin County',
        description: 'yunlin County is a county in Taiwan',
        location: '台灣, 雲林縣, 斗六市',
        totalStores: 50,
        transaction: 60000,
        city: '雲林縣',
        district: '斗六市',
        coordinates: {
            lat: 23.7047729,
            lng: 120.4359504
        },
        stores: [
            {
                name: '拽貓親子遊樂園',
                address: '640雲林縣斗六市明德路5號',
                coordinates: {
                    lat: 23.7047729,
                    lng: 120.4359504
                },
                facebookLink: 'https://www.facebook.com/people/%E6%8B%BD%E8%B2%93/100083529812395/',
                googleLink: 'https://goo.gl/maps/dMBmkNaFvcBn19on7',
            },
        ]

    },
]





export const ExploreTaichungData = [
    {
        topic: "travel",
        data: [
            {
                id: 0,
                title: "台中公園",
                description: "位於台中火車站附近，是台中市歷史最悠久的公園。公園內的湖心亭為重要象徵且可以在湖中央划船，適合親子一同前往休閒運動。",
                image: require("../assets/taichung_park.png"),
                mapImg: require("../assets/taichung_park_map.png"),
                googleMapLink: "https://goo.gl/maps/KbEGEb8dvo5ah9Af7",
                redirect: "taichung-park",
            },
            {
                id: 1,
                title: "台中國家歌劇院",
                description: "位於台中市西屯區，有戶外噴水池觀看水舞，也有餐飲空間與空中花園。獨創的建築工法成為台中知名地標，可以觀賞戲劇表演也能購買文創小物。",
                image: require("../assets/taichung_theater.png"),
                mapImg: require("../assets/taichung_theater_map.png"),
                googleMapLink: "https://goo.gl/maps/phnWVRMEqb6do1wMA",
                redirect: "taichung-theater",
            },
            {
                id: 2,
                title: "高美濕地",
                description: "豐富的濕地生態是賞鳥、看夕陽的好地方。一旁的高美自行車道讓遊客可以在散步之餘欣賞沿途美景，闔家探索生態樂趣。",
                image: require("../assets/gaomei.png"),
                mapImg: require("../assets/gaomei_map.png"),
                googleMapLink: "https://goo.gl/maps/FieDppVS6eKdDmKV6",
                redirect: "gaomei",
            },
        ],
    },
    {
        topic: "entertainment",
        data: [
            {
                id: 0,
                title: "多多龍",
                description: "娃娃機店家，有多種娃娃可以選擇，也有娃娃機可以玩，適合親子一同前往。",
                image: require("../assets/duoduolong2.jpg"),
                mapImg: require("../assets/duoduolong_map.png"),
                googleMapLink: "https://goo.gl/maps/TB4HBMSV7yhExRDB8",
                redirect: "duoduolong",
            },
            {
                id: 1,
                title: "多多龍",
                description: "娃娃機店家，有多種娃娃可以選擇，也有娃娃機可以玩，適合親子一同前往。",
                image: require("../assets/duoduolong2.jpg"),
                mapImg: require("../assets/duoduolong_map.png"),
                googleMapLink: "https://goo.gl/maps/TB4HBMSV7yhExRDB8",
                redirect: "duoduolong",
            },
            {
                id: 2,
                title: "多多龍",
                description: "娃娃機店家，有多種娃娃可以選擇，也有娃娃機可以玩，適合親子一同前往。",
                image: require("../assets/duoduolong2.jpg"),
                mapImg: require("../assets/duoduolong_map.png"),
                googleMapLink: "https://goo.gl/maps/TB4HBMSV7yhExRDB8",
                redirect: "duoduolong",
            },
        ],
    },
    {
        topic: "foods",
        data: [
            {
                id: 0,
                title: "逢甲夜市",
                description: "融合異國風味以及在地的美味小吃，吃飽喝足之餘還可以購物，販售商品豐富多樣，絕對滿載而歸!",
                image: require("../assets/fengjia.jpeg"),
                mapImg: require("../assets/fengjia_map.png"),
                googleMapLink: "https://goo.gl/maps/vPagkPsuZ3mEhc3h6",
                redirect: "fengjia",
            },
            {
                id: 1,
                title: "一中商圈",
                description: "販賣商品種類玲瑯滿目，吃喝玩樂一站滿足，所有最新流行趨勢都在這裡，兼具精品商店及夜市小攤，適合大眾化消費。",
                image: require("../assets/yizhong_detail_img.png"),
                mapImg: require("../assets/yizhong_map.png"),
                googleMapLink: "https://goo.gl/maps/ifedocGjazQGuSgv6",
                redirect: "fengjia",
            },
            {
                id: 2,
                title: "第二市場",
                description: "集結眾多知名在地美食，都是在地人念念不忘的好滋味，代代相傳的美食讓遊客都慕名而來。",
                image: require("../assets/second_market.webp"),
                mapImg: require("../assets/second_market_map.png"),
                googleMapLink: "https://goo.gl/maps/gzTVFyXQPb2u3s4v5",
                redirect: "fengjia",
            },
        ],
    },
];


// id 0 = 公協會參展單位
// id 1 = 公司行號代表參展單位
// id 2 = 指導單位
// id 3 = 主辦單位
// id 4 = 協辦單位
export const exhibition2023Companies = [
    // 公協會參展單位
    {
        id: 0,
        title: "公協會參展單位",
        data: [
            {
                id: 0,
                name: "台中市商業會",
                details: {
                    phone: "04-22521128",
                    address: "台中市西屯區府會園道169號1樓",
                    website: "https://www.tai-pan.com.tw/",
                }
            },
            {
                id: 1,
                name: "中華民國食品流通商業同業公會全國聯合會",
                details: {
                    phone: "02-2550-6515",
                    address: "台北市大同區南京西路288號4樓之10",
                    website: "https://www.fdat.com.tw/",
                }
            },
            {
                id: 2,
                name: "中華農業創新學會",
                details: {
                    phone: "04-23381796",
                    address: "台中市烏日區高鐵五路156號3-2",
                    website: "https://www.facebook.com/NewAgriculturelive/",
                }
            },
            {
                id: 3,
                name: "國立雲林科技大學產學與智財育成營運中心",
                details: {
                    phone: "05-5324580",
                    address: "雲林縣斗六市大學路3段123號",
                    website: "https://csmbi.yuntech.edu.tw/",
                }
            },
            {
                id: 4,
                name: "中華民國糕餅商業同業公會全國聯合會",
                details: {
                    phone: "04-2254-1660",
                    address: "臺中市西屯區朝富路18-2號",
                    website: "https://txgbakery.org/h/Index?key=217890331885",
                }
            },
            {
                id: 5,
                name: "美國蒙大拿州亞太辦事處",
                details: {
                    phone: "02-2725-1622",
                    address: "台北市信義區信義路5段5號7B-10室",
                    website: "https://directory.taiwannews.com.tw/zh-TW/detail/44/966",
                }
            },
            {
                id: 6,
                name: "中華民國農會",
                details: {
                    phone: "04-2485-3063",
                    address: "臺中市霧峰區吉峰西路68號",
                    website: "http://www.farmer.org.tw/",
                }
            },
            {
                id: 7,
                name: "雲林漁業青年聯誼會",
                details: {
                    phone: "0937294399",
                    address: "",
                    website: "https://www.fish1996.com.tw/2-7-5.html",
                }
            },
        ]
    },
    // 公司行號代表參展單位
    {
        id: 1,
        title: "公司行號代表參展單位",
        data: [
            {
                id: 0,
                name: "台灣知日商流",
                details: {
                    phone: "04-22521128",
                    address: "",
                    website: "",
                }
            },
            {
                id: 1,
                name: "優群貿易股份有限公司",
                details: {
                    phone: "02-2550-6515",
                    address: "台中市南屯區新富三街3號",
                    website: "https://www.foodpro.com.tw/",
                }
            },
            {
                id: 2,
                name: "好蝦冏男社有限公司",
                details: {
                    phone: "0937294399",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.fish1996.com.tw/2-7-5.html",
                }
            },
            {
                id: 3,
                name: "安心肉乾食品有限公司",
                details: {
                    phone: "03-339-7755",
                    address: "桃園市大園區國際路一段 7 號",
                    website: "https://www.ah-food.com/www.ah-food.com/index.html",
                }
            },
            {
                id: 4,
                name: "螭龍商行",
                details: {
                    phone: "02-2848-7070",
                    address: "",
                    website: "",
                }
            },
            {
                id: 5,
                name: "洲銓國際行銷有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 6,
                name: "錦倫實業股份有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "https://page.line.me/hde2749g",
                }
            },
            {
                id: 7,
                name: "海龍王食品有限公司",
                details: {
                    phone: "04-2235-2345",
                    address: "台中市北屯區國強街210號",
                    website: "",
                }
            },
            {
                id: 8,
                name: "吉時饌食品行",
                details: {
                    phone: "04-2656-5355",
                    address: "梧棲區福德里忠孝街226號1樓",
                    website: "https://www.facebook.com/gtf2020tw/?paipv=0&eav=AfYcj2myBx62XtU9AZNtRZqJVRgV2uQeqz71LY-0DPztfM2h8z-tcNmL8e9Vi0XCTAU",
                }
            },
            {
                id: 9,
                name: "藍斯特企業有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 10,
                name: "永長裕有限公司",
                details: {
                    phone: "",
                    address: ""
                }
            },
            {
                id: 11,
                name: "良品吉食商行",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 12,
                name: "利傑國際(報名兩間)",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 13,
                name: "老楊食品",
                details: {
                    phone: "0800522109",
                    address: "嘉義縣大林鎮大埔美園區五路3號",
                    website: "https://www.tkfood.com.tw/",
                }
            },
            {
                id: 14,
                name: "鑫賜有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "https://www.rongcrown.com/",
                }
            },
            {
                id: 15,
                name: "源珅科技有限公司",
                details: {
                    phone: "07-374-8080",
                    address: "高雄市仁武區鳳仁路369巷25號",
                    website: "",
                }
            },
            {
                id: 16,
                name: "永恆世成有限公司",
                details: {
                    phone: "04-2320-5557 ",
                    address: "北區雙十路二段107號1樓",
                    website: "https://www.eternal-bc.com/",
                }
            },
            {
                id: 17,
                name: "弘志食品有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "https://www.orange1688.com.tw/",
                }
            },
            {
                id: 18,
                name: "中華民國農會台農鮮乳廠",
                details: {
                    phone: "07-6333899 #28",
                    address: "高雄市阿蓮區復安51-28號",
                    website: "http://nfamilk.farmer.org.tw/",
                }
            },
            {
                id: 19,
                name: "台中多媒體股份有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "https://www.wpsfood.com/",
                }
            },
            {
                id: 20,
                name: "統一企業",
                details: {
                    phone: "04-2359-2035",
                    address: "台中市工業區13路1號",
                    website: "",
                }
            },
            {
                id: 21,
                name: "宜秦食品股份有限公司",
                details: {
                    phone: "0906-573355",
                    address: "臺中市北屯區橫坑巷47之11號",
                    website: "",
                }
            },
            {
                id: 22,
                name: "東森全球事業股份有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 23,
                name: "台灣優格食品股份有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 24,
                name: "瑞春醬油有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 25,
                name: "大鵬食品有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 26,
                name: "大買家",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 27,
                name: "安德魯紳有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 28,
                name: "好蝦冏男社有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 29,
                name: "鯊魚挑嘴",
                details: {
                    phone: "0961585928",
                    address: "台中市南區新和街11號",
                    website: "http://www.frozenfoods.com.tw/",
                }
            },
            {
                id: 30,
                name: "長城料理實業有限公司",
                details: {
                    phone: "04-7284017",
                    address: "彰化縣彰化市博愛街67號",
                    website: "https://www.smartcook.com.tw/",
                }
            },
            {
                id: 31,
                name: "三易食品有限公司",
                details: {
                    phone: "04-23712123",
                    address: "彰化縣花壇鄉中橋街68號",
                    website: "https://www.sanyiicecream.com/",
                }
            },
            {
                id: 32,
                name: "漢典有限公司",
                details: {
                    phone: "05-696-5999",
                    address: "雲林縣二崙鄉復興村隆興9之2號1",
                    website: "http://www.frozenfoods.com.tw/",
                }
            },
            {
                id: 33,
                name: "永康百貨玩具大批發",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 34,
                name: "奇奇玩具",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
            {
                id: 35,
                name: "小蠻牛有限公司",
                details: {
                    phone: "",
                    address: "",
                    website: "",
                }
            },
        ]
    },
    // 指導單位
    {
        id: 2,
        title: "指導單位",
        data: [
            {
                id: 0,
                name: "中華民國自動販賣商業同業公會全國聯合會",
                details: {
                    phone: "04-22658733",
                    address: "台中市南區工學路126巷31號",
                    website: "",
                }
            },
        ]
    },
    // 主辦單位
    {
        id: 3,
        title: "主辦單位",
        data: [
            {
                id: 0,
                name: "台中市自動販賣商業同業公會",
                details: {
                    phone: "04-2338-7696",
                    address: "台中市烏日區高鐵五路156號6樓",
                    website: "",
                }
            },
        ]
    },
    // 協辦單位 
    {
        id: 3,
        title: "協辦單位",
        data: [
            {
                id: 0,
                name: "台灣數位休閒娛樂產業協會",
                details: {
                    phone: "02-8982-5268",
                    address: "新北市板橋區南雅西路2段10号1樓",
                    website: "",
                }
            },
            {
                id: 1,
                name: "中華民國台灣商用電子遊戲機產業協會",
                details: {
                    phone: "02-29541608",
                    address: "新北市板橋區三民路一段80號三樓",
                    website: "",
                }
            },
            {
                id: 2,
                name: "雲林科技大學育成中心",
                details: {
                    phone: "05-551-0225",
                    address: "雲林縣斗六市科工二路26號3樓",
                    website: "",
                }
            },
            {
                id: 3,
                name: "大買家股份有限公司",
                details: {
                    phone: "0424810456",
                    address: "台中市大里區國光路二段710號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 4,
                name: "桃園市自動販賣商業同業公會",
                details: {
                    phone: "0931-063545",
                    address: "桃園市龜山區文德二路122號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 5,
                name: "台中市自動販賣職業工會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 6,
                name: "彰化縣自動販賣商業同業公會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 7,
                name: "新竹市自動販賣商業同業公會",
                details: {
                    phone: "03-5338338",
                    address: "新竹市中華路一段168-2號",
                    website: "",
                }
            },
            {
                id: 8,
                name: "宜蘭縣自動販賣商業同業公會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
        ]
    }
];


