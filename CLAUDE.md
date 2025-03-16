# CLAUDE.md - redirectorプロジェクトガイドライン

## プロジェクト概要

http://localhost:8001からObsidianのURLスキームへリクエストを転送するローカルリダイレクターアプリケーション。

## 開発コマンド

```bash
# ローカルサーバーを起動
deno run --allow-net --allow-read src/main.ts

# 開発モードで実行（ホットリロード）
deno run --watch --allow-net --allow-read src/main.ts

# リンター実行
deno lint

# フォーマット実行
deno fmt

# テスト実行
deno test

# 単一テストファイル実行
deno test path/to/test_file.ts
```

## コードスタイルガイドライン

- **フォーマット**: Denoの標準フォーマッター使用
- **命名規則**: 変数/関数はcamelCase、クラスはPascalCase
- **インポート**: 標準ライブラリ、外部ライブラリ、内部モジュールの順でグループ化
- **型**: TypeScriptインターフェースを積極的に活用
- **エラー処理**: try/catchまたはResultパターンを使用
- **コメント**: 複雑なロジックと公開APIにはJSDocを使用
- **コミット**: 内容を明確に示す簡潔なメッセージ
