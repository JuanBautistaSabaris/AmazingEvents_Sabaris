const { createApp } = Vue
const app = createApp({
    data(){
        return {
            cards:[],
            allCards:[],
            cardDetails:{},
            cardDetailsBoolean: false,
            cardsBoolean: true,
            cardsPastEvents:[],
            cardsUpcomingEvents:[],
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
            fetch("./json/amazing.json")
                .then(response => response.json())
                .then(data => {
                    this.cards = data.events
                    this.allCards = this.cards
                    this.getCategories(data.events)
                    this.cardsPastEvents = data.events.filter((e)=>e.date < data.currentDate)                   
                })
                .catch(error => alert("Error. Couldn't load data.", error))
        },

        getCategories(array){
            array.forEach(e =>{
                if(!this.categories.includes(e.category)){
                    this.categories.push(e.category)
                }
            })
        },

        goDetails(id){
            this.cardDetails = this.cards.find(card => card._id == id),
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
            let firstFilter = this.cards.filter(card => card.name.toLowerCase().includes(this.inputText.toLowerCase()))
            if(!this.categoriesSelected.length){
                this.allCards = firstFilter
            } else {
                this.allCards = firstFilter.filter(card => this.categoriesSelected.includes(card.category))
            }
        }
    }
}).mount('#appIndex')