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

## 開発推奨ブラウザ
- Google Chrome(バージョン: 62.0.3202.94)


## 依存ライブラリ

`yarn`でインストールされるライブラリ（一部）です。
全てを理解していなくても、開発は問題なく行えますが、挙動に問題がある場合・カスタマイズしたい場合などに参照してみてください。

- [gulp.js](http://gulpjs.com/)
- [browser-sync](https://www.browsersync.io/)
- [jQuery](https://jquery.com/)
- [Reset CSS](http://meyerweb.com/eric/tools/css/reset/)

## 開発ガイドライン

### EJSの開発ルール
- 開発ディレクトリは `src/ejs` とする
- `src/common/ejs/` には、共通パーツを実装する(共通パーツの分割の粒度は後述）
- ページ名ごとにディレクトリを作成し`index.ejs`を作成する。`index.ejs` 内に該当ページのEJSを実装すること
  - 例: `src/(ページ名)/ejs/index.ejs`
  
#### EJSパーツ分割の粒度
以下の粒度でパーツに分割する
- header
- footer
- side nav

モーダルをパーツ化するかどうかは実装を行いながら決定する。

#### 出力先

`src/` 内に記述したEJSは、`public/(ページ名)/ejs/` 以下に出力されます。

### Sass(scss)の開発ルール
- 開発ディレクトリは `src/` とする
- `src/common/scss/_common.scss/` 内には、サイト全体に利用するCSSを実装すること
- ページ名ごとにディレクトリを作成し、`index.scss` 内に該当ページのSassを実装すること
  - 例: `src/(ページ名)/scss/index.scss`

#### 共通Sassディレクトリ構成
```
└── common/scss 
    ├── _common.scss(共通cssをインポートしたcss)
    ├── base（ベースルール）
    ├── layout(レイアウトルール)
    └── modules(モジュールルール)
```
参考: [効率よく作るために私がしているCSSファイル分割方法](http://webdrawer.net/css/filesplit.html) - ディレクトリごとに分割

#### CSSの記法

[SMACSS](https://smacss.com/files/smacss-ja.pdf)を採用


### 命名規則について

## 状態を表すクラス
接頭辞に「.is-」を付ける。

## jsでフックする汎用コンポーネント
接頭辞に「js-」を付ける。


#### 出力先

`src/` 内に記述したSassは、`public/(ページ名)/scss/` 以下に出力されます。

### JavaScriptの開発ルール
- 開発ディレクトリは `src/` とする
- ページ名ごとにディレクトリを作成し、`index.js` 内に該当ページのJavaScriptを実装すること
  - 例: `src/(ページ名)/js/index.js`
- `src/common/js/` 内には、汎用機能を実装すること
  - 汎用機能を実装する場合、class名の接頭辞に `req-[汎用機能名]`を付与すること
    - 例: `<button class="req-add-border">`
  - 汎用機能の対象となる要素のclass名は接頭辞に `res-[汎用機能名]`を付与すること
    - 例: `<div class="res-add-border">`
  - 機能を汎用化することは名前空間の衝突を引き起こす可能性がある
  - 機能の汎用化については、開発に複雑さを招くことを考慮し、開発を行いながら`継続/廃止`の検討をする

#### JavaScriptの記述方法
- ES2015(ECMAScript6)以降の記法で記述すること
- ES Modulesで記述すること

#### 出力先
`src/` 内に記述したJavaScriptは、`public/(ページ名)/js/` 以下に出力されます。

#### 参考
- [ECMAScript 6 Tutorial](http://ccoenraets.github.io/es6-tutorial/)
- [ES Modules と Node.js について](http://yosuke-furukawa.hatenablog.com/entry/2016/05/10/111102)
