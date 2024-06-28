const App=Vue.createApp({
    data(){
        return{
            classList:["Class","Class1","Class2","Class3"],
            typeList:["活動","景點","住宿","美食"],
            area:"",
            toEng:{
                活動:"Activity",
                景點:"ScenicSpot",
                旅宿:"Hotel",
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
            toCh:{
                Activity:"活動",
                ScenicSpot:"景點",
                Hotel:"住宿",
                Restaurant:"美食",
                Taipei:"台北市",
                NewTaipei:"新北市",
                Taoyuan:"桃園市",
                Taichung:"台中市",
                Tainan:"台南市",
                Kaohsiung:"高雄市",
                Keelung:"基隆市",
                Hsinchu:"新竹市",
                HsinchuCounty:"新竹縣",
                MiaoliCounty:"苗壢縣",
                ChanghuaCounty:"彰化縣",
                NantouCounty:"南投縣",
                YunlinCounty:"雲林縣",
                ChiayiCounty:"嘉義縣",
                Chiayi:"嘉義市",
                PingtungCounty:"屏東縣",
                YilanCounty:"宜蘭縣",
                HualienCounty:"花蓮縣",
                TaitungCounty:"台東縣",
                KinmenCounty:"金門縣",
                PenghuCounty:"澎湖縣",
                LienchiangCounty:"連江縣",
            },
            // spotNameAttr:"",

        }
    },
    methods:{
        addClass(element, classToAdd){
            let currentClassValue = element.className;
            if (currentClassValue.indexOf(classToAdd) == -1){
                if((currentClassValue == null) || (currentClassValue === "")){
                    element.className = classToAdd;
                } 
                else 
                {
                    element.className += " " + classToAdd;
        }}},
        removeClass(element, classToRemove) {
            let currentClassValue = element.className;
            if(currentClassValue == classToRemove){
                element.className = "";
            return;}
            let classValues = currentClassValue.split(" ");
            let filteredList = [];
            for (var i = 0 ; i < classValues.length ; i++){
                if(classToRemove != classValues[i]){
                    filteredList.push(classValues[i]);
                }}
            element.className = filteredList.join(" ");
        },
        //   setSpotNameAttr(type){
        //     this.spotNameAttr=type+"Name";
        //   },
        get_search(e){      
            console.log("e=",e);  //{地區: '新竹市', 類別: '景點', searchText: '一二三'}
            let url="./searchPG.html"
            let area=this.toEng[e.地區], type=this.toEng[e.類別], searchText=e.searchText ;
            url=url+"?area="+area+"&type="+type+"&searchText="+searchText;
            console.log("serachUrl=",url)
            window.open(url);
        },

    },
    created(){
            
    },
    mounted(){
    }
})
App.component('search_bar',{
    props:['search-data','eng-to-ch'],
    data(){return{
            search_bar:{
                selection:{
                    地區:{name:"地區",data:["台北市","新北市","桃園市","台中市","台南市","高雄市","基隆市","新竹市","新竹縣","苗壢縣","彰化縣","南投縣","雲林縣","嘉義縣","嘉義市","屏東縣","宜蘭縣","花蓮縣","台東縣","金門縣","澎湖縣","連江縣",]
                            ,value:"新竹市"},
                    類別:{name:"類別",data:["活動","景點","住宿","美食"],value:""},
                },
                searchText:"",
                area:"",
                type:"",
            },
    }},
   
    methods:{
        return_searchData:function(){
            let temp= Object.values(this.search_bar.selection);
            let OPut={};
            temp.forEach(item=>{
                console.log("item=");
                console.log(item);
                OPut[item.name]=item.value;
            });
            OPut.searchText=this.search_bar.searchText;
            this.$emit('emit_e',OPut);
        },

    },
    template:`
    <form class="d-flex sharebar col-9 mx-auto justify-content-center align-items-stretch ">
        <div class="select form-floating" v-for="(item, index) in search_bar.selection" >
            <select  class="form-select form-select-sm"  aria-label="Floating label select example" 
                :id="item.name"  v-model="item.value">
                    <option selected>Open this select menu</option>
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
            @click="return_searchData">搜尋
        </btn>
    </form>
    `,
    mounted(){
        if(this.searchData){
            // console.log("searchData=",this.searchData);
            this.search_bar.selection.地區.value=this.engToCh[this.searchData.area];
            this.search_bar.selection.類別.value=this.engToCh[this.searchData.type];
             this.search_bar.searchText=this.searchData.searchText;
        };
    },
});
// App.component('page_banner',{
    
//     props:['city'],
//     data(){return{
//         bannerSearch:"",
//         bannerUrl:"",
//     }},
//     methods:{
//         getBannerSearchUrl(){
//             appHome="https://tdx.transportdata.tw/api/basic/v2/Tourism/",
//             type="ScenicSpot",city=this.city,
//             selectPic="?%24Select=Picture&%24top=100"
            
//             dataType="&%24format=JSON";
//             bannerSearchUrl=appHome+type+"/"+city+selectPic+dataType;
            
//             this.bannerUrl=bannerSearchUrl; //測試用 需刪
//             return bannerSearchUrl;
//         },

//     },
//     template:
//     `
//     <div class="w-100 d-flex align-items-center">
//     <img :src="bannerUrl"   alt="" class="w-100">
//     </div>
//     `,
//     created(){
//         let bannerSearchUrl=this.getBannerSearchUrl();
//         axios.get(bannerSearchUrl).
//         then(response=>{
//             return response.data;
//         }).
//         then(dataList=>{
//             function tryPic(dataList){
//                 let length=dataList.length;
//                 let url=dataList[Math.floor(Math.random()*length)].Picture.PictureUrl1;
//                 console.log("Purl=",url);
//                 if(url && url!=""){
//                     return url;
//                 }else{return ""}
//             };
//             console.log(dataList[0].Picture.PictureUrl1);
//             let picUrl,i=0;
//             do{
//                 picUrl=tryPic(dataList);
//                 i++;
//                 // console.log("picUrl=",picUrl)
//             }while(picUrl=="" && i<9);
            
//             return picUrl;
            
//         }).
//         then(url=>{
//             this.bannerUrl=url;
//             console.log(this.bannerUrl);
//         })
//     },
// })

// App.component('search_server',{
//     //搜尋用
//     props:['searchPackage'],
//     data(){return{
//         type:searchPackage.data.type,
//         city:searchPackage.data.city,
//         topp:searchPackage.data.data,
//         select1:searchPackage.data.select1,
//         url:"",  
//     }},
//     method:{
//         getUrl(){
//             // https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?%24filter=HotelID%20eq%20'C4_315080000H_000818'&%24top=30&%24format=JSON
//             let temp1="https://ptx.transportdata.tw/MOTC/v2/Tourism/";
//             this.url+=temp1+=this.type;
//             let temp2="";
//             // ………
//         },
//         // axios.get
//     }
// });

App.component('shopwindow_list_index',{
    //產生搜索文字 && 渲染搜索成果
    props:["search_type","show_mod","show_data","type_key"],
    //$emit- searchPackage
    data(){return{
        response:[],
        request:{},
        cityList:["Taipei","NewTaipei","Taoyuan","Taichung","Tainan","Kaohsiung","Keelung","Hsinchu","HsinchuCounty","MiaoliCounty","ChanghuaCounty","NantouCounty","YunlinCounty","ChiayiCounty","Chiayi","PingtungCounty","YilanCounty","HualienCounty","TaitungCounty","KinmenCounty","PenghuCounty","LienchiangCounty"],
        searchPackage:{data:{},head:{}},
        //測試暫用↓↓↓↓↓↓
        showData0:[
            {"ActivityID":"C2_376470000A_000397","ActivityName":"轉知彰化縣彰化市公所公告「半線古城踩街國際嘉年華會－2024創意提燈踩街暨 服裝造型競賽」活動","StartTime":"2023-12-15T00:00:00+08:00","EndTime":"2024-01-15T00:00:00+08:00","Picture":{"PictureUrl1":"https://tourism.chcg.gov.tw/upload/12/2023122013352340341.jpg","PictureDescription1":"半線古城踩街國際嘉年華會～2024創意提燈踩街暨服裝造型競賽"},"City":"彰化縣","SrcUpdateTime":"2024-05-19T01:37:45+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"ActivityID":"C2_376470000A_000397","ActivityName":"轉知彰化縣彰化市公所公告「半線古城踩街國際嘉年華會－2024創意提燈踩街暨 服裝造型競賽」活動","StartTime":"2023-12-15T00:00:00+08:00","EndTime":"2024-01-15T00:00:00+08:00","Picture":{"PictureUrl1":"https://tourism.chcg.gov.tw/upload/12/2023122013352340341.jpg","PictureDescription1":"半線古城踩街國際嘉年華會～2024創意提燈踩街暨服裝造型競賽"},"City":"彰化縣","SrcUpdateTime":"2024-05-19T01:37:45+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"ActivityID":"C2_376470000A_000397","ActivityName":"轉知彰化縣彰化市公所公告「半線古城踩街國際嘉年華會－2024創意提燈踩街暨 服裝造型競賽」活動","StartTime":"2023-12-15T00:00:00+08:00","EndTime":"2024-01-15T00:00:00+08:00","Picture":{"PictureUrl1":"https://tourism.chcg.gov.tw/upload/12/2023122013352340341.jpg","PictureDescription1":"半線古城踩街國際嘉年華會～2024創意提燈踩街暨服裝造型競賽"},"City":"彰化縣","SrcUpdateTime":"2024-05-19T01:37:45+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"ActivityID":"C2_376470000A_000397","ActivityName":"轉知彰化縣彰化市公所公告「半線古城踩街國際嘉年華會－2024創意提燈踩街暨 服裝造型競賽」活動","StartTime":"2023-12-15T00:00:00+08:00","EndTime":"2024-01-15T00:00:00+08:00","Picture":{"PictureUrl1":"https://tourism.chcg.gov.tw/upload/12/2023122013352340341.jpg","PictureDescription1":"半線古城踩街國際嘉年華會～2024創意提燈踩街暨服裝造型競賽"},"City":"彰化縣","SrcUpdateTime":"2024-05-19T01:37:45+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},
            {"ScenicSpotID":"C1_387000000A_000001","ScenicSpotName":"Top City臺中大遠百","Picture":{"PictureUrl1":"https://travel.taichung.gov.tw/content/images/attractions/537/640x480_Filedata635173618561220703.jpg","PictureDescription1":"Top City臺中大遠百"},"Class1":"其他","City":"臺中市","SrcUpdateTime":"2024-05-19T01:34:21+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"ScenicSpotID":"C1_387000000A_000001","ScenicSpotName":"Top City臺中大遠百","Picture":{"PictureUrl1":"https://travel.taichung.gov.tw/content/images/attractions/537/640x480_Filedata635173618561220703.jpg","PictureDescription1":"Top City臺中大遠百"},"Class1":"其他","City":"臺中市","SrcUpdateTime":"2024-05-19T01:34:21+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"ScenicSpotID":"C1_387000000A_000001","ScenicSpotName":"Top City臺中大遠百","Picture":{"PictureUrl1":"https://travel.taichung.gov.tw/content/images/attractions/537/640x480_Filedata635173618561220703.jpg","PictureDescription1":"Top City臺中大遠百"},"Class1":"其他","City":"臺中市","SrcUpdateTime":"2024-05-19T01:34:21+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"ScenicSpotID":"C1_387000000A_000001","ScenicSpotName":"Top City臺中大遠百","Picture":{"PictureUrl1":"https://travel.taichung.gov.tw/content/images/attractions/537/640x480_Filedata635173618561220703.jpg","PictureDescription1":"Top City臺中大遠百"},"Class1":"其他","City":"臺中市","SrcUpdateTime":"2024-05-19T01:34:21+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"ScenicSpotID":"C1_387000000A_000001","ScenicSpotName":"Top City臺中大遠百","Picture":{"PictureUrl1":"https://travel.taichung.gov.tw/content/images/attractions/537/640x480_Filedata635173618561220703.jpg","PictureDescription1":"Top City臺中大遠百"},"Class1":"其他","City":"臺中市","SrcUpdateTime":"2024-05-19T01:34:21+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},
            {"HotelID":"C4_A15010000H_000328","HotelName":"南方太陽旅店-北館民宿","Picture":{"PictureUrl1":"https://taiwan.taiwanstay.net.tw/twpic/34189.jpg","PictureDescription1":"房間1","PictureUrl2":"https://taiwan.taiwanstay.net.tw/twpic/27197.jpg","PictureDescription2":"外觀","PictureUrl3":"https://taiwan.taiwanstay.net.tw/twpic/18120.jpg","PictureDescription3":"房間3"},"Class":"民宿","City":"屏東縣","SrcUpdateTime":"2024-05-19T01:41:44+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"HotelID":"C4_A15010000H_000328","HotelName":"南方太陽旅店-北館民宿","Picture":{"PictureUrl1":"https://taiwan.taiwanstay.net.tw/twpic/34189.jpg","PictureDescription1":"房間1","PictureUrl2":"https://taiwan.taiwanstay.net.tw/twpic/27197.jpg","PictureDescription2":"外觀","PictureUrl3":"https://taiwan.taiwanstay.net.tw/twpic/18120.jpg","PictureDescription3":"房間3"},"Class":"民宿","City":"屏東縣","SrcUpdateTime":"2024-05-19T01:41:44+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"HotelID":"C4_A15010000H_000328","HotelName":"南方太陽旅店-北館民宿","Picture":{"PictureUrl1":"https://taiwan.taiwanstay.net.tw/twpic/34189.jpg","PictureDescription1":"房間1","PictureUrl2":"https://taiwan.taiwanstay.net.tw/twpic/27197.jpg","PictureDescription2":"外觀","PictureUrl3":"https://taiwan.taiwanstay.net.tw/twpic/18120.jpg","PictureDescription3":"房間3"},"Class":"民宿","City":"屏東縣","SrcUpdateTime":"2024-05-19T01:41:44+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},{"HotelID":"C4_A15010000H_000328","HotelName":"南方太陽旅店-北館民宿","Picture":{"PictureUrl1":"https://taiwan.taiwanstay.net.tw/twpic/34189.jpg","PictureDescription1":"房間1","PictureUrl2":"https://taiwan.taiwanstay.net.tw/twpic/27197.jpg","PictureDescription2":"外觀","PictureUrl3":"https://taiwan.taiwanstay.net.tw/twpic/18120.jpg","PictureDescription3":"房間3"},"Class":"民宿","City":"屏東縣","SrcUpdateTime":"2024-05-19T01:41:44+08:00","UpdateTime":"2024-05-19T02:18:55+08:00"},
            {"RestaurantID":"C3_376490000A_000159","RestaurantName":"洪董魯味","Picture":{"PictureUrl1":"https://tour.yunlin.gov.tw/public/upload/old/20180713015635.png","PictureDescription1":"店外觀"},"City":"雲林縣","SrcUpdateTime":"2024-05-20T01:41:16+08:00","UpdateTime":"2024-05-20T02:48:55+08:00"},{"RestaurantID":"C3_376490000A_000159","RestaurantName":"洪董魯味","Picture":{"PictureUrl1":"https://tour.yunlin.gov.tw/public/upload/old/20180713015635.png","PictureDescription1":"店外觀"},"City":"雲林縣","SrcUpdateTime":"2024-05-20T01:41:16+08:00","UpdateTime":"2024-05-20T02:48:55+08:00"},{"RestaurantID":"C3_376490000A_000159","RestaurantName":"洪董魯味","Picture":{"PictureUrl1":"https://tour.yunlin.gov.tw/public/upload/old/20180713015635.png","PictureDescription1":"店外觀"},"City":"雲林縣","SrcUpdateTime":"2024-05-20T01:41:16+08:00","UpdateTime":"2024-05-20T02:48:55+08:00"},{"RestaurantID":"C3_376490000A_000159","RestaurantName":"洪董魯味","Picture":{"PictureUrl1":"https://tour.yunlin.gov.tw/public/upload/old/20180713015635.png","PictureDescription1":"店外觀"},"City":"雲林縣","SrcUpdateTime":"2024-05-20T01:41:16+08:00","UpdateTime":"2024-05-20T02:48:55+08:00"},
        ],
        showData:[],
        typeNameAttr:["ActActivityNameivity","HotelName","RestaurantName","ScenicSpotName"],
        //測試暫用↑↑↑↑↑↑
    }},
    methods:{
        creatSearchPackage(){
            let cityth=Math.floor(Math.random()*this.cityList.length);
            // console.log(this.cityList[cityth]);
            // console.log(this.search_type);
            this.searchPackage.data.city=this.cityList[cityth];
            this.searchPackage.head=this.search_type;
            this.searchPackage.data.type=this.search_type;
            let select1="";
            switch (this.search_type){
                case "Activity":
                    select1="select=ActivityID,ActivityName,Class1,Class2,City,Picture";
                    break;
                case "Hotel":
                    select1="select=HotelID,HotelName,Class,City,Picture";
                    break;
                case "Restaurant":
                    // select1=""
                    select1="select=RestaurantID,RestaurantName,City,Picture";
                    break;
                case "ScenicSpot":
                    // select1=""
                    select1="select=ScenicSpotID,ScenicSpotName,Class1,Class2,Class3,City,Picture";
                    break;
                default:
                    console.log("搜尋類型錯誤")
                    break;
            }
            this.searchPackage.data.select1=select1;
            this.searchPackage.data.topp=25;''
            let appHome="https://tdx.transportdata.tw/api/basic/v2/Tourism/";
            console.log(appHome);
// https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/Taoyuan?%24select=Picture&%24top=10&%24format=JSON
            let searchUrl=appHome + this.searchPackage.data.type + "/" + this.searchPackage.data.city + "?%24" + select1 + "&%24top=" + this.searchPackage.data.topp + "&%24format=JSON";
            console.log("searchUrl=",searchUrl);
            // return this.searchPackage;
 
            //測試時關閉↓↓↓↓   
            // axios.get("searchUrl").
            // then(response=>{
            //     // console.log("resp=",response.data);
            //     return response.data;
            // }).
            // then(data_25=>{
            //     //陣列 array.length pop() Math.random() Math.floor()
            //     let data_5=[];
            //     if (data_25.length>5){
            //         for(i=0;i<5;i++){
            //             let key=Math.floor(Math.random()*data_25.length);
            //             data_5.push(data_25[key]);
            //             data_25[key]=data_25.pop();
            //         };
            //     }else{data_5=data_25}
            //     return data_5
            // }).
            // then(data=>{
            //     this.showData=data  ;
            //     console.log(data)      
            // })
            //測試時關閉↑↑↑↑
        },
        
    },
    created(){
        this.creatSearchPackage()
        this.showData=this.showData0.filter(e=>{if(e[this.typeNameAttr["type_key"]]){1};});
    },
    mounted(){},
    template:`
        <ul>
        {showData}
        <template v-for="(i,k) of showData">
            <card :card_data=i :test_numb=k></card>
        </template>

    `,
    components:{
        'card':{
            props:['card_data','test_numb'],
            data(){return{
        
            }},
            template:`
                <li class="indexCard col-3" >
                    <a :href="card_data.url">
                        <img style="width:100%" :src="card_data.Picture.PictureUrl1" alt="景點圖片">
                    </a>
                    {{card_data}}
                    <div class="synopsis">
                        <h5 v-if="card_data[spotNameAttr]">{{card_data[spotNameAttr].substr(0,9)}}</h5>
                        <div class="cityTag">{{card_data.City}}</div>
                        <!-- <p v-if="card_data.DescriptionDetail">{{card_data.DescriptionDetail.substr(0,34)}}...</p> -->
                        <p v-if="card_data.Description">{{card_data.Description.substr(0,34)}}...</p>
                        <div class="classList">
                           <template v-if="classList" v-for="(cs,key) of classList">
                               <div class="classTag" v-if="card_data[cs]">{{card_data[cs]}}</div>
                           </template>
                        </div>
                    </div>
            `,

            

            // <a class="cardImg col-4" href="">
            //     <div class="square_img">
            //         <img class="w-100" :src="card_data.Picture.PictureUrl1">
            // </div></a>
            // <div class="col-8">
            //     <h6 sytle="white-space:nowrap"class="oh"> {{card_data.ScenicSpotName}}
            //                             {{card_data.HotelName}}
            //                             {{card_data.RestaurantName}}
            //                             {{card_data.ActivityName}}</h3>
            //     <div>
            //         <span class="area fw-bolder text-info"><i class="bi bi-geo-alt  m-2  d-inline-block"></i> {{card_data.City}}</span>
            //     </div>
            // </div>


            // <aside_AD_card class="d-flex my-1">
            //                 <a class="adImg col-4" :href="item2.chick_url"  target="_blank">
            //                     <div class="square_img">
            //                         <img styel="" :src=item2.Picture.PictureUrl1 alt="" >
            //                     </div>
            //                 </a>
            //                 <div class="col-8">
            //                     <h6 sytle="white-space:nowrap"class="oh"> {{item2.ScenicSpotName}}
            //                             {{item2.HotelName}}
            //                             {{item2.RestaurantName}}
            //                             {{item2.ActivityName}}</h3>
            //                     <div>
            //                         <span class="area fw-bolder text-info"><i class="bi bi-geo-alt  m-2  d-inline-block"></i> {{spot_data.City}}</span>
            //                     </div>
            //                     <span class="mx-2" v-if="spot_data.Class1 + spot_data.Class">{{item2.Class1}}{{item2.Class}}</span>
            //                     <span class="mx-2" v-if="spot_data.Class2">{{item2.Class2}}</span>
            //                     <span class="mx-2" v-if="spot_data.Class3">{{item2.Class3}}</span>
            //                 </div>
            //             </aside_AD_card>


            // <li class="searchResultCard col-3"
            //     v-for="(spot,key) of mainData">
            //         <a :href="spot.url">
            //             <img :src="spot.Picture.PictureUrl1" alt="景點圖片">
            //         </a>
            //         <div class="synopsis">
            //             <h5>{{spot[spotNameAttr].substr(0,9)}}</h5>
            //             <div class="cityTag">{{spot.City}}</div>
            //             <!-- <p v-if="spot.DescriptionDetail">{{spot.DescriptionDetail.substr(0,34)}}...</p> -->
            //             <p v-if="spot.Description">{{spot.Description.substr(0,34)}}...</p>
            //             <div class="classList">
            //                <template v-for="(cs,key) of classList">
            //                    <div class="classTag" v-if="spot[cs]">{{spot[cs]}}</div>
            //                </template>
            //             </div>
            //         </div>
            //     </li>

            mounted(){
                console.log(card_data)
            },

            
        }

     }
})


App.mount('#App');