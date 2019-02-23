
# Spotify Chart Busters
> Made using [Adonis 4](http://dev.adonisjs.com/) + [Nuxt](https://nuxtjs.org)

## For Backend API Endpoint
-Add database credentials in ".env" file

-Run migration to create the table. Then run the command to populate database with value from the CSV
```bash
adonis migration:run
adonis import:csv full/path/to/csv/file

Eg : adonis import:csv /var/www/coda/resources/songs.csv
```

## For Frontend 
```bash
npm install
```

## Run the app
To serve the app , run the following command
```bash
adonis serve --dev
```
