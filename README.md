# Google Maps Platformの基本的な使用

- mapの表示
- マーカー設置
- 現在地から入力された値の候補を取得
- storeで各APIライブラリーの管理

# 構成
Docker Desktop  
Laravel Framework 11.27.2  
Vue3(Vuetify,Vuex)

# ローカル環境構築手順

#### git cloneをする
```
$ git clone https://github.com/k-yonaha/vue-google-map-api.git
```

#### .env.exampleをコピーする
```
$ cp .env.example .env
```

#### .envの中身を修正
```
VITE_GOOGLE_API_KEY={google apiで取得したKEY}
```

#### エイリアスの設定
```
$ alias sail='./vendor/bin/sail'
$ source ~/.zshrc
```

#### 起動
```
$ sail up -d
```

#### テーブル作成
```
$ sail artisan migrate
```

#### APP_KEYの生成
```
$ sail artisan key:generate
```

#### パッケージのインストール
```
$ sail npm install
```

#### Vue.js起動
```
$ sail npm run dev
```

#### 画面確認

http://localhost/
にアクセス
