# diffvers

# Running the app
- アプリケーションの起動
```
# npx forever start <project root>/frontend/app.js
```

- アプリケーションの停止
```
# npx forever stop <project root>/frontend/app.js
```

- アプリケーションの再起動
```
# npx forever restart <project root>/frontend/app.js
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
