
if( typeof(isPremiumAccessAllowed) === 'function' && sAppVersion.charAt(0) === '3' && !isPremiumAccessAllowed() ) {

	var sPremiumOffer = localStorage.getItem('sPremiumOffer');
	if( sPremiumOffer !== 'AUTUMNSALEX6' ) {

		i18n.premiumOffer = {
		en: "<h3>🍂 AUTUMN SALE</h3><p>Get it now: <b>Premium License X6 – <span style='color:#82f9ff'>30%</span> off!</b><br>Unlock all premium features & updates at the new low price.<br><b>Only available for a limited time!</b><br>More info at <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		ar: "<h3>🍂 تخفيضات الخريف</h3><p>احصل عليه الآن: <b>ترخيص Premium X6 – <span style='color:#82f9ff'>30٪</span> خصم!</b><br>افتح جميع الميزات المميزة والتحديثات بالسعر الجديد.<br><b>متوفر لفترة محدودة فقط!</b><br>مزيد من المعلومات على <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		cs: "<h3>🍂 PODZIMNÍ SLEVA</h3><p>Získej nyní: <b>Prémiová licence X6 – <span style='color:#82f9ff'>30 %</span> levněji!</b><br>Odemykej všechny prémiové funkce a aktualizace za novou nízkou cenu.<br><b>Pouze po omezenou dobu!</b><br>Více informací na <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		de: "<h3>🍂 HERBST-SALE</h3><p>Jetzt zugreifen: <b>Premium-Lizenz X6 – <span style='color:#82f9ff'>30 %</span> günstiger!</b><br>Sichere dir alle Premium Features zum neuen Tiefpreis.<br><b>Nur für kurze Zeit verfügbar!</b><br>Mehr Infos unter <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		el: "<h3>🍂 ΦΘΙΝΟΠΩΡΙΝΗ ΠΡΟΣΦΟΡΑ</h3><p>Πάρε το τώρα: <b>Premium Άδεια X6 – <span style='color:#82f9ff'>30%</span> φθηνότερα!</b><br>Ξεκλείδωσε όλες τις premium λειτουργίες & ενημερώσεις στη νέα χαμηλή τιμή.<br><b>Μόνο για περιορισμένο χρονικό διάστημα!</b><br>Περισσότερα στο <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		es: "<h3>🍂 OFERTA DE OTOÑO</h3><p>Consíguelo ahora: <b>Licencia Premium X6 – <span style='color:#82f9ff'>30%</span> de descuento!</b><br>Desbloquea todas las funciones premium y actualizaciones al nuevo precio bajo.<br><b>¡Solo disponible por tiempo limitado!</b><br>Más info en <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		fi: "<h3>🍂 SYKSYN ALE</h3><p>Hanki nyt: <b>Premium-lisenssi X6 – <span style='color:#82f9ff'>30%</span> edullisempi!</b><br>Avaa kaikki premium-ominaisuudet ja päivitykset uudella alennetulla hinnalla.<br><b>Vain rajoitetun ajan!</b><br>Lisätietoja: <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		fr: "<h3>🍂 SOLDES D'AUTOMNE</h3><p>Procurez-le maintenant : <b>Licence Premium X6 – <span style='color:#82f9ff'>30 %</span> moins cher !</b><br>Débloquez toutes les fonctionnalités premium et mises à jour au nouveau prix bas.<br><b>Disponible uniquement pour une durée limitée !</b><br>Plus d'infos sur <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		hi: "<h3>🍂 शरद ऋतु की सेल</h3><p>अभी प्राप्त करें: <b>Premium लाइसेंस X6 – <span style='color:#82f9ff'>30%</span> सस्ता!</b><br>सभी प्रीमियम फ़ीचर्स और अपडेट नई कम कीमत पर अनलॉक करें।<br><b>सिर्फ सीमित समय के लिए उपलब्ध!</b><br>अधिक जानकारी: <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		id: "<h3>🍂 PROMO MUSIM GUGUR</h3><p>Dapatkan sekarang: <b>Lisensi Premium X6 – <span style='color:#82f9ff'>30%</span> lebih murah!</b><br>Buka semua fitur premium & pembaruan dengan harga baru yang rendah.<br><b>Hanya tersedia untuk waktu terbatas!</b><br>Info lebih lanjut di <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		it: "<h3>🍂 SALDI AUTUNNALI</h3><p>Prendilo ora: <b>Licenza Premium X6 – <span style='color:#82f9ff'>30%</span> di sconto!</b><br>Sblocca tutte le funzionalità premium e aggiornamenti al nuovo prezzo ridotto.<br><b>Disponibile solo per un periodo limitato!</b><br>Ulteriori info su <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		ja: "<h3>🍂 秋のセール</h3><p>今すぐゲット: <b>プレミアムライセンス X6 – <span style='color:#82f9ff'>30%</span>オフ!</b><br>すべてのプレミアム機能とアップデートを新しい低価格で利用可能。<br><b>期間限定！</b><br>詳細は <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		ko: "<h3>🍂 가을 세일</h3><p>지금 바로: <b>프리미엄 라이선스 X6 – <span style='color:#82f9ff'>30%</span> 할인!</b><br>모든 프리미엄 기능과 업데이트를 새로운 낮은 가격에 이용하세요.<br><b>한정 기간 동안만!</b><br>자세한 정보: <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		no: "<h3>🍂 HØSTSALG</h3><p>Skaff det nå: <b>Premium-lisens X6 – <span style='color:#82f9ff'>30%</span> billigere!</b><br>Lås opp alle premium-funksjoner og oppdateringer til ny lav pris.<br><b>Kun tilgjengelig i en begrenset periode!</b><br>Mer info på <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		pl: "<h3>🍂 JESIENNA PROMOCJA</h3><p>Zdobądź teraz: <b>Licencja Premium X6 – <span style='color:#82f9ff'>30 %</span> taniej!</b><br>Odblokuj wszystkie premium funkcje i aktualizacje po nowej, niższej cenie.<br><b>Tylko przez ograniczony czas!</b><br>Więcej info: <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		pt: "<h3>🍂 PROMOÇÃO DE OUTONO</h3><p>Garanta já: <b>Licença Premium X6 – <span style='color:#82f9ff'>30%</span> mais barato!</b><br>Desbloqueie todos os recursos premium e atualizações pelo novo preço baixo.<br><b>Disponível apenas por tempo limitado!</b><br>Mais info em <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		ro: "<h3>🍂 REDUCERI DE TOAMNĂ</h3><p>Obține acum: <b>Licență Premium X6 – <span style='color:#82f9ff'>30%</span> mai ieftin!</b><br>Deblochează toate funcțiile premium și actualizările la noul preț redus.<br><b>Doar pentru o perioadă limitată!</b><br>Mai multe info pe <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		ru: "<h3>🍂 ОСЕННЯЯ РАСПРОДАЖА</h3><p>Получите сейчас: <b>Премиум-лицензия X6 – <span style='color:#82f9ff'>30%</span> дешевле!</b><br>Разблокируйте все премиум функции и обновления по новой низкой цене.<br><b>Только ограниченное время!</b><br>Подробнее на <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		sl: "<h3>🍂 JESENSKI POPUST</h3><p>Zdaj ceneje: <b>Premium licenca X6 – <span style='color:#82f9ff'>30%</span> cenejše!</b><br>Vse premium funkcije po novi nižji ceni.<br><b>Samo za omejen čas!</b><br>Več info na <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		tr: "<h3>🍂 SONBAHAR İNDİRİMİ</h3><p>Şimdi al: <b>Premium Lisans X6 – <span style='color:#82f9ff'>%30</span> indirimli!</b><br>Tüm premium özellikler ve güncellemeleri yeni düşük fiyattan edinin.<br><b>Sınırlı süre için geçerlidir!</b><br>Daha fazla bilgi: <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		uk: "<h3>🍂 ОСІННІЙ РОЗПРОДАЖ</h3><p>Отримай зараз: <b>Преміум-ліцензія X6 – <span style='color:#82f9ff'>30%</span> дешевше!</b><br>Всі преміум функції за новою низькою ціною.<br><b>Тільки обмежений час!</b><br>Деталі на <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		vi: "<h3>🍂 KHUYẾN MÃI MÙA THU</h3><p>Nhận ngay: <b>Phiên bản Premium X6 – <span style='color:#82f9ff'>30%</span> giảm giá</b><br>Mở khóa tất cả tính năng premium & cập nhật với giá mới.<br><b>Chỉ trong thời gian giới hạn!</b><br>Thêm info tại <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>",
		zh: "<h3>🍂 秋季特卖</h3><p>立即获取: <b>高级许可 X6 – <span style='color:#82f9ff'>30%</span> 降价</b><br>解锁所有高级功能和更新的新低价。<br><b>仅限有限时间！</b><br>更多信息请访问 <a href='https://m3u-ip.tv' target='_blank'>https://m3u-ip.tv</a></p>"
		};

		getEl('modal_content').style.width = '70%';
		getEl('modal_content').style.maxWidth = '900px';
		showModal("<div style='text-align: center'>" + getLang('premiumOffer') + "<p style='margin-top: 12px'><img src='https://m3u-ip.tv/images/website-qr.png' alt='QR Code' style='width:180px;height:180px;'></p></div>");
		localStorage.setItem('sPremiumOffer', 'AUTUMNSALEX6');

	}

}


if( !localStorage.getItem('bUserAgentFixApplied') && typeof(sAppVersion) === 'string' && (sAppVersion == '2.2.0' || sAppVersion == '2.2.1') ) {

	var sFixOldUseragent = getUserAgentSetting();
	if( sFixOldUseragent && sFixOldUseragent.indexOf('m3u-ip.tv') == -1 ) {
		setUserAgentSetting('Mozilla/5.0 (m3u-ip.tv ' + sAppVersion + ') ' + sDeviceFamily);
		localStorage.setItem('bUserAgentFixApplied', sAppVersion);
	}

}
