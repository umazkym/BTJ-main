# BTJ
FastAPIを使用したバックエンドと、Next.jsを使用したフロントエンドで構成されています。バックエンドはSQLiteデータベースに接続し、フロントエンドからのリクエストに応じてデータを提供します。

### ディレクトリ構成
backend/
│
├── main.py            # FastAPIのエントリーポイント
├── requirements.txt   # Pythonの依存関係
├── BTJ_DummyData.db   # SQLiteデータベースファイル
└── db_control/        # データベース関連の操作をまとめたディレクトリ
    ├── crud.py        # CRUD操作を定義したファイル
    ├── schemas.py     # データスキーマの定義ファイル
    ├── models.py      # データベースモデルの定義ファイル
    └── database.py    # データベース接続の設定ファイル
