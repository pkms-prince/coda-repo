<template>
  <section class="container mx-auto">
    <div class="row d-block mb-2 mt-2" v-if="song">
        <div class="card col-xs-10 col-md-6 mx-auto text-left song-card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-9">
                <h3 class="card-title">{{song.name}}</h3>
                <h5 class="card-subtitle mb-2 text-info">Artist : {{song.artists}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Rank : {{song.rank}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Danceability : {{song.danceability}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Energy : {{song.energy}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Loudness : {{song.loudness}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Mode : {{song.mode}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Speechiness : {{song.speechiness}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Acousticness : {{song.acousticness}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Instrumentalness : {{song.instrumentalness}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Liveness : {{song.liveness}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Valence : {{song.valence}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Tempo : {{song.tempo}}</h6>
                <h6 class="card-subtitle mb-2 text-muted">Duration : {{song.duration_ms}}</h6>
              </div>
            </div>
          </div>
        </div>
    </div>

    <div class="alert alert-danger" v-else>
      <h3>Something went wrong</h3>
    </div>

    <nuxt-link :to="{ name: 'index' }">Go Back <i class="gyphicon glyphicon-arrow-left"> </i></nuxt-link>
  </section>
</template>

<script>
  const axios = require('axios')

  export default {
    name: 'about',

    created()
    {
      this.song_id = this.$route.params.id

      axios.get(`/api/v1/songs/${this.song_id}`)
        .then((res) => {
          if(res.data.success && res.data.data.length > 0)
            this.song = res.data.data[0]
        })
    },

    head () {
      return {
        title: `About (rendered ${this.name}-side)`
      }
    },

    data: () => ({
      name: '',
      song_id:'',
      song:{}
    }),

    asyncData: ({ isClient }) => ({
      name: isClient ? 'client' : 'server'
    }),

    computed: {
      isClient () {
        return this.name === 'client'
      }
    }
  }
</script>
