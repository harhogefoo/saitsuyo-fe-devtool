ejs-sass-webpack
====

## 事前に用意するもの
- node.js (version 5.0.0以上)

参考: [Macにnode.jsをインストールする手順](https://qiita.com/akakuro43/items/600e7e4695588ab2958d)

## 環境構築
```
# 開発に使うnpmパッケージをインストール
yarn

# または
npm install
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
  - すべてのソースコードをビルドし、開発用ブラウザを立ち上げ、その後ソースコードに修正があれば自動ビルド・自動ブラウザ更新します
  - ビルドしたソースコードは`public`ディレクトリ内に出力されます。
  - 公開用にCSSとJSの圧縮したものを出力します。
  - ソースコードを納品する場合は`yarn release`を行った後の`public`ディレクトリ内部のコードを利用すること。

## 使用言語

- HTMLテンプレート: [ejs](http://ejs.co/)
- CSSメタ言語: [Sass(scss)](http://sass-lang.com/)
- Javascript: [ES2015(ECMAScript 6)](https://babeljs.io/docs/learn-es2015/)

## 対応ブラウザ
- 各種モダンブラウザ最新バージョン・IE10以上
  - またIE8に対応する場合は、jQueryを1系にすることもお忘れなく

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

Atomic Designの概念を基づいた分割はしない。

モーダルをパーツ化するかどうかは実装しながら決定する。

### CSSの記法

SMACSSを採用

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

```
<div class="l-main">
  <div class="box">
    <h2 class="box-title">boxタイトル</h2>
    <p class="box-description">説明</p>
  </div>
</div>
```

参考: [CSS設計における3大メソッド](http://www.risewill.co.jp/blog/archives/5652)
