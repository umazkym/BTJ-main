from pydantic import BaseModel
from typing import List, Optional

# SurveyRawDataのベーススキーマクラス
class SurveyRawDataBase(BaseModel):
    item_id: int  # アイテムID
    brand_id: int  # ブランドID
    score: int  # スコア
    age: int  # 年齢
    gender: int  # 性別
    purchase_date: str  # 購入日

# SurveyRawData作成用スキーマクラス
class SurveyRawDataCreate(SurveyRawDataBase):
    pass

# SurveyRawDataの読み取り用スキーマクラス
class SurveyRawData(SurveyRawDataBase):
    raw_data_id: int  # データID

    class Config:
        orm_mode = True  # ORMモードを有効にすることで、ORMモデルからのデータを受け取ることができる
