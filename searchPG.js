const App=Vue.createApp({
    data(){
        return{
            searchD:{},//搜尋目標資料
            searchStatistical:{
                total:0,
                maxPage:0,
                isEnd:false
            },//搜尋結果小計
            mainData:[],
            classList:["Class","Class1","Class2","Class3"],
            typeList:["活動","景點","住宿","美食"],
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

        }
    },
    methods:{
        //通用函數↓↓↓
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
        //通用函數↑↑↑
        getUrlData(){
            let reObj={},
                url = location.href,
                temp;
            // console.log("url=",url);
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
            //'https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24top=30&%24format=JSON
            
            let 
            pageQuantity=15,
            appHome="https://tdx.transportdata.tw/api/basic/v2/Tourism/",
            type=pgt.type,city=pgt.area,
            textFilter="?%24filter=contains%28"+type+"Name%2C%20%27"+pgt.searchText+"%27%29",
            pageFilter="&%24top="+(pageQuantity+0)+"&%24skip="+(page-1)*pageQuantity,
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
            this.mainSearch(this.searchD);
        },
        mainSearch(data){
            let pageTargetUrl=this.getPageTargetUrl(data);
            console.log(pageTargetUrl);
            axios.get(pageTargetUrl).
            then(response=>{
                let data=response.data,pageQuantity=16;
                let length=data.length;
                // console.log()
                console.log(this.searchD.page,this.searchStatistical.maxPage)
                if(this.searchD.page>this.searchStatistical.maxPage){
                    this.searchStatistical.total+=length;
                    this.searchStatistical.maxPage=this.searchD.page
                };
                console.log(length,pageQuantity);
                if(length<pageQuantity){
                    this.searchStatistical.isEnd=true;
                }else if(length=pageQuantity){
                    data.shift();
                    this.searchStatistical.total-=1;
                };
                console.log("resp=",data);
                return data;
            }).
            then(response=>{
                // console.log("spotList=",spotList);
                // console.log("this.searchD=",this.searchD)
                function editData(spotList,searchD){
                    spotList.forEach(spot=>{
                        // console.log("spot=",spot);
                        if(!spot.City){spot.City=spot.Address.substr(0,3);
                        // console.log("spotCity=",spot.City)
                        };
                        // console.log("this.searchD=",searchD)
                        spot.url="./detail.html?kind="+searchD.type+"&id="+spot[searchD.type+'ID']
                    });
                    return spotList;
                };
                return editData(response,this.searchD);
                
            }).
            then(response=>{
                this.mainData=response;
                
            })
        }
    },
    created(){
        this.searchD=this.getUrlData();
        //  ↓↓↓測試用暫關  
        this.mainSearch(this.searchD);
        // ↑↑↑測試用暫關
            
    },
    mounted(){
        // this.strAction("#typeTagGroup","type",this.searchD.type);
        this.setAction("#typeTagGroup","type",this.searchD.type);
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
App.component('page_banner',{
    
    props:['city'],
    data(){return{
        bannerSearch:"",
        bannerUrl:"",
    }},
    methods:{
        // Math.floor((Math.random()*10)+1);
        getBannerSearchUrl(){
            appHome="https://tdx.transportdata.tw/api/basic/v2/Tourism/",
            type="ScenicSpot",city=this.city,
            selectPic="?%24Select=Picture&%24top=100"
            
            // randTarget="&%24skip="+Math.floor(Math.random()*100+1);
            // textFilter="?%24filter=contains%28"+type+"Name%2C%20%27"+pgt.searchText+"%27%29",
            // pageFilter="&%24top="+pageQuantity+"&%24skip="+page*pageQuantity,
            dataType="&%24format=JSON";
            bannerSearchUrl=appHome+type+"/"+city+selectPic+dataType;
            
            this.bannerUrl=bannerSearchUrl; //測試用 需刪
            // console.log("type=",type)
            // console.log("city=",city)
            // console.log("bannerUrl=",bannerUrl);
            // this.setSpotNameAttr(type);
            return bannerSearchUrl;
        },

    },
    template:
    // <div>here is banner</div>
    `
    <div class="w-100 d-flex align-items-center">
    <img :src="bannerUrl"   alt="" class="w-100">
    </div>
    `,
    created(){
        let bannerSearchUrl=this.getBannerSearchUrl();
        axios.get(bannerSearchUrl).
        then(response=>{
            // console.log("resp=",response.data);
            return response.data;
        }).
        then(dataList=>{
            function tryPic(dataList){
                let length=dataList.length;
                // console.log(dataList[Math.floor(Math.random()*length)]);
                let url=dataList[Math.floor(Math.random()*length)].Picture.PictureUrl1;
                console.log("Purl=",url);
                if(url && url!=""){
                    return url;
                }else{return ""}
            };
            console.log(dataList[0].Picture.PictureUrl1);
            let picUrl,i=0;
            do{
                picUrl=tryPic(dataList);
                i++;
                // console.log("picUrl=",picUrl)
            }while(picUrl=="" && i<9);
            
            return picUrl;
            
        }).
        then(url=>{
            this.bannerUrl=url;
            console.log(this.bannerUrl);
        })
    },
})
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
                console.log("aaa",data[rand])
                let bannerUrl;
                if(data[rand].Picture.PictureUrl1 && data[rand].Picture.PictureUrl1!=""){
                    // return (data[rand].Picture.PictureUrl1);
                    bannerUrl=data[rand].Picture.PictureUrl1;
                    console.log("bbb",data[rand])
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