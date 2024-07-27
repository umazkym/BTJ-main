from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from db_control.database import Base

# manufacturersテーブルのモデルクラス
class Manufacturer(Base):
    __tablename__ = "manufacturers"
    manufacturer_id = Column(Integer, primary_key=True, index=True)  # 主キー
    manufacturer_name = Column(String, index=True)  # メーカー名

# brandsテーブルのモデルクラス
class Brand(Base):
    __tablename__ = "brands"
    brand_id = Column(Integer, primary_key=True, index=True)  # 主キー
    brand_name = Column(String, index=True)  # ブランド名
    brand_picture = Column(String)  # ブランドの画像URL
    category = Column(String)  # ブランドのカテゴリ
    manufacturer_id = Column(Integer, ForeignKey("manufacturers.manufacturer_id"))  # 外部キー

    manufacturer = relationship("Manufacturer")  # メーカーとのリレーション

# itemsテーブルのモデルクラス
class Item(Base):
    __tablename__ = "items"
    item_id = Column(Integer, primary_key=True, index=True)  # 主キー
    item_name = Column(String, index=True)  # アイテム名

# survey_raw_datasテーブルのモデルクラス
class SurveyRawData(Base):
    __tablename__ = "survey_raw_datas"
    raw_data_id = Column(Integer, primary_key=True, index=True)  # 主キー
    item_id = Column(Integer, ForeignKey("items.item_id"))  # 外部キー
    brand_id = Column(Integer, ForeignKey("brands.brand_id"))  # 外部キー
    score = Column(Integer)  # スコア
    age = Column(Integer)  # 年齢
    gender = Column(Integer)  # 性別
    purchase_date = Column(String)  # 購入日

    item = relationship("Item")  # アイテムとのリレーション
    brand = relationship("Brand")  # ブランドとのリレーション
