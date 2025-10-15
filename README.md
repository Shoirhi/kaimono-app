# Kaimono App

## プロジェクト概要
- 日々の買い物リストを簡単に作成・管理できるシンプルな PWA（Progressive Web App）です。
- 金額の集計とアイテムの ON/OFF 切り替えにより、必要な商品だけを素早く把握できます。
- ブラウザのローカルストレージにデータを保存するため、アカウント作成無しですぐに利用でき、再読み込み後もリストが残ります。

## ディレクトリ構成（主要）
- `app/`：App Router によるページコンポーネントとルート設定。
- `components/`：UI コンポーネント。`ui/` 以下は shadcn/ui 由来のパーツ。
- `lib/`：ユーティリティ関数（クラス名結合など）。
- `public/`：PWA マニフェストやアイコン、サービスワーカー出力。
- `next.config.mjs`：Next.js と PWA 設定。
- `tailwind.config.ts`：Tailwind CSS 設定。

## 主な特徴
- **即時更新の合計金額表示**：アイテムを追加・切り替えすると合計金額がリアルタイムで更新されます。
- **ローカルストレージ対応**：入力したリストはブラウザに保存され、次回アクセス時も継続利用できます。
- **PWA 対応**：`next-pwa` と独自 `manifest.json` により、ホーム画面への追加やオフライン対応をサポートします。
- **モバイルファーストな UI**：Tailwind CSS と shadcn/ui（Radix UI ベース）のコンポーネントで、小さな画面でも操作しやすいレイアウトを実現しています。
- **Edge Runtime**：Next.js の Edge Runtime で動作し、Cloudflare Pages 上で高速に配信されます。

## スクリーンショット
![Kaimono App screen capture](./app/opengraph-image.png)

## 使用技術
- Next.js 14（App Router、Edge Runtime）
- React 18 + TypeScript
- Tailwind CSS, tailwind-merge, tailwindcss-animate
- shadcn/ui コンポーネント（Radix UI, @radix-ui/react-*）
- lucide-react アイコン
- next-pwa / Workbox によるサービスワーカー
- Cloudflare Pages + `@cloudflare/next-on-pages`

## 使い方
1. 画面下部の入力フォームで「商品名」と「価格」を入力し、`追加する` ボタンを押します。
2. 追加済みアイテムの右側にある目のアイコンで、合計金額に含める／除外する状態を切り替えられます。
3. ヘッダー左上の `リセット` ボタンから、全アイテムをまとめて削除できます（確認ダイアログあり）。
4. 合計金額は画面上部に常に表示され、アクティブなアイテムのみ集計されます。

## 本番環境
- Production: https://kaimono-app.pages.dev/

## ローカル開発
- 前提条件
  - Node.js 18.17 以上
  - npm（または互換パッケージマネージャー）

```bash
npm install
npm run dev
```

- ブラウザで http://localhost:3000 を開くとアプリが確認できます。
- Lint チェックは `npm run lint`、本番ビルドは `npm run build`、ローカルでの本番モード確認は `npm run start` を利用してください。
- 環境変数が必要な場合は `.env.example` を `.env.local` などにコピーし、必要なキーを設定してください。

## テスト & 品質チェック
- `npm run lint`：ESLint による静的解析。
- `npm run build`：型チェックを含む Next.js 本番ビルド。
- 追加テストや E2E を導入する場合は、このセクションに追記してください。

## デプロイ（Cloudflare Pages）
1. 依存関係をインストールした状態で、ビルドコマンドに `npx @cloudflare/next-on-pages@1 build` を指定します。
2. Cloudflare Pages のダッシュボードでリポジトリを接続し、以下を設定します。
   - Framework preset: `Next.js`
   - Build command: `npx @cloudflare/next-on-pages@1 build`
   - Build output directory: `.vercel/output/static`
   - 環境変数 `NODE_VERSION` を 18 以上に設定
3. プロジェクト設定の **Functions > Compatibility Flags** で `nodejs_compat` を有効化し、Compatibility Date を `2022-11-30` 以降に設定します。
4. デプロイ後は Cloudflare Pages が自動的にホスティングとオフライン対応を提供します。

### 手動デプロイ（オプション）
- Git 連携ではなくローカルから公開する場合は、ビルド後に以下を実行します。

```bash
npx @cloudflare/next-on-pages build
npx wrangler pages deploy .vercel/output/static --compatibility-flag=nodejs_compat
```

- 成功すると、Cloudflare Pages の公開 URL が発行されます。

## コントリビューション
- ガイドラインは `CONTRIBUTING.md` を参照してください。
- Issue/PR テンプレートが `.github/` 以下に用意されています。

## ライセンス
- 本プロジェクトは MIT License で提供されています。詳細は `LICENSE` をご確認ください。
