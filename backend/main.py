from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any

import db_control.crud as crud
import db_control.models as models
import db_control.schemas as schemas
from db_control.database import SessionLocal, engine

# データベースモデルのテーブルを作成します
models.Base.metadata.create_all(bind=engine)

# FastAPIアプリケーションのインスタンスを作成
app = FastAPI()

# CORS設定: フロントエンドからのリクエストを許可するための設定
origins = [
    "http://localhost:3000",  # フロントエンドのオリジン
]

# CORSミドルウェアを追加し、指定したオリジンからのリクエストを許可します
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# データベースセッションを取得する依存関係を定義します
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 集計データを取得するエンドポイントを定義します
@app.get("/filter", response_model=List[Dict[str, Any]])
def read_filtered_data(
    brand_id: Optional[int] = Query(None),       # クエリパラメータとしてブランドIDを取得
    gender: Optional[List[int]] = Query(None),  # クエリパラメータとして性別を取得
    age_group: Optional[List[int]] = Query(None),  # クエリパラメータとして年齢層を取得
    start_date: Optional[str] = Query(None),    # クエリパラメータとして開始日を取得
    end_date: Optional[str] = Query(None),      # クエリパラメータとして終了日を取得
    db: Session = Depends(get_db)               # データベースセッションを依存関係として取得
):
    try:
        # CRUD関数を呼び出してデータを取得
        data = crud.get_aggregated_data(
            db=db,
            brand_ids=[brand_id] if brand_id else None,
            genders=gender,
            age_groups=age_group,
            purchase_date_ranges=[start_date, end_date] if start_date and end_date else None
        )
        return data
    except Exception as e:
        # 例外が発生した場合はHTTP 500エラーを返す
        raise HTTPException(status_code=500, detail=str(e))
