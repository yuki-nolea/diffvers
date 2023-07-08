# diffvers

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


# Running the app
1. 初期データベースの作成
```
# mysql -u root -p

mysql> create database diffvers character set utf8mb4 collate utf8mb4_bin;

mysql> create user diffvers@localhost identified by '********';

mysql> grant all privileges on diffvers.* to diffvers@localhost;

mysql> quit;

# cat ./create.sql | mysql --default-character-set=utf8mb4 -udiffvers -p diffvers
```

2. アプリケーションの実行
```
# cd ./backend
# yarn run watch
```