# diffvers

# Running the app

```
# cd ./backend
# yarn run watch
```

# Clone the app
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