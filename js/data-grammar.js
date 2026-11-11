/* Довідник граматики A1.
   ex: de|uk|ru   bad: неправильно|правильно|пояснення uk|пояснення ru
   x (вправи): речення з ___|відповідь|хибні;варіанти|пояснення uk|пояснення ru */
window.GALIAS = {haben:'sein'};
window.GRAMMAR = [
{id:'pron',t:['Особові займенники','Личные местоимения'],s:['ich, du, er, sie, es, wir, ihr, sie, Sie','ich, du, er, sie, es, wir, ihr, sie, Sie'],
rule:['Займенник замінює імʼя людини чи назву предмета і стоїть перед дієсловом.','Местоимение заменяет имя человека или название предмета и стоит перед глаголом.'],
exp:['У німецькій займенник пропускати не можна: українською кажемо «Живу в Дніпрі», німецькою — лише «Ich wohne in Dnipro». До друзів і рідних звертаємось на du, до незнайомих і старших — на Sie (завжди з великої літери).','В немецком местоимение пропускать нельзя: по-русски говорим «Живу в Днепре», по-немецки — только «Ich wohne in Dnipro». К друзьям и родным обращаемся на du, к незнакомым и старшим — на Sie (всегда с большой буквы).'],
tbl:[['Deutsch','UA','RU'],['ich','я','я'],['du','ти','ты'],['er / sie / es','він / вона / воно','он / она / оно'],['wir','ми','мы'],['ihr','ви (до кількох друзів)','вы (к нескольким друзьям)'],['sie','вони','они'],['Sie','Ви (ввічливо)','Вы (вежливо)']],
ex:`Ich bin Olena.|Я Олена.|Я Елена.
Er kommt aus Wien.|Він із Відня.|Он из Вены.
Wir lernen Deutsch.|Ми вчимо німецьку.|Мы учим немецкий.
Wie heißen Sie?|Як Вас звати?|Как Вас зовут?`,
ord:['Займенник + дієслово + решта: Ich wohne in Berlin.','Местоимение + глагол + остальное: Ich wohne in Berlin.'],
bad:`Wohne in Berlin.|Ich wohne in Berlin.|Без займенника речення неповне.|Без местоимения предложение неполное.
Wie heißt Sie?|Wie heißen Sie?|Із ввічливим Sie дієслово закінчується на -en.|С вежливым Sie глагол оканчивается на -en.`,
x:`Das ist Max. ___ kommt aus Berlin.|Er|Sie;Es|Max — чоловік, тому er.|Макс — мужчина, поэтому er.
Das ist Anna. ___ ist Lehrerin.|Sie|Er;Es|Анна — жінка, тому sie.|Анна — женщина, поэтому sie.
Olena und ich lernen Deutsch. ___ lernen jeden Tag.|Wir|Ihr;Sie|«Олена і я» разом — це wir (ми).|«Елена и я» вместе — это wir (мы).
Guten Tag, Herr Klein! Wie heißen ___?|Sie|du;ihr|До незнайомої дорослої людини — ввічливе Sie.|К незнакомому взрослому человеку — вежливое Sie.
Hallo, Tom! Woher kommst ___?|du|Sie;er|Форма kommst уживається лише з du.|Форма kommst употребляется только с du.`},

{id:'sein',t:['Дієслова sein і haben','Глаголы sein и haben'],s:['бути і мати — два найважливіші дієслова','быть и иметь — два самых важных глагола'],
rule:['sein = бути (хто я, який я, де я). haben = мати (що в мене є).','sein = быть (кто я, какой я, где я). haben = иметь (что у меня есть).'],
exp:['Українською слово «є» часто зникає: «Я студентка». Німецькою дієслово обовʼязкове: «Ich bin Studentin». Замість «у мене є» німці кажуть «я маю»: «Ich habe einen Bruder». Обидва дієслова змінюються не за правилами — їх треба просто запамʼятати.','По-русски слово «есть» часто исчезает: «Я студентка». По-немецки глагол обязателен: «Ich bin Studentin». Вместо «у меня есть» немцы говорят «я имею»: «Ich habe einen Bruder». Оба глагола меняются не по правилам — их нужно просто запомнить.'],
tbl:[['','sein','haben'],['ich','bin','habe'],['du','bist','hast'],['er / sie / es','ist','hat'],['wir','sind','haben'],['ihr','seid','habt'],['sie / Sie','sind','haben']],
ex:`Ich bin 18 Jahre alt.|Мені 18 років.|Мне 18 лет.
Du bist sehr nett.|Ти дуже приємний.|Ты очень приятный.
Wir haben zwei Kinder.|У нас двоє дітей.|У нас двое детей.
Hast du Zeit?|Ти маєш час?|У тебя есть время?`,
ord:['Дієслово стоїть на другому місці: Ich bin müde. У питанні без питального слова — на першому: Bist du müde?','Глагол стоит на втором месте: Ich bin müde. В вопросе без вопросительного слова — на первом: Bist du müde?'],
bad:`Ich 18 Jahre alt.|Ich bin 18 Jahre alt.|Дієслово sein не можна пропускати.|Глагол sein нельзя пропускать.
Ich habe 18 Jahre.|Ich bin 18 Jahre alt.|Про вік кажемо із sein, а не з haben.|О возрасте говорим с sein, а не с haben.
Er habt ein Auto.|Er hat ein Auto.|З er/sie/es форма — hat.|С er/sie/es форма — hat.`,
x:`Ich ___ Studentin.|bin|bist;habe|З ich форма дієслова sein — bin.|С ich форма глагола sein — bin.
___ du müde?|Bist|Bin;Hast|«Який ти?» — це sein; з du — bist.|«Какой ты?» — это sein; с du — bist.
Wir ___ einen Hund.|haben|sind;habt|«У нас є» — haben; з wir — haben.|«У нас есть» — haben; с wir — haben.
Meine Schwester ___ 20 Jahre alt.|ist|hat;bist|Вік — завжди з sein: sie ist.|Возраст — всегда с sein: sie ist.
___ Sie Kinder?|Haben|Sind;Hast|«Чи маєте Ви» — haben; із Sie — haben.|«Есть ли у Вас» — haben; с Sie — haben.
Er ___ keine Zeit.|hat|ist;habe|«Мати час» — Zeit haben; з er — hat.|«Иметь время» — Zeit haben; с er — hat.`},

{id:'regverbs',t:['Відмінювання правильних дієслів','Спряжение правильных глаголов'],s:['закінчення -e, -st, -t, -en, -t, -en','окончания -e, -st, -t, -en, -t, -en'],
rule:['Відкидаємо -en від початкової форми і додаємо закінчення до основи: wohnen → wohn- → ich wohne.','Отбрасываем -en от начальной формы и добавляем окончание к основе: wohnen → wohn- → ich wohne.'],
exp:['Закінчення залежить від того, хто виконує дію. Якщо основа закінчується на -t або -d (arbeiten), перед -st і -t вставляємо -e-: du arbeitest, er arbeitet. Якщо на -s, -ß, -z (heißen) — з du додаємо лише -t: du heißt.','Окончание зависит от того, кто выполняет действие. Если основа оканчивается на -t или -d (arbeiten), перед -st и -t вставляем -e-: du arbeitest, er arbeitet. Если на -s, -ß, -z (heißen) — с du добавляем только -t: du heißt.'],
tbl:[['','wohnen','lernen','arbeiten'],['ich','wohne','lerne','arbeite'],['du','wohnst','lernst','arbeitest'],['er / sie / es','wohnt','lernt','arbeitet'],['wir','wohnen','lernen','arbeiten'],['ihr','wohnt','lernt','arbeitet'],['sie / Sie','wohnen','lernen','arbeiten']],
ex:`Ich wohne in Dnipro.|Я живу в Дніпрі.|Я живу в Днепре.
Du lernst Deutsch.|Ти вчиш німецьку.|Ты учишь немецкий.
Sie arbeitet im Büro.|Вона працює в офісі.|Она работает в офисе.
Wir kommen aus der Ukraine.|Ми з України.|Мы из Украины.`,
ord:['Хто + дієслово з правильним закінченням + решта: Er wohnt in Wien.','Кто + глагол с правильным окончанием + остальное: Er wohnt in Wien.'],
bad:`Ich wohnen in Berlin.|Ich wohne in Berlin.|З ich закінчення -e, а не -en.|С ich окончание -e, а не -en.
Er komme aus Polen.|Er kommt aus Polen.|З er/sie/es закінчення -t.|С er/sie/es окончание -t.
Du arbeitst viel.|Du arbeitest viel.|Після -t потрібне додаткове -e-.|После -t нужно дополнительное -e-.`,
x:`Ich ___ in Dnipro. (wohnen)|wohne|wohnst;wohnt|З ich закінчення -e.|С ich окончание -e.
Du ___ sehr gut Deutsch. (lernen)|lernst|lerne;lernt|З du закінчення -st.|С du окончание -st.
Max ___ aus Österreich. (kommen)|kommt|komme;kommen|Max = er, закінчення -t.|Max = er, окончание -t.
Wir ___ Kaffee. (kaufen)|kaufen|kauft;kaufe|З wir закінчення -en, як у початковій формі.|С wir окончание -en, как в начальной форме.
Sie ___ im Büro. (arbeiten, вона/она)|arbeitet|arbeitt;arbeiten|Основа на -t: вставляємо -e- перед -t.|Основа на -t: вставляем -e- перед -t.
Wie ___ du? (heißen)|heißt|heißst;heiße|Після ß з du додаємо лише -t.|После ß с du добавляем только -t.`},

{id:'irregverbs',t:['Основні неправильні дієслова','Основные неправильные глаголы'],s:['зміна голосної з du та er/sie/es','смена гласной с du и er/sie/es'],
rule:['У деяких дієслів у формах du та er/sie/es змінюється голосна в корені: e → i/ie, a → ä.','У некоторых глаголов в формах du и er/sie/es меняется гласная в корне: e → i/ie, a → ä.'],
exp:['Закінчення залишаються звичайними — змінюється лише одна літера всередині слова. З ich, wir, ihr, sie/Sie нічого не змінюється. Таких дієслів небагато, але вони дуже вживані: sprechen, essen, nehmen, lesen, sehen, fahren, schlafen, laufen.','Окончания остаются обычными — меняется только одна буква внутри слова. С ich, wir, ihr, sie/Sie ничего не меняется. Таких глаголов немного, но они очень употребительны: sprechen, essen, nehmen, lesen, sehen, fahren, schlafen, laufen.'],
tbl:[['','sprechen','essen','lesen','fahren'],['ich','spreche','esse','lese','fahre'],['du','sprichst','isst','liest','fährst'],['er / sie / es','spricht','isst','liest','fährt'],['wir','sprechen','essen','lesen','fahren'],['ihr','sprecht','esst','lest','fahrt'],['sie / Sie','sprechen','essen','lesen','fahren']],
ex:`Sprichst du Englisch?|Ти розмовляєш англійською?|Ты говоришь по-английски?
Er isst kein Fleisch.|Він не їсть мʼяса.|Он не ест мяса.
Sie liest ein Buch.|Вона читає книжку.|Она читает книгу.
Der Zug fährt nach Berlin.|Потяг їде до Берліна.|Поезд едет в Берлин.`,
ord:['Порядок слів звичайний, змінюється лише форма дієслова: Du sprichst gut Deutsch.','Порядок слов обычный, меняется только форма глагола: Du sprichst gut Deutsch.'],
bad:`Er sprecht Deutsch.|Er spricht Deutsch.|З er голосна e змінюється на i.|С er гласная e меняется на i.
Du fahrst mit dem Bus.|Du fährst mit dem Bus.|З du голосна a стає ä.|С du гласная a становится ä.
Ich spriche Deutsch.|Ich spreche Deutsch.|З ich голосна не змінюється.|С ich гласная не меняется.`,
x:`Er ___ sehr gut Deutsch. (sprechen)|spricht|sprecht;spreche|З er: e → i, закінчення -t.|С er: e → i, окончание -t.
Was ___ du gern? (essen)|isst|esst;esse|З du: e → i.|С du: e → i.
Mein Bruder ___ ein Buch. (lesen)|liest|lest;lese|З er: e → ie.|С er: e → ie.
Du ___ mit dem Auto. (fahren)|fährst|fahrst;fährt|З du: a → ä, закінчення -st.|С du: a → ä, окончание -st.
Ich ___ den Salat. (nehmen)|nehme|nimmt;nimmst|З ich голосна не змінюється.|С ich гласная не меняется.
Das Kind ___ schon. (schlafen)|schläft|schlaft;schlafe|З er/sie/es: a → ä.|С er/sie/es: a → ä.
Sie ___ einen Film. (sehen, вона/она)|sieht|seht;sehe|З sie (вона): e → ie.|С sie (она): e → ie.`},

{id:'wordorder',t:['Порядок слів у реченні','Порядок слов в предложении'],s:['дієслово завжди на другому місці','глагол всегда на втором месте'],
rule:['У звичайному реченні відмінюване дієслово завжди стоїть на другому місці.','В обычном предложении спрягаемый глагол всегда стоит на втором месте.'],
exp:['Перше місце може зайняти хто завгодно: виконавець дії, час або місце. Але дієслово не рухається — воно друге. Якщо речення починається не з виконавця, він переходить одразу за дієслово: «Heute lerne ich Deutsch».','Первое место может занять что угодно: исполнитель действия, время или место. Но глагол не двигается — он второй. Если предложение начинается не с исполнителя, он переходит сразу за глагол: «Heute lerne ich Deutsch».'],
tbl:[['1','2 (Verb)','3','…'],['Ich','lerne','heute','Deutsch.'],['Heute','lerne','ich','Deutsch.'],['Am Montag','arbeitet','Max','im Büro.'],['In Berlin','wohnen','wir','jetzt.']],
ex:`Ich trinke am Morgen Kaffee.|Я пʼю каву вранці.|Я пью кофе утром.
Am Morgen trinke ich Kaffee.|Уранці я пʼю каву.|Утром я пью кофе.
Morgen habe ich keine Zeit.|Завтра я не маю часу.|Завтра у меня нет времени.`,
ord:['[будь-що одне] + ДІЄСЛОВО + [виконавець, якщо він не перший] + решта.','[что-то одно] + ГЛАГОЛ + [исполнитель, если он не первый] + остальное.'],
bad:`Heute ich lerne Deutsch.|Heute lerne ich Deutsch.|Після «Heute» одразу має йти дієслово.|После «Heute» сразу должен идти глагол.
Am Montag ich arbeite.|Am Montag arbeite ich.|Дієслово — друге, виконавець — за ним.|Глагол — второй, исполнитель — за ним.`,
x:`Heute ___ ich Deutsch.|lerne|ich lerne;lernen|Після «Heute» одразу дієслово: lerne.|После «Heute» сразу глагол: lerne.
Am Abend ___ wir fern.|sehen|wir sehen;sieht|Дієслово на другому місці, потім wir.|Глагол на втором месте, потом wir.
Morgen ___ Max nach Berlin.|fährt|Max fährt;fahren|Після часу — дієслово, далі виконавець.|После времени — глагол, дальше исполнитель.
In Dnipro ___ meine Eltern.|wohnen|meine wohnen;wohnt|Eltern — множина, дієслово wohnen стоїть другим.|Eltern — множественное число, глагол wohnen стоит вторым.`},

{id:'questions',t:['Питальні речення','Вопросительные предложения'],s:['W-Fragen і питання «так чи ні»','W-Fragen и вопросы «да или нет»'],
rule:['Є два види питань: з питальним словом (Wo wohnst du?) і без нього (Wohnst du hier?).','Есть два вида вопросов: с вопросительным словом (Wo wohnst du?) и без него (Wohnst du hier?).'],
exp:['У питанні з питальним словом дієслово друге — як у звичайному реченні. У питанні «так чи ні» дієслово стає першим. Відповідь: Ja — так, Nein — ні. На заперечне питання ствердно відповідаємо Doch.','В вопросе с вопросительным словом глагол второй — как в обычном предложении. В вопросе «да или нет» глагол становится первым. Ответ: Ja — да, Nein — нет. На отрицательный вопрос утвердительно отвечаем Doch.'],
tbl:[['Fragewort','UA','RU'],['wer?','хто?','кто?'],['was?','що?','что?'],['wo?','де?','где?'],['woher?','звідки?','откуда?'],['wohin?','куди?','куда?'],['wie?','як?','как?'],['wann?','коли?','когда?'],['warum?','чому?','почему?'],['wie viel?','скільки?','сколько?']],
ex:`Wie heißt du?|Як тебе звати?|Как тебя зовут?
Woher kommen Sie?|Звідки Ви?|Откуда Вы?
Wohnst du in Berlin?|Ти живеш у Берліні?|Ты живёшь в Берлине?
Hast du Geschwister?|У тебе є брати чи сестри?|У тебя есть братья или сёстры?`,
ord:['W-слово + дієслово + виконавець: Wo wohnst du?   ·   Дієслово + виконавець: Wohnst du hier?','W-слово + глагол + исполнитель: Wo wohnst du?   ·   Глагол + исполнитель: Wohnst du hier?'],
bad:`Wo du wohnst?|Wo wohnst du?|Після питального слова одразу дієслово.|После вопросительного слова сразу глагол.
Du kommst aus Polen?|Kommst du aus Polen?|У питанні «так чи ні» дієслово перше.|В вопросе «да или нет» глагол первый.`,
x:`___ heißt du? — Ich heiße Olena.|Wie|Wo;Wer|Про імʼя питаємо Wie (як).|Об имени спрашиваем Wie (как).
___ kommst du? — Aus der Ukraine.|Woher|Wo;Wohin|«Звідки» — woher.|«Откуда» — woher.
___ wohnst du? — In Dnipro.|Wo|Woher;Was|«Де» — wo.|«Где» — wo.
___ ist das? — Das ist Frau Weber.|Wer|Was;Wie|Про людину питаємо wer (хто).|О человеке спрашиваем wer (кто).
___ kommt der Bus? — Um neun Uhr.|Wann|Wo;Wie|Про час питаємо wann (коли).|О времени спрашиваем wann (когда).
___ kostet das? — Zehn Euro.|Wie viel|Wie alt;Wo|Про ціну — wie viel (скільки).|О цене — wie viel (сколько).`},

{id:'artdef',t:['Артиклі der, die, das','Артикли der, die, das'],s:['рід іменника: чоловічий, жіночий, середній','род существительного: мужской, женский, средний'],
rule:['Кожен іменник має рід і свій артикль: der (чоловічий), die (жіночий), das (середній). У множині завжди die.','У каждого существительного есть род и свой артикль: der (мужской), die (женский), das (средний). Во множественном числе всегда die.'],
exp:['Рід у німецькій часто не збігається з українським: «das Mädchen» (дівчинка) — середнього роду. Тому слово завжди вчимо разом з артиклем. Є підказки: слова на -ung, -heit, -keit, -ion — die; на -chen, -lein — das; дні тижня, місяці, пори року — der.','Род в немецком часто не совпадает с русским: «das Mädchen» (девочка) — среднего рода. Поэтому слово всегда учим вместе с артиклем. Есть подсказки: слова на -ung, -heit, -keit, -ion — die; на -chen, -lein — das; дни недели, месяцы, времена года — der.'],
tbl:[['','Artikel','Beispiel'],['maskulin','der','der Tisch, der Montag'],['feminin','die','die Lampe, die Wohnung'],['neutral','das','das Buch, das Mädchen'],['Plural','die','die Bücher, die Tische']],
ex:`Der Tisch ist neu.|Стіл новий.|Стол новый.
Die Lampe ist schön.|Лампа гарна.|Лампа красивая.
Das Buch ist interessant.|Книжка цікава.|Книга интересная.
Die Kinder spielen.|Діти граються.|Дети играют.`,
ord:['Артикль стоїть перед іменником; іменник завжди пишемо з великої літери: der Tisch.','Артикль стоит перед существительным; существительное всегда пишем с большой буквы: der Tisch.'],
bad:`Die Mädchen ist klein.|Das Mädchen ist klein.|Слова на -chen завжди середнього роду.|Слова на -chen всегда среднего рода.
Der Wohnung ist groß.|Die Wohnung ist groß.|Слова на -ung завжди жіночого роду.|Слова на -ung всегда женского рода.
das buch|das Buch|Іменники пишемо з великої літери.|Существительные пишем с большой буквы.`,
x:`___ Tisch ist neu.|Der|Die;Das|Tisch — чоловічого роду: der Tisch.|Tisch — мужского рода: der Tisch.
___ Wohnung ist groß.|Die|Der;Das|Закінчення -ung — завжди die.|Окончание -ung — всегда die.
___ Mädchen heißt Mia.|Das|Die;Der|Закінчення -chen — завжди das.|Окончание -chen — всегда das.
___ Montag ist lang.|Der|Die;Das|Дні тижня — завжди der.|Дни недели — всегда der.
___ Kinder sind klein.|Die|Das;Der|У множині артикль завжди die.|Во множественном числе артикль всегда die.
___ Buch ist interessant.|Das|Der;Die|Buch — середнього роду: das Buch.|Buch — среднего рода: das Buch.`},

{id:'artindef',t:['Неозначені артиклі ein і eine','Неопределённые артикли ein и eine'],s:['«якийсь, один із» — про нове й невідоме','«какой-то, один из» — о новом и неизвестном'],
rule:['ein — для der і das, eine — для die. У множині неозначеного артикля немає.','ein — для der и das, eine — для die. Во множественном числе неопределённого артикля нет.'],
exp:['Коли згадуємо щось уперше — ein/eine. Коли говоримо про вже відоме — der/die/das: «Das ist ein Buch. Das Buch ist neu». Професії та національності називаємо без артикля: «Ich bin Studentin».','Когда упоминаем что-то впервые — ein/eine. Когда говорим об уже известном — der/die/das: «Das ist ein Buch. Das Buch ist neu». Профессии и национальности называем без артикля: «Ich bin Studentin».'],
tbl:[['','bestimmt','unbestimmt'],['maskulin','der Apfel','ein Apfel'],['feminin','die Suppe','eine Suppe'],['neutral','das Ei','ein Ei'],['Plural','die Äpfel','— Äpfel']],
ex:`Das ist ein Apfel.|Це яблуко.|Это яблоко.
Ich esse eine Suppe.|Я їм суп.|Я ем суп.
Das ist ein Buch. Das Buch ist neu.|Це книжка. Книжка нова.|Это книга. Книга новая.
Sie ist Ärztin.|Вона лікарка.|Она врач.`,
ord:['ein/eine стоїть перед іменником так само, як der/die/das.','ein/eine стоит перед существительным так же, как der/die/das.'],
bad:`Das ist eine Apfel.|Das ist ein Apfel.|Apfel — der, тому ein.|Apfel — der, поэтому ein.
Ich bin eine Studentin.|Ich bin Studentin.|Професію називаємо без артикля.|Профессию называем без артикля.
Das ist ein Suppe.|Das ist eine Suppe.|Suppe — die, тому eine.|Suppe — die, поэтому eine.`,
x:`Das ist ___ Apfel.|ein|eine;—|der Apfel → ein Apfel.|der Apfel → ein Apfel.
Das ist ___ Lampe.|eine|ein;—|die Lampe → eine Lampe.|die Lampe → eine Lampe.
Das ist ___ Buch.|ein|eine;einen|das Buch → ein Buch.|das Buch → ein Buch.
Mein Vater ist ___ Lehrer.|—|ein;eine|Професію називаємо без артикля.|Профессию называем без артикля.
Hier ist ___ Apotheke.|eine|ein;—|die Apotheke → eine Apotheke.|die Apotheke → eine Apotheke.`},

{id:'negation',t:['Заперечення nicht і kein','Отрицание nicht и kein'],s:['як сказати «не» і «немає»','как сказать «не» и «нет»'],
rule:['kein заперечує іменник з ein або без артикля. nicht заперечує все інше: дієслово, прикметник, обставину.','kein отрицает существительное с ein или без артикля. nicht отрицает всё остальное: глагол, прилагательное, обстоятельство.'],
exp:['kein — це «ein з літерою k»: ein Buch → kein Buch, eine Tüte → keine Tüte. nicht ставимо перед тим, що заперечуємо (nicht gut, nicht in Berlin), або в кінці речення, якщо заперечуємо всю дію (Ich arbeite nicht).','kein — это «ein с буквой k»: ein Buch → kein Buch, eine Tüte → keine Tüte. nicht ставим перед тем, что отрицаем (nicht gut, nicht in Berlin), или в конце предложения, если отрицаем всё действие (Ich arbeite nicht).'],
tbl:[['','+','−'],['ein Buch','Ich habe ein Buch.','Ich habe kein Buch.'],['eine Tüte','Ich brauche eine Tüte.','Ich brauche keine Tüte.'],['Zeit','Ich habe Zeit.','Ich habe keine Zeit.'],['Adjektiv','Das ist teuer.','Das ist nicht teuer.'],['Verb','Ich arbeite.','Ich arbeite nicht.']],
ex:`Ich komme nicht aus Polen.|Я не з Польщі.|Я не из Польши.
Das ist nicht teuer.|Це не дорого.|Это не дорого.
Ich habe kein Geld.|У мене немає грошей.|У меня нет денег.
Wir haben keine Kinder.|У нас немає дітей.|У нас нет детей.`,
ord:['kein стоїть на місці артикля. nicht — перед словом, яке заперечуємо, або наприкінці.','kein стоит на месте артикля. nicht — перед словом, которое отрицаем, или в конце.'],
bad:`Ich habe nicht Zeit.|Ich habe keine Zeit.|Іменник без артикля заперечуємо через kein.|Существительное без артикля отрицаем через kein.
Das ist kein teuer.|Das ist nicht teuer.|Прикметник заперечуємо через nicht.|Прилагательное отрицаем через nicht.
Ich nicht arbeite.|Ich arbeite nicht.|nicht не може стояти перед відмінюваним дієсловом.|nicht не может стоять перед спрягаемым глаголом.`,
x:`Ich habe ___ Zeit.|keine|nicht;kein|Zeit — іменник (die): keine Zeit.|Zeit — существительное (die): keine Zeit.
Das ist ___ teuer.|nicht|kein;keine|teuer — прикметник, тому nicht.|teuer — прилагательное, поэтому nicht.
Ich komme ___ aus Polen.|nicht|kein;keine|Заперечуємо «з Польщі» — nicht.|Отрицаем «из Польши» — nicht.
Wir haben ___ Brot.|kein|nicht;keine|das Brot → kein Brot.|das Brot → kein Brot.
Er arbeitet heute ___.|nicht|kein;keine|Заперечуємо дію — nicht у кінці.|Отрицаем действие — nicht в конце.
Ich brauche ___ Tüte.|keine|kein;nicht|die Tüte → keine Tüte.|die Tüte → keine Tüte.`},

{id:'possessiv',t:['Присвійні займенники','Притяжательные местоимения'],s:['mein, dein, sein, ihr, unser, euer','mein, dein, sein, ihr, unser, euer'],
rule:['Присвійний займенник показує, чиє це. Він має закінчення, як ein: mein Bruder, meine Schwester.','Притяжательное местоимение показывает, чьё это. У него окончание, как у ein: mein Bruder, meine Schwester.'],
exp:['Закінчення залежить від роду предмета, а не власника: до слів з die і до множини додаємо -e (meine Mutter, meine Eltern). Слово «свій» німецькою немає: «Я люблю свою маму» = «Ich liebe meine Mutter». sein — його, ihr — її або їхній, Ihr — Ваш.','Окончание зависит от рода предмета, а не владельца: к словам с die и ко множественному числу добавляем -e (meine Mutter, meine Eltern). Слова «свой» в немецком нет: «Я люблю свою маму» = «Ich liebe meine Mutter». sein — его, ihr — её или их, Ihr — Ваш.'],
tbl:[['','der / das','die / Plural'],['ich','mein','meine'],['du','dein','deine'],['er / es','sein','seine'],['sie (вона/она)','ihr','ihre'],['wir','unser','unsere'],['ihr','euer','eure'],['sie / Sie','ihr / Ihr','ihre / Ihre']],
ex:`Das ist mein Bruder.|Це мій брат.|Это мой брат.
Wie heißt deine Schwester?|Як звати твою сестру?|Как зовут твою сестру?
Unsere Wohnung ist klein.|Наша квартира маленька.|Наша квартира маленькая.
Wie ist Ihre Adresse?|Яка Ваша адреса?|Какой у Вас адрес?`,
ord:['Присвійний займенник стоїть на місці артикля: meine neue Wohnung.','Притяжательное местоимение стоит на месте артикля: meine neue Wohnung.'],
bad:`Das ist mein Mutter.|Das ist meine Mutter.|Mutter — die, тому meine.|Mutter — die, поэтому meine.
Meine Vater heißt Petro.|Mein Vater heißt Petro.|Vater — der, тому mein без -e.|Vater — der, поэтому mein без -e.
Das ist der mein Bruder.|Das ist mein Bruder.|Артикль і присвійний займенник разом не вживаються.|Артикль и притяжательное местоимение вместе не употребляются.`,
x:`Das ist ___ Bruder. (ich)|mein|meine;dein|der Bruder → mein Bruder.|der Bruder → mein Bruder.
Das ist ___ Schwester. (ich)|meine|mein;meiner|die Schwester → meine Schwester.|die Schwester → meine Schwester.
Wie heißt ___ Vater? (du)|dein|deine;mein|der Vater + du → dein Vater.|der Vater + du → dein Vater.
___ Eltern wohnen in Dnipro. (ich)|Meine|Mein;Deine|Eltern — множина: meine Eltern.|Eltern — множественное число: meine Eltern.
Das ist Anna und das ist ___ Kind. (sie)|ihr|sein;ihre|Власниця — вона (ihr), das Kind — без -e.|Владелица — она (ihr), das Kind — без -e.
___ Wohnung ist klein. (wir)|Unsere|Unser;Eure|die Wohnung + wir → unsere.|die Wohnung + wir → unsere.`},

{id:'zahlen',t:['Числа','Числа'],s:['від 0 до 100: спочатку одиниці, потім десятки','от 0 до 100: сначала единицы, потом десятки'],
rule:['Числа 13–19: одиниці + zehn (dreizehn). Десятки: одиниці + zig (vierzig). Числа 21–99: одиниці + und + десятки (einundzwanzig).','Числа 13–19: единицы + zehn (dreizehn). Десятки: единицы + zig (vierzig). Числа 21–99: единицы + und + десятки (einundzwanzig).'],
exp:['Найнезвичніше: 21 читається «один-і-двадцять» і пишеться одним словом. Зверніть увагу на винятки: sechzehn і sechzig (без s), siebzehn і siebzig (без en), dreißig (з ß), zwanzig. У складених числах eins втрачає -s: einundzwanzig.','Самое непривычное: 21 читается «один-и-двадцать» и пишется одним словом. Обратите внимание на исключения: sechzehn и sechzig (без s), siebzehn и siebzig (без en), dreißig (с ß), zwanzig. В составных числах eins теряет -s: einundzwanzig.'],
tbl:[['0–9','10–19','20–100'],['null, eins, zwei','zehn, elf, zwölf','zwanzig (20)'],['drei, vier','dreizehn, vierzehn','dreißig (30), vierzig (40)'],['fünf, sechs','fünfzehn, sechzehn','fünfzig (50), sechzig (60)'],['sieben, acht','siebzehn, achtzehn','siebzig (70), achtzig (80)'],['neun','neunzehn','neunzig (90), hundert (100)']],
ex:`Ich bin achtzehn Jahre alt.|Мені вісімнадцять років.|Мне восемнадцать лет.
Das kostet fünfundzwanzig Euro.|Це коштує двадцять пʼять євро.|Это стоит двадцать пять евро.
Meine Mutter ist dreiundvierzig.|Моїй мамі сорок три.|Моей маме сорок три.`,
ord:['одиниці + und + десятки, одним словом: 47 = sieben-und-vierzig → siebenundvierzig.','единицы + und + десятки, одним словом: 47 = sieben-und-vierzig → siebenundvierzig.'],
bad:`zwanzigeins|einundzwanzig|Спочатку одиниці, потім десятки.|Сначала единицы, потом десятки.
einsundzwanzig|einundzwanzig|У складеному числі eins втрачає -s.|В составном числе eins теряет -s.
dreizig|dreißig|30 — єдиний десяток з -ßig.|30 — единственный десяток с -ßig.`,
x:`21 = ___|einundzwanzig|zwanzigeins;einsundzwanzig|Одиниці (ein) + und + десятки (zwanzig).|Единицы (ein) + und + десятки (zwanzig).
35 = ___|fünfunddreißig|dreißigfünf;fünfunddreizig|fünf + und + dreißig (з ß).|fünf + und + dreißig (с ß).
47 = ___|siebenundvierzig|vierundsiebzig;vierzigsieben|Спочатку 7 (sieben), потім 40 (vierzig).|Сначала 7 (sieben), потом 40 (vierzig).
60 = ___|sechzig|sechszig;sechzehn|sechs втрачає -s: sechzig.|sechs теряет -s: sechzig.
17 = ___|siebzehn|siebenzehn;siebzig|sieben скорочується: siebzehn.|sieben сокращается: siebzehn.
99 = ___|neunundneunzig|neunzigneun;neunundneunzehn|neun + und + neunzig.|neun + und + neunzig.
«zweiundachtzig» = ___|82|28;802|zwei (2) + und + achtzig (80) = 82.|zwei (2) + und + achtzig (80) = 82.`},

{id:'plural',t:['Множина іменників','Множественное число существительных'],s:['пʼять способів утворення множини','пять способов образования множественного числа'],
rule:['У множині артикль завжди die, а іменник отримує закінчення: -e, -er, -(e)n, -s або не змінюється.','Во множественном числе артикль всегда die, а существительное получает окончание: -e, -er, -(e)n, -s или не меняется.'],
exp:['Єдиного правила немає, тому множину вчимо разом зі словом: der Tag, die Tage. Але є закономірності: слова жіночого роду на -e отримують -n (die Lampe → die Lampen); слова з англійської чи на -o, -a, -y отримують -s (das Auto → die Autos); часто голосна стає умлаутом (der Bruder → die Brüder).','Единого правила нет, поэтому множественное число учим вместе со словом: der Tag, die Tage. Но есть закономерности: слова женского рода на -e получают -n (die Lampe → die Lampen); слова из английского или на -o, -a, -y получают -s (das Auto → die Autos); часто гласная становится умлаутом (der Bruder → die Brüder).'],
tbl:[['Endung','Singular','Plural'],['-e','der Tag','die Tage'],['-er (+ Umlaut)','das Kind · das Buch','die Kinder · die Bücher'],['-(e)n','die Lampe · die Frau','die Lampen · die Frauen'],['-s','das Auto','die Autos'],['— (+ Umlaut)','der Lehrer · der Bruder','die Lehrer · die Brüder']],
ex:`Ich habe zwei Brüder.|У мене два брати.|У меня два брата.
Die Kinder spielen im Park.|Діти граються в парку.|Дети играют в парке.
Die Woche hat sieben Tage.|Тиждень має сім днів.|В неделе семь дней.`,
ord:['Число + іменник у множині: zwei Bücher, drei Tage. Після числа іменник не відмінюється, як в українській.','Число + существительное во множественном числе: zwei Bücher, drei Tage. После числа существительное не склоняется, как в русском.'],
bad:`zwei Buch|zwei Bücher|Після числа, більшого за 1, потрібна множина.|После числа больше 1 нужно множественное число.
die Kinds|die Kinder|Kind має множину на -er.|У Kind множественное число на -er.
der Bücher|die Bücher|У множині артикль завжди die.|Во множественном числе артикль всегда die.`,
x:`das Kind → die ___|Kinder|Kinds;Kinde|Kind утворює множину на -er.|Kind образует множественное число на -er.
der Tag → die ___|Tage|Tagen;Tags|Tag утворює множину на -e.|Tag образует множественное число на -e.
die Lampe → die ___|Lampen|Lampe;Lampes|Жіночий рід на -e додає -n.|Женский род на -e добавляет -n.
das Auto → die ___|Autos|Auten;Autoe|Слова на -o додають -s.|Слова на -o добавляют -s.
das Buch → die ___|Bücher|Buche;Buchs|-er та умлаут: Bücher.|-er и умлаут: Bücher.
der Bruder → die ___|Brüder|Bruders;Brudern|Лише умлаут: Brüder.|Только умлаут: Brüder.`},

{id:'modal',t:['Модальні дієслова','Модальные глаголы'],s:['können, müssen, wollen, möchten, dürfen, sollen','können, müssen, wollen, möchten, dürfen, sollen'],
rule:['Модальне дієслово показує ставлення до дії: можу, мушу, хочу. Воно стоїть на другому місці, а основне дієслово — у початковій формі в самому кінці.','Модальный глагол показывает отношение к действию: могу, должен, хочу. Он стоит на втором месте, а основной глагол — в начальной форме в самом конце.'],
exp:['können — могти, вміти; müssen — мусити; wollen — хотіти; möchten — хотів би (ввічливо); dürfen — мати дозвіл; sollen — слід (за порадою). Форми ich та er/sie/es однакові й без закінчення: ich kann, er kann.','können — мочь, уметь; müssen — быть должным; wollen — хотеть; möchten — хотел бы (вежливо); dürfen — иметь разрешение; sollen — следует (по совету). Формы ich и er/sie/es одинаковы и без окончания: ich kann, er kann.'],
tbl:[['','können','müssen','wollen','möchten'],['ich','kann','muss','will','möchte'],['du','kannst','musst','willst','möchtest'],['er / sie / es','kann','muss','will','möchte'],['wir','können','müssen','wollen','möchten'],['ihr','könnt','müsst','wollt','möchtet'],['sie / Sie','können','müssen','wollen','möchten']],
ex:`Ich kann gut schwimmen.|Я вмію добре плавати.|Я умею хорошо плавать.
Ich muss heute lernen.|Я мушу сьогодні вчитися.|Я должна сегодня учиться.
Ich möchte einen Kaffee bestellen.|Я хотіла б замовити каву.|Я хотела бы заказать кофе.
Kann ich das anprobieren?|Можна це приміряти?|Можно это примерить?`,
ord:['Хто + МОДАЛЬНЕ + … + ДІЄСЛОВО в кінці: Ich muss heute Deutsch lernen.','Кто + МОДАЛЬНЫЙ + … + ГЛАГОЛ в конце: Ich muss heute Deutsch lernen.'],
bad:`Ich muss lernen heute Deutsch.|Ich muss heute Deutsch lernen.|Основне дієслово йде в самий кінець.|Основной глагол идёт в самый конец.
Er kannt schwimmen.|Er kann schwimmen.|З er модальне дієслово без закінчення -t.|С er модальный глагол без окончания -t.
Ich kann zu schwimmen.|Ich kann schwimmen.|Після модального дієслова zu не потрібне.|После модального глагола zu не нужно.`,
x:`Ich ___ heute lernen. (müssen)|muss|musst;müssen|З ich: muss, без закінчення.|С ich: muss, без окончания.
___ ich das anprobieren? (können)|Kann|Kannst;Können|З ich: kann.|С ich: kann.
Er ___ gut schwimmen. (können)|kann|kannt;kannst|З er форма така сама, як з ich: kann.|С er форма такая же, как с ich: kann.
Wir ___ einen Tisch reservieren. (möchten)|möchten|möchte;möchtet|З wir закінчення -en.|С wir окончание -en.
Du ___ viel Wasser trinken. (sollen)|sollst|soll;sollen|З du закінчення -st.|С du окончание -st.
Ich möchte einen Kaffee ___.|bestellen|bestelle;bestellt|Після модального — початкова форма в кінці.|После модального — начальная форма в конце.`},

{id:'akk',t:['Akkusativ (знахідний відмінок)','Akkusativ (винительный падеж)'],s:['кого? що? — змінюється лише der → den','кого? что? — меняется только der → den'],
rule:['Akkusativ відповідає на питання «кого? що?». Змінюється лише чоловічий рід: der → den, ein → einen. die, das і множина не змінюються.','Akkusativ отвечает на вопрос «кого? что?». Меняется только мужской род: der → den, ein → einen. die, das и множественное число не меняются.'],
exp:['Akkusativ потрібен після більшості дієслів дії: haben, kaufen, nehmen, essen, trinken, brauchen, suchen, sehen, möchten, а також після «es gibt». Порівняйте: «Der Salat ist lecker» (хто? що?) — «Ich nehme den Salat» (кого? що?).','Akkusativ нужен после большинства глаголов действия: haben, kaufen, nehmen, essen, trinken, brauchen, suchen, sehen, möchten, а также после «es gibt». Сравните: «Der Salat ist lecker» (кто? что?) — «Ich nehme den Salat» (кого? что?).'],
tbl:[['','Nominativ','Akkusativ'],['maskulin','der / ein / kein / mein','den / einen / keinen / meinen'],['feminin','die / eine','die / eine'],['neutral','das / ein','das / ein'],['Plural','die / —','die / —']],
ex:`Ich habe einen Bruder.|У мене є брат.|У меня есть брат.
Ich nehme den Salat.|Я візьму салат.|Я возьму салат.
Sie kauft eine Jacke.|Вона купує куртку.|Она покупает куртку.
Es gibt hier einen Park.|Тут є парк.|Здесь есть парк.`,
ord:['Хто + дієслово + кого/що (Akkusativ): Ich kaufe einen Tisch.','Кто + глагол + кого/что (Akkusativ): Ich kaufe einen Tisch.'],
bad:`Ich habe ein Bruder.|Ich habe einen Bruder.|Bruder — der, після haben: einen.|Bruder — der, после haben: einen.
Ich nehme der Salat.|Ich nehme den Salat.|Після nehmen: der → den.|После nehmen: der → den.
Ich kaufe einen Lampe.|Ich kaufe eine Lampe.|Жіночий рід в Akkusativ не змінюється.|Женский род в Akkusativ не меняется.`,
x:`Ich habe ___ Bruder.|einen|ein;eine|der Bruder → einen Bruder.|der Bruder → einen Bruder.
Ich nehme ___ Salat.|den|der;das|der Salat → den Salat.|der Salat → den Salat.
Sie kauft ___ Jacke.|eine|einen;ein|die Jacke не змінюється: eine.|die Jacke не меняется: eine.
Wir brauchen ___ Tisch.|einen|ein;eine|der Tisch → einen Tisch.|der Tisch → einen Tisch.
Ich lese ___ Buch.|das|den;der|das Buch не змінюється.|das Buch не меняется.
Es gibt hier ___ Park.|einen|ein;eine|Після es gibt — Akkusativ: einen Park.|После es gibt — Akkusativ: einen Park.
Ich habe ___ Hunger.|keinen|kein;keine|der Hunger → keinen Hunger.|der Hunger → keinen Hunger.`},

{id:'dativ',t:['Основи Dativ (давальний відмінок)','Основы Dativ (дательный падеж)'],s:['де? з ким? — dem, der, dem, den','где? с кем? — dem, der, dem, den'],
rule:['Dativ потрібен після питання «де?» (in, auf, an, neben) і після прийменників mit, bei, von, zu, aus, nach.','Dativ нужен после вопроса «где?» (in, auf, an, neben) и после предлогов mit, bei, von, zu, aus, nach.'],
exp:['Артиклі змінюються так: der → dem, das → dem, die → der, множина → den (+ -n до іменника). Часто прийменник зливається з артиклем: in dem = im, an dem = am, zu dem = zum, zu der = zur, bei dem = beim.','Артикли меняются так: der → dem, das → dem, die → der, множественное число → den (+ -n к существительному). Часто предлог сливается с артиклем: in dem = im, an dem = am, zu dem = zum, zu der = zur, bei dem = beim.'],
tbl:[['','Nominativ','Dativ','Beispiel'],['maskulin','der / ein','dem / einem','auf dem Tisch'],['feminin','die / eine','der / einer','in der Küche'],['neutral','das / ein','dem / einem','im Büro (in dem)'],['Plural','die','den …-n','mit den Kindern']],
ex:`Das Buch liegt auf dem Tisch.|Книжка лежить на столі.|Книга лежит на столе.
Ich bin in der Küche.|Я на кухні.|Я на кухне.
Ich fahre mit dem Bus.|Я їду автобусом.|Я еду на автобусе.
Sie arbeitet im Büro.|Вона працює в офісі.|Она работает в офисе.`,
ord:['Прийменник + артикль у Dativ + іменник: mit dem Bus, in der Stadt.','Предлог + артикль в Dativ + существительное: mit dem Bus, in der Stadt.'],
bad:`Ich fahre mit der Bus.|Ich fahre mit dem Bus.|Bus — der, у Dativ: dem.|Bus — der, в Dativ: dem.
Ich bin in die Küche.|Ich bin in der Küche.|На питання «де?» — Dativ: die → der.|На вопрос «где?» — Dativ: die → der.
Das Buch liegt auf den Tisch.|Das Buch liegt auf dem Tisch.|«Де лежить?» — Dativ: dem Tisch.|«Где лежит?» — Dativ: dem Tisch.`,
x:`Das Buch liegt auf ___ Tisch.|dem|der;den|der Tisch → auf dem Tisch.|der Tisch → auf dem Tisch.
Ich bin in ___ Küche.|der|die;dem|die Küche → in der Küche.|die Küche → in der Küche.
Ich fahre mit ___ Bus.|dem|der;den|Після mit — Dativ: dem Bus.|После mit — Dativ: dem Bus.
Sie arbeitet ___ Büro.|im|in;in der|in + dem Büro = im Büro.|in + dem Büro = im Büro.
Ich spreche mit ___ Lehrerin.|der|die;dem|die Lehrerin → mit der Lehrerin.|die Lehrerin → mit der Lehrerin.
Die Lampe steht neben ___ Bett.|dem|das;der|das Bett → neben dem Bett.|das Bett → neben dem Bett.`},

{id:'uhrzeit',t:['Час: um, am, im','Время: um, am, im'],s:['котра година і коли саме','который час и когда именно'],
rule:['um — з годинами (um 8 Uhr), am — з днями і частинами доби (am Montag, am Abend), im — з місяцями і порами року (im Mai, im Sommer).','um — с часами (um 8 Uhr), am — с днями и частями суток (am Montag, am Abend), im — с месяцами и временами года (im Mai, im Sommer).'],
exp:['У розмові час називають так: «halb neun» — це 8:30 (половина до девʼятої!), «Viertel nach acht» — 8:15, «Viertel vor neun» — 8:45. Офіційно (розклад, вокзал) кажуть просто: «acht Uhr dreißig». Виняток: in der Nacht — уночі.','В разговоре время называют так: «halb neun» — это 8:30 (половина до девяти!), «Viertel nach acht» — 8:15, «Viertel vor neun» — 8:45. Официально (расписание, вокзал) говорят просто: «acht Uhr dreißig». Исключение: in der Nacht — ночью.'],
tbl:[['Uhrzeit','Deutsch'],['8:00','Es ist acht Uhr.'],['8:15','Viertel nach acht'],['8:30','halb neun'],['8:45','Viertel vor neun'],['8:10','zehn nach acht'],['8:50','zehn vor neun']],
ex:`Wie spät ist es? — Es ist halb neun.|Котра година? — Пів на девʼяту.|Который час? — Половина девятого.
Der Kurs beginnt um neun Uhr.|Курс починається о девʼятій.|Курс начинается в девять.
Am Montag habe ich einen Termin.|У понеділок у мене запис.|В понедельник у меня запись.
Im Sommer habe ich Urlaub.|Улітку в мене відпустка.|Летом у меня отпуск.`,
ord:['Якщо час стоїть першим, дієслово одразу за ним: Um acht Uhr frühstücke ich.','Если время стоит первым, глагол сразу за ним: Um acht Uhr frühstücke ich.'],
bad:`Ich komme am acht Uhr.|Ich komme um acht Uhr.|З годинами — um.|С часами — um.
Im Montag arbeite ich.|Am Montag arbeite ich.|З днями тижня — am.|С днями недели — am.
halb neun = 9:30|halb neun = 8:30|halb показує половину ДО названої години.|halb показывает половину ДО названного часа.`,
x:`Der Zug kommt ___ zehn Uhr.|um|am;im|З годинами — um.|С часами — um.
___ Montag lerne ich Deutsch.|Am|Um;Im|З днями тижня — am.|С днями недели — am.
___ Sommer fahre ich nach Wien.|Im|Am;Um|З порами року — im.|С временами года — im.
Mein Geburtstag ist ___ Mai.|im|am;um|З місяцями — im.|С месяцами — im.
halb acht = ___|7:30|8:30;7:15|halb acht — половина до восьмої: 7:30.|halb acht — половина до восьми: 7:30.
Viertel vor drei = ___|2:45|3:15;3:45|vor — «до»: за чверть третя, 2:45.|vor — «до»: без четверти три, 2:45.
___ Abend sehe ich fern.|Am|Im;Um|З частинами доби — am.|С частями суток — am.`},

{id:'trennbar',t:['Відокремлювані дієслова','Отделяемые глаголы'],s:['префікс іде в кінець: ich stehe … auf','приставка уходит в конец: ich stehe … auf'],
rule:['У деяких дієслів префікс відокремлюється і стає в самий кінець речення: aufstehen → Ich stehe um 7 Uhr auf.','У некоторых глаголов приставка отделяется и встаёт в самый конец предложения: aufstehen → Ich stehe um 7 Uhr auf.'],
exp:['Відокремлюються наголошені префікси: auf-, an-, ein-, aus-, mit-, fern-, ab-, zu-. Основна частина відмінюється і стоїть другою, префікс замикає речення. З модальним дієсловом слово залишається цілим і стоїть у кінці: Ich muss früh aufstehen.','Отделяются ударные приставки: auf-, an-, ein-, aus-, mit-, fern-, ab-, zu-. Основная часть спрягается и стоит второй, приставка замыкает предложение. С модальным глаголом слово остаётся целым и стоит в конце: Ich muss früh aufstehen.'],
tbl:[['Infinitiv','Satz'],['aufstehen','Ich stehe um sieben Uhr auf.'],['einkaufen','Wir kaufen im Supermarkt ein.'],['anrufen','Er ruft seine Mutter an.'],['fernsehen','Sie sieht am Abend fern.'],['mitkommen','Kommst du mit?']],
ex:`Ich stehe früh auf.|Я встаю рано.|Я встаю рано.
Wann rufst du mich an?|Коли ти мені зателефонуєш?|Когда ты мне позвонишь?
Am Samstag kaufen wir ein.|У суботу ми робимо покупки.|В субботу мы делаем покупки.
Ich muss morgen früh aufstehen.|Я мушу завтра рано встати.|Я должна завтра рано встать.`,
ord:['Хто + основа дієслова + … + ПРЕФІКС: Ich rufe dich morgen an.','Кто + основа глагола + … + ПРИСТАВКА: Ich rufe dich morgen an.'],
bad:`Ich aufstehe um sieben Uhr.|Ich stehe um sieben Uhr auf.|Префікс auf іде в кінець речення.|Приставка auf уходит в конец предложения.
Ich kaufe ein im Supermarkt.|Ich kaufe im Supermarkt ein.|Префікс стоїть останнім.|Приставка стоит последней.`,
x:`Ich stehe um sieben Uhr ___.|auf|an;ein|aufstehen — вставати; auf у кінці.|aufstehen — вставать; auf в конце.
Wir kaufen im Supermarkt ___.|ein|an;auf|einkaufen — робити покупки.|einkaufen — делать покупки.
Er ruft seine Mutter ___.|an|ein;auf|anrufen — телефонувати.|anrufen — звонить.
Am Abend sieht sie ___.|fern|ein;an|fernsehen — дивитися телевізор.|fernsehen — смотреть телевизор.
Wir gehen ins Kino. Kommst du ___?|mit|an;auf|mitkommen — піти разом.|mitkommen — пойти вместе.
Ich muss morgen früh ___.|aufstehen|stehe auf;auf stehen|З модальним дієслово ціле і в кінці.|С модальным глагол целый и в конце.`},

{id:'gern',t:['gern, lieber, mögen','gern, lieber, mögen'],s:['як сказати, що нам подобається','как сказать, что нам нравится'],
rule:['Дієслово + gern = «люблю щось робити». lieber = «більше люблю, радше». nicht gern = «не люблю».','Глагол + gern = «люблю что-то делать». lieber = «больше люблю, охотнее». nicht gern = «не люблю».'],
exp:['gern — це не дієслово, а слівце, що ставиться після дієслова: «Ich lese gern» (дослівно «я читаю охоче»). Про речі та людей кажемо mögen: «Ich mag Tee». mögen змінюється неправильно: ich mag, du magst, er mag.','gern — это не глагол, а словечко, которое ставится после глагола: «Ich lese gern» (дословно «я читаю охотно»). О вещах и людях говорим mögen: «Ich mag Tee». mögen меняется неправильно: ich mag, du magst, er mag.'],
tbl:[['','Beispiel'],['++ sehr gern','Ich tanze sehr gern.'],['+ gern','Ich lese gern.'],['> lieber','Ich trinke lieber Tee.'],['− nicht gern','Ich koche nicht gern.'],['mögen','ich mag · du magst · er mag · wir mögen']],
ex:`Ich trinke gern Tee.|Я люблю пити чай.|Я люблю пить чай.
Ich trinke lieber Kaffee.|Я більше люблю каву.|Я больше люблю кофе.
Er kocht nicht gern.|Він не любить готувати.|Он не любит готовить.
Ich mag Musik.|Мені подобається музика.|Мне нравится музыка.`,
ord:['Хто + дієслово + gern + що: Ich höre gern Musik.','Кто + глагол + gern + что: Ich höre gern Musik.'],
bad:`Ich gern lese.|Ich lese gern.|gern стоїть після дієслова.|gern стоит после глагола.
Ich gern Tee.|Ich trinke gern Tee.|gern не замінює дієслово.|gern не заменяет глагол.
Ich mag schwimmen gern.|Ich schwimme gern.|Про дії — дієслово + gern, без mögen.|О действиях — глагол + gern, без mögen.`,
x:`Ich lese ___. (люблю)|gern|lieber;mag|«Люблю робити» — дієслово + gern.|«Люблю делать» — глагол + gern.
Tee oder Kaffee? — Ich trinke ___ Tee.|lieber|gern nicht;mag|Вибір між двома — lieber.|Выбор между двумя — lieber.
Ich ___ Musik. (подобається / нравится)|mag|gern;möge|Про річ — mögen: ich mag.|О вещи — mögen: ich mag.
Er tanzt ___ gern. (не любить / не любит)|nicht|kein;nie|Заперечення: nicht gern.|Отрицание: nicht gern.
___ du Fußball?|Magst|Mag;Gern|З du: magst.|С du: magst.`},

{id:'konn',t:['Сполучники und, aber, oder, denn','Союзы und, aber, oder, denn'],s:['зʼєднуємо два речення в одне','соединяем два предложения в одно'],
rule:['und — і, aber — але, oder — або, denn — бо. Після них порядок слів не змінюється.','und — и, aber — но, oder — или, denn — потому что. После них порядок слов не меняется.'],
exp:['Ці сполучники стоять «поза рахунком» — на нульовому місці. Після них речення будується, як зазвичай: виконавець, потім дієслово. Перед aber і denn ставимо кому. Слово deshalb (тому) поводиться інакше: воно займає перше місце, і дієслово йде одразу за ним.','Эти союзы стоят «вне счёта» — на нулевом месте. После них предложение строится как обычно: исполнитель, затем глагол. Перед aber и denn ставим запятую. Слово deshalb (поэтому) ведёт себя иначе: оно занимает первое место, и глагол идёт сразу за ним.'],
tbl:[['Konnektor','Beispiel'],['und','Ich lerne Deutsch und ich arbeite.'],['aber','Das ist schön, aber es ist teuer.'],['oder','Trinkst du Tee oder trinkst du Kaffee?'],['denn','Ich bin müde, denn ich arbeite viel.'],['deshalb (!)','Ich bin müde, deshalb schlafe ich.']],
ex:`Ich heiße Olena und ich komme aus der Ukraine.|Мене звати Олена, і я з України.|Меня зовут Елена, и я из Украины.
Das Kleid ist schön, aber teuer.|Сукня гарна, але дорога.|Платье красивое, но дорогое.
Ich lerne Deutsch, denn ich möchte in Deutschland arbeiten.|Я вчу німецьку, бо хочу працювати в Німеччині.|Я учу немецкий, потому что хочу работать в Германии.`,
ord:['Речення 1 + , + сполучник + виконавець + дієслово: …, denn ich arbeite viel.','Предложение 1 + , + союз + исполнитель + глагол: …, denn ich arbeite viel.'],
bad:`Ich bin müde, denn arbeite ich viel.|Ich bin müde, denn ich arbeite viel.|Після denn порядок слів звичайний.|После denn порядок слов обычный.
Ich bin müde, deshalb ich schlafe.|Ich bin müde, deshalb schlafe ich.|Після deshalb одразу дієслово.|После deshalb сразу глагол.`,
x:`Das Handy ist gut, ___ es ist teuer.|aber|denn;oder|Протиставлення — aber (але).|Противопоставление — aber (но).
Ich bin müde, ___ ich arbeite viel.|denn|aber;oder|Причина — denn (бо).|Причина — denn (потому что).
Zahlen Sie bar ___ mit Karte?|oder|und;denn|Вибір — oder (чи).|Выбор — oder (или).
Ich esse Brot ___ trinke Tee.|und|oder;denn|Додаємо ще одну дію — und (і).|Добавляем ещё одно действие — und (и).
Ich habe Hunger, deshalb ___ ich.|esse|ich esse;essen|Після deshalb одразу дієслово.|После deshalb сразу глагол.`},

{id:'imperativ',t:['Наказовий спосіб (Imperativ)','Повелительное наклонение (Imperativ)'],s:['прохання, поради, вказівки','просьбы, советы, указания'],
rule:['Ввічлива форма: дієслово + Sie (Gehen Sie!). До друга: основа дієслова без закінчення і без du (Geh! Komm!).','Вежливая форма: глагол + Sie (Gehen Sie!). К другу: основа глагола без окончания и без du (Geh! Komm!).'],
exp:['Для du беремо форму «du gehst» і прибираємо du та -st: Geh! Дієслова зі зміною e → i зберігають її: du sprichst → Sprich! du nimmst → Nimm! Але умлаут зникає: du fährst → Fahr! Слово bitte робить наказ проханням.','Для du берём форму «du gehst» и убираем du и -st: Geh! Глаголы со сменой e → i сохраняют её: du sprichst → Sprich! du nimmst → Nimm! Но умлаут исчезает: du fährst → Fahr! Слово bitte превращает приказ в просьбу.'],
tbl:[['Infinitiv','du','Sie'],['gehen','Geh!','Gehen Sie!'],['kommen','Komm!','Kommen Sie!'],['sprechen','Sprich!','Sprechen Sie!'],['nehmen','Nimm!','Nehmen Sie!'],['sein','Sei!','Seien Sie!']],
ex:`Gehen Sie geradeaus.|Ідіть прямо.|Идите прямо.
Bitte sprechen Sie langsam.|Будь ласка, говоріть повільно.|Пожалуйста, говорите медленно.
Komm bitte um acht!|Прийди, будь ласка, о восьмій!|Приди, пожалуйста, в восемь!
Nimm den Bus!|Сідай на автобус!|Садись на автобус!`,
ord:['Дієслово стоїть першим: Gehen Sie links! · Komm her!','Глагол стоит первым: Gehen Sie links! · Komm her!'],
bad:`Sie gehen geradeaus!|Gehen Sie geradeaus!|У наказі дієслово стоїть першим.|В приказе глагол стоит первым.
Sprech langsam!|Sprich langsam!|sprechen зберігає зміну e → i.|sprechen сохраняет смену e → i.
Du komm!|Komm!|У формі для du слово du не вживається.|В форме для du слово du не употребляется.`,
x:`___ Sie geradeaus! (gehen)|Gehen|Geh;Geht|Ввічлива форма: Gehen Sie.|Вежливая форма: Gehen Sie.
___ bitte langsam! (sprechen, du)|Sprich|Sprech;Sprichst|du sprichst → Sprich!|du sprichst → Sprich!
___ bitte um acht! (kommen, du)|Komm|Kommst;Kommen|du kommst → Komm!|du kommst → Komm!
___ Sie den Bus! (nehmen)|Nehmen|Nimm;Nehmt|Ввічлива форма: Nehmen Sie.|Вежливая форма: Nehmen Sie.
___ den Salat! (nehmen, du)|Nimm|Nehm;Nimmst|du nimmst → Nimm!|du nimmst → Nimm!`},

{id:'perfekt',t:['Основи Perfekt (минулий час)','Основы Perfekt (прошедшее время)'],s:['haben / sein + ge…t','haben / sein + ge…t'],
rule:['Про минуле в розмові кажемо так: haben або sein (на другому місці) + дієприкметник з ge- (у кінці).','О прошлом в разговоре говорим так: haben или sein (на втором месте) + причастие с ge- (в конце).'],
exp:['Правильні дієслова: ge + основа + t (machen → gemacht, lernen → gelernt). Неправильні мають -en і часто іншу голосну (sehen → gesehen, treffen → getroffen). Більшість дієслів — з haben. Із sein — дієслова руху та зміни стану: gehen, fahren, kommen, fliegen (Ich bin gefahren). Дієслова на -ieren і з префіксами be-, ver- — без ge-: studiert, besucht.','Правильные глаголы: ge + основа + t (machen → gemacht, lernen → gelernt). Неправильные имеют -en и часто другую гласную (sehen → gesehen, treffen → getroffen). Большинство глаголов — с haben. С sein — глаголы движения и смены состояния: gehen, fahren, kommen, fliegen (Ich bin gefahren). Глаголы на -ieren и с приставками be-, ver- — без ge-: studiert, besucht.'],
tbl:[['Infinitiv','Perfekt'],['machen','hat gemacht'],['lernen','hat gelernt'],['kaufen','hat gekauft'],['sehen','hat gesehen'],['besuchen','hat besucht'],['gehen','ist gegangen'],['fahren','ist gefahren'],['kommen','ist gekommen']],
ex:`Ich habe Deutsch gelernt.|Я вчила німецьку.|Я учила немецкий.
Was hast du gemacht?|Що ти робила?|Что ты делала?
Wir haben einen Film gesehen.|Ми подивилися фільм.|Мы посмотрели фильм.
Ich bin nach Wien gefahren.|Я їздила до Відня.|Я ездила в Вену.`,
ord:['Хто + haben/sein + … + дієприкметник у кінці: Ich habe gestern Suppe gekocht.','Кто + haben/sein + … + причастие в конце: Ich habe gestern Suppe gekocht.'],
bad:`Ich habe gelernt Deutsch.|Ich habe Deutsch gelernt.|Дієприкметник стоїть у кінці.|Причастие стоит в конце.
Ich habe nach Wien gefahren.|Ich bin nach Wien gefahren.|Рух — із sein.|Движение — с sein.
Ich habe gebesucht.|Ich habe besucht.|З префіксом be- немає ge-.|С приставкой be- нет ge-.`,
x:`Ich ___ Deutsch gelernt.|habe|bin;hat|lernen — з haben; з ich: habe.|lernen — с haben; с ich: habe.
Wir ___ nach Berlin gefahren.|sind|haben;seid|fahren (рух) — із sein; з wir: sind.|fahren (движение) — с sein; с wir: sind.
Was hast du ___? (machen)|gemacht|gemachen;machen|Правильне дієслово: ge + mach + t.|Правильный глагол: ge + mach + t.
Sie hat eine Jacke ___. (kaufen)|gekauft|gekaufen;kauft|ge + kauf + t.|ge + kauf + t.
Er ___ gestern gekommen.|ist|hat;bin|kommen (рух) — із sein; з er: ist.|kommen (движение) — с sein; с er: ist.
Ich habe meine Oma ___. (besuchen)|besucht|gebesucht;besuchen|З префіксом be- — без ge-.|С приставкой be- — без ge-.`}
];

