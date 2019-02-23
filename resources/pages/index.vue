
 <template>
  <section class="container mx-auto mt-0">
    <h1>Spotify Chart Busters</h1>

    <div class="row">
      <div class="input-group mb-2 mx-auto col-md-6 ">
        <input type="text" class="form-control" aria-label="Search a song, artist . . ." v-model="searchText">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-success" @click="searchSong(searchText,this)">Search</button>
        </div>
      </div>
    </div>

    <div class="row">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
       <div class="row">
         <div class="col-xs-6">
           <select class="custom-select" id="sortBy" v-model="sortBy">
             <option selected>Sort By</option>
             <option value="rank">Rank</option>
             <option value="name">Name</option>
             <option value="artists">Artist</option>
             <option value="danceability">Danceability</option>
             <option value="energy">Energy</option>
             <option value="loudness">Loudness</option>
             <option value="mode">Mode</option>
             <option value="speechiness">Speechiness</option>
             <option value="acousticness">Acousticness</option>
             <option value="instrumentalness">Instrumentalness</option>
             <option value="liveness">Liveness</option>
             <option value="valence">Valence</option>
             <option value="tempo">Tempo</option>
             <option value="duration_ms">Duration</option>
           </select>
         </div>
         <div class="col-xs-6 px-2">
           <select class="custom-select" id="sortOrder" v-model="sortingOrder">
             <option selected>Sorting Order</option>
             <option value="asc">Low to High</option>
             <option value="desc">High to Low</option>
           </select>
         </div>
       </div>
      </nav>
    </div>

    <div class="row d-block mb-2" v-for="song in songs" :key="song.id">
      <nuxt-link :to="{ path: 'song-details/'+song.id, params:{'song':song}}" class="song">
        <div class="card col-xs-10 mx-auto text-left song-card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-9">
                <h5 class="card-title">{{song.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{song.artists}}</h6>
              </div>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>


  </section>
</template>


<script>
  const axios = require('axios')
  const debounce = require('lodash.debounce')
  const orderBy = require('lodash.orderby');


  export default {
    name: 'page-index',

    mounted()
    {
      axios.get(`/api/v1/songs`)
        .then((res) => {
          if(res.data.success)
           this.songs = res.data.data
        })

    },
    head () {
      return {
        title: `Top Songs`
      }
    },

    data: () => ({
      name: '',
      searchText:'',
      songs:[],
      sortingOrder:'Sorting Order',
      sortBy:'Sort By'
    }),

    asyncData: ({ req }) => ({
      userAgent: (req ? req.headers['user-agent'] : (typeof navigator !== 'undefined' ? navigator.userAgent : 'No user agent (generated)')),
      songs: req ? req.songs : []
    }),

    computed: {
      isClient () {
        return this.name === 'client'
      }
    },

    watch:{
      searchText()
      {
        this.searchSong(this.searchText,this);
      },
      sortingOrder()
      {
        if(this.songs[0].hasOwnProperty(this.sortBy))
          this.songs = orderBy(this.songs, this.sortBy, (this.sortingOrder==='asc'||this.sortingOrder==='desc'?[this.sortingOrder]:[]));


      },
      sortBy()
      {
        if(this.songs[0].hasOwnProperty(this.sortBy))
          this.songs = orderBy(this.songs, this.sortBy, (this.sortingOrder==='asc'||this.sortingOrder==='desc'?[this.sortingOrder]:[]));
      }
    },


    methods:{
      searchSong:debounce((text,self) => {
        axios.get(`/api/v1/songs?q=${text}`)
          .then((res) => {
            if(res.data.success)
              self.songs = res.data.data
          })
      },1000),

    }
  }
</script>

<style scoped>
  h1 {
    margin: 50px 0;
  }
  .song-card
  {
    background: #fff;
  }
  .song-card:hover
  {
    -webkit-box-shadow: 9px 10px 31px 1px rgba(184,173,184,0.83);
    -moz-box-shadow: 9px 10px 31px 1px rgba(184,173,184,0.83);
    box-shadow: 9px 10px 31px 1px rgba(184,173,184,0.83);
    cursor: pointer;
  }

  .song:hover
  {
    text-decoration: none;
  }
</style>
