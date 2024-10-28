# マイログ

# 要件
個人用の口コミ

#### 下記の機能を使えるようにする
* ログ登録/変更/削除  
→ レビューや評価が行える  
→ 任意でGoogleの口コミ投稿も行える  

* 一覧検索  
→ 過去のレビューから絞り込み、現在地からのソート機能


# 構成
Docker Desktop  
Laravel Framework 11.27.2  
Vue3

# ローカル環境構築手順

#### git cloneをする
```
$ git clone https://gitlab.com/kyonakyona0615/my-log.git
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
