# diffvers

# Running the app
- アプリケーションの起動
アプリケーションの起動は`<project root>/backend`にcdしてから実行すること
```
# cd <project root>/backend
# yarn run prod
# forever start ../frontend/app.js
```

- アプリケーションの停止
`forever list`コマンドで起動中のアプリケーションのIDを取得し、`forever stop`コマンドで取得したIDを指定し停止する
```
# forever list
info:    Forever processes running
data:    uid  command           script                                           forever pid  id    logfile                         uptime                
data:    [0] AL2r /usr/bin/node /home/bitnami/hira-code/diffvers/frontend/app.js 2176186 2176196    /home/bitnami/.forever/AL2r.log 0:0:2:54.6450000000000
# forever stop 0
```

# Cloning the app
1. github からリポジトリをクローン
```
# git clone https://github.com/yuki-nolea/diffvers.git
```

2. ローカルのリモートブランチを最新化
```
# git fetch
```

3. ブランチの一覧を表示
```
# git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/dev
  remotes/origin/main
```

4. dev リモートブランチをローカルに pull
```
# git pull origin dev:dev
```

5. dev ブランチが pull されたことを確認
```
# git branch
  dev
* main
```

6. dev ブランチに切り替える
```
# git checkout dev
```


# Running the app in development mode
1. 初期データベースの作成
```
# mysql -u root -p

mysql> create database diffvers character set utf8mb4 collate utf8mb4_bin;

mysql> create user diffvers@"127.0.0.1" identified by '********';

mysql> grant all privileges on diffvers.* to diffvers@"127.0.0.1";

mysql> quit;

# cat ./create.sql | mysql --default-character-set=utf8mb4 -udiffvers -p diffvers
```

2. アプリケーションの実行
```
# cd ./backend
# yarn run watch
```
アプリケーション実行後、Webブラウザから"`http://<IP address>:3000`"へアクセス

# Production build

```
# cd ./backend
# yarn run prod
```

# scrapy実行

```
# scrapy crawl scrapy_zbserver
```

# Redmine停止

```
# systemctl stop bitnami.service
```
