// Privacy policy copy for the ZBR customer app (package `app.zbr.customer`),
// translated to match the rest of the site (ru canonical, uz/kk typed).
//
// Kept in its own file because it is long and changes on its own schedule —
// `pages.ts` folds it in under the `privacy` key.
//
// This is the public policy URL for the Play Console listing and App Store
// Connect: https://app.zbrr.uz/privacy
/* eslint-disable */

import type { Lang } from "./translations";
import { CONTACT, type InfoPageCopy } from "./content";

const PACKAGE = "app.zbr.customer";

const ru: InfoPageCopy = {
  eyebrow: "Юридическое",
  title: "Политика конфиденциальности",
  sub: `Как ${CONTACT.entity} — разработчик приложения доставки еды ZBR (пакет ${PACKAGE}) — собирает, использует и защищает ваши данные. Пользуясь ZBR, вы соглашаетесь с этой политикой.`,
  updated: "22 августа 2026",
  sections: [
    { h: "1. Какие данные мы собираем" },
    {
      h: "Данные аккаунта",
      items: [
        "Номер телефона — нужен, чтобы создать аккаунт и войти по одноразовому SMS-коду.",
        "Имя — показывается в ваших заказах.",
        "Email — по желанию; используем, только если вы его укажете.",
      ],
    },
    {
      h: "Местоположение",
      items: [
        "Точное местоположение (GPS) — используем только пока вы пользуетесь приложением, чтобы определить точку доставки и рассчитать её стоимость. Последнее выбранное место сохраняется на вашем устройстве и вместе с сохранёнными адресами.",
        "Координаты передаются в OpenStreetMap (Nominatim), чтобы превратить их в читаемый адрес.",
      ],
    },
    {
      h: "Остальные данные",
      items: [
        "Адреса доставки — те, что вы сохраняете: улица, квартира, подъезд, заметки и координаты.",
        "Заказы — история заказов, состав, суммы и детали доставки.",
        "Отзывы — оценки и комментарии о ресторане или курьере, которые вы решили оставить.",
        "Устройство и уведомления — токен push-уведомлений (Firebase Cloud Messaging на Android, Apple Push Notification service на iOS), чтобы присылать статусы заказа, плюс базовые данные об устройстве и приложении.",
        "Диагностика — если включена, анонимные отчёты о сбоях и данные о производительности через Sentry.",
      ],
    },
    {
      h: "Чего мы НЕ собираем",
      items: [
        "Мы не собираем и не храним данные банковских карт. На текущем этапе ZBR работает только с оплатой наличными курьеру; онлайн-оплату планируем добавить позже и опишем это здесь.",
        "Мы не отслеживаем ваше местоположение в фоновом режиме.",
      ],
    },
    {
      h: "2. Как мы используем данные",
      items: [
        "Создаём и защищаем ваш аккаунт, выполняем вход.",
        "Принимаем, готовим и доставляем заказы, показываем их статус.",
        "Считаем стоимость доставки и показываем, что доступно рядом.",
        "Присылаем уведомления о статусе заказа.",
        "Оказываем поддержку.",
        "Находим причины сбоев и улучшаем приложение.",
      ],
      p: "Мы не продаём ваши персональные данные и не используем их для сторонней рекламы.",
    },
    {
      h: "3. Кому мы передаём данные",
      p: "Передаём минимум, необходимый для работы сервиса:",
      items: [
        "Наш бэкенд и хостинг-провайдер — хранят аккаунт, адреса и заказы.",
        "Рестораны и курьеры — получают данные заказа (имя, телефон, адрес, состав), нужные чтобы приготовить и доставить.",
        "Firebase Cloud Messaging (Google) и Apple Push Notification service — доставляют push-уведомления.",
        "OpenStreetMap (Nominatim) — превращает координаты в адрес.",
        "Sentry — получает диагностику сбоев, если она включена.",
      ],
    },
    {
      h: "4. Безопасность данных",
      items: [
        "Весь трафик между приложением и нашими серверами идёт по HTTPS/TLS.",
        "Токены авторизации хранятся в защищённом хранилище устройства (Keychain на iOS, Keystore на Android), а не в открытом виде.",
      ],
      p: "Мы можем раскрыть информацию, если этого требует закон.",
    },
    {
      h: "5. Хранение и удаление данных",
      p: "Мы храним ваши данные, пока аккаунт активен. Удалить аккаунт можно в любой момент в приложении: Настройки → Удалить аккаунт. Это навсегда удаляет аккаунт, историю заказов, сохранённые адреса и профиль. Удаление происходит сразу и необратимо, без периода восстановления. Отдельные записи могут сохраняться только там, где этого требует закон — например, для налогового и бухгалтерского учёта.",
    },
    {
      h: "6. Дети",
      p: "ZBR не предназначен для детей младше 14 лет, и мы сознательно не собираем их данные.",
    },
    {
      h: "7. Ваши права",
      p: `В зависимости от вашей юрисдикции вы можете запросить доступ к своим данным, их исправление или удаление. Свяжитесь с нами: ${CONTACT.phone}.`,
    },
    {
      h: "8. Изменения политики",
      p: "Мы можем обновлять эту политику. Дата последнего обновления указана выше; о существенных изменениях сообщим в приложении.",
    },
    {
      h: "9. Контакты",
      items: [`${CONTACT.entity}, ${CONTACT.address}`, `Телефон: ${CONTACT.phone}`],
    },
  ],
};

