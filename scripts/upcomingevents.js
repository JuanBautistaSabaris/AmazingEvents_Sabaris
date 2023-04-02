const { createApp } = Vue
const app = createApp({
    data(){
        return {
            cardDetails:[],
            cardsUpcomingEvents:[],
            upCards:[],
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
                    this.cardsUpcomingEvents = data.events.filter((e)=>e.date > data.currentDate)
                    this.upCards= this.cardsUpcomingEvents 
                    this.getCategories(this.cardsUpcomingEvents)
                })
                .catch(error => alert("Error.Couldn't load data.", error))
        },
        
        getCategories(array){
            array.forEach(e =>{
                if(!this.categories.includes(e.category)){
                    this.categories.push(e.category)
                }
            })
        },

        goDetails(id){
            this.cardDetails = this.upCards.find(card => card._id == id),
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
            let firstFilter = this.upCards.filter(card => card.name.toLowerCase().includes(this.inputText.toLowerCase()))
            if(!this.categoriesSelected.length){
                this.cardsUpcomingEvents = firstFilter
            } else {
                this.cardsUpcomingEvents = firstFilter.filter(card => this.categoriesSelected.includes(card.category))
            }
        },
    }
}).mount('#appUpcoming')