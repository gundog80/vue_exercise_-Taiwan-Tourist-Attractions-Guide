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
            // search_bar:{
            //     selection:{
            //         地區:{name:"地區",data:["台北","新北","新竹"],value:""},
            //         類別:{name:"類別",data:["活動","景點","住宿"],value:""},
            //     },
            //     searchText: "",
            //     // data
            // },
        }
    },
    methods:{
        get_url_searchBar(e){
            let toEng={
                活動:"Activity",
                景點:"ScenicSpot",
                住宿:"Hotel",
                餐飲:"Restaurant",
                台北:"Taipei",
                新北:"NewTaipei",
                新竹:"Hsinchu",
            };
            let baseTarget="https://ptx.transportdata.tw/MOTC/v2/Tourism/",
                subTarget="?%24format=JSON",
                // subTarget="?%24top=30&%24format=JSON",
                serachType="",city="";
            Object.entries(e).forEach((item)=>{
                let [k,v]=item;
                switch(k){
                    case "類別" :
                        serachType=toEng[v];
                        break;
                    case "地區" :
                        city=toEng[v];
                        break;
                    case "searchText" :
                        if(v==''){
                            break;
                        };
                    default:
                        subTarget += "&%24" + k + "=" + v;
                };
            });
        let url=baseTarget + serachType + '/' + city +  subTarget;
        return url;
        },
        // get_search:function(e){
        get_search(e){
            if(!e.searchType){
                e.searchType='searchBar';
            };
            if(!e.page){
                e.page=1;
            };
            // console.log(e);
            console.log('父項：');
            console.log(e);
            let searchType=e.searchType,
            pageQ=10, url;
            e.top=pageQ;
            e.skip=pageQ*(e.page-1);
            delete e.searchType;          
            delete e.page; 
            console.log(e);
            switch(searchType){
                case 'searchBar':
                    url=this.get_url_searchBar(e);
                    break;
                default:
                    console.log('searchType error');
                    break;
            };
            // let baseTarget="https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Kaohsiung?%24top=30&%24format=JSON";
            // console.log('url=' + url);


        },


    },
    created(){
        console.log("hi created");
    },
    mounted(){
        const map = L.map("Map", {
            center: [this.spot_data.Position.PositionLat, this.spot_data.Position.PositionLon],
            zoom: 14
          });
          // 載入圖資
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>         contributors'
          }).addTo(map);
          // 彈出視窗
          L.marker([this.spot_data.Position.PositionLat, this.spot_data.Position.PositionLon])
            .addTo(map)
            .bindPopup(this.spot_data.ScenicSpotName)
            .openPopup();
        
    }
});
App.component('search_bar',{
    // props:['type'],
    data(){
        return{
            search_bar:{
                selection:{
                    地區:{name:"地區",data:["台北","新北","新竹"],value:""},
                    類別:{name:"類別",data:["活動","景點","住宿"],value:""},
                },
                searchText: "",
                // data
            },
        }
    },
    methods:{
        send_search:function(){
            let temp= Object.values(this.search_bar.selection);
            let OPut={};
            temp.forEach(item=>{
                console.log("item=");
                console.log(item);
                OPut[item.name]=item.value;
            });
            OPut.searchText=this.search_bar.searchText;
            // console.log('子項資訊：');
            // console.log(OPut);
            this.$emit('emit_e',OPut);
        },
        // c_get_search(e){
        //   console.log("事件: "+e);
        //   this.$emit('emit_e',Oput);
        // }
    },
    template:`
    <form class="d-flex sharebar col-auto mx-auto justify-content-center ">
        <div class="select form-floating" v-for="(item, index) in search_bar.selection">
            <select  class="form-select form-select-sm"  aria-label="Floating label select example" 
                :id="item.name" :value=item.data[0] v-model="item.value">
                    <option v-for="(item, index) in item.data" :value="item">{{item}}</option>
                </select>
            <label :for="item.name">{{item.name}}</label>
        </div>
        <div class="form-floating">
            <input class="form-control" placeholder="Leave a comment here" id="searchTextarea"
                v-model.trim="search_bar.searchText"
            > 
            <label for="searchTextarea">請輸入搜尋內容</label>
        </div>
        <btn type="button" class="btn btn-info rounded-none rounded-end d-flex align-items-center"
            @click="send_search">搜尋
        </btn>
    </form>
    `,
})
App.mount('#App');