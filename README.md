# Bormaŝino GSI maps demo

Bormaŝino を使用した地理院地図の表示&地名検索を行うデモです。

地図部分は Leaflet を使用し JavaScript で実装、地名検索部分は ruby.wasm を使用し Ruby で実装されています。

## デモ

https://bormashino-demo-gsi-maps.vercel.app

## Prerequisites

You need:

- rbenv + ruby-build
- npm
- Vercel CLI (optional, when you want to deploy the app into Vercel)

## Quickstart

in the template dir

```bash
rbenv install 3.2.0-preview1
gem install foreman
bundle install
bundle exec rake bormashino:download
(cd src && bundle install)
npm install
./bin/dev
```

You can see the app at http://localhost:5000/.
App codes are basically in `src/`.
