// Copy for the secondary pages linked from the footer.
//
// Kept out of translations.ts (already ~1400 lines) but follows the same rule:
// `ru` is canonical, `uz` and `kk` are typed as `PagesCopy`, so a missing or
// renamed key is a compile error.
//
// NOTE FOR REVIEW: `terms`, `cookies` and `refunds` are drafts written from how
// the service actually works — they have NOT been reviewed by a lawyer. They are
// listed in HIDDEN_PATHS below so nothing links or routes to them until then.
/* eslint-disable */

import type { Lang } from "./translations";
import { CONTACT, type InfoPageCopy } from "./content";
import { privacyCopy } from "./privacy";

export { CONTACT };
export type { InfoSection, InfoPageCopy } from "./content";

export type PageKey =
  | "privacy"
  | "about"
  | "careers"
  | "press"
  | "blog"
  | "offices"
  | "dashboard"
  | "support"
  | "safety"
  | "status"
  | "terms"
  | "cookies"
  | "refunds";

export type PagesCopy = Record<PageKey, InfoPageCopy>;

const UPDATED_RU = "22 августа 2026";
const UPDATED_UZ = "2026-yil 22-avgust";
const UPDATED_KK = "2026-jıl 22-avgust";

const ru: Omit<PagesCopy, "privacy"> = {
  about: {
    eyebrow: "О нас",
    title: "Мы строим доставку, которая не заставляет ждать.",
    sub: "ZBR — сервис доставки еды из Ташкента. Начинаем с одного города и одного обещания: еда приезжает горячей.",
    sections: [
      {
        h: "Почему мы за это взялись",
        p: "Мы сами устали от доставки, где «сорок минут» превращаются в полтора часа, а плов приезжает холодным. ZBR — попытка сделать наоборот: честный срок, живая карта и цена без сюрпризов.",
      },
      {
        h: "Как мы работаем",
        p: "22 минуты — это наш стандарт, а не средняя цифра, посчитанная задним числом. Цена в приложении равна цене в ресторане: мы не накручиваем меню. Курьера видно на настоящей карте, в реальном времени.",
      },
      {
        h: "Где мы сейчас",
        p: "Мы готовимся к запуску в Ташкенте: подключаем рестораны и курьеров до публичного старта. Следующие города откроем там, где наберётся больше заявок.",
      },
      {
        h: "Компания",
        p: `Сервис ZBR развивает ${CONTACT.entity}, ${CONTACT.address}.`,
      },
    ],
  },
  careers: {
    eyebrow: "Карьера",
    title: "Мы в самом начале — и ищем своих.",
    sub: "Открытых вакансий пока нет: команда маленькая, и мы набираем точечно. Но если хочется строить это с нуля — напишите.",
    sections: [
      {
        h: "Кого мы будем искать",
        p: "Это направления, а не открытые позиции — по мере запуска они станут вакансиями.",
        items: [
          "Операционный менеджер — запуск города, ежедневная работа сервиса",
          "Менеджер по партнёрам — подключение ресторанов",
          "Координатор курьеров — смены, поддержка, качество доставки",
          "Мобильный разработчик — iOS и Android",
          "Дизайнер — продукт и коммуникация",
        ],
      },
      {
        h: "Как откликнуться",
        p: `Позвоните нам: ${CONTACT.phone} — расскажите коротко о себе, что уже делали и чем хотите заниматься в ZBR. Резюме приветствуется, но не обязательно.`,
      },
      {
        h: "Что мы даём",
        p: "Ранняя стадия: много ответственности, быстрые решения и прямое влияние на продукт. Условия обсуждаем индивидуально.",
      },
    ],
  },
  press: {
    eyebrow: "Пресса",
    title: "Пресс-центр",
    sub: "Материалы для СМИ и контакты для запросов.",
    sections: [
      {
        h: "О компании",
        p: `ZBR — сервис доставки еды, который запускается в Ташкенте. Оператор сервиса — ${CONTACT.entity}. Ключевые принципы: 22 минуты как стандарт доставки, цена в приложении равна цене в ресторане, живая карта курьера.`,
      },
      {
        h: "Пресс-релизы",
        p: "Пока не публиковались — мы ещё не вышли в публичный запуск. Материалы появятся на этой странице.",
      },
      {
        h: "Логотипы и изображения",
        p: "Медиакит предоставляем по запросу — напишите нам, пришлём актуальные файлы.",
      },
      {
        h: "Контакт для СМИ",
        p: `${CONTACT.phone}`,
      },
    ],
  },
  blog: {
    eyebrow: "Блог",
    title: "Блог ZBR",
    sub: "Как мы строим сервис, что происходит с запуском и что узнаём по пути.",
    sections: [
      {
        h: "Записей пока нет",
        p: "Мы готовим первые материалы к публичному запуску. Оставьте номер в форме внизу страницы — напишем, когда появится что-то стоящее.",
      },
    ],
  },
  offices: {
    eyebrow: "ZBR для офисов",
    title: "Обеды для команды — без хаоса в рабочем чате.",
    sub: "Корпоративная доставка ZBR: общий заказ, один счёт, предсказуемое время.",
    sections: [
      {
        h: "Как это будет работать",
        items: [
          "Общий заказ на команду — каждый выбирает своё",
          "Единый счёт и закрывающие документы",
          "Доставка к началу обеда, а не «когда получится»",
          "Персональный менеджер компании",
        ],
      },
      {
        h: "Статус направления",
        p: "Корпоративная доставка запускается вместе с основным сервисом в Ташкенте. Сейчас мы собираем заявки, чтобы начать с теми, кому это нужно в первую очередь.",
      },
      {
        h: "Оставить заявку",
        p: `Позвоните нам: ${CONTACT.phone} — расскажем условия и подключим вашу компанию одной из первых.`,
      },
    ],
  },
  dashboard: {
    eyebrow: "Ресторанам",
    title: "Кабинет ресторана",
    sub: "Меню, заказы, выплаты и отзывы — в одном месте.",
    sections: [
      {
        h: "Что будет в кабинете",
        items: [
          "Меню и стоп-листы — обновление в реальном времени",
          "Заказы и их статусы",
          "Выплаты и отчёты",
          "Отзывы гостей и рейтинг заведения",
        ],
      },
      {
        h: "Как получить доступ",
        p: "Кабинет открывается после подключения к ZBR. Если вы уже партнёр — доступ выдаёт ваш менеджер. Если ещё нет — начните с заявки, это занимает пару минут.",
      },
    ],
    cta: { label: "Стать партнёром", to: "/partner-offer" },
  },
  support: {
    eyebrow: "Поддержка",
    title: "Мы на связи.",
    sub: "Пишите по любому вопросу — заказ, партнёрство, работа курьером или что-то ещё.",
    sections: [
      {
        h: "Как связаться",
        items: [`Телефон — ${CONTACT.phone}`],
      },
      {
        h: "Когда ответим",
        p: "В течение рабочего дня. Если вопрос по активному заказу — разбираем в первую очередь.",
      },
      {
        h: "Частые вопросы",
        p: "Многое уже разобрано в FAQ на главной странице — начните оттуда, так быстрее.",
      },
      {
        h: "Данные и аккаунт",
        p: "Удаление аккаунта, доступ к данным и всё остальное описано в политике конфиденциальности.",
      },
    ],
  },
  safety: {
    eyebrow: "Безопасность",
    title: "Безопасность в ZBR",
    sub: "Что мы делаем, чтобы заказ, оплата и ваши данные были в порядке.",
    sections: [
      {
        h: "Курьеры",
        p: "Курьеров подключаем по документам и проводим вводный инструктаж — обращение с едой, вежливость, правила на дороге. Каждый заказ закреплён за конкретным курьером, и вы видите, кто его везёт.",
      },
      {
        h: "Еда",
        p: "Заказы перевозятся в термосумках. Рестораны подключаем только с действующими разрешениями на работу общепита.",
      },
      {
        h: "Аккаунт",
        p: "Вход — по одноразовому коду из SMS, поэтому пароль негде украсть. Токены хранятся в защищённом хранилище устройства, а весь трафик между приложением и нашими серверами шифруется (HTTPS/TLS).",
      },
      {
        h: "Оплата",
        p: "Сейчас, на этапе MVP, ZBR работает только с оплатой наличными курьеру — данные банковских карт мы не собираем и не храним. Оплату картой и онлайн-оплату планируем добавить позже.",
      },
      {
        h: "Если что-то пошло не так",
        p: `Сообщите нам: ${CONTACT.phone}. Разбираем каждый случай.`,
      },
    ],
  },
  status: {
    eyebrow: "Статус",
    title: "Статус сервиса",
    sub: "Текущее состояние ZBR.",
    sections: [
      {
        h: "Сейчас",
        p: "Сервис готовится к запуску. Приём заявок от ресторанов и курьеров работает; публичный приём заказов ещё не открыт.",
      },
      {
        h: "Компоненты",
        items: [
          "Сайт и формы заявок — работают",
          "Мобильное приложение — в разработке",
          "Приём заказов — откроется с публичным запуском",
        ],
      },
      {
        h: "Инциденты",
        p: "Не зафиксировано.",
      },
      {
        h: "Как узнать о сбоях",
        p: `О значимых сбоях сообщим здесь и в приложении. Срочные вопросы — ${CONTACT.phone}. Страница обновляется вручную.`,
      },
    ],
  },
  terms: {
    eyebrow: "Юридическое",
    title: "Условия использования",
    sub: "Правила пользования сервисом ZBR.",
    updated: UPDATED_RU,
    sections: [
      {
        h: "1. Кто оказывает услугу",
        p: `Сервис ZBR предоставляет ${CONTACT.entity}, ${CONTACT.address} (далее — «мы»). Пользуясь ZBR, вы соглашаетесь с этими условиями.`,
      },
      {
        h: "2. Что такое ZBR",
        p: "ZBR — платформа, которая соединяет вас с ресторанами и курьерами. Блюда готовит ресторан, доставляет курьер; мы отвечаем за работу платформы и организацию доставки.",
      },
      {
        h: "3. Аккаунт",
        p: "Для заказа нужен номер телефона и подтверждение одноразовым кодом из SMS. Не передавайте код третьим лицам. Аккаунт можно удалить в приложении: Настройки → Удалить аккаунт; удаление необратимо.",
      },
      {
        h: "4. Заказы и цены",
        p: "Цена блюда в приложении соответствует цене ресторана. Стоимость доставки и итоговая сумма показываются до подтверждения заказа. Заказ считается принятым после подтверждения.",
      },
      {
        h: "5. Оплата",
        p: "Сейчас, на этапе MVP, оплата только наличными курьеру при получении. Данные банковских карт мы не собираем и не храним. Оплату картой и онлайн-оплату добавим позже — условия обновим здесь.",
      },
      {
        h: "6. Отмена и возврат",
        p: "Порядок отмены заказа и возврата денег описан в разделе «Возвраты».",
      },
      {
        h: "7. Правила поведения",
        p: "Нельзя использовать сервис для незаконных целей, оскорблять курьеров и сотрудников ресторанов, оставлять заведомо ложные отзывы или оформлять фиктивные заказы. При нарушении мы можем ограничить доступ к сервису.",
      },
      {
        h: "8. Ответственность",
        p: "За качество, состав и безопасность блюд отвечает ресторан, который их готовит. Мы отвечаем за работу платформы и организацию доставки. Мы не отвечаем за обстоятельства вне нашего контроля — погоду, перекрытие дорог и подобное.",
      },
      {
        h: "9. Изменения условий",
        p: "Мы можем обновлять эти условия. Дата последнего обновления указана выше; о существенных изменениях сообщим в приложении.",
      },
      {
        h: "10. Контакты",
        p: `${CONTACT.entity}, ${CONTACT.address}. ${CONTACT.phone}`,
      },
    ],
  },
  cookies: {
    eyebrow: "Юридическое",
    title: "Файлы cookie",
    sub: "Как сайт ZBR использует cookie и похожие технологии.",
    updated: UPDATED_RU,
    sections: [
      {
        h: "Что мы используем",
        p: "Минимум: локальное хранилище браузера (localStorage), чтобы запомнить выбранный вами язык. Это техническая необходимость, а не реклама и не профилирование.",
      },
      {
        h: "Чего мы не делаем",
        p: "Мы не используем рекламные cookie, не строим рекламные профили и не передаём эти данные третьим лицам. Если мы подключим веб-аналитику, то опишем её здесь и, где это требуется, спросим согласие.",
      },
      {
        h: "Как этим управлять",
        p: "Вы можете очистить локальное хранилище в настройках браузера. Сайт продолжит работать — выбор языка просто вернётся к значению по умолчанию.",
      },
      {
        h: "Приложение",
        p: "Как с данными работает мобильное приложение ZBR — описано в политике конфиденциальности.",
      },
    ],
  },
  refunds: {
    eyebrow: "Юридическое",
    title: "Отмена и возврат",
    sub: "Когда заказ можно отменить и как вернуть деньги.",
    updated: UPDATED_RU,
    sections: [
      {
        h: "Отмена до начала приготовления",
        p: "Пока ресторан не начал готовить, заказ можно отменить бесплатно.",
      },
      {
        h: "Отмена после начала приготовления",
        p: "Если ресторан уже начал готовить, отмена может быть платной — вплоть до полной стоимости заказа, потому что продукты уже израсходованы.",
      },
      {
        h: "Если с заказом что-то не так",
        p: "Привезли не то, чего-то не хватает, еда пришла в неприемлемом состоянии или заказ сильно опоздал — сообщите нам в день заказа. Мы разберёмся и вернём деньги полностью или частично, в зависимости от ситуации.",
      },
      {
        h: "Как оформить возврат",
        p: `Позвоните нам: ${CONTACT.phone}. Укажите номер заказа и что произошло; по возможности приложите фотографию.`,
      },
      {
        h: "Сроки",
        p: "Обращение рассматриваем в течение рабочего дня. Способ и срок возврата зависят от того, как был оплачен заказ; порядок согласуем с вами при обращении.",
      },
    ],
  },
};

