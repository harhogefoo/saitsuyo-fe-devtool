ejs-sass-webpack
====

## 事前に用意するもの
- Node.js (version 8.1.1)
- yarn (version 1.0.0)

### 環境構築

#### nodenvを利用してインストールする場合
[nodenvを使ってMacにNode.jsの環境を構築する](https://qiita.com/mtakahashi-ivi/items/cfa9bc533e25d7f726eb)
上記にnodenvのインストールを行った後
```bash
$ nodenv install 8.8.1
$ nodenv global 8.8.1
$ nodenv rehash
$ node -v
8.8.1
```

#### yarnをインストール
```bash
$ npm install -g yarn@1.1.0
```

#### 開発に使うnpmパッケージをインストール
```
$ yarn install
```

## ファイル構成

- `README.md`
  - このファイルです。
- `package.json`
  - 依存するnpmパッケージに関する設定ファイルです。
- `public`
  - Web公開されるファイルの置き場所です。 (gulpタスク実行までは空の状態です)
- `src/scss`, `src/js`, `src/ejs`
  - ビルドに必要な各種ソースコードです。

## 開発手順

開発時に必要なタスクは、npm scriptおよびgulp.jsで管理されています。
shellから以下のコマンドを実行することで、各種ビルド・タスク実行が可能です。

- `yarn start`
  - すべてのソースコードをビルドし、開発用ブラウザを立ち上げ、その後ソースコードに修正があれば自動ビルド・自動ブラウザ更新します
  - ビルドしたソースコードは`public`ディレクトリ内に出力されます。
  - 基本的には、このコマンドを実行しておくだけで開発が可能なはずです。

## リリース作業

- `yarn release`
  - 公開用にCSSとJSの圧縮したものを出力します。
  - ソースコードを納品する場合は`yarn release`を行った後の`public`ディレクトリ内部のコードを利用すること。

## 使用言語

- HTMLテンプレート: [ejs](http://ejs.co/)
- CSSメタ言語: [Sass(scss)](http://sass-lang.com/)
- Javascript: [ES2015(ECMAScript 6)](https://babeljs.io/docs/learn-es2015/)

## 対応ブラウザ
- 各種モダンブラウザ最新バージョン・IE10以上

## 依存ライブラリ

`yarn`でインストールされるライブラリ（一部）です。
全てを理解していなくても、開発は問題なく行えますが、挙動に問題がある場合・カスタマイズしたい場合などに参照してみてください。

- [gulp.js](http://gulpjs.com/)
- [browser-sync](https://www.browsersync.io/)
- [jQuery](https://jquery.com/)
- [Reset CSS](http://meyerweb.com/eric/tools/css/reset/)

## 開発ガイドライン

### EJSパーツ分割の粒度
以下の粒度でパーツに分割する
- header
- footer
- sidemenu

モーダルをパーツ化するかどうかは実装しながら決定する。

### CSSの記法

[SMACSS](https://smacss.com/ja)を採用

#### サンプルコード

```.scss
.l-main{
  width: 80%;
  float: left;
}
.l-fixed .l-main { /* px指定にする場合は、bodyタグ等にl-fixedクラスを付与 */
  width: 640px;
}
```

```.html
<div class="l-main">
  <div class="box">
    <h2 class="box-title">boxタイトル</h2>
    <p class="box-description">説明</p>
  </div>
</div>
```

### JSの開発について
- ES2015(ECMAScript6)以降の記法で記述すること
- ES Modulesで記述すること
- 機能ごとにファイルを分割すること※

※ 開発し辛い場合はルールを変更する。

#### サンプルコード
```.js
// main.js
import $ from 'jquery'
import fadeout from './components/fadeout'
import changeText from './components/changeText'
import showAlert from './components/showAlert'
import addBorder from './components/addBorder'
import xhrAccess from './components/xhrAccess'

$(() => {
  showAlert()
  changeText()
  fadeout()
  addBorder()
  xhrAccess()
})
```

#### 参考
- [ECMAScript 6 Tutorial](http://ccoenraets.github.io/es6-tutorial/)
- [ES Modules と Node.js について](http://yosuke-furukawa.hatenablog.com/entry/2016/05/10/111102)
