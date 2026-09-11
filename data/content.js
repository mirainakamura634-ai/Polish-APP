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
        { pl: "Dzień dobry", reading: "ジェイン ドブリ", ja: "おはよう/こんにちは(丁寧)", note: "家族以外や目上の人にも", breakdown: [
          { word: "Dzień", reading: "ジェイン", ja: "日、昼" },
          { word: "dobry", reading: "ドブリ", ja: "良い" }
        ] },
        { pl: "Dobry wieczór", reading: "ドブリ ヴィエチュル", ja: "こんばんは", note: "夜の挨拶", breakdown: [
          { word: "Dobry", reading: "ドブリ", ja: "良い" },
          { word: "wieczór", reading: "ヴィエチュル", ja: "夜、晩" }
        ] },
        { pl: "Dobranoc", reading: "ドブラノツ", ja: "おやすみなさい", note: "寝る前" },
        { pl: "Do zobaczenia", reading: "ド ゾバチェニャ", ja: "またね(次に会う予定があるとき)", note: "やや丁寧な「またね」", breakdown: [
          { word: "Do", reading: "ド", ja: "〜まで" },
          { word: "zobaczenia", reading: "ゾバチェニャ", ja: "会うこと、見ること" }
        ] },
        { pl: "Do jutra", reading: "ド ユトラ", ja: "また明日", note: "", breakdown: [
          { word: "Do", reading: "ド", ja: "〜まで" },
          { word: "jutra", reading: "ユトラ", ja: "明日の" }
        ] },
        { pl: "Na razie", reading: "ナ ラジェ", ja: "じゃあね(カジュアル)", note: "Cześćよりさらにくだけた別れ言葉", breakdown: [
          { word: "Na", reading: "ナ", ja: "〜に" },
          { word: "razie", reading: "ラジェ", ja: "今のところ" }
        ] },
        { pl: "Jak się masz?", reading: "ヤク シェン マシュ", ja: "元気?", note: "決まり文句として丸ごと覚えればOK", breakdown: [
          { word: "Jak", reading: "ヤク", ja: "どのように" },
          { word: "się", reading: "シェン", ja: "自分を(再帰)" },
          { word: "masz", reading: "マシュ", ja: "持っている(あなたは)" }
        ] },
        { pl: "Dziękuję, dobrze", reading: "ジェンクィエン、ドブジェ", ja: "ありがとう、元気だよ", note: "上の質問への定番の返し", breakdown: [
          { word: "Dziękuję", reading: "ジェンクィエン", ja: "ありがとう" },
          { word: "dobrze", reading: "ドブジェ", ja: "良く、元気に" }
        ] },
        { pl: "Miło cię widzieć", reading: "ミウォ チェン ヴィジェチ", ja: "会えて嬉しい", note: "久しぶりに会ったときなど", breakdown: [
          { word: "Miło", reading: "ミウォ", ja: "嬉しく" },
          { word: "cię", reading: "チェン", ja: "あなたを" },
          { word: "widzieć", reading: "ヴィジェチ", ja: "見ること、会うこと" }
        ] }
      ]
    },
    {
      id: "fillers",
      title: "相槌・つなぎ言葉",
      phrases: [
        { pl: "Tak", reading: "タク", ja: "うん、そうだね", note: "相槌の基本" },
        { pl: "Właśnie", reading: "ヴワシニェ", ja: "まさに、そうそう", note: "相手の言葉に強く同意するとき" },
        { pl: "No tak", reading: "ノ タク", ja: "まあね、そうだね", note: "少し譲歩するニュアンス", breakdown: [
          { word: "No", reading: "ノ", ja: "まあ、ね" },
          { word: "tak", reading: "タク", ja: "そう" }
        ] },
        { pl: "Naprawdę?", reading: "ナプラヴデン", ja: "本当に?", note: "驚いたときの相槌" },
        { pl: "Serio?", reading: "セリオ", ja: "マジで?", note: "カジュアルな驚き" },
        { pl: "Rozumiem", reading: "ロズミェム", ja: "わかります、なるほど", note: "理解を示す" },
        { pl: "No właśnie", reading: "ノ ヴワシニェ", ja: "そうそう、それそれ", note: "強い同意", breakdown: [
          { word: "No", reading: "ノ", ja: "まあ、ね" },
          { word: "właśnie", reading: "ヴワシニェ", ja: "まさに" }
        ] },
        { pl: "To znaczy...", reading: "ト ズナチィ", ja: "つまり…", note: "言い換えるときのつなぎ", breakdown: [
          { word: "To", reading: "ト", ja: "それは" },
          { word: "znaczy", reading: "ズナチィ", ja: "意味する" }
        ] },
        { pl: "Czyli...", reading: "チリ", ja: "つまり…、というわけで…", note: "まとめるときのつなぎ" },
        { pl: "Wiesz co?", reading: "ヴィェシュ ツォ", ja: "ねえ、知ってる?", note: "話し始めるときの前置き", breakdown: [
          { word: "Wiesz", reading: "ヴィェシュ", ja: "知っている(あなたは)" },
          { word: "co", reading: "ツォ", ja: "何" }
        ] }
      ]
    },
    {
      id: "feelings",
      title: "気持ち・体調を伝える",
      phrases: [
        { pl: "Czuję się dobrze", reading: "チュイェン シェン ドブジェ", ja: "気分がいいです", note: "体調・気分を伝える基本形", breakdown: [
          { word: "Czuję", reading: "チュイェン", ja: "感じる(私は)" },
          { word: "się", reading: "シェン", ja: "自分を(再帰)" },
          { word: "dobrze", reading: "ドブジェ", ja: "良く" }
        ] },
        { pl: "Czuję się źle", reading: "チュイェン シェン ジレ", ja: "気分が悪いです", note: "", breakdown: [
          { word: "Czuję", reading: "チュイェン", ja: "感じる(私は)" },
          { word: "się", reading: "シェン", ja: "自分を(再帰)" },
          { word: "źle", reading: "ジレ", ja: "悪く" }
        ] },
        { pl: "Jestem zmęczony/zmęczona", reading: "イェステム ズメンチョヌィ/ズメンチョナ", ja: "疲れています", note: "男性はzmęczony、女性はzmęczonaを使う", breakdown: [
          { word: "Jestem", reading: "イェステム", ja: "私は〜です" },
          { word: "zmęczony/zmęczona", reading: "ズメンチョヌィ/ズメンチョナ", ja: "疲れた" }
        ] },
        { pl: "Jestem głodny/głodna", reading: "イェステム グウォドヌィ/グウォドナ", ja: "お腹が空いた", note: "男性形/女性形の順", breakdown: [
          { word: "Jestem", reading: "イェステム", ja: "私は〜です" },
          { word: "głodny/głodna", reading: "グウォドヌィ/グウォドナ", ja: "空腹な" }
        ] },
        { pl: "Chce mi się spać", reading: "ヘツェ ミ シェン スパチ", ja: "眠いです", note: "", breakdown: [
          { word: "Chce", reading: "ヘツェ", ja: "欲する(〜が)" },
          { word: "mi", reading: "ミ", ja: "私に" },
          { word: "się", reading: "シェン", ja: "自分を(再帰)" },
          { word: "spać", reading: "スパチ", ja: "眠ること" }
        ] },
        { pl: "Boli mnie głowa", reading: "ボリ ムニェ グウォヴァ", ja: "頭が痛いです", note: "他の部位はgłowaを入れ替えて使う", breakdown: [
          { word: "Boli", reading: "ボリ", ja: "痛む" },
          { word: "mnie", reading: "ムニェ", ja: "私を" },
          { word: "głowa", reading: "グウォヴァ", ja: "頭" }
        ] },
        { pl: "Jestem szczęśliwy/szczęśliwa", reading: "イェステム シチェンシリヴィ/シチェンシリヴァ", ja: "幸せです", note: "男性形/女性形の順", breakdown: [
          { word: "Jestem", reading: "イェステム", ja: "私は〜です" },
          { word: "szczęśliwy/szczęśliwa", reading: "シチェンシリヴィ/シチェンシリヴァ", ja: "幸せな" }
        ] },
        { pl: "Jestem smutny/smutna", reading: "イェステム スムトゥヌィ/スムトゥナ", ja: "悲しいです", note: "男性形/女性形の順", breakdown: [
          { word: "Jestem", reading: "イェステム", ja: "私は〜です" },
          { word: "smutny/smutna", reading: "スムトゥヌィ/スムトゥナ", ja: "悲しい" }
        ] },
        { pl: "Wszystko w porządku", reading: "フシストコ フ ポジョンドク", ja: "大丈夫だよ、問題ないよ", note: "心配されたときの返事にも使える", breakdown: [
          { word: "Wszystko", reading: "フシストコ", ja: "すべて" },
          { word: "w", reading: "フ", ja: "〜の中に" },
          { word: "porządku", reading: "ポジョンドク", ja: "秩序、順序" }
        ] },
        { pl: "Trochę się denerwuję", reading: "トロヘン シェン デネルヴイェン", ja: "ちょっと緊張してる/イライラしてる", note: "", breakdown: [
          { word: "Trochę", reading: "トロヘン", ja: "少し" },
          { word: "się", reading: "シェン", ja: "自分を(再帰)" },
          { word: "denerwuję", reading: "デネルヴイェン", ja: "イライラさせる、緊張させる(私は)" }
        ] }
      ]
    },
    {
      id: "questions",
      title: "質問する・聞き返す",
      phrases: [
        { pl: "Co?", reading: "ツォ", ja: "何?", note: "聞き取れなかったときにも使うがややぶっきらぼう" },
        { pl: "Słucham?", reading: "スウハム", ja: "もう一度言ってもらえますか?", note: "丁寧な聞き返し" },
        { pl: "Możesz powtórzyć?", reading: "モジェシュ ポフトゥジチ", ja: "もう一回言ってくれる?", note: "", breakdown: [
          { word: "Możesz", reading: "モジェシュ", ja: "できる(あなたは)" },
          { word: "powtórzyć", reading: "ポフトゥジチ", ja: "繰り返すこと" }
        ] },
        { pl: "Co to znaczy?", reading: "ツォ ト ズナチィ", ja: "それどういう意味?", note: "", breakdown: [
          { word: "Co", reading: "ツォ", ja: "何" },
          { word: "to", reading: "ト", ja: "それは" },
          { word: "znaczy", reading: "ズナチィ", ja: "意味する" }
        ] },
        { pl: "Jak to powiedzieć po polsku?", reading: "ヤク ト ポヴィェジェチ ポ ポルスク", ja: "ポーランド語でどう言うの?", note: "", breakdown: [
          { word: "Jak", reading: "ヤク", ja: "どのように" },
          { word: "to", reading: "ト", ja: "それを" },
          { word: "powiedzieć", reading: "ポヴィェジェチ", ja: "言うこと" },
          { word: "po", reading: "ポ", ja: "〜語で" },
          { word: "polsku", reading: "ポルスク", ja: "ポーランドの(言葉)" }
        ] },
        { pl: "Gdzie jest...?", reading: "グジェ イェスト", ja: "…はどこ?", note: "「…」に場所や物を入れる", breakdown: [
          { word: "Gdzie", reading: "グジェ", ja: "どこ" },
          { word: "jest", reading: "イェスト", ja: "〜がある、〜です" }
        ] },
        { pl: "Kiedy...?", reading: "キェディ", ja: "いつ…?", note: "" },
        { pl: "Dlaczego?", reading: "ドラチェゴ", ja: "なぜ?", note: "" },
        { pl: "Co robisz?", reading: "ツォ ロビシュ", ja: "何してるの?", note: "", breakdown: [
          { word: "Co", reading: "ツォ", ja: "何を" },
          { word: "robisz", reading: "ロビシュ", ja: "している(あなたは)" }
        ] },
        { pl: "Rozumiesz?", reading: "ロズミェシュ", ja: "わかる?", note: "" }
      ]
    },
    {
      id: "requests",
      title: "お願い・感謝・謝罪",
      phrases: [
        { pl: "Proszę", reading: "プロシェン", ja: "お願いします、どうぞ", note: "依頼にも「どうぞ」にも使う万能語" },
        { pl: "Dziękuję", reading: "ジェンクィエン", ja: "ありがとう", note: "" },
        { pl: "Dziękuję bardzo", reading: "ジェンクィエン バルヅォ", ja: "どうもありがとう", note: "", breakdown: [
          { word: "Dziękuję", reading: "ジェンクィエン", ja: "ありがとう" },
          { word: "bardzo", reading: "バルヅォ", ja: "とても" }
        ] },
        { pl: "Nie ma za co", reading: "ニェ マ ザ ツォ", ja: "どういたしまして", note: "", breakdown: [
          { word: "Nie", reading: "ニェ", ja: "〜ない" },
          { word: "ma", reading: "マ", ja: "ある" },
          { word: "za", reading: "ザ", ja: "〜に対して" },
          { word: "co", reading: "ツォ", ja: "何" }
        ] },
        { pl: "Przepraszam", reading: "プシェプラシャム", ja: "すみません、ごめんなさい", note: "" },
        { pl: "Czy możesz mi pomóc?", reading: "チ モジェシュ ミ ポムツ", ja: "手伝ってくれる?", note: "", breakdown: [
          { word: "Czy", reading: "チ", ja: "〜ですか(疑問)" },
          { word: "możesz", reading: "モジェシュ", ja: "できる(あなたは)" },
          { word: "mi", reading: "ミ", ja: "私に" },
          { word: "pomóc", reading: "ポムツ", ja: "助けること" }
        ] },
        { pl: "Mogę ci pomóc?", reading: "モゲン チ ポムツ", ja: "手伝おうか?", note: "自分から手伝いを申し出るとき", breakdown: [
          { word: "Mogę", reading: "モゲン", ja: "できる(私は)" },
          { word: "ci", reading: "チ", ja: "あなたに" },
          { word: "pomóc", reading: "ポムツ", ja: "助けること" }
        ] },
        { pl: "Pomóż mi!", reading: "ポムシュ ミ", ja: "手伝って!", note: "直接的なお願い(命令形)", breakdown: [
          { word: "Pomóż", reading: "ポムシュ", ja: "助けて(命令形)" },
          { word: "mi", reading: "ミ", ja: "私に" }
        ] },
        { pl: "Mogę prosić o...?", reading: "モゲン プロシチ オ", ja: "…をお願いできますか?", note: "「…」に欲しい物を入れる", breakdown: [
          { word: "Mogę", reading: "モゲン", ja: "できる(私は)" },
          { word: "prosić", reading: "プロシチ", ja: "頼むこと" },
          { word: "o", reading: "オ", ja: "〜を" }
        ] },
        { pl: "Nie szkodzi", reading: "ニェ シュコジ", ja: "大丈夫だよ、気にしないで", note: "", breakdown: [
          { word: "Nie", reading: "ニェ", ja: "〜ない" },
          { word: "szkodzi", reading: "シュコジ", ja: "害する" }
        ] },
        { pl: "Dzięki", reading: "ジェンキ", ja: "ありがと(カジュアル)", note: "Dziękujęのくだけた形" },
        { pl: "Przepraszam za spóźnienie", reading: "プシェプラシャム ザ スプジニェニェ", ja: "遅れてごめんなさい", note: "", breakdown: [
          { word: "Przepraszam", reading: "プシェプラシャム", ja: "謝る(私は)" },
          { word: "za", reading: "ザ", ja: "〜について" },
          { word: "spóźnienie", reading: "スプジニェニェ", ja: "遅刻" }
        ] }
      ]
    },
    {
      id: "answers",
      title: "簡単な返事",
      phrases: [
        { pl: "Tak", reading: "タク", ja: "はい", note: "" },
        { pl: "Nie", reading: "ニェ", ja: "いいえ", note: "" },
        { pl: "Może", reading: "モジェ", ja: "たぶん、かもね", note: "" },
        { pl: "Nie wiem", reading: "ニェ ヴィェム", ja: "わからない", note: "", breakdown: [
          { word: "Nie", reading: "ニェ", ja: "〜ない" },
          { word: "wiem", reading: "ヴィェム", ja: "知っている(私は)" }
        ] },
        { pl: "Chyba tak", reading: "ヒバ タク", ja: "たぶんそう", note: "", breakdown: [
          { word: "Chyba", reading: "ヒバ", ja: "たぶん" },
          { word: "tak", reading: "タク", ja: "そう" }
        ] },
        { pl: "Oczywiście", reading: "オチヴィシチェ", ja: "もちろん", note: "" },
        { pl: "Dobrze", reading: "ドブジェ", ja: "いいよ、わかった", note: "" },
        { pl: "Jasne", reading: "ヤスネ", ja: "もちろん、了解", note: "" },
        { pl: "W porządku", reading: "フ ポジョンドク", ja: "オーケー、大丈夫", note: "", breakdown: [
          { word: "W", reading: "フ", ja: "〜の中に" },
          { word: "porządku", reading: "ポジョンドク", ja: "秩序、順序" }
        ] },
        { pl: "Chwilowo nie", reading: "フヴィロヴォ ニェ", ja: "今のところはいいや", note: "", breakdown: [
          { word: "Chwilowo", reading: "フヴィロヴォ", ja: "今のところ、一時的に" },
          { word: "nie", reading: "ニェ", ja: "〜ない" }
        ] }
      ]
    },
    {
      id: "family",
      title: "家族の会話でよく出る一言",
      phrases: [
        { pl: "Dobranoc", reading: "ドブラノツ", ja: "おやすみなさい", note: "" },
        { pl: "Śpij dobrze", reading: "シピイ ドブジェ", ja: "よく眠ってね", note: "", breakdown: [
          { word: "Śpij", reading: "シピイ", ja: "眠って(命令形)" },
          { word: "dobrze", reading: "ドブジェ", ja: "良く" }
        ] },
        { pl: "Wracam!", reading: "ヴラツァム", ja: "行ってきます!/ただいま!", note: "出かける前にも帰宅時にも使える(文脈次第)" },
        { pl: "Już jestem w domu", reading: "ユシュ イェステム ヴ ドム", ja: "もう家に着いたよ", note: "", breakdown: [
          { word: "Już", reading: "ユシュ", ja: "もう" },
          { word: "jestem", reading: "イェステム", ja: "私は〜です" },
          { word: "w", reading: "ヴ", ja: "〜の中に" },
          { word: "domu", reading: "ドム", ja: "家" }
        ] },
        { pl: "Idę już", reading: "イデン ユシュ", ja: "もう行くね", note: "", breakdown: [
          { word: "Idę", reading: "イデン", ja: "行く(私は)" },
          { word: "już", reading: "ユシュ", ja: "もう" }
        ] },
        { pl: "Smacznego", reading: "スマチネゴ", ja: "いただきます", note: "食事を始める前の決まり文句" },
        { pl: "Na zdrowie", reading: "ナ ズドロヴィェ", ja: "乾杯!/お大事に", note: "くしゃみをした人にも、乾杯の時にも使う", breakdown: [
          { word: "Na", reading: "ナ", ja: "〜に" },
          { word: "zdrowie", reading: "ズドロヴィェ", ja: "健康" }
        ] },
        { pl: "Kocham cię", reading: "コハム チェン", ja: "愛してるよ", note: "", breakdown: [
          { word: "Kocham", reading: "コハム", ja: "愛する(私は)" },
          { word: "cię", reading: "チェン", ja: "あなたを" }
        ] },
        { pl: "Tęsknię za tobą", reading: "テンスクニェン ザ トバン", ja: "会いたいよ、恋しいよ", note: "", breakdown: [
          { word: "Tęsknię", reading: "テンスクニェン", ja: "恋しく思う(私は)" },
          { word: "za", reading: "ザ", ja: "〜を" },
          { word: "tobą", reading: "トバン", ja: "あなた" }
        ] },
        { pl: "Uważaj na siebie", reading: "ウヴァジャイ ナ シェビェ", ja: "気をつけてね", note: "", breakdown: [
          { word: "Uważaj", reading: "ウヴァジャイ", ja: "気をつけて(命令形)" },
          { word: "na", reading: "ナ", ja: "〜に" },
          { word: "siebie", reading: "シェビェ", ja: "自分自身" }
        ] },
        { pl: "Pobawmy się znowu", reading: "ポバヴミ シェン ズノヴ", ja: "また遊ぼうね", note: "子供や家族とのカジュアルな誘い文句", breakdown: [
          { word: "Pobawmy", reading: "ポバヴミ", ja: "遊ぼう(勧誘形)" },
          { word: "się", reading: "シェン", ja: "自分を(再帰)" },
          { word: "znowu", reading: "ズノヴ", ja: "また" }
        ] },
        { pl: "Powodzenia!", reading: "ポヴォゼニャ", ja: "頑張ってね!/幸運を!", note: "出かける家族を応援するときの決まり文句" }
      ]
    },
    {
      id: "colors",
      title: "色",
      phrases: [
        { pl: "czerwony", reading: "チェルヴォヌィ", ja: "赤", note: "形容詞は名詞の性で語尾が変わる(ここでは男性形)。例: czerwony dom(赤い家)" },
        { pl: "niebieski", reading: "ニェビェスキ", ja: "青", note: "" },
        { pl: "żółty", reading: "ジュウティ", ja: "黄色", note: "" },
        { pl: "zielony", reading: "ジェロヌィ", ja: "緑", note: "" },
        { pl: "czarny", reading: "チャルヌィ", ja: "黒", note: "" },
        { pl: "biały", reading: "ビャウィ", ja: "白", note: "" },
        { pl: "różowy", reading: "ルジョヴィ", ja: "ピンク", note: "" },
        { pl: "szary", reading: "シャルィ", ja: "グレー", note: "" },
        { pl: "brązowy", reading: "ブロンゾヴィ", ja: "茶色", note: "" },
        { pl: "fioletowy", reading: "フィオレトヴィ", ja: "紫", note: "" },
        { pl: "Jakiego to jest koloru?", reading: "ヤキェゴ ト イェスト コロル", ja: "これは何色?", note: "色を尋ねる決まり文句", breakdown: [
          { word: "Jakiego", reading: "ヤキェゴ", ja: "どんな" },
          { word: "to", reading: "ト", ja: "これは" },
          { word: "jest", reading: "イェスト", ja: "〜です" },
          { word: "koloru", reading: "コロル", ja: "色の" }
        ] }
      ]
    },
    {
      id: "weather",
      title: "天気",
      phrases: [
        { pl: "Jaka jest dzisiaj pogoda?", reading: "ヤカ イェスト ジシャイ ポゴダ", ja: "今日の天気は?", note: "天気を尋ねる基本フレーズ", breakdown: [
          { word: "Jaka", reading: "ヤカ", ja: "どんな" },
          { word: "jest", reading: "イェスト", ja: "〜です" },
          { word: "dzisiaj", reading: "ジシャイ", ja: "今日" },
          { word: "pogoda", reading: "ポゴダ", ja: "天気" }
        ] },
        { pl: "Jest słonecznie", reading: "イェスト スウォネチニェ", ja: "晴れてるよ", note: "", breakdown: [
          { word: "Jest", reading: "イェスト", ja: "〜です" },
          { word: "słonecznie", reading: "スウォネチニェ", ja: "晴れて" }
        ] },
        { pl: "Pada deszcz", reading: "パダ デシュチ", ja: "雨が降ってる", note: "", breakdown: [
          { word: "Pada", reading: "パダ", ja: "降る" },
          { word: "deszcz", reading: "デシュチ", ja: "雨" }
        ] },
        { pl: "Pada śnieg", reading: "パダ シニェク", ja: "雪が降ってる", note: "", breakdown: [
          { word: "Pada", reading: "パダ", ja: "降る" },
          { word: "śnieg", reading: "シニェク", ja: "雪" }
        ] },
        { pl: "Jest zimno", reading: "イェスト ジムノ", ja: "寒い", note: "", breakdown: [
          { word: "Jest", reading: "イェスト", ja: "〜です" },
          { word: "zimno", reading: "ジムノ", ja: "寒く" }
        ] },
        { pl: "Jest gorąco", reading: "イェスト ゴロンツォ", ja: "暑い", note: "", breakdown: [
          { word: "Jest", reading: "イェスト", ja: "〜です" },
          { word: "gorąco", reading: "ゴロンツォ", ja: "暑く" }
        ] },
        { pl: "Jest ciepło", reading: "イェスト チェプウォ", ja: "暖かい", note: "", breakdown: [
          { word: "Jest", reading: "イェスト", ja: "〜です" },
          { word: "ciepło", reading: "チェプウォ", ja: "暖かく" }
        ] },
        { pl: "Jest wietrznie", reading: "イェスト ヴィェトシニェ", ja: "風が強い", note: "", breakdown: [
          { word: "Jest", reading: "イェスト", ja: "〜です" },
          { word: "wietrznie", reading: "ヴィェトシニェ", ja: "風が強く" }
        ] },
        { pl: "Jest pochmurno", reading: "イェスト ポフムルノ", ja: "曇ってる", note: "", breakdown: [
          { word: "Jest", reading: "イェスト", ja: "〜です" },
          { word: "pochmurno", reading: "ポフムルノ", ja: "曇って" }
        ] },
        { pl: "Będzie ładna pogoda", reading: "ベンジェ ワドナ ポゴダ", ja: "いい天気になるよ", note: "", breakdown: [
          { word: "Będzie", reading: "ベンジェ", ja: "〜になるだろう" },
          { word: "ładna", reading: "ワドナ", ja: "良い、素敵な" },
          { word: "pogoda", reading: "ポゴダ", ja: "天気" }
        ] },
        { pl: "słonecznie", reading: "スウォネチニェ", ja: "晴れ", note: "天気を表す副詞。Jest słonecznie(晴れてるよ)の形で使う" },
        { pl: "deszcz", reading: "デシュチ", ja: "雨", note: "雨そのものを表す名詞。Pada deszcz(雨が降ってる)のように使う" },
        { pl: "pochmurno", reading: "ポフムルノ", ja: "曇り", note: "天気を表す副詞。Jest pochmurno(曇ってるよ)の形で使う" },
        { pl: "śnieg", reading: "シニェク", ja: "雪", note: "雪そのものを表す名詞。Pada śnieg(雪が降ってる)のように使う" },
        { pl: "wiatr", reading: "ヴィアトル", ja: "風", note: "風そのものを表す名詞" },
        { pl: "Jest chłodno", reading: "イェスト フウォドノ", ja: "涼しい", note: "", breakdown: [
          { word: "Jest", reading: "イェスト", ja: "〜です" },
          { word: "chłodno", reading: "フウォドノ", ja: "涼しく" }
        ] }
      ]
    },
    {
      id: "impressions",
      title: "好み・感想",
      phrases: [
        { pl: "Lubię to", reading: "ルビェン ト", ja: "これが好き", note: "Lubię ○○で「○○が好き」というパターンにも使える", breakdown: [
          { word: "Lubię", reading: "ルビェン", ja: "好き(私は)" },
          { word: "to", reading: "ト", ja: "これ" }
        ] },
        { pl: "Bardzo lubię to", reading: "バルヅォ ルビェン ト", ja: "これがすごく好き", note: "", breakdown: [
          { word: "Bardzo", reading: "バルヅォ", ja: "とても" },
          { word: "lubię", reading: "ルビェン", ja: "好き(私は)" },
          { word: "to", reading: "ト", ja: "これ" }
        ] },
        { pl: "Chcę to", reading: "フツェン ト", ja: "これが欲しい", note: "Chcę ○○で「○○が欲しい」というパターンにも使える", breakdown: [
          { word: "Chcę", reading: "フツェン", ja: "欲しい(私は)" },
          { word: "to", reading: "ト", ja: "これ" }
        ] },
        { pl: "Nie chcę tego", reading: "ニェ フツェン テゴ", ja: "これはいらない", note: "", breakdown: [
          { word: "Nie", reading: "ニェ", ja: "〜ない" },
          { word: "chcę", reading: "フツェン", ja: "欲しい(私は)" },
          { word: "tego", reading: "テゴ", ja: "これを" }
        ] },
        { pl: "Pyszne!", reading: "プィシュネ", ja: "おいしい!", note: "" },
        { pl: "Niesmaczne", reading: "ニェスマチネ", ja: "まずい", note: "" },
        { pl: "Podoba mi się to", reading: "ポドバ ミ シェン ト", ja: "これ気に入った", note: "", breakdown: [
          { word: "Podoba", reading: "ポドバ", ja: "気に入る" },
          { word: "mi", reading: "ミ", ja: "私に" },
          { word: "się", reading: "シェン", ja: "自分を(再帰)" },
          { word: "to", reading: "ト", ja: "これは" }
        ] },
        { pl: "Nie podoba mi się to", reading: "ニェ ポドバ ミ シェン ト", ja: "これは好きじゃない", note: "", breakdown: [
          { word: "Nie", reading: "ニェ", ja: "〜ない" },
          { word: "podoba", reading: "ポドバ", ja: "気に入る" },
          { word: "mi", reading: "ミ", ja: "私に" },
          { word: "się", reading: "シェン", ja: "自分を(再帰)" },
          { word: "to", reading: "ト", ja: "これは" }
        ] }
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
        { pl: "Ile masz lat?", reading: "イレ マシュ ラト", ja: "何歳ですか?", note: "年齢の聞き方", breakdown: [
          { word: "Ile", reading: "イレ", ja: "いくつ" },
          { word: "masz", reading: "マシュ", ja: "持っている(あなたは)" },
          { word: "lat", reading: "ラト", ja: "歳" }
        ] },
        { pl: "Mam trzydzieści lat", reading: "マム トシジェシチ ラト", ja: "30歳です", note: "Mam ○○ latで「○○歳です」", breakdown: [
          { word: "Mam", reading: "マム", ja: "持っている(私は)" },
          { word: "trzydzieści", reading: "トシジェシチ", ja: "30" },
          { word: "lat", reading: "ラト", ja: "歳" }
        ] },
        { pl: "Która godzina?", reading: "クトゥラ ゴジナ", ja: "今何時?", note: "時間の聞き方", breakdown: [
          { word: "Która", reading: "クトゥラ", ja: "どの" },
          { word: "godzina", reading: "ゴジナ", ja: "時間" }
        ] },
        { pl: "Ile to kosztuje?", reading: "イレ ト コシュトゥイェ", ja: "これいくら?", note: "値段の聞き方", breakdown: [
          { word: "Ile", reading: "イレ", ja: "いくら" },
          { word: "to", reading: "ト", ja: "これは" },
          { word: "kosztuje", reading: "コシュトゥイェ", ja: "値段がする" }
        ] }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { POLISH_DATA };
}