const uz: Omit<PagesCopy, "privacy"> = {
  about: {
    eyebrow: "Biz haqimizda",
    title: "Biz kutishga majbur qilmaydigan yetkazib berishni quryapmiz.",
    sub: "ZBR — Toshkentdan boshlanayotgan ovqat yetkazib berish xizmati. Bitta shahar va bitta va'da: ovqat issiq yetib boradi.",
    sections: [
      {
        h: "Nega bu ishga kirishdik",
        p: "«Qirq daqiqa» bir yarim soatga aylanadigan, palov esa sovib keladigan yetkazib berishdan biz ham charchadik. ZBR — buning aksini qilishga urinish: halol muddat, jonli xarita va kutilmagan narxlarsiz hisob.",
      },
      {
        h: "Qanday ishlaymiz",
        p: "22 daqiqa — bu bizning standartimiz, keyin hisoblab chiqilgan o'rtacha ko'rsatkich emas. Ilovadagi narx restorandagi narxga teng: biz menyuga ustama qo'shmaymiz. Kuryer haqiqiy xaritada, real vaqtda ko'rinadi.",
      },
      {
        h: "Hozir qayerdamiz",
        p: "Toshkentda ishga tushishga tayyorlanyapmiz: ommaviy startdan oldin restoran va kuryerlarni ulayapmiz. Keyingi shaharlarni arizalar ko'p bo'lgan joydan ochamiz.",
      },
      {
        h: "Kompaniya",
        p: `ZBR xizmatini ${CONTACT.entity}, ${CONTACT.address} rivojlantiradi.`,
      },
    ],
  },
  careers: {
    eyebrow: "Karyera",
    title: "Biz eng boshidamiz — va o'zimiznikilarni qidiryapmiz.",
    sub: "Hozircha ochiq vakansiyalar yo'q: jamoa kichik va biz nuqtali tanlaymiz. Ammo buni noldan qurgingiz kelsa — yozing.",
    sections: [
      {
        h: "Kimlarni qidiramiz",
        p: "Bular yo'nalishlar, ochiq lavozimlar emas — ishga tushish bilan ular vakansiyaga aylanadi.",
        items: [
          "Operatsion menejer — shaharni ishga tushirish, kundalik ish",
          "Hamkorlar bo'yicha menejer — restoranlarni ulash",
          "Kuryerlar koordinatori — smenalar, qo'llab-quvvatlash, sifat",
          "Mobil dasturchi — iOS va Android",
          "Dizayner — mahsulot va kommunikatsiya",
        ],
      },
      {
        h: "Qanday murojaat qilish",
        p: `${CONTACT.phone} raqamiga qo'ng'iroq qiling: o'zingiz haqingizda qisqacha, nima qilgansiz va ZBRda nima bilan shug'ullanmoqchisiz. Rezyume bo'lsa yaxshi, lekin shart emas.`,
      },
      {
        h: "Nima beramiz",
        p: "Erta bosqich: ko'p mas'uliyat, tez qarorlar va mahsulotga bevosita ta'sir. Shartlarni individual muhokama qilamiz.",
      },
    ],
  },
  press: {
    eyebrow: "Matbuot",
    title: "Matbuot markazi",
    sub: "OAV uchun materiallar va so'rovlar uchun kontaktlar.",
    sections: [
      {
        h: "Kompaniya haqida",
        p: `ZBR — Toshkentda ishga tushayotgan ovqat yetkazib berish xizmati. Xizmat operatori — ${CONTACT.entity}. Asosiy tamoyillar: yetkazib berish standarti 22 daqiqa, ilovadagi narx restorandagi narxga teng, kuryerning jonli xaritasi.`,
      },
      {
        h: "Press-relizlar",
        p: "Hozircha chop etilmagan — biz hali ommaviy startga chiqmadik. Materiallar shu sahifada paydo bo'ladi.",
      },
      {
        h: "Logotip va tasvirlar",
        p: "Mediakitni so'rov bo'yicha beramiz — yozing, dolzarb fayllarni yuboramiz.",
      },
      {
        h: "OAV uchun kontakt",
        p: `${CONTACT.phone}`,
      },
    ],
  },
  blog: {
    eyebrow: "Blog",
    title: "ZBR blogi",
    sub: "Xizmatni qanday quryapmiz, ishga tushish qanday ketyapti va yo'lda nimalarni bilib olyapmiz.",
    sections: [
      {
        h: "Hozircha yozuvlar yo'q",
        p: "Birinchi materiallarni ommaviy startga tayyorlayapmiz. Sahifa pastidagi shaklda raqamingizni qoldiring — arziydigan narsa paydo bo'lganda yozamiz.",
      },
    ],
  },
  offices: {
    eyebrow: "Ofislar uchun ZBR",
    title: "Jamoa uchun tushlik — ishchi chatdagi tartibsizliksiz.",
    sub: "ZBR korporativ yetkazib berish: umumiy buyurtma, bitta hisob, oldindan aniq vaqt.",
    sections: [
      {
        h: "Bu qanday ishlaydi",
        items: [
          "Jamoaga umumiy buyurtma — har kim o'zinikini tanlaydi",
          "Yagona hisob va yopuvchi hujjatlar",
          "Tushlik boshiga yetkazib berish, «qachon bo'lsa» emas",
          "Kompaniya uchun shaxsiy menejer",
        ],
      },
      {
        h: "Yo'nalish holati",
        p: "Korporativ yetkazib berish Toshkentda asosiy xizmat bilan birga ishga tushadi. Hozir arizalarni yig'yapmiz — birinchi navbatda kimga kerak bo'lsa, o'shalar bilan boshlaymiz.",
      },
      {
        h: "Ariza qoldirish",
        p: `${CONTACT.phone} raqamiga qo'ng'iroq qiling — shartlarni aytamiz va kompaniyangizni birinchilardan bo'lib ulaymiz.`,
      },
    ],
  },
  dashboard: {
    eyebrow: "Restoranlarga",
    title: "Restoran kabineti",
    sub: "Menyu, buyurtmalar, to'lovlar va sharhlar — bitta joyda.",
    sections: [
      {
        h: "Kabinetda nima bo'ladi",
        items: [
          "Menyu va stop-ro'yxatlar — real vaqtda yangilash",
          "Buyurtmalar va ularning holati",
          "To'lovlar va hisobotlar",
          "Mehmonlar sharhlari va reyting",
        ],
      },
      {
        h: "Qanday kirish",
        p: "Kabinet ZBRga ulangandan keyin ochiladi. Agar siz allaqachon hamkor bo'lsangiz — kirishni menejeringiz beradi. Agar hali bo'lmasangiz — arizadan boshlang, bu bir necha daqiqa oladi.",
      },
    ],
    cta: { label: "Hamkor bo'lish", to: "/partner-offer" },
  },
  support: {
    eyebrow: "Qo'llab-quvvatlash",
    title: "Biz aloqadamiz.",
    sub: "Har qanday savol bo'yicha yozing — buyurtma, hamkorlik, kuryerlik yoki boshqa narsa.",
    sections: [
      {
        h: "Qanday bog'lanish",
        items: [`Telefon — ${CONTACT.phone}`],
      },
      {
        h: "Qachon javob beramiz",
        p: "Ish kuni davomida. Savol faol buyurtma bo'yicha bo'lsa — birinchi navbatda ko'rib chiqamiz.",
      },
      {
        h: "Ko'p beriladigan savollar",
        p: "Ko'p narsa bosh sahifadagi FAQ bo'limida yoritilgan — o'sha yerdan boshlang, shunda tezroq.",
      },
      {
        h: "Ma'lumotlar va hisob",
        p: "Hisobni o'chirish, ma'lumotlarga kirish va qolgan hamma narsa maxfiylik siyosatida yozilgan.",
      },
    ],
  },
  safety: {
    eyebrow: "Xavfsizlik",
    title: "ZBRda xavfsizlik",
    sub: "Buyurtma, to'lov va ma'lumotlaringiz joyida bo'lishi uchun nima qilamiz.",
    sections: [
      {
        h: "Kuryerlar",
        p: "Kuryerlarni hujjatlar asosida ulaymiz va kirish instruktajini o'tkazamiz — ovqat bilan muomala, xushmuomalalik, yo'l qoidalari. Har bir buyurtma aniq kuryerga biriktiriladi va uni kim olib kelayotganini ko'rasiz.",
      },
      {
        h: "Ovqat",
        p: "Buyurtmalar termosumkalarda tashiladi. Restoranlarni faqat umumiy ovqatlanish uchun amaldagi ruxsatnomalari bilan ulaymiz.",
      },
      {
        h: "Hisob",
        p: "Kirish — SMSdagi bir martalik kod orqali, shuning uchun o'g'irlanadigan parol yo'q. Tokenlar qurilmaning himoyalangan xotirasida saqlanadi, ilova va serverlarimiz o'rtasidagi butun trafik shifrlanadi (HTTPS/TLS).",
      },
      {
        h: "To'lov",
        p: "Hozir, MVP bosqichida, ZBR faqat kuryerga naqd pul to'lash bilan ishlaydi — bank kartalari ma'lumotlarini yig'maymiz va saqlamaymiz. Karta va onlayn to'lovni keyinroq qo'shishni rejalashtiryapmiz.",
      },
      {
        h: "Agar biror narsa noto'g'ri ketsa",
        p: `Bizga xabar bering: ${CONTACT.phone}. Har bir holatni ko'rib chiqamiz.`,
      },
    ],
  },
  status: {
    eyebrow: "Holat",
    title: "Xizmat holati",
    sub: "ZBRning joriy holati.",
    sections: [
      {
        h: "Hozir",
        p: "Xizmat ishga tushishga tayyorlanmoqda. Restoran va kuryerlardan arizalar qabul qilinmoqda; ommaviy buyurtma qabul qilish hali ochilmagan.",
      },
      {
        h: "Komponentlar",
        items: [
          "Sayt va ariza shakllari — ishlayapti",
          "Mobil ilova — ishlab chiqilmoqda",
          "Buyurtma qabul qilish — ommaviy start bilan ochiladi",
        ],
      },
      {
        h: "Insidentlar",
        p: "Qayd etilmagan.",
      },
      {
        h: "Uzilishlar haqida qanday bilish",
        p: `Muhim uzilishlar haqida shu yerda va ilovada xabar beramiz. Shoshilinch savollar — ${CONTACT.phone}. Sahifa qo'lda yangilanadi.`,
      },
    ],
  },
  terms: {
    eyebrow: "Huquqiy",
    title: "Foydalanish shartlari",
    sub: "ZBR xizmatidan foydalanish qoidalari.",
    updated: UPDATED_UZ,
    sections: [
      {
        h: "1. Xizmatni kim ko'rsatadi",
        p: `ZBR xizmatini ${CONTACT.entity}, ${CONTACT.address} taqdim etadi (keyingi o'rinlarda — «biz»). ZBRdan foydalanib, siz ushbu shartlarga rozilik bildirasiz.`,
      },
      {
        h: "2. ZBR nima",
        p: "ZBR — sizni restoran va kuryerlar bilan bog'laydigan platforma. Taomlarni restoran tayyorlaydi, kuryer yetkazadi; biz platformaning ishlashi va yetkazib berishni tashkil qilish uchun javob beramiz.",
      },
      {
        h: "3. Hisob",
        p: "Buyurtma uchun telefon raqami va SMSdagi bir martalik kod bilan tasdiqlash kerak. Kodni uchinchi shaxslarga bermang. Hisobni ilovada o'chirish mumkin: Sozlamalar → Hisobni o'chirish; o'chirish qaytarilmaydi.",
      },
      {
        h: "4. Buyurtmalar va narxlar",
        p: "Ilovadagi taom narxi restoran narxiga mos keladi. Yetkazib berish qiymati va yakuniy summa buyurtmani tasdiqlashdan oldin ko'rsatiladi. Buyurtma tasdiqlangandan so'ng qabul qilingan hisoblanadi.",
      },
      {
        h: "5. To'lov",
        p: "Hozir, MVP bosqichida, to'lov faqat olish paytida kuryerga naqd pul bilan. Bank kartalari ma'lumotlarini yig'maymiz va saqlamaymiz. Karta va onlayn to'lovni keyinroq qo'shamiz — shartlarni shu yerda yangilaymiz.",
      },
      {
        h: "6. Bekor qilish va qaytarish",
        p: "Buyurtmani bekor qilish va pulni qaytarish tartibi «Qaytarish» bo'limida yozilgan.",
      },
      {
        h: "7. Xulq-atvor qoidalari",
        p: "Xizmatdan noqonuniy maqsadlarda foydalanish, kuryerlar va restoran xodimlarini haqorat qilish, ataylab yolg'on sharhlar qoldirish yoki soxta buyurtmalar rasmiylashtirish mumkin emas. Qoidabuzarlikda biz xizmatga kirishni cheklashimiz mumkin.",
      },
      {
        h: "8. Javobgarlik",
        p: "Taomlarning sifati, tarkibi va xavfsizligi uchun ularni tayyorlagan restoran javob beradi. Biz platformaning ishlashi va yetkazib berishni tashkil qilish uchun javob beramiz. Bizga bog'liq bo'lmagan holatlar — ob-havo, yo'llarning yopilishi va shunga o'xshashlar — uchun javob bermaymiz.",
      },
      {
        h: "9. Shartlarning o'zgarishi",
        p: "Biz ushbu shartlarni yangilashimiz mumkin. Oxirgi yangilanish sanasi yuqorida ko'rsatilgan; muhim o'zgarishlar haqida ilovada xabar beramiz.",
      },
      {
        h: "10. Kontaktlar",
        p: `${CONTACT.entity}, ${CONTACT.address}. ${CONTACT.phone}`,
      },
    ],
  },
  cookies: {
    eyebrow: "Huquqiy",
    title: "Cookie fayllari",
    sub: "ZBR sayti cookie va shunga o'xshash texnologiyalardan qanday foydalanadi.",
    updated: UPDATED_UZ,
    sections: [
      {
        h: "Nimadan foydalanamiz",
        p: "Eng zarurini: tanlagan tilingizni eslab qolish uchun brauzerning lokal xotirasi (localStorage). Bu texnik zarurat, reklama yoki profillashtirish emas.",
      },
      {
        h: "Nima qilmaymiz",
        p: "Biz reklama cookie'laridan foydalanmaymiz, reklama profillarini qurmaymiz va bu ma'lumotlarni uchinchi shaxslarga bermaymiz. Agar veb-analitika ulasak, buni shu yerda tasvirlaymiz va talab qilingan joyda rozilik so'raymiz.",
      },
      {
        h: "Buni qanday boshqarish",
        p: "Lokal xotirani brauzer sozlamalarida tozalashingiz mumkin. Sayt ishlashda davom etadi — til tanlovi shunchaki standart qiymatga qaytadi.",
      },
      {
        h: "Ilova",
        p: "ZBR mobil ilovasi ma'lumotlar bilan qanday ishlashi maxfiylik siyosatida yozilgan.",
      },
    ],
  },
  refunds: {
    eyebrow: "Huquqiy",
    title: "Bekor qilish va qaytarish",
    sub: "Buyurtmani qachon bekor qilish mumkin va pulni qanday qaytarish.",
    updated: UPDATED_UZ,
    sections: [
      {
        h: "Tayyorlash boshlanishidan oldin bekor qilish",
        p: "Restoran tayyorlashni boshlamaguncha buyurtmani bepul bekor qilish mumkin.",
      },
      {
        h: "Tayyorlash boshlangandan keyin bekor qilish",
        p: "Agar restoran tayyorlashni boshlagan bo'lsa, bekor qilish pullik bo'lishi mumkin — buyurtmaning to'liq qiymatigacha, chunki mahsulotlar allaqachon sarflangan.",
      },
      {
        h: "Agar buyurtmada muammo bo'lsa",
        p: "Boshqa narsa keltirilgan, biror narsa yetishmayapti, ovqat qabul qilib bo'lmaydigan holatda kelgan yoki buyurtma juda kechikkan bo'lsa — buyurtma kuni bizga xabar bering. Ko'rib chiqamiz va vaziyatga qarab pulni to'liq yoki qisman qaytaramiz.",
      },
      {
        h: "Qaytarishni qanday rasmiylashtirish",
        p: `${CONTACT.phone} raqamiga qo'ng'iroq qiling. Buyurtma raqamini va nima bo'lganini ko'rsating; iloji bo'lsa foto ilova qiling.`,
      },
      {
        h: "Muddatlar",
        p: "Murojaatni ish kuni davomida ko'rib chiqamiz. Qaytarish usuli va muddati buyurtma qanday to'langaniga bog'liq; tartibni murojaat vaqtida siz bilan kelishamiz.",
      },
    ],
  },
};

