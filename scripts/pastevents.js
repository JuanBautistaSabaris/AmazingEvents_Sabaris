const { createApp } = Vue
const app = createApp({
    data(){
        return {
            cardDetails:[],
            cardsPastEvents:[],
            pCards:[],
            cardDetailsBoolean: false,
            cardsBoolean: true,
            categories: [],
            categoriesSelected:[],
            inputText:'',
        }
    },
    created(){
        this.getData()
    },
    mounted(){
    },
    methods:{
        getData(){
            fetch("../json/amazing.json")
                .then(response => response.json())
                .then(data => {
                    this.cardsPastEvents = data.events.filter((e)=>e.date < data.currentDate)
                    this.pCards= this.cardsPastEvents 
                    this.getCategories(this.cardsPastEvents)
                })
                .catch(error => alert("Error. Couldn't load data. ", error))
        },

        getCategories(array){
            array.forEach(e =>{
                if(!this.categories.includes(e.category)){
                    this.categories.push(e.category)
                }
            })
        },

        goDetails(id){
            this.cardDetails = this.pCards.find(card => card._id == id),
            this.cardsBoolean = false,
            this.cardDetailsBoolean = true            
        },

        goHome(){
            this.cardDetailsBoolean = false,
            this.cardsBoolean = true
        },
    },
    computed:{
        filtersUnited(){
            let firstFilter = this.pCards.filter(card => card.name.toLowerCase().includes(this.inputText.toLowerCase()))
            if(!this.categoriesSelected.length){
                this.cardsPastEvents = firstFilter
            } else {
                this.cardsPastEvents = firstFilter.filter(card => this.categoriesSelected.includes(card.category))
            }
        },
    }
}).mount('#appPast')