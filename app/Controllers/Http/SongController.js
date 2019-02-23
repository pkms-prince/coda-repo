'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Song = use('App/Models/Song')

/**
 * Resourceful controller for interacting with songs
 */
class SongController {
  /**
   * Show a list of all songs.
   * GET songs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let query = request.get()
    let songs = ""
    if (query && query.hasOwnProperty('q'))
    {
      songs = await Song.query().whereRaw(`name LIKE '%${query.q}%' or artists LIKE '%${query.q}%'`).fetch()
    }
    else
    {
      songs = await Song.query().orderBy('rank', 'asc').limit(50).fetch()
    }

    return {'success': true, 'data': songs}
  }

  /**
   * Create/save a new song.
   * POST songs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single song.
   * GET songs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let songs = ""
    songs = await Song.query().where('id', params.id).fetch()
    return {'success': true, 'data': songs}
  }

}

module.exports = SongController
