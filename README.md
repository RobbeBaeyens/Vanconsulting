# Vanconsulting

## Basisvereisten (eenmalig te installeren)

Volgende tools hoef je maar eenmalig te installeren:

- De hoogste versie van [**Node**](https://nodejs.org/en/)
- [**Git**](https://git-scm.com/)
- [**gulp-cli**](https://gulpjs.com/): `npm install -g gulp-cli`

## Voeg node modules toe

- Open een nieuw terminalvenster in de map **project naam** en installeer de node-modules: `npm install`

## Zet SASS om naar CSS en run een live-server

- Start de Sass-compiler en live-server: `gulp`
- Optioneel: met de gulp-task `gulp minify` zal alle CSS-bestanden in de map `dist` optimaliseren (minimaliseren).

## Push naar github

- `git add .`
- `git commit -m "commentaar"`
- `git pull --rebase`
- `git push`
