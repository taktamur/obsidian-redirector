desc "サーバーを起動"
task :start do
  sh "deno run --allow-net --allow-read src/main.ts"
end

desc "開発モードでサーバーを起動（ホットリロード）"
task :dev do
  sh "deno run --watch --allow-net --allow-read src/main.ts"
end

desc "リンターを実行"
task :lint do
  sh "deno lint"
end

desc "フォーマットを実行"
task :fmt do
  sh "deno fmt"
end

desc "テストを実行"
task :test do
  sh "deno test"
end