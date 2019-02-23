'use strict'

const NuxtService = use('App/Services/Nuxt')
const Song = use('App/Models/Song')

class NuxtController {

  async render ({ request, response }) {
    request.request['songs'] = Song.query().orderBy('rank').limit(50).fetch()
    response.implicitEnd = false
    NuxtService.nuxt.render(request.request, response.response)
  }
}


module.exports = NuxtController
