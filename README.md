# Obsidian リダイレクター

## 概要

メモ書きを行う Web アプリからローカルにある Obsidian を開くリンクを作成するためのツール。
Obsidian の URL スキーム（obsidian://）が対応していない環境で利用可能。

### 問題点
- メモ書きを行う Web アプリからローカルにある Obsidian を開くリンクを作りたい
- ただし、Obsidian の URL スキームである obsidian:// が、直接Webアプリから利用できない

### 解決策
- リダイレクターをローカルで動かす
- メモ書き Web アプリには、http://localhost:8001 を使用
- 直接アクセスすると、入力ボックスがあり、そこに Obsidian の URL スキームを入れる
- http://localhost:8001/redirect?to=<エンコードされたObsidianのURL> が、obsidian の URL スキームにリダイレクトする

## 機能
- Obsidian URL を入力するためのシンプルなフォーム
- 入力された URL への即時リダイレクト
- URLのコピー機能

## 使用方法

### サーバーの起動
```bash
# 通常起動
deno run --allow-net --allow-read src/main.ts

# 開発モード（ホットリロード）
deno run --watch --allow-net --allow-read src/main.ts
```

### 使用例
1. ブラウザで http://localhost:8001 にアクセス
2. フォームに Obsidian の URL を入力（例: obsidian://open?vault=MyVault&file=MyNote）
3. 「開く」ボタンをクリックすると、Obsidian アプリが開く

### API の使用
直接リダイレクト用の URL を使用:
```
http://localhost:8001/redirect?to=obsidian%3A%2F%2Fopen%3Fvault%3DMyVault%26file%3DMyNote
```

## 技術スタック
- Deno 2.0
- TypeScript
- HTML/CSS/JavaScript (フロントエンド)