const kk: Omit<PagesCopy, "privacy"> = {
  about: {
    eyebrow: "Biz haqqımızda",
    title: "Biz kütiwge májbúrlemeytuǵın jetkeriwdi quryapmız.",
    sub: "ZBR — Tashkenttten baslanatuǵın awqat jetkeriw xızmeti. Bir qala hám bir wáde: awqat ıssı jetip baradı.",
    sections: [
      {
        h: "Nege bul iske kiristik",
        p: "«Qırıq minut» bir yarım saatqa aylanatuǵın, palaw bolsa suwıp keletuǵın jetkeriwden biz de sharshadıq. ZBR — bunıń kerisin islewge urınıw: haqıyqıy múddet, janlı karta hám kútilmegen bahalarsız esap.",
      },
      {
        h: "Qalay isleymiz",
        p: "22 minut — bul bizdiń standartımız, keyin esaplanǵan ortasha kórsetkish emes. Qosımshadaǵı baha restorandaǵı bahaǵa teń: biz menyuǵa ústeme qospaymız. Kuryer haqıyqıy kartada, real waqıtta kórinedi.",
      },
      {
        h: "Házir qayerdemiz",
        p: "Tashkentte iske túsiwge tayarlanyapmız: kópshilik startınan aldın restoran hám kuryerlerdi qosyapmız. Keyingi qalalardı arzalar kóp bolǵan jerden ashamız.",
      },
      {
        h: "Kompaniya",
        p: `ZBR xızmetin ${CONTACT.entity}, ${CONTACT.address} rawajlandıradı.`,
      },
    ],
  },
  careers: {
    eyebrow: "Kariyera",
    title: "Biz eń baslanıwındamız — hám óz adamlarımızdı izleymiz.",
    sub: "Házirshe ashıq wakansiyalar joq: komanda kishkene hám biz noqatlı tańlaymız. Biraq bunı noldan qurǵıńız kelse — jazıń.",
    sections: [
      {
        h: "Kimlerdi izleymiz",
        p: "Bular baǵdarlar, ashıq lawazımlar emes — iske túsiw menen olar wakansiyaǵa aylanadı.",
        items: [
          "Operatsion menejer — qalanı iske túsiriw, kúndelikli jumıs",
          "Sheriklik boyınsha menejer — restoranlardı qosıw",
          "Kuryerler koordinatorı — smenalar, qollap-quwatlaw, sapa",
          "Mobil baǵdarlamashı — iOS hám Android",
          "Dizayner — ónim hám kommunikatsiya",
        ],
      },
      {
        h: "Qalay múrájat etiw",
        p: `${CONTACT.phone} nomerine qońıraw etiń: ózińiz haqqıńızda qısqasha, ne islegensiz hám ZBRda ne menen shuǵıllanbaqshısız. Rezyume bolsa jaqsı, biraq shárt emes.`,
      },
      {
        h: "Ne beremiz",
        p: "Erte basqısh: kóp juwapkershilik, tez sheshimler hám ónimge tuwrıdan-tuwrı tásir. Shártlerdi jeke túrde talqılaymız.",
      },
    ],
  },
  press: {
    eyebrow: "Baspasóz",
    title: "Baspasóz orayı",
    sub: "GAQ ushın materiallar hám soraw ushın kontaktlar.",
    sections: [
      {
        h: "Kompaniya haqqında",
        p: `ZBR — Tashkentte iske túsip atırǵan awqat jetkeriw xızmeti. Xızmet operatorı — ${CONTACT.entity}. Tiykarǵı principler: jetkeriw standartı 22 minut, qosımshadaǵı baha restorandaǵı bahaǵa teń, kuryerdiń janlı kartası.`,
      },
      {
        h: "Press-relizler",
        p: "Házirshe járiyalanbaǵan — biz ele kópshilik startına shıqpadıq. Materiallar usı bette payda boladı.",
      },
      {
        h: "Logotip hám súwretler",
        p: "Mediakitti soraw boyınsha beremiz — jazıń, ámeldegi fayllardı jiberemiz.",
      },
      {
        h: "GAQ ushın kontakt",
        p: `${CONTACT.phone}`,
      },
    ],
  },
  blog: {
    eyebrow: "Blog",
    title: "ZBR blogı",
    sub: "Xızmetti qalay quryapmız, iske túsiw qalay ketip atır hám jolda nelerdi biletuǵınımız.",
    sections: [
      {
        h: "Házirshe jazbalar joq",
        p: "Birinshi materiallardı kópshilik startına tayarlayapmız. Bettiń tómenindegi formada nomerińizdi qaldırıń — arzıytuǵın nárse payda bolǵanda jazamız.",
      },
    ],
  },
  offices: {
    eyebrow: "Ofisler ushın ZBR",
    title: "Komanda ushın túslik — jumıs chatındaǵı bántsizliksiz.",
    sub: "ZBR korporativ jetkeriw: ulıwma buyırtpa, bir esap, aldın-ala anıq waqıt.",
    sections: [
      {
        h: "Bul qalay isleydi",
        items: [
          "Komandaǵa ulıwma buyırtpa — hár kim ózinikin tańlaydı",
          "Birden esap hám jabıwshı hújjetler",
          "Túslik baslanıwına jetkeriw, «qashan bolsa» emes",
          "Kompaniya ushın jeke menejer",
        ],
      },
      {
        h: "Baǵdar jaǵdayı",
        p: "Korporativ jetkeriw Tashkentte tiykarǵı xızmet penen birge iske túsedi. Házir arzalardı jıynap atırmız — birinshi gezekte kimge kerek bolsa, solar menen baslaymız.",
      },
      {
        h: "Arza qaldırıw",
        p: `${CONTACT.phone} nomerine qońıraw etiń — shártlerdi aytamız hám kompaniyańızdı birinshilerden bolıp qosamız.`,
      },
    ],
  },
  dashboard: {
    eyebrow: "Restoranlarǵa",
    title: "Restoran kabineti",
    sub: "Menyu, buyırtpalar, tólemler hám pikirler — bir jerde.",
    sections: [
      {
        h: "Kabinette ne boladı",
        items: [
          "Menyu hám stop-dizimler — real waqıtta jańalaw",
          "Buyırtpalar hám olardıń jaǵdayı",
          "Tólemler hám esabatlar",
          "Mıymanlar pikirleri hám reyting",
        ],
      },
      {
        h: "Qalay kiriw",
        p: "Kabinet ZBRǵa qosılǵannan keyin ashıladı. Eger siz aldınnan sherik bolsańız — kiriwdi menejerińiz beredi. Eger ele bolmasańız — arzadan baslań, bul bir neshe minut aladı.",
      },
    ],
    cta: { label: "Sherik bolıw", to: "/partner-offer" },
  },
  support: {
    eyebrow: "Qollap-quwatlaw",
    title: "Biz baylanıstamız.",
    sub: "Qálegen soraw boyınsha jazıń — buyırtpa, sheriklik, kuryerlik yaki basqa nárse.",
    sections: [
      {
        h: "Qalay baylanısıw",
        items: [`Telefon — ${CONTACT.phone}`],
      },
      {
        h: "Qashan juwap beremiz",
        p: "Jumıs kúni dawamında. Soraw aktiv buyırtpa boyınsha bolsa — birinshi gezekte qaraymız.",
      },
      {
        h: "Kóp beriletuǵın sorawlar",
        p: "Kóp nárse bas bettegi FAQ bóliminde jazılǵan — sol jerden baslań, bulay tezirek.",
      },
      {
        h: "Maǵlıwmatlar hám esap",
        p: "Esaptı óshiriw, maǵlıwmatlarǵa kiriw hám qalǵanı — barlıǵı qupıyalıq siyasatında jazılǵan.",
      },
    ],
  },
  safety: {
    eyebrow: "Qáwipsizlik",
    title: "ZBRda qáwipsizlik",
    sub: "Buyırtpa, tólem hám maǵlıwmatlarıńız orınında bolıwı ushın ne isleymiz.",
    sections: [
      {
        h: "Kuryerler",
        p: "Kuryerlerdi hújjetler tiykarında qosamız hám kiris instruktajın ótkeremiz — awqat penen munasábet, ádeplilik, jol qaǵıydaları. Hár bir buyırtpa anıq kuryerge biriktiriledi hám onı kim alıp kiyatırǵanın kóresiz.",
      },
      {
        h: "Awqat",
        p: "Buyırtpalar termosumkalarda tasıladı. Restoranlardı tek ulıwma awqatlanıw ushın ámeldegi ruqsatnamaları menen qosamız.",
      },
      {
        h: "Esap",
        p: "Kiriw — SMSdegi bir mártelik kod arqalı, sonlıqtan urlanatuǵın parol joq. Tokenler qurılmanıń qorǵalǵan yadında saqlanadı, qosımsha hám serverlerimiz arasındaǵı pútkil trafik shifrlanadı (HTTPS/TLS).",
      },
      {
        h: "Tólem",
        p: "Házir, MVP basqıshında, ZBR tek kuryerge naq pul tólew menen isleydi — bank kartaları maǵlıwmatların jıynamaymız hám saqlamaymız. Karta hám onlayn tólewdi keyinirek qosıwdı jobalastırıp atırmız.",
      },
      {
        h: "Eger bir nárse durıs ketpese",
        p: `Bizge xabar beriń: ${CONTACT.phone}. Hár bir jaǵdaydı qaraymız.`,
      },
    ],
  },
  status: {
    eyebrow: "Jaǵday",
    title: "Xızmet jaǵdayı",
    sub: "ZBRdıń házirgi jaǵdayı.",
    sections: [
      {
        h: "Házir",
        p: "Xızmet iske túsiwge tayarlanıp atır. Restoran hám kuryerlerden arzalar qabıl etiledi; kópshilik buyırtpa qabıl etiw ele ashılmaǵan.",
      },
      {
        h: "Komponentler",
        items: [
          "Sayt hám arza formaları — islep atır",
          "Mobil qosımsha — islep shıǵılıp atır",
          "Buyırtpa qabıl etiw — kópshilik start penen ashıladı",
        ],
      },
      {
        h: "Incidentler",
        p: "Belgilenbegen.",
      },
      {
        h: "Úzilisler haqqında qalay biliw",
        p: `Áhmiyetli úzilisler haqqında usı jerde hám qosımshada xabar beremiz. Shurshıllı sorawlar — ${CONTACT.phone}. Bet qol menen jańalanadı.`,
      },
    ],
  },
  terms: {
    eyebrow: "Huqıqıy",
    title: "Paydalanıw shártleri",
    sub: "ZBR xızmetinen paydalanıw qaǵıydaları.",
    updated: UPDATED_KK,
    sections: [
      {
        h: "1. Xızmetti kim kórsetedi",
        p: `ZBR xızmetin ${CONTACT.entity}, ${CONTACT.address} usınadı (keyingi orınlarda — «biz»). ZBRdan paydalanıp, siz usı shártlerge kelisim bildiresiz.`,
      },
      {
        h: "2. ZBR ne",
        p: "ZBR — sizdi restoran hám kuryerler menen baylanıstıratuǵın platforma. Tamaqlardı restoran tayarlaydı, kuryer jetkeredi; biz platformanıń islewi hám jetkeriwdi shólkemlestiriw ushın juwap beremiz.",
      },
      {
        h: "3. Esap",
        p: "Buyırtpa ushın telefon nomeri hám SMSdegi bir mártelik kod penen tastıyıqlaw kerek. Kodtı úshinshi shaxslarǵa bermeń. Esaptı qosımshada óshiriw múmkin: Sazlawlar → Esaptı óshiriw; óshiriw qaytarılmaydı.",
      },
      {
        h: "4. Buyırtpalar hám bahalar",
        p: "Qosımshadaǵı tamaq bahası restoran bahasına sáykes keledi. Jetkeriw quymı hám juwmaqlawshı summa buyırtpanı tastıyıqlawdan aldın kórsetiledi. Buyırtpa tastıyıqlanǵannan soń qabıl etilgen esaplanadı.",
      },
      {
        h: "5. Tólem",
        p: "Házir, MVP basqıshında, tólew tek alıw waqtında kuryerge naq pul menen. Bank kartaları maǵlıwmatların jıynamaymız hám saqlamaymız. Karta hám onlayn tólewdi keyinirek qosamız — shártlerdi usı jerde jańalaymız.",
      },
      {
        h: "6. Biykarlaw hám qaytarıw",
        p: "Buyırtpanı biykarlaw hám aqshanı qaytarıw tártibi «Qaytarıw» bóliminde jazılǵan.",
      },
      {
        h: "7. Minez-qulıq qaǵıydaları",
        p: "Xızmetten nızamsız maqsetlerde paydalanıw, kuryerler hám restoran xızmetkerlerin haqaretlew, ataylap jalǵan pikirler qaldırıw yaki jasalma buyırtpalar rásmiylestiriw múmkin emes. Qaǵıydabuzarlıqta biz xızmetke kiriwdi shekleuimiz múmkin.",
      },
      {
        h: "8. Juwapkershilik",
        p: "Tamaqlardıń sapası, quramı hám qáwipsizligi ushın olardı tayarlaǵan restoran juwap beredi. Biz platformanıń islewi hám jetkeriwdi shólkemlestiriw ushın juwap beremiz. Bizge baylanıslı bolmaǵan jaǵdaylar — hawa rayı, jollardıń jabılıwı hám usıǵan uqsaslar — ushın juwap bermeymiz.",
      },
      {
        h: "9. Shártlerdiń ózgeriwi",
        p: "Biz usı shártlerdi jańalawımız múmkin. Aqırǵı jańalanıw sánesi joqarıda kórsetilgen; áhmiyetli ózgerisler haqqında qosımshada xabar beremiz.",
      },
      {
        h: "10. Kontaktlar",
        p: `${CONTACT.entity}, ${CONTACT.address}. ${CONTACT.phone}`,
      },
    ],
  },
  cookies: {
    eyebrow: "Huqıqıy",
    title: "Cookie faylları",
    sub: "ZBR saytı cookie hám usıǵan uqsas texnologiyalardan qalay paydalanadı.",
    updated: UPDATED_KK,
    sections: [
      {
        h: "Neden paydalanamız",
        p: "Eń kerekliisin: tańlaǵan tilińizdi yadta saqlaw ushın brauzerdiń lokal yadı (localStorage). Bul texnikalıq zárúrlik, reklama yaki profillestiriw emes.",
      },
      {
        h: "Ne islemeymiz",
        p: "Biz reklama cookie'lerinen paydalanbaymız, reklama profillerin qurmaymız hám bul maǵlıwmatlardı úshinshi shaxslarǵa bermeymiz. Eger veb-analitika qossaq, bunı usı jerde súwretleymiz hám talap etilgen jerde kelisim soraymız.",
      },
      {
        h: "Bunı qalay basqarıw",
        p: "Lokal yadtı brauzer sazlawlarında tazalawıńız múmkin. Sayt islewin dawam etedi — til tańlawı ápiwayı ǵana standart mániske qaytadı.",
      },
      {
        h: "Qosımsha",
        p: "ZBR mobil qosımshası maǵlıwmatlar menen qalay islewi qupıyalıq siyasatında jazılǵan.",
      },
    ],
  },
  refunds: {
    eyebrow: "Huqıqıy",
    title: "Biykarlaw hám qaytarıw",
    sub: "Buyırtpanı qashan biykarlaw múmkin hám aqshanı qalay qaytarıw.",
    updated: UPDATED_KK,
    sections: [
      {
        h: "Tayarlaw baslanıwınan aldın biykarlaw",
        p: "Restoran tayarlawdı baslamaǵansha buyırtpanı tegin biykarlaw múmkin.",
      },
      {
        h: "Tayarlaw baslanǵannan keyin biykarlaw",
        p: "Eger restoran tayarlawdı baslaǵan bolsa, biykarlaw tólemli bolıwı múmkin — buyırtpanıń tolıq quymına shekem, sebebi ónimler aldınnan jumsalǵan.",
      },
      {
        h: "Eger buyırtpada máseles bolsa",
        p: "Basqa nárse ákelingen, bir nárse jetispeydi, awqat qabıl etip bolmaytuǵın jaǵdayda kelgen yaki buyırtpa qatti keshikken bolsa — buyırtpa kúni bizge xabar beriń. Qaraymız hám jaǵdayǵa qarap aqshanı tolıq yaki bólekley qaytaramız.",
      },
      {
        h: "Qaytarıwdı qalay rásmiylestiriw",
        p: `${CONTACT.phone} nomerine qońıraw etiń. Buyırtpa nomerin hám ne bolǵanın kórsetiń; imkanı bolsa foto qosıń.`,
      },
      {
        h: "Múddetler",
        p: "Múrájatti jumıs kúni dawamında qaraymız. Qaytarıw usılı hám múddeti buyırtpa qalay tólengenine baylanıslı; tártipti múrájat waqtında siz benen kelisemiz.",
      },
    ],
  },
};

/**
 * Pages that exist but are not linked or routed yet.
 * `terms`, `cookies` and `refunds` are drafts awaiting legal review — keep them
 * here until a lawyer has signed them off, then remove them from this set.
 */
export const HIDDEN_PATHS = new Set(["/terms", "/cookies", "/refunds"]);

export const pages: Record<Lang, PagesCopy> = {
  ru: { ...ru, privacy: privacyCopy.ru },
  uz: { ...uz, privacy: privacyCopy.uz },
  kk: { ...kk, privacy: privacyCopy.kk },
};
