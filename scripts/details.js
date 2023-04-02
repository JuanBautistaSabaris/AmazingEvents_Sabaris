const { createApp } = Vue
const app = createApp({
    data(){
        return {
            cardDetails:[],
        }
    },
    created(){
        this.getData()
    },
    mounted(){
    },
    methods:{
        getData(){
            fetch('../json/amazing.json')
                .then(response => response.json())
                .then(data => {
                    let queryString = location.search;
                    let param = new URLSearchParams(queryString);
                    let eventId = param.get('id');
                    this.cardDetails = data.events.find(card => card._id == eventId);
                })
                .catch(error => alert("Error. Couldn't load data.", error))
        },
    },
    computed:{
    }
}).mount('#appDetails')