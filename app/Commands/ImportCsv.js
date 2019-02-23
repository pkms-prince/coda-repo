'use strict'

const { Command } = require('@adonisjs/ace')
const Song = use('App/Models/Song')
const CSV = require('fast-csv')

class ImportCsv extends Command {
  static get signature () {
    return `
    import:csv
    { path : Path of the CSV File }'
  `
  }

  static get description () {
    return 'Import CSV Data to database'
  }

  async handle (args, options) {
    this.success(`Looking for File at : ${args.path}`)
    const data = await this.readFile(args.path)

    if (data) {

      CSV.fromString(data.toString(), {
          headers: true,
          ignoreEmpty: true
        })
        .on("data", async (data) => {
          let song = new Song()
          song.name = data.name
          song.artists = data.artists
          song.key = data.key
          song.danceability = data.danceability
          song.energy = data.energy
          song.loudness = data.loudness
          song.mode = data.mode
          song.speechiness = data.speechiness
          song.acousticness = data.acousticness
          song.instrumentalness = data.instrumentalness
          song.liveness = data.liveness
          song.valence = data.valence
          song.tempo = data.tempo
          song.duration_ms = data.duration_ms
          song.time_signature = data.time_signature
          song.rank = data.rank

          await song.save()
        })
        .on("end", () => {

        });

      }
  }
}

module.exports = ImportCsv
