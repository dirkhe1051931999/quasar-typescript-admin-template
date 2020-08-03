## :dizzy: :dizzy: template for quasar admin with typescript :full_moon_with_face: :full_moon_with_face: support pwa,electron,spa,Ionic

- app
  ![](https://ftp.bmp.ovh/imgs/2020/07/5c68dc2da73c5950.png)
- electron
  ![](https://ftp.bmp.ovh/imgs/2020/07/98a1f290ff67b085.jpg)
- pwa
  ![](https://ftp.bmp.ovh/imgs/2020/07/9a75635faccdaae7.jpg)

## Install the dependencies

```bash
npm install
# for mock server
npm install nodemon
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
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
