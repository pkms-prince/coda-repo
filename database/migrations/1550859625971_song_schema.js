'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SongSchema extends Schema {
  up () {
    this.create('songs', (table) => {
      table.increments()
      table.string('name').nullable()
      table.string('artists').nullable()
      table.decimal('key').nullable()
      table.decimal('danceability').nullable()
      table.decimal('energy').nullable()
      table.decimal('loudness').nullable()
      table.decimal('mode').nullable()
      table.decimal('speechiness').nullable()
      table.decimal('acousticness').nullable()
      table.decimal('instrumentalness').nullable()
      table.decimal('liveness').nullable()
      table.decimal('valence').nullable()
      table.decimal('tempo').nullable()
      table.decimal('duration_ms').nullable()
      table.integer('time_signature').nullable()
      table.integer('rank').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('songs')
  }
}

module.exports = SongSchema