const uz: InfoPageCopy = {
  eyebrow: "Huquqiy",
  title: "Maxfiylik siyosati",
  sub: `${CONTACT.entity} — ZBR ovqat yetkazib berish ilovasi (paket ${PACKAGE}) ishlab chiquvchisi — ma'lumotlaringizni qanday yig'ishi, ishlatishi va himoya qilishi. ZBRdan foydalanib, siz ushbu siyosatga rozilik bildirasiz.`,
  updated: "2026-yil 22-avgust",
  sections: [
    { h: "1. Qanday ma'lumotlarni yig'amiz" },
    {
      h: "Hisob ma'lumotlari",
      items: [
        "Telefon raqami — hisob yaratish va SMSdagi bir martalik kod bilan kirish uchun kerak.",
        "Ism — buyurtmalaringizda ko'rsatiladi.",
        "Email — ixtiyoriy; faqat siz ko'rsatsangiz ishlatamiz.",
      ],
    },
    {
      h: "Joylashuv",
      items: [
        "Aniq joylashuv (GPS) — faqat siz ilovadan foydalanayotganingizda, yetkazib berish nuqtasini aniqlash va uning narxini hisoblash uchun ishlatiladi. Oxirgi tanlangan joy qurilmangizda va saqlangan manzillar bilan birga saqlanadi.",
        "Koordinatalar o'qiladigan manzilga aylantirish uchun OpenStreetMap (Nominatim) ga yuboriladi.",
      ],
    },
    {
      h: "Qolgan ma'lumotlar",
      items: [
        "Yetkazib berish manzillari — siz saqlaganlaringiz: ko'cha, xonadon, kirish, izohlar va koordinatalar.",
        "Buyurtmalar — buyurtmalar tarixi, tarkibi, summalari va yetkazib berish tafsilotlari.",
        "Sharhlar — restoran yoki kuryer haqida siz qoldirishga qaror qilgan baho va izohlar.",
        "Qurilma va bildirishnomalar — buyurtma holatini yuborish uchun push-bildirishnoma tokeni (Androidda Firebase Cloud Messaging, iOSda Apple Push Notification service), shuningdek qurilma va ilova haqida asosiy ma'lumotlar.",
        "Diagnostika — yoqilgan bo'lsa, Sentry orqali anonim nosozlik hisobotlari va unumdorlik ma'lumotlari.",
      ],
    },
    {
      h: "Nimalarni yig'MAYMIZ",
      items: [
        "Biz bank kartalari ma'lumotlarini yig'maymiz va saqlamaymiz. Hozirgi bosqichda ZBR faqat kuryerga naqd pul to'lash bilan ishlaydi; onlayn to'lovni keyinroq qo'shishni rejalashtiryapmiz va buni shu yerda yozamiz.",
        "Biz sizning joylashuvingizni fon rejimida kuzatmaymiz.",
      ],
    },
    {
      h: "2. Ma'lumotlarni qanday ishlatamiz",
      items: [
        "Hisobingizni yaratamiz va himoya qilamiz, kirishni ta'minlaymiz.",
        "Buyurtmalarni qabul qilamiz, tayyorlaymiz va yetkazamiz, holatini ko'rsatamiz.",
        "Yetkazib berish narxini hisoblaymiz va yaqin atrofda nima borligini ko'rsatamiz.",
        "Buyurtma holati haqida bildirishnoma yuboramiz.",
        "Qo'llab-quvvatlash ko'rsatamiz.",
        "Nosozlik sabablarini topamiz va ilovani yaxshilaymiz.",
      ],
      p: "Biz shaxsiy ma'lumotlaringizni sotmaymiz va uchinchi tomon reklamasi uchun ishlatmaymiz.",
    },
    {
      h: "3. Ma'lumotlarni kimga beramiz",
      p: "Xizmat ishlashi uchun zarur bo'lgan eng kamini beramiz:",
      items: [
        "Bizning backend va xosting provayderimiz — hisob, manzillar va buyurtmalarni saqlaydi.",
        "Restoranlar va kuryerlar — tayyorlash va yetkazish uchun kerakli buyurtma ma'lumotlarini (ism, telefon, manzil, tarkib) oladi.",
        "Firebase Cloud Messaging (Google) va Apple Push Notification service — push-bildirishnomalarni yetkazadi.",
        "OpenStreetMap (Nominatim) — koordinatalarni manzilga aylantiradi.",
        "Sentry — yoqilgan bo'lsa, nosozlik diagnostikasini oladi.",
      ],
    },
    {
      h: "4. Ma'lumotlar xavfsizligi",
      items: [
        "Ilova va serverlarimiz o'rtasidagi butun trafik HTTPS/TLS orqali o'tadi.",
        "Avtorizatsiya tokenlari qurilmaning himoyalangan xotirasida (iOSda Keychain, Androidda Keystore) saqlanadi, ochiq holda emas.",
      ],
      p: "Qonun talab qilgan hollarda ma'lumotni oshkor qilishimiz mumkin.",
    },
    {
      h: "5. Ma'lumotlarni saqlash va o'chirish",
      p: "Hisobingiz faol ekan, ma'lumotlaringizni saqlaymiz. Hisobni istalgan vaqtda ilovada o'chirish mumkin: Sozlamalar → Hisobni o'chirish. Bu hisobni, buyurtmalar tarixini, saqlangan manzillarni va profilni butunlay o'chiradi. O'chirish darhol sodir bo'ladi va qaytarilmaydi, tiklash muddati yo'q. Ayrim yozuvlar faqat qonun talab qilgan joyda — masalan, soliq va buxgalteriya hisobi uchun — saqlanishi mumkin.",
    },
    {
      h: "6. Bolalar",
      p: "ZBR 14 yoshgacha bo'lgan bolalar uchun mo'ljallanmagan va biz ataylab ularning ma'lumotlarini yig'maymiz.",
    },
    {
      h: "7. Sizning huquqlaringiz",
      p: `Yurisdiksiyangizga qarab siz o'z ma'lumotlaringizga kirish, ularni tuzatish yoki o'chirishni so'rashingiz mumkin. Biz bilan bog'laning: ${CONTACT.phone}.`,
    },
    {
      h: "8. Siyosat o'zgarishlari",
      p: "Biz ushbu siyosatni yangilashimiz mumkin. Oxirgi yangilanish sanasi yuqorida ko'rsatilgan; muhim o'zgarishlar haqida ilovada xabar beramiz.",
    },
    {
      h: "9. Kontaktlar",
      items: [`${CONTACT.entity}, ${CONTACT.address}`, `Telefon: ${CONTACT.phone}`],
    },
  ],
};

