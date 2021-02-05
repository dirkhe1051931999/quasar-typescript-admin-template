## :dizzy: :dizzy: template for quasar admin with typescript :full_moon_with_face: :full_moon_with_face: support pwa,electron,spa,Ionic

  <img src="https://bit-images.bj.bcebos.com/bit-new/file/20210205/j02o.png" >

## Install the dependencies

```bash
npm install
# for mock server
npm install nodemon
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
# server
npm run server
# spa
quasar dev
# electron
quasar dev -m electron
# pwa
quasar dev -m pwa
# capacitor
quasar dev -m capacitor -T ios
```

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
# spa
quasar build
# electron
quasar build -m electron
# pwa
quasar build -m pwa
# capacitor
quasar build -m capacitor -T ios
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
