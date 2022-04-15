const App=Vue.createApp({
    data(){
        return{
            spot_data:{"ScenicSpotID":"C1_315080500H_000068",
                "ScenicSpotName":"紫坪",
                "DescriptionDetail":"紫坪位在綠島最南方，緊鄰「綠島露營區」。從露營區旁的步道，可通往海岸邊的潟湖「紫坪」。「紫坪」是一處由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。外海儘管浪濤洶湧，內湖依然波平如鏡，宛若沉睡的湖水，清淺的躺在外珊瑚礁岩與內珊瑚貝砂灘間；水芫花灌叢身影倒映於平靜無波的水面上，潔白柔細的白砂鋪陳水底。熱帶海岸旖旎風情，盡在不言中。",
                "Description":"紫坪位在綠島最南方，從附近的步道，可通往海岸邊的潟湖。此處是由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。",
                "Phone":"886-8-9672026",
                "Address":"臺東縣951綠島鄉溫泉路256號","ZipCode":"951",
                "TravelInfo":"南下：於花蓮火車站前搭乘花蓮客運，往豐濱、靜浦，或是台東方向班車，在富岡漁港站下車後步行至富岡漁港，轉乘渡船前往綠島。北上：自台東火車站前搭乘台灣好行東部海岸線或鼎東客運海線班車，在富岡漁港站下車後步行至富岡漁港，轉乘渡船前往綠島。綠島：島上設有環島公車，搭乘公車至朝日溫泉下車，往前步行約5分鐘(查詢電話：089-672510)。。",
                "OpenTime":"全天候開放",
                "Picture":{"PictureUrl1":"https://www.eastcoast-nsa.gov.tw/image/426/640x480",
                "PictureDescription1":"這是綠島露營區的階梯"},
                "Position":{"PositionLon":121.49990844726562,"PositionLat":22.633939743041992,"GeoHash":"wsn2ub3s3"},
                "ParkingPosition":{},
                "TicketInfo":"免費，露營活動另計。",
                "Remarks":"1、紫坪上方的綠島露營區為生態保護區，禁止採集花木生物，並請維護環境整潔，讓這片美景能留與後代子孫。2、露營區目前已於2009年委由「東方之泉有限股份公司」經營，      聯絡電...",
                "SrcUpdateTime":"2022-03-31T01:14:47+08:00",
                "UpdateTime":"2022-03-31T02:34:30+08:00",
                "area":"台南市",
            },
            search_bar:{
                selection:{
                    地區:{name:"地區",data:["台北","新北","新竹"]},
                    類別:{name:"類別",data:["活動","景點","住宿"]},
                },
            }
        }
    },
    methods:{

    },
    created(){
        console.log("hi")
    }
});
App.component('search_bar',{
    props:['type'],
    methods:{
        c_search(e){
          console.log("search: "+e);
          this.$emit('emit_e',e);
        }
    }
})
App.mount('#App');