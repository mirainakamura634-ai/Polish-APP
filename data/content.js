const POLISH_DATA = {
  alphabet: [
    { letter: "ą", reading: "オン", note: "鼻母音。「オ」と「ン」の中間のような音" },
    { letter: "ć", reading: "チ", note: "ciと似た柔らかい「チ」" },
    { letter: "ę", reading: "エン", note: "鼻母音。「エ」と「ン」の中間のような音" },
    { letter: "ł", reading: "ウ", note: "英語のwに近い「ウ」の音(Lではない)" },
    { letter: "ń", reading: "ニ", note: "niと似た柔らかい「ニ」" },
    { letter: "ó", reading: "ウ", note: "uと同じ発音(「オ」ではない)" },
    { letter: "ś", reading: "シ", note: "siと似た柔らかい「シ」" },
    { letter: "ź", reading: "ジ", note: "ziと似た柔らかい「ジ」" },
    { letter: "ż", reading: "ジ", note: "硬めの「ジ」(źより強い音)" }
  ],
  digraphs: [
    { letters: "cz", reading: "チ(強め)" },
    { letters: "sz", reading: "シュ" },
    { letters: "rz", reading: "ジ(żと同じ音)" },
    { letters: "dz", reading: "ヂ/ジ" },
    { letters: "dź", reading: "ヂ(柔らかい)" },
    { letters: "dż", reading: "ヂ(強め)" }
  ],
  categories: [
    {
      id: "greetings",
      title: "挨拶・別れ",
      phrases: [
        { pl: "Cześć!", reading: "チェシチ", ja: "やあ!/またね!", note: "家族間で一番よく使う。出会いにも別れにも使える" },
        { pl: "Dzień dobry", reading: "ジェイン ドブリ", ja: "おはよう/こんにちは(丁寧)", note: "家族以外や目上の人にも" },
        { pl: "Dobry wieczór", reading: "ドブリ ヴィエチュル", ja: "こんばんは", note: "夜の挨拶" },
        { pl: "Dobranoc", reading: "ドブラノツ", ja: "おやすみなさい", note: "寝る前" },
        { pl: "Do zobaczenia", reading: "ド ゾバチェニャ", ja: "またね(次に会う予定があるとき)", note: "やや丁寧な「またね」" },
        { pl: "Do jutra", reading: "ド ユトラ", ja: "また明日", note: "" },
        { pl: "Na razie", reading: "ナ ラジェ", ja: "じゃあね(カジュアル)", note: "Cześćよりさらにくだけた別れ言葉" },
        { pl: "Jak się masz?", reading: "ヤク シェン マシュ", ja: "元気?", note: "決まり文句として丸ごと覚えればOK" },
        { pl: "Dziękuję, dobrze", reading: "ジェンクィエン、ドブジェ", ja: "ありがとう、元気だよ", note: "上の質問への定番の返し" },
        { pl: "Miło cię widzieć", reading: "ミウォ チェン ヴィジェチ", ja: "会えて嬉しい", note: "久しぶりに会ったときなど" }
      ]
    },
    {
      id: "fillers",
      title: "相槌・つなぎ言葉",
      phrases: [
        { pl: "Tak", reading: "タク", ja: "うん、そうだね", note: "相槌の基本" },
        { pl: "Właśnie", reading: "ヴワシニェ", ja: "まさに、そうそう", note: "相手の言葉に強く同意するとき" },
        { pl: "No tak", reading: "ノ タク", ja: "まあね、そうだね", note: "少し譲歩するニュアンス" },
        { pl: "Naprawdę?", reading: "ナプラヴデン", ja: "本当に?", note: "驚いたときの相槌" },
        { pl: "Serio?", reading: "セリオ", ja: "マジで?", note: "カジュアルな驚き" },
        { pl: "Rozumiem", reading: "ロズミェム", ja: "わかります、なるほど", note: "理解を示す" },
        { pl: "No właśnie", reading: "ノ ヴワシニェ", ja: "そうそう、それそれ", note: "強い同意" },
        { pl: "To znaczy...", reading: "ト ズナチィ", ja: "つまり…", note: "言い換えるときのつなぎ" },
        { pl: "Czyli...", reading: "チリ", ja: "つまり…、というわけで…", note: "まとめるときのつなぎ" },
        { pl: "Wiesz co?", reading: "ヴィェシュ ツォ", ja: "ねえ、知ってる?", note: "話し始めるときの前置き" }
      ]
    },
    {
      id: "feelings",
      title: "気持ち・体調を伝える",
      phrases: [
        { pl: "Czuję się dobrze", reading: "チュイェン シェン ドブジェ", ja: "気分がいいです", note: "体調・気分を伝える基本形" },
        { pl: "Czuję się źle", reading: "チュイェン シェン ジレ", ja: "気分が悪いです", note: "" },
        { pl: "Jestem zmęczony/zmęczona", reading: "イェステム ズメンチョヌィ/ズメンチョナ", ja: "疲れています", note: "男性はzmęczony、女性はzmęczonaを使う" },
        { pl: "Jestem głodny/głodna", reading: "イェステム グウォドヌィ/グウォドナ", ja: "お腹が空いた", note: "男性形/女性形の順" },
        { pl: "Chce mi się spać", reading: "ヘツェ ミ シェン スパチ", ja: "眠いです", note: "" },
        { pl: "Boli mnie głowa", reading: "ボリ ムニェ グウォヴァ", ja: "頭が痛いです", note: "他の部位はgłowaを入れ替えて使う" },
        { pl: "Jestem szczęśliwy/szczęśliwa", reading: "イェステム シチェンシリヴィ/シチェンシリヴァ", ja: "幸せです", note: "男性形/女性形の順" },
        { pl: "Jestem smutny/smutna", reading: "イェステム スムトゥヌィ/スムトゥナ", ja: "悲しいです", note: "男性形/女性形の順" },
        { pl: "Wszystko w porządku", reading: "フシストコ フ ポジョンドク", ja: "大丈夫だよ、問題ないよ", note: "心配されたときの返事にも使える" },
        { pl: "Trochę się denerwuję", reading: "トロヘン シェン デネルヴイェン", ja: "ちょっと緊張してる/イライラしてる", note: "" }
      ]
    },
    {
      id: "questions",
      title: "質問する・聞き返す",
      phrases: [
        { pl: "Co?", reading: "ツォ", ja: "何?", note: "聞き取れなかったときにも使うがややぶっきらぼう" },
        { pl: "Słucham?", reading: "スウハム", ja: "もう一度言ってもらえますか?", note: "丁寧な聞き返し" },
        { pl: "Możesz powtórzyć?", reading: "モジェシュ ポフトゥジチ", ja: "もう一回言ってくれる?", note: "" },
        { pl: "Co to znaczy?", reading: "ツォ ト ズナチィ", ja: "それどういう意味?", note: "" },
        { pl: "Jak to powiedzieć po polsku?", reading: "ヤク ト ポヴィェジェチ ポ ポルスク", ja: "ポーランド語でどう言うの?", note: "" },
        { pl: "Gdzie jest...?", reading: "グジェ イェスト", ja: "…はどこ?", note: "「…」に場所や物を入れる" },
        { pl: "Kiedy...?", reading: "キェディ", ja: "いつ…?", note: "" },
        { pl: "Dlaczego?", reading: "ドラチェゴ", ja: "なぜ?", note: "" },
        { pl: "Co robisz?", reading: "ツォ ロビシュ", ja: "何してるの?", note: "" },
        { pl: "Rozumiesz?", reading: "ロズミェシュ", ja: "わかる?", note: "" }
      ]
    },
    {
      id: "requests",
      title: "お願い・感謝・謝罪",
      phrases: [
        { pl: "Proszę", reading: "プロシェン", ja: "お願いします、どうぞ", note: "依頼にも「どうぞ」にも使う万能語" },
        { pl: "Dziękuję", reading: "ジェンクィエン", ja: "ありがとう", note: "" },
        { pl: "Dziękuję bardzo", reading: "ジェンクィエン バルヅォ", ja: "どうもありがとう", note: "" },
        { pl: "Nie ma za co", reading: "ニェ マ ザ ツォ", ja: "どういたしまして", note: "" },
        { pl: "Przepraszam", reading: "プシェプラシャム", ja: "すみません、ごめんなさい", note: "" },
        { pl: "Czy możesz mi pomóc?", reading: "チ モジェシュ ミ ポムツ", ja: "手伝ってくれる?", note: "" },
        { pl: "Mogę prosić o...?", reading: "モゲン プロシチ オ", ja: "…をお願いできますか?", note: "「…」に欲しい物を入れる" },
        { pl: "Nie szkodzi", reading: "ニェ シュコジ", ja: "大丈夫だよ、気にしないで", note: "" },
        { pl: "Dzięki", reading: "ジェンキ", ja: "ありがと(カジュアル)", note: "Dziękujęのくだけた形" },
        { pl: "Przepraszam za spóźnienie", reading: "プシェプラシャム ザ スプジニェニェ", ja: "遅れてごめんなさい", note: "" }
      ]
    },
    {
      id: "answers",
      title: "簡単な返事",
      phrases: [
        { pl: "Tak", reading: "タク", ja: "はい", note: "" },
        { pl: "Nie", reading: "ニェ", ja: "いいえ", note: "" },
        { pl: "Może", reading: "モジェ", ja: "たぶん、かもね", note: "" },
        { pl: "Nie wiem", reading: "ニェ ヴィェム", ja: "わからない", note: "" },
        { pl: "Chyba tak", reading: "ヒバ タク", ja: "たぶんそう", note: "" },
        { pl: "Oczywiście", reading: "オチヴィシチェ", ja: "もちろん", note: "" },
        { pl: "Dobrze", reading: "ドブジェ", ja: "いいよ、わかった", note: "" },
        { pl: "Jasne", reading: "ヤスネ", ja: "もちろん、了解", note: "" },
        { pl: "W porządku", reading: "フ ポジョンドク", ja: "オーケー、大丈夫", note: "" },
        { pl: "Chwilowo nie", reading: "フヴィロヴォ ニェ", ja: "今のところはいいや", note: "" }
      ]
    },
    {
      id: "family",
      title: "家族の会話でよく出る一言",
      phrases: [
        { pl: "Dobranoc", reading: "ドブラノツ", ja: "おやすみなさい", note: "" },
        { pl: "Śpij dobrze", reading: "シピイ ドブジェ", ja: "よく眠ってね", note: "" },
        { pl: "Wracam!", reading: "ヴラツァム", ja: "行ってきます!/ただいま!", note: "出かける前にも帰宅時にも使える(文脈次第)" },
        { pl: "Już jestem w domu", reading: "ユシュ イェステム ヴ ドム", ja: "もう家に着いたよ", note: "" },
        { pl: "Idę już", reading: "イデン ユシュ", ja: "もう行くね", note: "" },
        { pl: "Smacznego", reading: "スマチネゴ", ja: "いただきます", note: "食事を始める前の決まり文句" },
        { pl: "Na zdrowie", reading: "ナ ズドロヴィェ", ja: "乾杯!/お大事に", note: "くしゃみをした人にも、乾杯の時にも使う" },
        { pl: "Kocham cię", reading: "コハム チェン", ja: "愛してるよ", note: "" },
        { pl: "Tęsknię za tobą", reading: "テンスクニェン ザ トバン", ja: "会いたいよ、恋しいよ", note: "" },
        { pl: "Uważaj na siebie", reading: "ウヴァジャイ ナ シェビェ", ja: "気をつけてね", note: "" }
      ]
    },
    {
      id: "numbers",
      title: "数字",
      phrases: [
        { pl: "zero", reading: "ゼロ", ja: "0", note: "" },
        { pl: "jeden", reading: "イェデン", ja: "1", note: "" },
        { pl: "dwa", reading: "ドヴァ", ja: "2", note: "" },
        { pl: "trzy", reading: "トシ", ja: "3", note: "" },
        { pl: "cztery", reading: "チュテリ", ja: "4", note: "" },
        { pl: "pięć", reading: "ピェンチ", ja: "5", note: "" },
        { pl: "sześć", reading: "シェシチ", ja: "6", note: "" },
        { pl: "siedem", reading: "シェデム", ja: "7", note: "" },
        { pl: "osiem", reading: "オシェム", ja: "8", note: "" },
        { pl: "dziewięć", reading: "ジェヴィェンチ", ja: "9", note: "" },
        { pl: "dziesięć", reading: "ジェシェンチ", ja: "10", note: "" },
        { pl: "dwadzieścia", reading: "ドヴァジェシチャ", ja: "20", note: "" },
        { pl: "pięćdziesiąt", reading: "ピェンチジェショント", ja: "50", note: "" },
        { pl: "sto", reading: "スト", ja: "100", note: "" },
        { pl: "Ile masz lat?", reading: "イレ マシュ ラト", ja: "何歳ですか?", note: "年齢の聞き方" },
        { pl: "Mam trzydzieści lat", reading: "マム トシジェシチ ラト", ja: "30歳です", note: "Mam ○○ latで「○○歳です」" },
        { pl: "Która godzina?", reading: "クトゥラ ゴジナ", ja: "今何時?", note: "時間の聞き方" },
        { pl: "Ile to kosztuje?", reading: "イレ ト コシュトゥイェ", ja: "これいくら?", note: "値段の聞き方" }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { POLISH_DATA };
}
