const App={
    data(){
        return{
            

        }
    },
    methods:{

    },
    created(){}
};
App.component('search_bar',{
    props:['type'],
    methods:{
        c_search(e){
          console.log("search: "+e);
          this.$emit('emit_e',e);
        }
    }
})
Vue.createApp(App).mount('#app');