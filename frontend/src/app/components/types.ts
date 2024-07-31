// レーダーチャートデータの型
export interface RadarData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }
  
  // フィルタデータの型
  export interface Filter {
    selectedOptions: string[];
    selectedBrand: string | null;
    startDate: Date | undefined;
    endDate: Date | undefined;
    radarData: RadarData;
    apiUrl: string | null;
    fetchedData: any;
  }
  
  // 選択肢の定義
  export const genderOptions = ["男性", "女性"];
  export const ageOptions = ["20代", "30代", "40代", "50代", "60代", "70代～"];
  export const brandOptions = [
    { value: "1", label: "黒ラベル" },
    { value: "2", label: "ヱビスビール" },
    { value: "3", label: "ヱビスプレミアムエール" },
    { value: "4", label: "ヱビスプレミアムブラック" },
    { value: "5", label: "ヱビスシトラスブラン" },
    { value: "6", label: "ヱビスジューシーエール" },
    { value: "7", label: "ナナマル" },
    { value: "8", label: "サッポロラガービール" },
    { value: "9", label: "サッポロクラシック" },
    { value: "10", label: "SORACHI1984" },
    { value: "11", label: "岸和田ビール 鐵工" },
    { value: "12", label: "つくばブルワリー 金色姫IPA" },
    { value: "13", label: "滝川クラフトビール工房 空知ヴァイツェン" },
    { value: "14", label: "大山Ｇビール スタウト" },
    { value: "15", label: "ヘリオス酒造沢内醸造所 ザ・マタギ" },
    { value: "16", label: "KIX BEER ヴァイツェン" },
    { value: "17", label: "南信州ビール AmberAle" },
    { value: "18", label: "Y.MARKET BREWING ワット ザ ヘル" },
    { value: "19", label: "長濱浪漫ビール 長浜エール" },
    { value: "20", label: "TOSACO 土佐IPA" },
    { value: "21", label: "HNB 広島日の出ラガー" },
    { value: "22", label: "暁ブルワリー ドラゴンアイ サン" },
    { value: "23", label: "田沢湖ビール ピルスナー" },
    { value: "24", label: "六甲ビール WEST COAST SESSION IPA" },
    { value: "25", label: "那須高原ビール ベルジャンホワイト" },
    { value: "26", label: "ゴールデンラビットビール 青二才" },
    { value: "27", label: "宮島ビール 広島レッドエール" },
    { value: "28", label: "遠野麦酒ZUMONA アルト" },
    { value: "29", label: "鎌倉ビール（月）" },
    { value: "30", label: "南信州ビール AppleHop" },
  ];
  