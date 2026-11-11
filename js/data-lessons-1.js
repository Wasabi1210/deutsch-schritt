/* Уроки 1–14. Формат слова: de|множина|uk|ru|вимова|приклад de|приклад uk|приклад ru
   Фраза: de|uk|ru.  Діалог: хто|de|uk|ru.  Щоб додати урок — додайте об'єкт у LESSONS. */
window.MODS = [
  ['Знайомство і привітання', 'Знакомство и приветствия'],
  ['Особиста інформація', 'Личная информация'],
  ['Родина і друзі', 'Семья и друзья'],
  ['Числа і вік', 'Числа и возраст'],
  ['Країни і мови', 'Страны и языки'],
  ['Їжа і напої', 'Еда и напитки'],
  ['Покупки і ціни', 'Покупки и цены'],
  ['Дім і повсякденне життя', 'Дом и повседневная жизнь'],
  ['Час і розклад', 'Время и расписание'],
  ['Навчання і робота', 'Учёба и работа'],
  ['Місто і транспорт', 'Город и транспорт'],
  ['Хобі і вільний час', 'Хобби и свободное время'],
  ['Повсякденне спілкування', 'Повседневное общение'],
  ['Повторення і перевірка знань', 'Повторение и проверка знаний']
];
window.LESSONS = [
{id:1,m:0,cat:'greet',min:20,t:['Hallo! Привітання','Hallo! Приветствия'],d:['Вітаємось і прощаємось у різний час доби.','Здороваемся и прощаемся в разное время суток.'],g:'pron',
w:`Hallo|-|привіт|привет|хАло|Hallo, Anna!|Привіт, Анно!|Привет, Анна!
Guten Morgen|-|доброго ранку|доброе утро|гУтен мОрген|Guten Morgen, Frau Weber!|Доброго ранку, пані Вебер!|Доброе утро, госпожа Вебер!
Guten Tag|-|добрий день|добрый день|гУтен так|Guten Tag, Herr Klein!|Добрий день, пане Кляйн!|Добрый день, господин Кляйн!
Guten Abend|-|добрий вечір|добрый вечер|гУтен Абент|Guten Abend, Lena!|Добрий вечір, Лено!|Добрый вечер, Лена!
Gute Nacht|-|на добраніч|спокойной ночи|гУте нахт|Gute Nacht, Mama!|На добраніч, мамо!|Спокойной ночи, мама!
Tschüss|-|бувай|пока|чюс|Tschüss, bis morgen!|Бувай, до завтра!|Пока, до завтра!
Auf Wiedersehen|-|до побачення|до свидания|ауф вІдерзеен|Auf Wiedersehen, Herr Klein!|До побачення, пане Кляйн!|До свидания, господин Кляйн!
ja|-|так|да|я|Ja, das ist Anna.|Так, це Анна.|Да, это Анна.
nein|-|ні|нет|найн|Nein, das ist Lena.|Ні, це Лена.|Нет, это Лена.`,
p:`Bis morgen!|До завтра!|До завтра!
Bis bald!|До скорої зустрічі!|До скорой встречи!
Schönen Tag!|Гарного дня!|Хорошего дня!`,
dlg:`Anna|Hallo, Tom!|Привіт, Томе!|Привет, Том!
Tom|Guten Morgen, Anna!|Доброго ранку, Анно!|Доброе утро, Анна!
Anna|Das ist Lena.|Це Лена.|Это Лена.
Tom|Hallo, Lena! Ich bin Tom.|Привіт, Лено! Я Том.|Привет, Лена! Я Том.
Lena|Hallo, Tom! Tschüss, bis bald!|Привіт, Томе! Бувай, до зустрічі!|Привет, Том! Пока, до встречи!`,
mini:['Привітайтеся вголос німецькою тричі: зранку, вдень і ввечері.','Поздоровайтесь вслух по-немецки трижды: утром, днём и вечером.'],
hw:['Напишіть короткий діалог: двоє людей вітаються і прощаються.','Напишите короткий диалог: два человека здороваются и прощаются.','— Guten Tag! — Hallo! — Tschüss, bis morgen! — Auf Wiedersehen!']},

{id:2,m:0,cat:'greet',min:20,t:['Wie heißt du? Імʼя','Wie heißt du? Имя'],d:['Називаємо своє імʼя і питаємо імʼя співрозмовника.','Называем своё имя и спрашиваем имя собеседника.'],g:'sein',
w:`heißen|-|називатися, зватися|называться, зваться|хАйсен|Ich heiße Maria.|Мене звати Марія.|Меня зовут Мария.
der Name|die Namen|імʼя|имя|нАме|Mein Name ist Olena.|Моє імʼя Олена.|Моё имя Елена.
wie|-|як|как|ві|Wie heißt du?|Як тебе звати?|Как тебя зовут?
wer|-|хто|кто|вер|Wer ist das?|Хто це?|Кто это?
das|-|це|это|дас|Das ist Paul.|Це Пауль.|Это Пауль.
die Frau|die Frauen|жінка; пані|женщина; госпожа|фрау|Das ist Frau Weber.|Це пані Вебер.|Это госпожа Вебер.
der Herr|die Herren|пан|господин|хер|Guten Tag, Herr Klein!|Добрий день, пане Кляйн!|Добрый день, господин Кляйн!
und|-|і, а|и, а|унт|Ich heiße Tom. Und du?|Мене звати Том. А тебе?|Меня зовут Том. А тебя?`,
p:`Ich heiße Anna.|Мене звати Анна.|Меня зовут Анна.
Wie heißen Sie?|Як Вас звати?|Как Вас зовут?
Freut mich!|Приємно познайомитися!|Приятно познакомиться!
Und du?|А ти?|А ты?`,
dlg:`Olena|Hallo! Ich heiße Olena. Und du?|Привіт! Мене звати Олена. А тебе?|Привет! Меня зовут Елена. А тебя?
Max|Ich heiße Max. Freut mich!|Мене звати Макс. Приємно познайомитися!|Меня зовут Макс. Приятно познакомиться!
Olena|Wer ist das?|Хто це?|Кто это?
Max|Das ist Frau Weber.|Це пані Вебер.|Это госпожа Вебер.
Olena|Guten Tag, Frau Weber!|Добрий день, пані Вебер!|Добрый день, госпожа Вебер!`,
mini:['Скажіть уголос своє імʼя двома способами: «Ich heiße …» і «Mein Name ist …».','Скажите вслух своё имя двумя способами: «Ich heiße …» и «Mein Name ist …».'],
hw:['Представте себе і ще двох людей (Das ist …).','Представьте себя и ещё двух человек (Das ist …).','Ich heiße Olena. Das ist Max. Das ist Frau Weber.']},

{id:3,m:0,cat:'greet',min:20,t:['Wie geht’s? Ввічливі слова','Wie geht’s? Вежливые слова'],d:['Питаємо «як справи», дякуємо, просимо і вибачаємось.','Спрашиваем «как дела», благодарим, просим и извиняемся.'],g:'pron',gf:['Зверніть увагу: du — до друзів, Sie — ввічливо до незнайомих.','Обратите внимание: du — к друзьям, Sie — вежливо к незнакомым.'],
w:`bitte|-|будь ласка|пожалуйста|бІте|Ich möchte Kaffee, bitte.|Я хотіла б кави, будь ласка.|Я хотела бы кофе, пожалуйста.
danke|-|дякую|спасибо|дАнке|Danke, gut!|Дякую, добре!|Спасибо, хорошо!
gut|-|добре|хорошо|гут|Mir geht es gut.|У мене все добре.|У меня всё хорошо.
schlecht|-|погано|плохо|шлехт|Heute geht es mir schlecht.|Сьогодні мені погано.|Сегодня мне плохо.
Entschuldigung|-|вибачте|извините|ентшУльдігунг|Entschuldigung, wer ist das?|Вибачте, хто це?|Извините, кто это?
sehr|-|дуже|очень|зер|Sehr gut, danke!|Дуже добре, дякую!|Очень хорошо, спасибо!
auch|-|також|тоже|аух|Mir geht es auch gut.|У мене теж усе добре.|У меня тоже всё хорошо.
der Kaffee|-|кава|кофе|кАфе|Der Kaffee ist gut.|Кава добра.|Кофе хороший.`,
p:`Wie geht’s?|Як справи?|Как дела?
Wie geht es Ihnen?|Як Ваші справи?|Как Ваши дела?
Ich möchte Kaffee, bitte.|Я хотіла б кави, будь ласка.|Я хотела бы кофе, пожалуйста.
Vielen Dank!|Щиро дякую!|Большое спасибо!`,
dlg:`Kellner|Guten Tag! Wie geht es Ihnen?|Добрий день! Як Ваші справи?|Добрый день! Как Ваши дела?
Olena|Danke, gut. Und Ihnen?|Дякую, добре. А Ваші?|Спасибо, хорошо. А Ваши?
Kellner|Auch gut, danke. Was möchten Sie?|Теж добре, дякую. Що бажаєте?|Тоже хорошо, спасибо. Что желаете?
Olena|Ich möchte Kaffee, bitte.|Я хотіла б кави, будь ласка.|Я хотела бы кофе, пожалуйста.
Kellner|Bitte sehr!|Прошу!|Пожалуйста!
Olena|Vielen Dank!|Щиро дякую!|Большое спасибо!`,
mini:['Запитайте вголос «Wie geht’s?» і дайте три різні відповіді.','Спросите вслух «Wie geht’s?» и дайте три разных ответа.'],
hw:['Напишіть міні-діалог у кафе: привітання, «як справи», замовлення кави.','Напишите мини-диалог в кафе: приветствие, «как дела», заказ кофе.','— Guten Tag! Wie geht’s? — Danke, gut. Ich möchte Kaffee, bitte. — Bitte sehr!']},

{id:4,m:1,cat:'greet',min:25,t:['Woher kommst du? Звідки ти?','Woher kommst du? Откуда ты?'],d:['Розповідаємо, звідки ми і де живемо.','Рассказываем, откуда мы и где живём.'],g:'regverbs',
w:`kommen|-|приходити; походити|приходить; происходить|кОмен|Ich komme aus der Ukraine.|Я з України.|Я из Украины.
wohnen|-|жити, мешкати|жить, проживать|вОнен|Ich wohne in Berlin.|Я живу в Берліні.|Я живу в Берлине.
woher|-|звідки|откуда|вохЕр|Woher kommst du?|Звідки ти?|Откуда ты?
wo|-|де|где|во|Wo wohnst du?|Де ти живеш?|Где ты живёшь?
aus|-|з (звідки)|из|аус|Er kommt aus Polen.|Він із Польщі.|Он из Польши.
in|-|в, у|в|ін|Wir wohnen in Kyjiw.|Ми живемо в Києві.|Мы живём в Киеве.
die Stadt|die Städte|місто|город|штат|Die Stadt ist schön.|Місто гарне.|Город красивый.
jetzt|-|зараз, тепер|сейчас, теперь|єцт|Ich wohne jetzt in Wien.|Я зараз живу у Відні.|Я сейчас живу в Вене.`,
p:`Ich komme aus der Ukraine.|Я з України.|Я из Украины.
Ich wohne in Dnipro.|Я живу в Дніпрі.|Я живу в Днепре.
Wo wohnen Sie?|Де Ви живете?|Где Вы живёте?`,
dlg:`Max|Woher kommst du, Olena?|Звідки ти, Олено?|Откуда ты, Елена?
Olena|Ich komme aus der Ukraine. Und du?|Я з України. А ти?|Я из Украины. А ты?
Max|Ich komme aus Österreich.|Я з Австрії.|Я из Австрии.
Olena|Und wo wohnst du jetzt?|А де ти зараз живеш?|А где ты сейчас живёшь?
Max|Ich wohne jetzt in Berlin.|Я зараз живу в Берліні.|Я сейчас живу в Берлине.`,
mini:['Розкажіть про себе трьома реченнями: імʼя, звідки ви, де живете.','Расскажите о себе тремя предложениями: имя, откуда вы, где живёте.'],
hw:['Напишіть про себе і про одного друга: звідки ви і де живете.','Напишите о себе и об одном друге: откуда вы и где живёте.','Ich komme aus der Ukraine und wohne in Dnipro. Max kommt aus Österreich. Er wohnt in Berlin.']},

{id:5,m:1,cat:'greet',min:25,t:['Adresse und Telefon','Adresse und Telefon'],d:['Називаємо адресу, телефон та електронну пошту.','Называем адрес, телефон и электронную почту.'],g:'questions',
w:`die Adresse|die Adressen|адреса|адрес|адрЕсе|Wie ist deine Adresse?|Яка твоя адреса?|Какой у тебя адрес?
die Straße|die Straßen|вулиця|улица|штрАсе|Die Straße heißt Gartenstraße.|Вулиця називається Ґартенштрасе.|Улица называется Гартенштрассе.
die Telefonnummer|die Telefonnummern|номер телефону|номер телефона|телефОн-нУмер|Meine Telefonnummer ist 030 12345.|Мій номер телефону 030 12345.|Мой номер телефона 030 12345.
die E-Mail|die E-Mails|електронний лист, пошта|электронное письмо, почта|Імейл|Ich schreibe eine E-Mail.|Я пишу електронного листа.|Я пишу электронное письмо.
das Handy|die Handys|мобільний телефон|мобильный телефон|хЕнді|Das Handy ist neu.|Мобільний телефон новий.|Мобильный телефон новый.
schreiben|-|писати|писать|шрАйбен|Ich schreibe die Adresse.|Я пишу адресу.|Я пишу адрес.
buchstabieren|-|називати по літерах|называть по буквам|бухштабІрен|Können Sie das buchstabieren?|Можете назвати це по літерах?|Можете назвать это по буквам?
neu|-|новий|новый|ной|Die Adresse ist neu.|Адреса нова.|Адрес новый.`,
p:`Wie ist deine Telefonnummer?|Який у тебе номер телефону?|Какой у тебя номер телефона?
Wie bitte?|Перепрошую, як?|Простите, как?
Noch einmal, bitte.|Ще раз, будь ласка.|Ещё раз, пожалуйста.`,
dlg:`Frau Weber|Wie ist Ihre Adresse?|Яка Ваша адреса?|Какой у Вас адрес?
Olena|Gartenstraße 5, Berlin.|Ґартенштрасе 5, Берлін.|Гартенштрассе 5, Берлин.
Frau Weber|Wie bitte? Können Sie das buchstabieren?|Перепрошую? Можете назвати по літерах?|Простите? Можете назвать по буквам?
Olena|G-A-R-T-E-N. Gartenstraße.|Ґ-А-Р-Т-Е-Н. Ґартенштрасе.|Г-А-Р-Т-Е-Н. Гартенштрассе.
Frau Weber|Danke. Und Ihre Telefonnummer?|Дякую. А Ваш номер телефону?|Спасибо. А Ваш номер телефона?
Olena|Meine Telefonnummer ist 030 12345.|Мій номер 030 12345.|Мой номер 030 12345.`,
mini:['Назвіть уголос по літерах своє імʼя та прізвище німецькою.','Назовите вслух по буквам своё имя и фамилию по-немецки.'],
hw:['Напишіть свою (або вигадану) адресу і номер телефону повними реченнями.','Напишите свой (или выдуманный) адрес и номер телефона полными предложениями.','Meine Adresse ist Gartenstraße 5, Berlin. Meine Telefonnummer ist 030 12345.']},

{id:6,m:1,cat:'greet',min:25,t:['Das Formular. Анкета','Das Formular. Анкета'],d:['Заповнюємо просту анкету про себе.','Заполняем простую анкету о себе.'],g:'wordorder',
w:`das Formular|die Formulare|анкета, бланк|анкета, бланк|формулЯр|Das Formular ist kurz.|Анкета коротка.|Анкета короткая.
der Vorname|die Vornamen|імʼя|имя|фОрнаме|Mein Vorname ist Olena.|Моє імʼя Олена.|Моё имя Елена.
der Nachname|die Nachnamen|прізвище|фамилия|нАхнаме|Mein Nachname ist Koval.|Моє прізвище Коваль.|Моя фамилия Коваль.
das Land|die Länder|країна|страна|лант|Das Land ist groß.|Країна велика.|Страна большая.
der Beruf|die Berufe|професія|профессия|берУф|Was sind Sie von Beruf?|Хто Ви за професією?|Кто Вы по профессии?
ledig|-|неодружений, незаміжня|холост, не замужем|лЕдіхь|Ich bin ledig.|Я незаміжня.|Я не замужем.
verheiratet|-|одружений, заміжня|женат, замужем|ферхАйратет|Er ist verheiratet.|Він одружений.|Он женат.
ausfüllen|-|заповнювати|заполнять|Аусфюлен|Bitte füllen Sie das Formular aus.|Будь ласка, заповніть анкету.|Пожалуйста, заполните анкету.`,
p:`Ich bin Studentin.|Я студентка.|Я студентка.
Was sind Sie von Beruf?|Хто Ви за професією?|Кто Вы по профессии?
Hier, bitte.|Ось, будь ласка.|Вот, пожалуйста.`,
dlg:`Beamter|Guten Tag! Bitte füllen Sie das Formular aus.|Добрий день! Будь ласка, заповніть анкету.|Добрый день! Пожалуйста, заполните анкету.
Olena|Gern. Vorname: Olena. Nachname: Koval.|Охоче. Імʼя: Олена. Прізвище: Коваль.|Охотно. Имя: Елена. Фамилия: Коваль.
Beamter|Woher kommen Sie?|Звідки Ви?|Откуда Вы?
Olena|Ich komme aus der Ukraine.|Я з України.|Я из Украины.
Beamter|Sind Sie verheiratet?|Ви заміжня?|Вы замужем?
Olena|Nein, ich bin ledig.|Ні, я незаміжня.|Нет, я не замужем.`,
mini:['Заповніть уявну анкету: Vorname, Nachname, Land, Stadt, Beruf.','Заполните воображаемую анкету: Vorname, Nachname, Land, Stadt, Beruf.'],
hw:['Напишіть 4 речення про себе, як для анкети.','Напишите 4 предложения о себе, как для анкеты.','Mein Vorname ist Olena. Mein Nachname ist Koval. Ich komme aus der Ukraine. Ich bin ledig.']},

{id:7,m:2,cat:'family',min:25,t:['Meine Familie. Моя родина','Meine Familie. Моя семья'],d:['Називаємо найближчих членів родини.','Называем самых близких членов семьи.'],g:'possessiv',
w:`die Familie|die Familien|родина|семья|фамІліє|Meine Familie ist groß.|Моя родина велика.|Моя семья большая.
die Mutter|die Mütter|мати|мать|мУтер|Meine Mutter heißt Iryna.|Мою маму звати Ірина.|Мою маму зовут Ирина.
der Vater|die Väter|батько|отец|фАтер|Mein Vater wohnt in Lwiw.|Мій батько живе у Львові.|Мой отец живёт во Львове.
die Eltern|Pl.|батьки|родители|Ельтерн|Meine Eltern wohnen in Dnipro.|Мої батьки живуть у Дніпрі.|Мои родители живут в Днепре.
der Bruder|die Brüder|брат|брат|брУдер|Mein Bruder heißt Andrij.|Мого брата звати Андрій.|Моего брата зовут Андрей.
die Schwester|die Schwestern|сестра|сестра|швЕстер|Meine Schwester ist klein.|Моя сестра маленька.|Моя сестра маленькая.
das Kind|die Kinder|дитина|ребёнок|кінт|Das Kind ist drei Jahre alt.|Дитині три роки.|Ребёнку три года.
groß|-|великий; високий|большой; высокий|грос|Die Familie ist groß.|Родина велика.|Семья большая.
klein|-|маленький|маленький|кляйн|Mein Bruder ist klein.|Мій брат маленький.|Мой брат маленький.`,
p:`Das ist meine Familie.|Це моя родина.|Это моя семья.
Hast du Geschwister?|У тебе є брати чи сестри?|У тебя есть братья или сёстры?
Ich habe einen Bruder.|У мене є брат.|У меня есть брат.`,
dlg:`Max|Ist das deine Familie?|Це твоя родина?|Это твоя семья?
Olena|Ja. Das ist meine Mutter und das ist mein Vater.|Так. Це моя мама, а це мій тато.|Да. Это моя мама, а это мой папа.
Max|Und wer ist das?|А це хто?|А это кто?
Olena|Das ist mein Bruder Andrij.|Це мій брат Андрій.|Это мой брат Андрей.
Max|Hast du auch eine Schwester?|У тебе є ще й сестра?|У тебя есть ещё и сестра?
Olena|Nein, ich habe nur einen Bruder.|Ні, у мене лише брат.|Нет, у меня только брат.`,
mini:['Покажіть фото родини і назвіть кожного: «Das ist mein … / meine …».','Покажите фото семьи и назовите каждого: «Das ist mein … / meine …».'],
hw:['Опишіть свою родину 4 реченнями.','Опишите свою семью 4 предложениями.','Meine Familie ist klein. Meine Mutter heißt Iryna. Mein Vater heißt Petro. Ich habe einen Bruder.']},

{id:8,m:2,cat:'family',min:25,t:['Verwandte. Родичі','Verwandte. Родственники'],d:['Бабуся, дідусь, тітка, дядько — і дієслово haben.','Бабушка, дедушка, тётя, дядя — и глагол haben.'],g:'haben',
w:`die Großmutter|die Großmütter|бабуся|бабушка|грОсмутер|Meine Großmutter ist 70 Jahre alt.|Моїй бабусі 70 років.|Моей бабушке 70 лет.
der Großvater|die Großväter|дідусь|дедушка|грОсфатер|Mein Großvater wohnt in Poltawa.|Мій дідусь живе в Полтаві.|Мой дедушка живёт в Полтаве.
die Tante|die Tanten|тітка|тётя|тАнте|Meine Tante hat zwei Kinder.|У моєї тітки двоє дітей.|У моей тёти двое детей.
der Onkel|die Onkel|дядько|дядя|Онкель|Mein Onkel kommt aus Kyjiw.|Мій дядько з Києва.|Мой дядя из Киева.
der Sohn|die Söhne|син|сын|зон|Ihr Sohn heißt Paul.|Її сина звати Пауль.|Её сына зовут Пауль.
die Tochter|die Töchter|донька|дочь|тОхтер|Die Tochter ist klein.|Донька маленька.|Дочь маленькая.
haben|-|мати|иметь|хАбен|Ich habe eine Schwester.|У мене є сестра.|У меня есть сестра.
alt|-|старий; (про вік)|старый; (о возрасте)|альт|Wie alt bist du?|Скільки тобі років?|Сколько тебе лет?
jung|-|молодий|молодой|юнг|Meine Tante ist jung.|Моя тітка молода.|Моя тётя молодая.`,
p:`Wir haben zwei Kinder.|У нас двоє дітей.|У нас двое детей.
Hast du Kinder?|У тебе є діти?|У тебя есть дети?
Meine Großeltern wohnen in Poltawa.|Мої бабуся й дідусь живуть у Полтаві.|Мои бабушка и дедушка живут в Полтаве.`,
dlg:`Lena|Hast du Großeltern?|У тебе є бабуся й дідусь?|У тебя есть бабушка и дедушка?
Olena|Ja, meine Großmutter wohnt in Poltawa.|Так, моя бабуся живе в Полтаві.|Да, моя бабушка живёт в Полтаве.
Lena|Und hast du eine Tante?|А тітка в тебе є?|А тётя у тебя есть?
Olena|Ja, meine Tante hat zwei Kinder: einen Sohn und eine Tochter.|Так, у моєї тітки двоє дітей: син і донька.|Да, у моей тёти двое детей: сын и дочь.
Lena|Schön! Ich habe nur einen Onkel.|Гарно! А в мене лише дядько.|Здорово! А у меня только дядя.`,
mini:['Скажіть, кого з родичів ви маєте: «Ich habe …».','Скажите, кто из родственников у вас есть: «Ich habe …».'],
hw:['Напишіть 4 речення з haben про свою родину.','Напишите 4 предложения с haben о своей семье.','Ich habe eine Großmutter. Meine Tante hat zwei Kinder. Wir haben einen Onkel. Mein Bruder hat eine Tochter.']},

{id:9,m:2,cat:'family',min:25,t:['Freunde. Друзі','Freunde. Друзья'],d:['Розповідаємо про друзів і описуємо людей.','Рассказываем о друзьях и описываем людей.'],g:'artdef',
w:`der Freund|die Freunde|друг|друг|фройнт|Mein Freund heißt Max.|Мого друга звати Макс.|Моего друга зовут Макс.
die Freundin|die Freundinnen|подруга|подруга|фрОйндін|Meine Freundin kommt aus Wien.|Моя подруга з Відня.|Моя подруга из Вены.
der Mann|die Männer|чоловік|мужчина; муж|ман|Der Mann ist sehr nett.|Чоловік дуже приємний.|Мужчина очень приятный.
das Mädchen|die Mädchen|дівчинка|девочка|мЕдхен|Das Mädchen heißt Mia.|Дівчинку звати Мія.|Девочку зовут Мия.
der Junge|die Jungen|хлопчик|мальчик|Юнге|Der Junge ist mein Bruder.|Хлопчик — мій брат.|Мальчик — мой брат.
nett|-|приємний, милий|приятный, милый|нет|Die Frau ist sehr nett.|Жінка дуже приємна.|Женщина очень приятная.
lustig|-|веселий|весёлый|лУстіхь|Mein Freund ist lustig.|Мій друг веселий.|Мой друг весёлый.
schön|-|гарний|красивый|шьон|Die Stadt ist schön.|Місто гарне.|Город красивый.`,
p:`Das ist mein Freund Max.|Це мій друг Макс.|Это мой друг Макс.
Er ist sehr nett.|Він дуже приємний.|Он очень приятный.
Wir sind Freunde.|Ми друзі.|Мы друзья.`,
dlg:`Lena|Wer ist der Mann?|Хто цей чоловік?|Кто этот мужчина?
Olena|Das ist mein Freund Max.|Це мій друг Макс.|Это мой друг Макс.
Lena|Und das Mädchen?|А дівчинка?|А девочка?
Olena|Das ist Mia. Sie ist die Schwester von Max.|Це Мія. Вона сестра Макса.|Это Мия. Она сестра Макса.
Lena|Sie ist sehr lustig!|Вона дуже весела!|Она очень весёлая!`,
mini:['Опишіть уголос одного друга або подругу трьома реченнями.','Опишите вслух одного друга или подругу тремя предложениями.'],
hw:['Напишіть про найкращого друга чи подругу: імʼя, звідки, який він / яка вона.','Напишите о лучшем друге или подруге: имя, откуда, какой он / какая она.','Meine Freundin heißt Lena. Sie kommt aus Wien. Sie ist nett und lustig.']},

{id:10,m:3,cat:'num',min:25,t:['Zahlen 0–20. Вік','Zahlen 0–20. Возраст'],d:['Рахуємо до 20, називаємо вік і питаємо ціну.','Считаем до 20, называем возраст и спрашиваем цену.'],g:'zahlen',
w:`null|-|нуль|ноль|нуль|Null Euro? Super!|Нуль євро? Супер!|Ноль евро? Супер!
eins|-|один|один|айнс|Eins und eins ist zwei.|Один і один — два.|Один и один — два.
zwei|-|два|два|цвай|Ich habe zwei Brüder.|У мене два брати.|У меня два брата.
drei|-|три|три|драй|Das Kind ist drei Jahre alt.|Дитині три роки.|Ребёнку три года.
zehn|-|десять|десять|цен|Das kostet zehn Euro.|Це коштує десять євро.|Это стоит десять евро.
zwölf|-|дванадцять|двенадцать|цвьольф|Mein Bruder ist zwölf.|Моєму братові дванадцять.|Моему брату двенадцать.
achtzehn|-|вісімнадцять|восемнадцать|Ахцен|Ich bin achtzehn Jahre alt.|Мені вісімнадцять років.|Мне восемнадцать лет.
zwanzig|-|двадцять|двадцать|цвАнціхь|Sie ist zwanzig Jahre alt.|Їй двадцять років.|Ей двадцать лет.
das Jahr|die Jahre|рік|год|яр|Ein Jahr hat zwölf Monate.|Рік має дванадцять місяців.|В году двенадцать месяцев.
kosten|-|коштувати|стоить|кОстен|Wie viel kostet das?|Скільки це коштує?|Сколько это стоит?`,
p:`Wie alt bist du?|Скільки тобі років?|Сколько тебе лет?
Ich bin 18 Jahre alt.|Мені 18 років.|Мне 18 лет.
Wie viel kostet das?|Скільки це коштує?|Сколько это стоит?
Das kostet fünf Euro.|Це коштує пʼять євро.|Это стоит пять евро.`,
dlg:`Max|Wie alt bist du, Olena?|Скільки тобі років, Олено?|Сколько тебе лет, Елена?
Olena|Ich bin 18 Jahre alt. Und du?|Мені 18 років. А тобі?|Мне 18 лет. А тебе?
Max|Ich bin zwanzig.|Мені двадцять.|Мне двадцать.
Olena|Entschuldigung, wie viel kostet der Kaffee?|Вибачте, скільки коштує кава?|Извините, сколько стоит кофе?
Kellner|Der Kaffee kostet drei Euro.|Кава коштує три євро.|Кофе стоит три евро.`,
mini:['Порахуйте вголос від 0 до 20 і назад.','Посчитайте вслух от 0 до 20 и обратно.'],
hw:['Напишіть словами свій вік і вік двох членів родини.','Напишите словами свой возраст и возраст двух членов семьи.','Ich bin achtzehn Jahre alt. Mein Bruder ist zwölf Jahre alt. Meine Schwester ist zwanzig.']},

{id:11,m:3,cat:'num',min:25,t:['Zahlen 20–100','Zahlen 20–100'],d:['Десятки і складені числа: чому «один-і-двадцять».','Десятки и составные числа: почему «один-и-двадцать».'],g:'zahlen',gf:['Головне сьогодні: у числах 21–99 спочатку кажемо одиниці, потім десятки — einundzwanzig.','Главное сегодня: в числах 21–99 сначала говорим единицы, потом десятки — einundzwanzig.'],
w:`einundzwanzig|-|двадцять один|двадцать один|Айн-унт-цвАнціхь|Ich bin einundzwanzig Jahre alt.|Мені двадцять один рік.|Мне двадцать один год.
dreißig|-|тридцять|тридцать|дрАйсіхь|Das kostet dreißig Euro.|Це коштує тридцять євро.|Это стоит тридцать евро.
vierzig|-|сорок|сорок|фІрціхь|Meine Mutter ist vierzig Jahre alt.|Моїй мамі сорок років.|Моей маме сорок лет.
fünfzig|-|пʼятдесят|пятьдесят|фЮнфціхь|Mein Vater ist fünfzig.|Моєму батькові пʼятдесят.|Моему отцу пятьдесят.
sechzig|-|шістдесят|шестьдесят|зЕхьціхь|Mein Onkel ist sechzig Jahre alt.|Моєму дядькові шістдесят років.|Моему дяде шестьдесят лет.
siebzig|-|сімдесят|семьдесят|зІпціхь|Meine Großmutter ist siebzig.|Моїй бабусі сімдесят.|Моей бабушке семьдесят.
hundert|-|сто|сто|хУндерт|Das kostet hundert Euro.|Це коштує сто євро.|Это стоит сто евро.
die Zahl|die Zahlen|число|число|цаль|Die Zahl ist groß.|Число велике.|Число большое.
die Nummer|die Nummern|номер|номер|нУмер|Meine Nummer ist 45.|Мій номер 45.|Мой номер 45.
der Euro|die Euro|євро|евро|Ойро|Ein Kaffee kostet drei Euro.|Кава коштує три євро.|Кофе стоит три евро.`,
p:`Wie alt ist deine Mutter?|Скільки років твоїй мамі?|Сколько лет твоей маме?
Sie ist fünfundvierzig.|Їй сорок пʼять.|Ей сорок пять.
Das macht zweiunddreißig Euro.|Разом тридцять два євро.|Итого тридцать два евро.
Welche Nummer hast du?|Який у тебе номер?|Какой у тебя номер?`,
dlg:`Verkäufer|Guten Tag! Was möchten Sie?|Добрий день! Що бажаєте?|Добрый день! Что желаете?
Olena|Wie viel kostet das Handy?|Скільки коштує телефон?|Сколько стоит телефон?
Verkäufer|Es kostet neunundneunzig Euro.|Він коштує девʼяносто девʼять євро.|Он стоит девяносто девять евро.
Olena|Und das Buch?|А книжка?|А книга?
Verkäufer|Das Buch kostet einundzwanzig Euro.|Книжка коштує двадцять один євро.|Книга стоит двадцать один евро.
Olena|Danke! Ich möchte das Buch, bitte.|Дякую! Я хотіла б книжку, будь ласка.|Спасибо! Я хотела бы книгу, пожалуйста.`,
mini:['Назвіть уголос німецькою: 24, 37, 58, 63, 99 і номер свого будинку.','Назовите вслух по-немецки: 24, 37, 58, 63, 99 и номер своего дома.'],
hw:['Запишіть словами вік трьох родичів (числа від 21 до 99).','Запишите словами возраст трёх родственников (числа от 21 до 99).','Meine Mutter ist fünfundvierzig. Mein Vater ist achtundvierzig. Meine Großmutter ist zweiundsiebzig Jahre alt.']},

{id:12,m:3,cat:'time',min:25,t:['Wie viele? Рахуємо все','Wie viele? Считаем всё'],d:['Рахуємо дні, тижні й предмети — і вчимося множини.','Считаем дни, недели и предметы — и учим множественное число.'],g:'plural',
w:`der Tag|die Tage|день|день|так|Die Woche hat sieben Tage.|Тиждень має сім днів.|В неделе семь дней.
die Woche|die Wochen|тиждень|неделя|вОхе|Ich lerne zwei Wochen Deutsch.|Я вчу німецьку два тижні.|Я учу немецкий две недели.
der Monat|die Monate|місяць|месяц|мОнат|Das Jahr hat zwölf Monate.|Рік має дванадцять місяців.|В году двенадцать месяцев.
die Stunde|die Stunden|година|час|штУнде|Der Tag hat 24 Stunden.|Доба має 24 години.|В сутках 24 часа.
die Minute|die Minuten|хвилина|минута|мінУте|Ich lerne 30 Minuten.|Я вчуся 30 хвилин.|Я занимаюсь 30 минут.
das Buch|die Bücher|книжка|книга|бух|Ich habe zehn Bücher.|У мене десять книжок.|У меня десять книг.
wie viele|-|скільки (про кількість)|сколько (о количестве)|ві фІле|Wie viele Kinder hast du?|Скільки в тебе дітей?|Сколько у тебя детей?
viele|-|багато|много|фІле|Ich habe viele Freunde.|У мене багато друзів.|У меня много друзей.
nur|-|лише, тільки|только|нур|Ich habe nur ein Buch.|У мене лише одна книжка.|У меня только одна книга.`,
p:`Wie viele Geschwister hast du?|Скільки в тебе братів і сестер?|Сколько у тебя братьев и сестёр?
Ich lerne jeden Tag 30 Minuten.|Я вчуся щодня по 30 хвилин.|Я занимаюсь каждый день по 30 минут.
Ein Jahr hat 52 Wochen.|У році 52 тижні.|В году 52 недели.`,
dlg:`Max|Wie viele Bücher hast du?|Скільки в тебе книжок?|Сколько у тебя книг?
Olena|Ich habe viele Bücher, vielleicht fünfzig.|У мене багато книжок, мабуть, пʼятдесят.|У меня много книг, наверное, пятьдесят.
Max|Wow! Und wie viele Stunden lernst du Deutsch?|Ого! А скільки годин ти вчиш німецьку?|Ого! А сколько часов ты учишь немецкий?
Olena|Nur 30 Minuten, aber jeden Tag.|Лише 30 хвилин, але щодня.|Только 30 минут, но каждый день.
Max|Das ist sehr gut!|Це дуже добре!|Это очень хорошо!`,
mini:['Порахуйте вголос предмети навколо: zwei Bücher, drei Stühle…','Посчитайте вслух предметы вокруг: zwei Bücher, drei Stühle…'],
hw:['Напишіть 4 речення з числами і множиною: скільки чого у вас є.','Напишите 4 предложения с числами и множественным числом: сколько чего у вас есть.','Ich habe zwei Brüder. Ich habe viele Bücher. Die Woche hat sieben Tage. Ich lerne dreißig Minuten.']},

{id:13,m:4,cat:'travel',min:25,t:['Länder. Країни','Länder. Страны'],d:['Назви країн і столиць, питання Woher? та Wo?','Названия стран и столиц, вопросы Woher? и Wo?'],g:'questions',gf:['Сьогодні тренуємо питання Woher …? і Wo liegt …?','Сегодня тренируем вопросы Woher …? и Wo liegt …?'],
w:`Deutschland|-|Німеччина|Германия|дОйчлант|Berlin liegt in Deutschland.|Берлін розташований у Німеччині.|Берлин находится в Германии.
Österreich|-|Австрія|Австрия|Ьостерайхь|Wien liegt in Österreich.|Відень розташований в Австрії.|Вена находится в Австрии.
die Schweiz|-|Швейцарія|Швейцария|швайц|Er kommt aus der Schweiz.|Він зі Швейцарії.|Он из Швейцарии.
die Ukraine|-|Україна|Украина|украІне|Ich komme aus der Ukraine.|Я з України.|Я из Украины.
Polen|-|Польща|Польша|пОлен|Warschau liegt in Polen.|Варшава розташована в Польщі.|Варшава находится в Польше.
die Hauptstadt|die Hauptstädte|столиця|столица|хАуптштат|Die Hauptstadt von Deutschland ist Berlin.|Столиця Німеччини — Берлін.|Столица Германии — Берлин.
liegen|-|лежати; бути розташованим|лежать; находиться|лІген|Wo liegt Wien?|Де розташований Відень?|Где находится Вена?
Europa|-|Європа|Европа|ойрОпа|Die Ukraine liegt in Europa.|Україна розташована в Європі.|Украина находится в Европе.`,
p:`Wo liegt das?|Де це розташовано?|Где это находится?
Kyjiw ist die Hauptstadt der Ukraine.|Київ — столиця України.|Киев — столица Украины.
Ich war noch nie in Deutschland.|Я ще ніколи не була в Німеччині.|Я ещё никогда не была в Германии.`,
dlg:`Tom|Woher kommst du?|Звідки ти?|Откуда ты?
Olena|Aus der Ukraine, aus Dnipro.|З України, з Дніпра.|Из Украины, из Днепра.
Tom|Wo liegt Dnipro?|Де розташований Дніпро?|Где находится Днепр?
Olena|Im Osten. Die Hauptstadt ist Kyjiw.|На сході. Столиця — Київ.|На востоке. Столица — Киев.
Tom|Interessant! Ich komme aus der Schweiz.|Цікаво! А я зі Швейцарії.|Интересно! А я из Швейцарии.`,
mini:['Назвіть 5 країн німецькою і скажіть, де розташовані їхні столиці.','Назовите 5 стран по-немецки и скажите, где находятся их столицы.'],
hw:['Напишіть 4 речення: звідки ви, де розташоване ваше місто, яка столиця вашої країни.','Напишите 4 предложения: откуда вы, где находится ваш город, какая столица вашей страны.','Ich komme aus der Ukraine. Ich wohne in Dnipro. Dnipro liegt im Osten. Die Hauptstadt ist Kyjiw.']},

{id:14,m:4,cat:'study',min:25,t:['Sprachen. Мови','Sprachen. Языки'],d:['Розповідаємо, якими мовами говоримо і що вивчаємо.','Рассказываем, на каких языках говорим и что изучаем.'],g:'irregverbs',gf:['Сьогодні головне дієслово — sprechen: du sprichst, er spricht.','Сегодня главный глагол — sprechen: du sprichst, er spricht.'],
w:`die Sprache|die Sprachen|мова|язык|шпрАхе|Deutsch ist eine schöne Sprache.|Німецька — гарна мова.|Немецкий — красивый язык.
Deutsch|-|німецька (мова)|немецкий (язык)|дойч|Ich lerne Deutsch.|Я вчу німецьку.|Я учу немецкий.
Englisch|-|англійська|английский|Енгліш|Sprichst du Englisch?|Ти розмовляєш англійською?|Ты говоришь по-английски?
Ukrainisch|-|українська|украинский|украІніш|Ich spreche Ukrainisch.|Я розмовляю українською.|Я говорю по-украински.
sprechen|-|говорити, розмовляти|говорить, разговаривать|шпрЕхен|Er spricht sehr gut Deutsch.|Він дуже добре розмовляє німецькою.|Он очень хорошо говорит по-немецки.
lernen|-|вчити, вчитися|учить, учиться|лЕрнен|Wir lernen Deutsch.|Ми вчимо німецьку.|Мы учим немецкий.
verstehen|-|розуміти|понимать|ферштЕен|Ich verstehe das nicht.|Я цього не розумію.|Я этого не понимаю.
ein bisschen|-|трішки|немного|айн бІсхен|Ich spreche ein bisschen Deutsch.|Я трішки розмовляю німецькою.|Я немного говорю по-немецки.
langsam|-|повільно|медленно|лАнгзам|Bitte sprechen Sie langsam.|Будь ласка, говоріть повільно.|Пожалуйста, говорите медленно.`,
p:`Welche Sprachen sprichst du?|Якими мовами ти розмовляєш?|На каких языках ты говоришь?
Ich spreche ein bisschen Deutsch.|Я трішки розмовляю німецькою.|Я немного говорю по-немецки.
Bitte sprechen Sie langsam.|Будь ласка, говоріть повільно.|Пожалуйста, говорите медленно.
Ich verstehe nicht.|Я не розумію.|Я не понимаю.`,
dlg:`Tom|Welche Sprachen sprichst du?|Якими мовами ти розмовляєш?|На каких языках ты говоришь?
Olena|Ich spreche Ukrainisch, Englisch und ein bisschen Deutsch.|Українською, англійською і трішки німецькою.|На украинском, английском и немного на немецком.
Tom|Dein Deutsch ist sehr gut!|Твоя німецька дуже добра!|Твой немецкий очень хороший!
Olena|Danke! Ich lerne jeden Tag.|Дякую! Я вчуся щодня.|Спасибо! Я занимаюсь каждый день.
Tom|Verstehst du alles?|Ти все розумієш?|Ты всё понимаешь?
Olena|Nicht alles. Bitte sprich langsam.|Не все. Будь ласка, говори повільно.|Не всё. Пожалуйста, говори медленно.`,
mini:['Скажіть уголос, якими мовами ви розмовляєте і яку вивчаєте.','Скажите вслух, на каких языках вы говорите и какой изучаете.'],
hw:['Напишіть 4 речення про мови: якими розмовляєте ви і ваші друзі.','Напишите 4 предложения о языках: на каких говорите вы и ваши друзья.','Ich spreche Ukrainisch und Englisch. Ich lerne Deutsch. Meine Freundin spricht Polnisch. Wir verstehen ein bisschen Deutsch.']}
];
