const App=Vue.createApp({
    data(){
        return{
            searchD:{},
            searchStatistical:{
                total:0,
                maxPage:0,
                isEnd:false
            },
            mainData:[],
            classList:["Class","Class1","Class2","Class3"],
            typeList:["活動","景點","住宿","美食"],
            tags:new Set,
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
            spotNameAttr:"",
            classSelect:[],

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
        getUrlData(){
            let reObj={},
            url = location.href,
            temp;
            console.log("url=",url);
            // url=url.split("#")[0];      // ??
            if(url.indexOf('?')!=-1){       //可重整 用字首轉大寫處理法(已處理 待測試) 另外先拆為k-v並移位
                let urlData = url.split('?')[1].split('&'),
                attObj={};
                for(i=0;i<urlData.length;i++){
                    let attData=urlData[i].split('=');
                    console.log(attData);
                    attObj[attData[0]]=attData[1];
                };
                reObj=attObj;
            };  //if(url.indexOf('?')!=-1)
            return reObj;
        },
        getPageTargetUrl(pgt){
            if(!pgt.page || pgt.page==0){
                page=1;
                this.searchD.page=1;
            }else{page=pgt.page};
            //https://tdx.transportdata.tw/api/basic/v2/Tourism/{{type}}/{{city}}
            // 'https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/Taipei?%24filter=contains%28ScenicSpotName%2C%20%27%E6%B9%96%27%29&%24top=30&%24format=JSON'
            let 
            pageQuantity=15,
            // https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/Taichung?%24filter=contains%28ScenicSpotName%2C%20%27%27%29&%24top=16&%24skip=15&%24format=JSON 
            // https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/Taichung?%24filter=contains%28HotelName%2C%20%27%27%29&%24top=16&%24skip=0&%24format=JSON
            appHome="https://tdx.transportdata.tw/api/basic/v2/Tourism/",

            type=pgt.type,city=pgt.area,
            textFilter="?%24filter=contains%28"+type+"Name%2C%20%27"+pgt.searchText+"%27%29",
            pageFilter="&%24top="+(pageQuantity+1)+"&%24skip="+(page-1)*pageQuantity,
            dataType="&%24format=JSON";
            let pageTargetUrl=appHome+type+"/"+city+textFilter+pageFilter+dataType;
            console.log("type=",type)
            console.log("city=",city)
            console.log("pageTargetUrl=",pageTargetUrl);
            this.setSpotNameAttr(type);
            return pageTargetUrl
        },
          setSpotNameAttr(type){
            this.spotNameAttr=type+"Name";
          },
        get_search(e){      
            console.log("e=",e);  //{地區: '新竹市', 類別: '景點', searchText: '一二三'}
            let url="./searchPG.html"
            let area=this.toEng[e.地區], type=this.toEng[e.類別], searchText=e.searchText ;
            url=url+"?area="+area+"&type="+type+"&searchText="+searchText;
            console.log("serachUrl=",url)
            window.open(url);
        },
        setAction(groupSel,attr,value){
            let group=document.querySelector(groupSel);
            console.log("group=",group,attr,value)
            console.log("group.childNodes=",group.childNodes)
            group.childNodes.forEach(item=>{
                // if(item.dataset){console.log("111",item.dataset[attr])};
                if(item.dataset && item.dataset[attr]==value){
                    this.addClass(item,"action");
                }else{
                    if(item.className){
                        let classList=item.className;
                        classList=classList.split(" ");
                        if (classList.indexOf('action')){
                            this.removeClass(item,"action")
                        }

                    }
                    
                    // if(classList == 'action'){
                    //     item.className = "";
                    // console.log(item,"clsList=",classList)
                }
            },attr)
        },
        changeType(e){
            let newType=e.srcElement.dataset.type;
            this.searchD.type=newType;
            this.setAction("#typeTagGroup","type",this.searchD.type);
            this.searchD.page=1;
            this.searchStatistical.maxPage=0
            this.searchStatistical.total=0;
            this.searchStatistical.isEnd=false;
            this.mainSearch(this.searchD);
        },
        changePage(e){
            let newPage=e.srcElement.dataset.page;
            this.searchD.page=newPage;
            this.mainSearch(this.searchD);
            let oldAction=document.querySelector("#pageList").querySelector(".action-page");
            if(oldAction){this.removeClass(oldAction,"action-page")};
            setTimeout(()=>{
                let newAction=document.querySelector("#pageList").children[this.searchD.page]
                this.addClass(newAction,"action-page");
                // console.log("pagess=",pagess);
            },500);
            // let newAction=document.querySelector("#pageList").children[this.searchD.page]
            // this.addClass(newAction,"action");
        },
        mainSearch(data){
            let pageTargetUrl=this.getPageTargetUrl(data);
            console.log(pageTargetUrl);
            axios.get(pageTargetUrl).
            then(response=>{
                //頁面及搜尋數量統計
                let data=response.data,pageQuantity=16;
                let length=data.length;
                console.log(this.searchD.page);
                console.log(this.searchStatistical.maxPage);
                // console.log()
                console.log(this.searchD.page,this.searchStatistical.maxPage)
                if(length<pageQuantity){
                    this.searchStatistical.isEnd=true;
                // }else if(length=pageQuantity && this.searchD.page==this.searchStatistical.maxPage){
                }else if(length=pageQuantity){
                    data.shift();
                    length--;
                    // this.searchStatistical.total-=1;
                };
                if(this.searchD.page>this.searchStatistical.maxPage){
                    this.searchStatistical.total+=length;
                    this.searchStatistical.maxPage=this.searchD.page
                };
                console.log(length,pageQuantity);
                console.log("resp=",data);
                return data;
            }).
            then(response=>{
                //spotData資料修正 city classList
                function editData(spotList,searchD){
                    spotList.forEach(spot=>{
                        // console.log(spot)
                        {    //spot示意
                        //"ScenicSpotID": "C1_387000000A_000015",
                        //     "ScenicSpotName": "台灣氣球博物館",
                        //     "DescriptionDetail": "2006年大倫氣球參加經濟部觀光工廠產業提升計畫，經過一連串的規劃與改造，整理龐大的歷史資料與老機器，重塑企業識別系統並建立新品牌，還設計了一系列氣球相關的課程與活動，於2008年元月正式對外開放參觀。2009年應臺中市文化局的邀請，加入藝術之店行列，同年十月，並榮獲經濟部工業局第一屆優良觀光工廠的殊榮。2011年10月進一步獲得行政院研考會英語服務標章金質獎。2012年再度榮獲經濟部工業局第四屆優良觀光工廠的殊榮。可愛的波波兔是台灣氣球博物館及大倫氣球工業股份有限公司的吉祥物，常有人問道：為什麼大倫的吉祥物是兔子？在早期，每一家工廠都有屬於自己的動物：老虎、大象、天使等等。大倫氣球當時以「白兔牌」作為品牌的LOGO，一方面是兔子給人矯健的印象，另一方面兔子也給人活潑歡樂的形象，在企業識別系統重整之後，我們不但保留兔子的傳統，同時更將牠化身為品牌的代言人－波波兔，希望可愛的波波兔可以陪伴大小朋友一起度過氣球的歡樂時光。【活動內容】專業導覽 &ndash; 專業的導覽人員帶您了解豐富的氣球知識與應用。手工氣球 &ndash; 提供工具、原料，親自體驗氣球的製作流程。造型氣球 &ndash;  每個季節推出不同的限定造型氣球 DIY 行程氣球遊戲 &ndash; 以氣球為主的趣味競賽，利用各式氣球設計不同類型遊戲；水球遊戲為夏季限定。",
                        //     "Description": "台灣氣球博物館位於台中市神岡區，於 2008 年成立，以氣球為主題的觀光工廠，保存了老舊廠房的風貌與老機器，述說著臺灣氣球產業的發展故事。除了可認識豐富的氣球產業知識之外，還可以親自體驗手工氣球DIY、造型氣球，運用氣球的創意，一起為大朋友小朋友創造歡樂的回憶！",
                        //     "Phone": "886-4-25284525",
                        //     "Address": "臺中市429神岡區大豐路5段505號",
                        //     "ZipCode": "429",
                        //     "TravelInfo": "【搭乘台鐵、巴士或豐原客運】豐原火車站下車＞至對面的豐原客運搭乘往神岡方向的路線＞約10分鐘車程至「岸裡國小站」下車＞往回走約200公尺至對面的瑞豐加油站＞大豐路5段進來100公尺 ＞台灣氣球博物館",
                        //     "OpenTime": "週一至週五 9:00-17:00 (午休時間： 12:30-13:00)    週六、週日休館",
                        //     "Picture": {
                        //         "PictureUrl1": "https://travel.taichung.gov.tw/content/images/attractions/50411/640x480_image637714630205363215.png",
                        //         "PictureDescription1": "宅度假"
                        //     },
                        //     "Position": {
                        //         "PositionLon": 120.69908142089844,
                        //         "PositionLat": 24.247329711914062,
                        //         "GeoHash": "wsmcfw46u"
                        //     },
                        //     "Class1": "觀光工廠類",
                        //     "ParkingPosition": {},
                        //     "City": "臺中市",
                        //     "SrcUpdateTime": "2023-06-16T01:45:35+08:00",
                        //     "UpdateTime": "2023-06-16T03:03:59+08:00",
                        //     "url": "./detail.html?kind=ScenicSpot&id=C1_387000000A_000015" // 
                        }

                        if(!spot.City){spot.City=spot.Address.substr(0,3);
                        };
                        spot.url="./detail.html?kind="+searchD.type+"&id="+spot[searchD.type+'ID'];
                        let classTags=["Class","Class1","Class2","Class3"],
                            classList=[];
                        classTags.forEach(tag=>{
                            if(spot[tag]){
                                classList.push(spot[tag]);
                            }
                        });
                        spot.classList=classList;

                    });
                    return spotList;
                };
                this.mainData=editData(response,this.searchD);
                return this.mainData;
                
            }).
            then(response=>{
                //取得類別tags
                // console.log(response);
                response.forEach(spot=>{
                    console.log(spot['classList']);
                    let tagName=["Class","Class1","Class2","Class3"];
                    tagName.forEach(Name=>{
                        if(spot[Name]){
                            this.tags.add(spot[Name])
                        }
                    })

                })
                // console.log(this.tags)
                
            })
        },
        classTagOnClick(){
  
        },
        isMixed(Arr1,Arr2){
            console.log(Arr1)
            if(Arr2.length=0){
                console.log("AAA");
                return 1;
            };
            if(Arr1.length=0){
                console.log("BBB");
                return 0;
            };
            Arr1.forEach((cs,Arr2)=>{
                console.log("CCC");
                return Arr2.indexOf(cs);
            })
        }

    },
    created(){
        this.searchD=this.getUrlData();
        //  ↓↓↓測試用暫關  
        // this.mainSearch(this.searchD);
        // ↑↑↑測試用暫關
            
    },
    mounted(){
        // this.strAction("#typeTagGroup","type",this.searchD.type);
        this.setAction("#typeTagGroup","type",this.searchD.type);
        this.initClassTag()
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
App.component('banner',{
    props:['mainCity','eng-to-ch'],
    data(){
        return{
            area:"",
            bannerUrl:"1",
        }
    },
    methods:{
        sayhi(){
            console.log("hi, isbanner")
        },
        getBannerSearchUrl(mainCity){
            //https://tdx.transportdata.tw/api/basic/v2/Tourism/{{type}}/{{city}}
            // 'https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/Taipei?%24filter=contains%28ScenicSpotName%2C%20%27%E6%B9%96%27%29&%24top=30&%24format=JSON'
            // https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24select=Picture&%24top=30&%24format=JSON
            
            let 
            appHome="https://tdx.transportdata.tw/api/basic/v2/Tourism/",
            type="ScenicSpot",city=mainCity,
            select="%24select=Picture"
            // randNumber=Math.floor(500*Math.random()),
            top10="&%24top="+10,
            // textFilter="?%24filter=contains%28"+type+"Name%2C%20%27"+pgt.searchText+"%27%29",
            // pageFilter="&%24top="+pageQuantity+"&%24slip="+page*pageQuantity,
            dataType="&%24format=JSON";
            let banSearchUrl=appHome+type+"/"+city+"?"+select+top10+dataType;
            // console.log("type=",type)
            // console.log("city=",city)
            console.log("banUrlSearch=",banSearchUrl);
            // this.setSpotNameAttr(type);
            return banSearchUrl;
        },
    },
    created(){
        this.sayhi();
        this.area=this.engToCh[this.mainCity];
        let banSearchUrl=this.getBannerSearchUrl(this.mainCity);
        axios.get(banSearchUrl).
        then(response=>{
            return response.data
        }).
        then(data=>{
            function lottery(arr,max,turn){
                rand=Math.floor(max*Math.random());
                // console.log("aaa",data[rand])
                let bannerUrl;
                if(data[rand].Picture.PictureUrl1 && data[rand].Picture.PictureUrl1!=""){
                    // return (data[rand].Picture.PictureUrl1);
                    bannerUrl=data[rand].Picture.PictureUrl1;
                    // console.log("bbb",data[rand])
                    // return bannerUrl;
                }else if(turn<3){
                    turn++;
                    console.log("banner搜尋"+turn);
                    // return lottery(arr,max,turn)
                    console.log("ccc",turn)
                    bannerUrl=lottery(arr,max,turn);
                }else if(turn>=3){
                    bannerUrl="https://khh.travel/image/1453/640x480";
                };
                return bannerUrl;
            };
            let max=data.length,turn=0;
            console.log("data=",data);
            this.bannerUrl=lottery(data,max,0);
            console.log(this.bannerUrl)

        })
    },
    mounted(){
        
    },
    // template:"<p class='bbb'>banner,aaabbb</p>",
    template:"#banner",
})

App.mount('#App');