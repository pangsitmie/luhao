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
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 1,
                name: "雲林科技大學育成中心",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 2,
                name: "台中市自動販賣商同業公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 3,
                name: "雲林漁業青年聯誼會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 4,
                name: "中華農業創新學會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
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
                name: "三易食品有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 1,
                name: "安心肉乾食品有限公司(天印)",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 2,
                name: "老楊食品",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 3,
                name: "中華民國農會台農鮮乳廠",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 4,
                name: "利傑國際",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 5,
                name: "吉時饌",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 6,
                name: "良品吉食商行",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 7,
                name: "永長裕有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 8,
                name: "酋長鳳梨",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 9,
                name: "阿甘叔叔",
                details: {
                    phone: "04-2331-8888",
                    address: ""
                }
            },
            {
                id: 10,
                name: "哈客愛",
                details: {
                    phone: "04-2331-8888",
                    address: ""
                }
            },
            {
                id: 11,
                name: "集元果",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 12,
                name: "好蝦冏男社",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 13,
                name: "喬拉燕麥",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 14,
                name: "樂米工坊",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 15,
                name: "櫻桃果咖啡",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 16,
                name: "海龍王食品有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 17,
                name: "錦倫公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 18,
                name: "藍斯特企業有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 19,
                name: "鑫賜有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: ""
                }
            },
            {
                id: 20,
                name: "永恆世成有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: ""
                }
            },
            {
                id: 21,
                name: "逢國食品股份有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 22,
                name: "長城料理實業有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 23,
                name: "弘志食品有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 24,
                name: "李記烏漁子",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 25,
                name: "台中多媒體股份有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
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
                name: "經濟部加工出口處臺中分處",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
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
                name: "台中市自動販賣商同業公會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
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
                name: "台中市自動販賣商同業公會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 1,
                name: "中華民國台灣商用電子遊機產業協會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 2,
                name: "雲林科技大學育成中心",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 3,
                name: "大買家股份有限公司",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 4,
                name: "台中自動販賣機職業工會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 5,
                name: "彰化縣自動販賣商業同業公會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 6,
                name: "新竹市自動販賣商業同業公會",
                details: {
                    phone: "04-2331-8888",
                    address: "台中市北區中清路一段 1 號",
                    website: "https://www.3y.com.tw/",
                }
            },
            {
                id: 7,
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


