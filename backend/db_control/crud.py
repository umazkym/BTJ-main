from sqlalchemy.orm import Session
from db_control.models import SurveyRawData
from db_control.schemas import SurveyRawDataCreate
from typing import List, Dict, Any, Optional
from sqlalchemy import func
from sqlalchemy.sql.expression import or_

# SurveyRawDataテーブルからデータを取得する関数
def get_survey_data(db: Session, skip: int = 0, limit: int = 100):
    return db.query(SurveyRawData).offset(skip).limit(limit).all()

# SurveyRawDataテーブルに新しいデータを作成する関数
def create_survey_data(db: Session, survey_data: SurveyRawDataCreate):
    db_survey_data = SurveyRawData(**survey_data.dict())
    db.add(db_survey_data)
    db.commit()
    db.refresh(db_survey_data)
    return db_survey_data

# 集計データを取得する関数
def get_aggregated_data(
    db: Session,
    brand_ids: Optional[List[int]] = None,      # ブランドIDのリスト
    genders: Optional[List[int]] = None,        # 性別のリスト
    age_groups: Optional[List[int]] = None,     # 年齢層のリスト
    purchase_date_ranges: Optional[List[str]] = None  # 購入日の範囲
) -> List[Dict[str, Any]]:
    # 集計クエリを構築
    query = db.query(
        SurveyRawData.brand_id,
        SurveyRawData.item_id,
        func.avg(SurveyRawData.score).label("average_score"),
        func.count(SurveyRawData.score).label("count")
    )

    # ブランドIDによるフィルタリング
    if brand_ids:
        query = query.filter(SurveyRawData.brand_id.in_(brand_ids))

    # 性別によるフィルタリング
    if genders:
        query = query.filter(SurveyRawData.gender.in_(genders))

    # 年齢層によるフィルタリング
    if age_groups:
        age_conditions = []
        for age_group in age_groups:
            if age_group == 20:
                age_conditions.append(SurveyRawData.age.between(20, 29))
            elif age_group == 30:
                age_conditions.append(SurveyRawData.age.between(30, 39))
            elif age_group == 40:
                age_conditions.append(SurveyRawData.age.between(40, 49))
            elif age_group == 50:
                age_conditions.append(SurveyRawData.age.between(50, 59))
            elif age_group == 60:
                age_conditions.append(SurveyRawData.age.between(60, 69))
            elif age_group == 70:
                age_conditions.append(SurveyRawData.age >= 70)
        if age_conditions:
            query = query.filter(or_(*age_conditions))

    # 購入日によるフィルタリング
    if purchase_date_ranges and len(purchase_date_ranges) == 2:
        start_date, end_date = purchase_date_ranges
        query = query.filter(SurveyRawData.purchase_date.between(start_date, end_date))

    # 集計のグループ化
    query = query.group_by(SurveyRawData.brand_id, SurveyRawData.item_id)

    results = query.all()

    # デバッグ用にクエリ結果をプリント
    # 本番環境ではログ機能を使用することを推奨します。
    print("Query SQL:", str(query.statement.compile(compile_kwargs={"literal_binds": True})))
    print("Results:", results)

    # クエリ結果を整形して返す
    aggregated_data = [
        {"brand_id": result.brand_id, "item_id": result.item_id, "average_score": result.average_score, "count": result.count}
        for result in results
    ]

    return aggregated_data
