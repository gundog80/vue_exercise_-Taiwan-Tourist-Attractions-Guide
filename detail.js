const App=Vue.createApp({
    data(){
        return{
            detail_open:false,
            h1:'test',
            detail_type:"ScenicSpot",
            city:"taypei",
            picture_array:[],
            spot_list_menu1:{
                "ScenicSpot":{
                    'OpenTime':['開放時間','OpenTime'],
                    'TickerInfo':['票價資訊','TickerInfo'],
                    'Phone':['聯絡電話','Phone'],
                    'Address':['景點地址','Address'],
                    'WebsiteUrl':['官方網站','WebsiteUrl'],
                    },
                "Restaurant":{
                    'OpenTime':['營業時間','OpenTime'],
                    'Phone':['聯絡電話','Phone'],
                    'Address':['店家地址','Address'],
                    'WebsiteUrl':['官方網站','WebsiteUrl'],
                },
                "Hotel":{
                    'Phone':['聯絡電話','Phone'],
                    'Address':['住宿地址','Address'],
                    'WebsiteUrl':['官方網站','WebsiteUrl'],
                },
                "Activity":{
                    'TickerInfo':['票價資訊','TickerInfo'],
                    'Organizer':['主辦單位','Organizer'],
                    'Phone':['聯絡電話','Phone'],
                    'Address':['景點地址','Address'],
                    'WebsiteUrl':['官方網址','WebsiteUrl'],
                },
            },
            spot_list_menu2:{
                "ScenicSpot":{
                    "Remarks":"注意事項"
                    },
                "Restaurant":{
                    // (地圖缺交通)
                    // a:"無",
                },
                "Hotel":{
                    "Spec":"房型價格",
                    "ServiceInfo":"服務項目",
                    "Phone":"電話",
                },
                "Activity":{
                    "Remarks":"注意事項",
                },
            },
            ad_list_menu:{
                "ScenicSpot":["附近景點","相似景點"],
                "Restaurant":["附近美食","相似旅宿"],
                "Hotel":["附近景點","附近美食","相似旅宿"],
                "Activity":["同期活動,相似活動"],
            },
            toEng:{
                活動:"Activity",
                景點:"ScenicSpot",
                住宿:"Hotel",
                餐飲:"Restaurant",
                美食:"Restaurant",
                台北市:"Taipei",
                新北市:"NewTaipei",
                桃園市:"Taoyuan",
                台中市:"Taichung",
                台南市:"Tainan",
                高雄市:"Kaohsiung",
                基隆市:"Keelung",
                新竹市:"Hsinchu",
                新竹縣:"HsinchuCounty",
                苗壢縣:"MiaoliCounty",
                彰化縣:"ChanghuaCounty",
                南投縣:"NantouCounty",
                雲林縣:"YunlinCounty",
                嘉義縣:"ChiayiCounty",
                嘉義市:"Chiayi",
                屏東縣:"PingtungCounty",
                宜蘭縣:"YilanCounty",
                花蓮縣:"HualienCounty",
                台東縣:"TaitungCounty",
                金門縣:"KinmenCounty",
                澎湖縣:"PenghuCounty",
                連江縣:"LienchiangCounty",
            },
            spot_data:{"ScenicSpotID":"C1_315080500H_000068",
                "ScenicSpotName":"紫坪",
                "DescriptionDetail":"紫坪位在綠島最南方，緊鄰「綠島露營區」。從露營區旁的步道，可通往海岸邊的潟湖「紫坪」。「紫坪」是一處由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。外海儘管浪濤洶湧，內湖依然波平如鏡，宛若沉睡的湖水，清淺的躺在外珊瑚礁岩與內珊瑚貝砂灘間；水芫花灌叢身影倒映於平靜無波的水面上，潔白柔細的白砂鋪陳水底。熱帶海岸旖旎風情，盡在不言中。",
                "Description":"紫坪位在綠島最南方，從附近的步道，可通往海岸邊的潟湖。此處是由珊瑚礁構成的潮池，也是綠島著名的潟湖所在地，有全綠島最完整的潟湖地形以及珊瑚礁植群，更有茂盛的植物水芫花和珍貴的陸寄居蟹。",
                "Phone":"886-8-9672026",
                "Address":"臺東縣951綠島鄉溫泉路256號",
                "ZipCode":"951",
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
            aside_ad:[],
            aside_ad1:[{
                title:"ad title",
                data:{
                    'name':'ppp',
                    'class1':'aaa',
                    'Picture':{PictureUrl1:"https://taiwan.taiwanstay.net.tw/twpic/15545.jpg"},
                    'city':"新北市"
                },
            }],
            // trychange:['測試',0],
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
        data_to_array:function(data){
            let temp;
            do{
                temp=data;
                data=data.replace(',',';');
                console.log(data);
            }while(temp!=data);
            return data.split(';');
        },
        // ---------------------------
        // search相關
        get_url_searchBar(e){
            let toEng={
                活動:"Activity",景點:"ScenicSpot",住宿:"Hotel",美食:"Restaurant",

                台北市:"Taipei",新北市:"NewTaipei",桃園市:"Taoyuan",台中市:"Taichung",台南市:"Tainan",
                高雄市:"Kaohsiung",基隆市:"Keelung",新竹市:"Hsinchu",新竹縣:"HsinchuCounty",苗壢縣:"MiaoliCounty",
                彰化縣:"ChanghuaCounty",南投縣:"NantouCounty",雲林縣:"YunlinCounty",嘉義縣:"ChiayiCounty",嘉義市:"Chiayi",
                屏東縣:"PingtungCounty",宜蘭縣:"YilanCounty",花蓮縣:"HualienCounty",台東縣:"TaitungCounty",金門縣:"KinmenCounty",
                澎湖縣:"PenghuCounty",連江縣:"LienchiangCounty",
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
        //----------------------------
        // 網址處理閜關
        get_pageTarget_data(){
            let reAry=new Array,
                url = location.href,
                temp;
                url=url.split("#")[0];
            if(url.indexOf('?')!=-1){
                 let urlData = url.split('?')[1].split('&');
                for(i=0;i<=urlData.length-1;i++){
                    if(urlData[i].split('=')[0] == 'kind'){
                        reAry.push(urlData[i].split('=')[1]) ;
                        switch(reAry[0]){
                            case 'scenicspot':
                                reAry.push('ScenicSpotID');
                                this.detail_type='ScenicSpot';
                            break;
                            case 'restaurant':
                                reAry.push('RestaurantID');
                                this.detail_type='Restaurant';
                                break;
                            case 'hotel':
                                reAry.push('HotelID');
                                this.detail_type='Hotel';
                                break;
                            case 'activity':
                                reAry.push('ActivityID');
                                this.detail_type='Activity';
                                break;
                            default:
                                console.log('請洽維護人員')
                                break;
                        }
                    };
                    
                    if(urlData[i].split('=')[0] == 'id'){
                    temp = urlData[i].split('=')[1];
                    // this.ID_name[target_kind]+" eq '"+this.urlAry[i].split('=')[1]+"'";
                    };
                    //ScenicSpotID eq 'C1_315080500H_000068'
                };
                reAry.push(temp);
            };  //if(url.indexOf('?')!=-1)
            return reAry;
        },
        get_pageTarget_url(){
            let data=this.get_pageTarget_data();
            console.log(data);
            // let temp1="https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?%24top=2&%24format=JSON";
            let temp1="https://ptx.transportdata.tw/MOTC/v2/Tourism/";
            //Restaurant?%24top=2&%24format=JSON";
            let kind=data[0],
                idName=data[1],
                id=data[2],
            temp2="?%24format=JSON&%24";
            let temp3='filter='+idName+"%20eq%20'"+id+"'";
            url=temp1+kind+temp2+temp3;
            console.log(url);
            return url;
            // this.target_url=temp1+target_kind+temp2+targetID
        },
        near_search_url(positionData,kind=this.detail_type,filter,page=0,number=5,radius=10000){
            console.log("hi near_serch_url",page,number,positionData);
            let temp1="https://ptx.transportdata.tw/MOTC/v2/Tourism/";
            // let kind=this.detail_type;
            let spatialFilter='nearby(Position' + ',' + positionData.PositionLat + ',' + positionData.PositionLon + ',' + radius + ')';
            let topp=number;
            let skip=page*number;
            let filter2='$'+filter;
            // let select="$select=ActivityID,HotelID,ReataurantID,ScenicSpotID,ActivityName,HotelName,ReataurantName,ScenicSpotName,City,Class,Class1,Class2,Class3,Picture";
            let select="$select=City,Picture";
            let temp2='?'+ select + '&%24'+'spatialFilter=' + spatialFilter + '&%24' +filter2+  '&%24' + 'top=' + topp + '&%24' + 'skip='+ skip + "&%24format=JSON&%24";
            let url=temp1+kind+temp2;
            console.log('url='+url);
            return url;

        },
        // search_Target(){
            
        // },
        //--------------------------------
        // 詳細介紹相關
        getDivHeight(id) {
            let e = document.getElementById(id);
            console.log(e);
            return e.clientHeight;
        },
        showDetailButtom(){
            // console.log('DH=');
            let lineH = parseInt(window.getComputedStyle(document.documentElement)["fontSize"]);
            let DH = this.getDivHeight('detail');
            if(DH/lineH > 6){
                // console.log('33333')
                document.querySelector('#detail-buttom').style.display='block';
                // document.getElementById('detail').setAttribute('class','end-hide')
            };
            
            console.log('lineH='+lineH);
            // console.log(typeof(lineH));
            console.log('DH='+DH);
            console.log(DH/lineH);

        },
        openDetail(){
            let e =document.querySelector("#detail");
            this.detail_open=!this.detail_open;
            console.log(e);
            // e.setAttribute('data-open')=open;
            if(this.detail_open){
                console.log(e);
                e.setAttribute('class','')
            }else{
                console.log(e);
                e.setAttribute('class','max_hight-5 filter_parent')
            }
        },
        //---------------------------
        // spot_data處理相關
        spot_data_process(data){
            if(!data.City){
                this.city=this.spot_data.City=data.Address.substr(0,3);
            }else{
                this.city=data.City;
            };
            let typeName=['ScenicSpotName','HotelName','RestaurantName','ActivityName'];
            typeName.forEach((name)=>{
                if(!data[name]){
                    this.spot_data[name]="";
                };
            });
            return 0;
        },
        // map相關

        creat_map(m){

            console.log('map=');
            console.log(m);
            const map = L.map("Map", {
                center: [m.PositionLat, m.PositionLon],
                zoom: 14
              });
          // 載入圖資
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>         contributors'
          }).addTo(map);
          // 設定標籤
          L.marker([m.PositionLat, m.PositionLon])
          .addTo(map)
          .bindPopup(this.spot_data.ScenicSpotName+this.spot_data.HotelName+this.spot_data.RestaurantName+this.spot_data.ActivityName)
          .openPopup();
        },
        //AD相關
        setAD(){
            // function getADType() {
            //     console.log( this);
            //     return "aaaaa";
            // };
            let n=-1,menu=this.ad_list_menu[this.detail_type];
            menu.forEach(item=>{
                n++;
                console.log(item,n);
                let searchType=item.substr(0,2),ADType=item.substr(2,4);
                console.log(searchType);
                console.log(ADType);
                switch (searchType) {
                    case "附近":
                        // console.log(this.Position);
                        let n_near=n,kind_near=this.toEng[ADType];
                        let AdUrl_near=this.near_search_url(this.spot_data.Position,kind_near);
                        axios.get(AdUrl_near).
                        then(response=>{
                            // console.log(response);
                            // let temp=response.data;
                        //     // this.aside_ad.push( temp );
                            return response.data;
                        }).
                        then(response=>{
                            this.aside_ad[n_near]=response;
                        //     console.log(response);
                        });

                        // console.log(temp);
                        // console.log("111");
                        break;
                    case '相似':
                        console.log("222");
                        let n_like=n,kind_like=this.toEng[ADType],
                            page=1,number=5,filter='filter=';
                            if (this.spot_data.Class){
                                filter=filter + "Class eq '" + this.spot_data.Class + "'" +' or ';
                            };
                            if(this.spot_data.Class1){
                                filter=filter + 'Class1 eq ' + this.data.Class1 + ' or ' +
                                                'Class2 eq ' + this.data.Class1 + ' or ' + 
                                                'Class3 eq ' + this.data.Class1 + ' or ';
                            };
                            if(this.spot_data.Class2){
                                filter=filter + 'Class1 eq ' + this.data.Class2 + ' or ' +
                                                'Class2 eq ' + this.data.Class2 + ' or ' + 
                                                'Class3 eq ' + this.data.Class2 + ' or ';
                            };
                            if(this.spot_data.Class3){
                                filter=filter + 'Class1 eq ' + this.data.Class3 + ' or ' +
                                                'Class2 eq ' + this.data.Class3 + ' or ' + 
                                                'Class3 eq ' + this.data.Class3 + ' or ';
                            };

                        console.log(filter)
                        let AdUrl_like=this.near_search_url(this.spot_data.Position,kind_like,filter,page,number);
                        axios.get(AdUrl_like).
                        then(response=>{
                            return response.data;
                        }).

                        then(resp=>{
                            this.aside_ad[n_like]=resp;
                        });
                         break;
                    default: 
                        console.log("333")
                } 
            })
        },

    },
    computed:{

    },
    created(){
        // console.log("hi created");
        let url=this.get_pageTarget_url();
        axios.get(url).
        then(response=>{
            console.log(response)
            this.spot_data=this.jsonData = response.data[0];
            return this.jsonData;
        }).
        then(response=>{
           this.spot_data_process(response);

            return response.Position;
        }).
        then(response=>{
            // console.log(response);
            this.creat_map(response);
            return 0;
        }).
        then(response=>{
            this.picture_array=[];
            let n=2,temp= Object.entries(this.spot_data.Picture);
            temp.forEach((item,index) =>{
                // console.log('item=' + item);
                // console.log('item=' + item[0].substr(0,10));
                if(item[0].substr(0,10)=='PictureUrl'){
                    item.push(n);
                    this.picture_array.push(item);
                    n++;
                };
                // console.log(this.picture_array);
            } ) 
            // this.spot_data.Picture
            // console.log('圖片'+this.spot_data.Picture);
        }).
        then(response=>{
            setTimeout(this.showDetailButtom(),3000)
            
        }).
        then(response=>(
            this.setAD()
        ));


    },
    watch:{
        
        spot_data(){
  
        },
    },
    mounted(){
        let e = document.getElementById('detail');
            // this.detail_open=!this.detail_open;
        
    }
    
});
App.component('search_bar',{
    // props:['type'],
    data(){
        return{
            search_bar:{
                selection:{
                    地區:{name:"地區",data:["台北市","新北市","桃園市","台中市","台南市","高雄市","基隆市","新竹市","新竹縣","苗壢縣","彰化縣","南投縣","雲林縣","嘉義縣","嘉義市","屏東縣","宜蘭縣","花蓮縣","台東縣","金門縣","澎湖縣","連江縣",]
                            ,value:""},
                    類別:{name:"類別",data:["活動","景點","住宿","美食",],value:""},
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