/* Відмінювання для вправ «Обери форму дієслова»: ich, du, er, wir, ihr, sie */
window.VERBS = {
 sein:['bin','bist','ist','sind','seid','sind','sein'], haben:['habe','hast','hat','haben','habt','haben','sein'],
 wohnen:['wohne','wohnst','wohnt','wohnen','wohnt','wohnen','regverbs'], kommen:['komme','kommst','kommt','kommen','kommt','kommen','regverbs'],
 lernen:['lerne','lernst','lernt','lernen','lernt','lernen','regverbs'], heißen:['heiße','heißt','heißt','heißen','heißt','heißen','regverbs'],
 arbeiten:['arbeite','arbeitest','arbeitet','arbeiten','arbeitet','arbeiten','regverbs'], kaufen:['kaufe','kaufst','kauft','kaufen','kauft','kaufen','regverbs'],
 trinken:['trinke','trinkst','trinkt','trinken','trinkt','trinken','regverbs'], machen:['mache','machst','macht','machen','macht','machen','regverbs'],
 sprechen:['spreche','sprichst','spricht','sprechen','sprecht','sprechen','irregverbs'], essen:['esse','isst','isst','essen','esst','essen','irregverbs'],
 lesen:['lese','liest','liest','lesen','lest','lesen','irregverbs'], fahren:['fahre','fährst','fährt','fahren','fahrt','fahren','irregverbs'],
 nehmen:['nehme','nimmst','nimmt','nehmen','nehmt','nehmen','irregverbs'], sehen:['sehe','siehst','sieht','sehen','seht','sehen','irregverbs'],
 schlafen:['schlafe','schläfst','schläft','schlafen','schlaft','schlafen','irregverbs'], laufen:['laufe','läufst','läuft','laufen','lauft','laufen','irregverbs'],
 können:['kann','kannst','kann','können','könnt','können','modal'], müssen:['muss','musst','muss','müssen','müsst','müssen','modal'],
 wollen:['will','willst','will','wollen','wollt','wollen','modal'], möchten:['möchte','möchtest','möchte','möchten','möchtet','möchten','modal']
};
/* на яких уроках дієслово вже відоме */
window.VERB_LESSON = {sein:2,heißen:2,haben:8,wohnen:4,kommen:4,lernen:14,sprechen:14,essen:16,trinken:17,nehmen:18,kaufen:19,können:21,möchten:21,arbeiten:24,schlafen:24,machen:24,müssen:28,fahren:32,lesen:34,laufen:35,sehen:35,wollen:38};