const kk: InfoPageCopy = {
  eyebrow: "Huqıqıy",
  title: "Qupıyalıq siyasatı",
  sub: `${CONTACT.entity} — ZBR awqat jetkeriw qosımshası (paket ${PACKAGE}) islep shıǵarıwshısı — maǵlıwmatlarıńızdı qalay jıynaydı, paydalanadı hám qorǵaydı. ZBRdan paydalanıp, siz usı siyasatqa kelisim bildiresiz.`,
  updated: "2026-jıl 22-avgust",
  sections: [
    { h: "1. Qanday maǵlıwmatlardı jıynaymız" },
    {
      h: "Esap maǵlıwmatları",
      items: [
        "Telefon nomeri — esap jaratıw hám SMSdegi bir mártelik kod penen kiriw ushın kerek.",
        "At — buyırtpalarıńızda kórsetiledi.",
        "Email — qálewińiz boyınsha; tek siz kórsetseńiz paydalanamız.",
      ],
    },
    {
      h: "Jaylasıw",
      items: [
        "Anıq jaylasıw (GPS) — tek siz qosımshadan paydalanıp atırǵanıńızda, jetkeriw noqatın anıqlaw hám onıń bahasın esaplaw ushın paydalanıladı. Aqırǵı tańlanǵan orın qurılmańızda hám saqlanǵan mánziller menen birge saqlanadı.",
        "Koordinatalar oqılatuǵın mánzilge aylandırıw ushın OpenStreetMap (Nominatim) ge jiberiledi.",
      ],
    },
    {
      h: "Qalǵan maǵlıwmatlar",
      items: [
        "Jetkeriw mánzilleri — siz saqlaǵanlarıńız: kósher, xanadan, kiris, eskertpeler hám koordinatalar.",
        "Buyırtpalar — buyırtpalar tariyxı, quramı, summaları hám jetkeriw tápsilatları.",
        "Pikirler — restoran yaki kuryer haqqında siz qaldırıwdı sheshken bahalar hám kommentariyler.",
        "Qurılma hám bildiriwler — buyırtpa jaǵdayın jiberiw ushın push-bildiriw tokeni (Androidta Firebase Cloud Messaging, iOSta Apple Push Notification service), sonday-aq qurılma hám qosımsha haqqında tiykarǵı maǵlıwmatlar.",
        "Diagnostika — qosılǵan bolsa, Sentry arqalı anonim buzılıw esabatları hám ónimdarlıq maǵlıwmatları.",
      ],
    },
    {
      h: "Nelerdi JIYNAMAYMIZ",
      items: [
        "Biz bank kartaları maǵlıwmatların jıynamaymız hám saqlamaymız. Házirgi basqıshta ZBR tek kuryerge naq pul tólew menen isleydi; onlayn tólewdi keyinirek qosıwdı jobalastırıp atırmız hám bunı usı jerde jazamız.",
        "Biz sizdiń jaylasıwıńızdı fon rejiminde baqlamaymız.",
      ],
    },
    {
      h: "2. Maǵlıwmatlardı qalay paydalanamız",
      items: [
        "Esabıńızdı jaratamız hám qorǵaymız, kiriwdi támiyinleymiz.",
        "Buyırtpalardı qabıl etemiz, tayarlaymız hám jetkeremiz, jaǵdayın kórsetemiz.",
        "Jetkeriw bahasın esaplaymız hám jaqın átirapta ne barın kórsetemiz.",
        "Buyırtpa jaǵdayı haqqında bildiriw jiberemiz.",
        "Qollap-quwatlaw kórsetemiz.",
        "Buzılıw sebeplerin tabamız hám qosımshanı jaqsılaymız.",
      ],
      p: "Biz jeke maǵlıwmatlarıńızdı satpaymız hám úshinshi tárep reklaması ushın paydalanbaymız.",
    },
    {
      h: "3. Maǵlıwmatlardı kimge beremiz",
      p: "Xızmet islewi ushın zárúr bolǵan eń azın beremiz:",
      items: [
        "Bizdiń backend hám xosting provayderimiz — esap, mánziller hám buyırtpalardı saqlaydı.",
        "Restoranlar hám kuryerler — tayarlaw hám jetkeriw ushın kerekli buyırtpa maǵlıwmatların (at, telefon, mánzil, quram) aladı.",
        "Firebase Cloud Messaging (Google) hám Apple Push Notification service — push-bildiriwlerdi jetkeredi.",
        "OpenStreetMap (Nominatim) — koordinatalardı mánzilge aylandıradı.",
        "Sentry — qosılǵan bolsa, buzılıw diagnostikasın aladı.",
      ],
    },
    {
      h: "4. Maǵlıwmatlar qáwipsizligi",
      items: [
        "Qosımsha hám serverlerimiz arasındaǵı pútkil trafik HTTPS/TLS arqalı ótedi.",
        "Avtorizaciya tokenleri qurılmanıń qorǵalǵan yadında (iOSta Keychain, Androidta Keystore) saqlanadı, ashıq halda emes.",
      ],
      p: "Nızam talap etken jaǵdaylarda maǵlıwmattı ashıwımız múmkin.",
    },
    {
      h: "5. Maǵlıwmatlardı saqlaw hám óshiriw",
      p: "Esabıńız aktiv ekende, maǵlıwmatlarıńızdı saqlaymız. Esaptı qálegen waqıtta qosımshada óshiriw múmkin: Sazlawlar → Esaptı óshiriw. Bul esaptı, buyırtpalar tariyxın, saqlanǵan mánzillerdi hám profildi pútkilley óshiredi. Óshiriw derhál júz beredi hám qaytarılmaydı, tiklew múddeti joq. Ayırım jazbalar tek nızam talap etken jerde — mısalı, salıq hám buxgalteriya esabı ushın — saqlanıwı múmkin.",
    },
    {
      h: "6. Balalar",
      p: "ZBR 14 jasqa shekemgi balalar ushın arnalmaǵan hám biz ataylap olardıń maǵlıwmatların jıynamaymız.",
    },
    {
      h: "7. Sizdiń huqıqlarıńız",
      p: `Yurisdikciyańızǵa qarap siz óz maǵlıwmatlarıńızǵa kiriw, olardı dúzetiw yaki óshiriwdi soraıwıńız múmkin. Biz benen baylanısıń: ${CONTACT.phone}.`,
    },
    {
      h: "8. Siyasat ózgerisleri",
      p: "Biz usı siyasattı jańalawımız múmkin. Aqırǵı jańalanıw sánesi joqarıda kórsetilgen; áhmiyetli ózgerisler haqqında qosımshada xabar beremiz.",
    },
    {
      h: "9. Kontaktlar",
      items: [`${CONTACT.entity}, ${CONTACT.address}`, `Telefon: ${CONTACT.phone}`],
    },
  ],
};

export const privacyCopy: Record<Lang, InfoPageCopy> = { ru, uz, kk };
