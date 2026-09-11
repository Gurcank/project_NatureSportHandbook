import type { Localized } from '@/types';

export type SportElement = 'land' | 'water' | 'air';

export type SportEntry = {
  id: string;
  element: SportElement;
  name: Localized;
  /** The discipline's international name, which stands in for a binomial. */
  formalName: string;
  terrain: Localized;
  gear: Localized;
  /** The window the conditions actually allow, not when it is legal to try. */
  season: Localized;
  description: Localized;
};

export const sports: SportEntry[] = [
  // --- Land ----------------------------------------------------------------
  {
    id: 'hiking',
    element: 'land',
    name: { tr: 'Doğa Yürüyüşü', en: 'Hiking' },
    formalName: 'Hiking',
    terrain: { tr: 'İşaretli patika, orman yolu', en: 'Waymarked paths and forest tracks' },
    gear: { tr: 'Bilek destekli bot, sırt çantası, su', en: 'Ankle boots, daypack, water' },
    season: { tr: 'İlkbahar–sonbahar; alçakta yıl boyu', en: 'Spring–autumn; year-round at low altitude' },
    description: {
      tr: 'Günübirlik, işaretli rotalarda yürümek. Diğer bütün kara sporlarının temeli; okuma, tempo ve hava tahmini burada öğrenilir.',
      en: 'Walking marked routes within a day. The foundation of every other land sport, where map reading, pacing and weather sense are learned.',
    },
  },
  {
    id: 'trekking',
    element: 'land',
    name: { tr: 'Trekking', en: 'Trekking' },
    formalName: 'Trekking',
    terrain: { tr: 'Çok günlük, altyapısız araziler', en: 'Multi-day routes with no infrastructure' },
    gear: { tr: 'Kamp seti, harita ve pusula, ilk yardım', en: 'Camp kit, map and compass, first aid' },
    season: { tr: 'Haziran–Eylül', en: 'June–September' },
    description: {
      tr: 'Birden fazla gün süren, taşınan her şeyle idare edilen yürüyüş. Yürüyüşten ayıran şey mesafe değil, dönüş imkânının olmamasıdır.',
      en: 'Walking over several days, carrying everything needed. What separates it from hiking is not distance but the absence of an easy way back.',
    },
  },
  {
    id: 'rock-climbing',
    element: 'land',
    name: { tr: 'Kaya Tırmanışı', en: 'Rock Climbing' },
    formalName: 'Rock Climbing',
    terrain: { tr: 'Kaya duvarları, kanyon yüzleri', en: 'Rock faces and canyon walls' },
    gear: { tr: 'İp, emniyet kemeri, tırmanış ayakkabısı, magnezyum', en: 'Rope, harness, climbing shoes, chalk' },
    season: { tr: 'Nisan–Ekim', en: 'April–October' },
    description: {
      tr: 'İp ve emniyet sistemiyle dik kayaya çıkmak. Rotalar zorluk derecesiyle numaralanır; güvenlik tırmanıcıdan çok emniyetçinin işidir.',
      en: 'Ascending steep rock on rope and protection. Routes are graded by difficulty, and safety rests as much on the belayer as the climber.',
    },
  },
  {
    id: 'bouldering',
    element: 'land',
    name: { tr: 'Boulder', en: 'Bouldering' },
    formalName: 'Bouldering',
    terrain: { tr: 'Alçak kaya blokları', en: 'Low boulders' },
    gear: { tr: 'Tırmanış ayakkabısı, crash pad, magnezyum', en: 'Climbing shoes, crash pad, chalk' },
    season: { tr: 'Yıl boyu; serin, kuru hava iyidir', en: 'Year-round; cool dry days are best' },
    description: {
      tr: 'İpsiz, düşülebilecek yükseklikte tırmanış. Kısa ve çok zor dizilimler üzerine kuruludur; güvenlik yerdeki minderden gelir.',
      en: 'Ropeless climbing at a height you can fall from. Built on short, very hard sequences, with safety coming from the mat below.',
    },
  },
  {
    id: 'mountaineering',
    element: 'land',
    name: { tr: 'Dağcılık', en: 'Mountaineering' },
    formalName: 'Alpinism',
    terrain: { tr: 'Yüksek dağlar, buzul ve karlı yamaçlar', en: 'High mountains, glaciers and snow slopes' },
    gear: { tr: 'Krampon, buz baltası, ip, kask', en: 'Crampons, ice axe, rope, helmet' },
    season: { tr: 'Haziran–Eylül; kışı ayrı bir daldır', en: 'June–September; winter is its own discipline' },
    description: {
      tr: 'Zirveye kar, buz ve kaya karışımı arazide çıkmak. Yükseklik, hava ve çığ değerlendirmesi teknik beceriden daha belirleyicidir.',
      en: 'Reaching summits over mixed snow, ice and rock. Altitude, weather and avalanche judgement matter more than technical skill.',
    },
  },
  {
    id: 'ski-touring',
    element: 'land',
    name: { tr: 'Dağ Kayağı', en: 'Ski Touring' },
    formalName: 'Ski Mountaineering',
    terrain: { tr: 'Pist dışı karlı yamaçlar', en: 'Off-piste snow slopes' },
    gear: { tr: 'Foklu kayak, çığ vericisi, sonda, kürek', en: 'Skins and skis, avalanche transceiver, probe, shovel' },
    season: { tr: 'Aralık–Nisan', en: 'December–April' },
    description: {
      tr: 'Mekanik tesis olmadan yamaca çıkıp kayarak inmek. Çığ eğitimi bu sporda ekipman kadar zorunludur.',
      en: 'Climbing a slope under your own power and skiing down. Avalanche training is as much a requirement here as the equipment.',
    },
  },
  {
    id: 'trail-running',
    element: 'land',
    name: { tr: 'Patika Koşusu', en: 'Trail Running' },
    formalName: 'Trail Running',
    terrain: { tr: 'Dağ ve orman patikaları', en: 'Mountain and forest trails' },
    gear: { tr: 'Tırnaklı koşu ayakkabısı, yelek, su kesesi', en: 'Lugged shoes, running vest, hydration bladder' },
    season: { tr: 'İlkbahar–sonbahar', en: 'Spring–autumn' },
    description: {
      tr: 'Doğal zeminde, iniş çıkışlı arazide koşmak. Hız yolun kendisinden çok ayak basışına ve yükselti farkına bağlıdır.',
      en: 'Running on natural ground over climbs and descents, where pace depends on footing and elevation rather than distance.',
    },
  },
  {
    id: 'mountain-biking',
    element: 'land',
    name: { tr: 'Dağ Bisikleti', en: 'Mountain Biking' },
    formalName: 'Mountain Biking',
    terrain: { tr: 'Toprak yollar, tek iz patikalar', en: 'Dirt roads and singletrack' },
    gear: { tr: 'Amortisörlü bisiklet, kask, eldiven', en: 'Suspension bike, helmet, gloves' },
    season: { tr: 'Nisan–Kasım', en: 'April–November' },
    description: {
      tr: 'Yol dışı arazide bisiklet sürmek. Kros, iniş ve enduro gibi dalları vardır; her biri farklı bisiklet geometrisi ister.',
      en: 'Riding off road, in branches such as cross-country, downhill and enduro — each asking for a different bike geometry.',
    },
  },
  {
    id: 'camping',
    element: 'land',
    name: { tr: 'Kamp', en: 'Camping' },
    formalName: 'Camping',
    terrain: { tr: 'Orman açıklıkları, göl ve dere kenarları', en: 'Forest clearings, lake and stream sides' },
    gear: { tr: 'Çadır, uyku tulumu, mat, ocak', en: 'Tent, sleeping bag, mat, stove' },
    season: { tr: 'Yıl boyu; kış ayrı ekipman ister', en: 'Year-round; winter needs its own kit' },
    description: {
      tr: 'Doğada geceleme. İz bırakmama ilkesi esastır: çöp geri taşınır, ateş yalnızca izin verilen yerde yakılır.',
      en: 'Spending the night outdoors. Leave-no-trace is the rule: waste is carried out and fires lit only where they are allowed.',
    },
  },
  {
    id: 'orienteering',
    element: 'land',
    name: { tr: 'Oryantiring', en: 'Orienteering' },
    formalName: 'Orienteering',
    terrain: { tr: 'Ormanlık araziler', en: 'Wooded terrain' },
    gear: { tr: 'Pusula, ayrıntılı harita, kontrol kartı', en: 'Compass, detailed map, control card' },
    season: { tr: 'Yıl boyu', en: 'Year-round' },
    description: {
      tr: 'Harita ve pusulayla, işaretsiz arazide kontrol noktalarını sırayla bulmak. Hız kadar rota seçimi de yarışır.',
      en: 'Finding control points in sequence across unmarked terrain with map and compass, where route choice competes with speed.',
    },
  },
  {
    id: 'via-ferrata',
    element: 'land',
    name: { tr: 'Via Ferrata', en: 'Via Ferrata' },
    formalName: 'Via Ferrata',
    terrain: { tr: 'Çelik halat ve basamakla donatılmış kayalıklar', en: 'Cliffs fitted with steel cable and rungs' },
    gear: { tr: 'Via ferrata seti, kask, emniyet kemeri', en: 'Via ferrata lanyard set, helmet, harness' },
    season: { tr: 'Mayıs–Ekim', en: 'May–October' },
    description: {
      tr: 'Kayaya sabitlenmiş halat ve basamaklar boyunca ilerlemek. Tırmanış tekniği gerektirmez ama yükseklik ve emniyet disiplini gerektirir.',
      en: 'Moving along fixed cable and rungs bolted to rock. It needs no climbing technique, but it does need a head for height and strict clipping discipline.',
    },
  },
  {
    id: 'caving',
    element: 'land',
    name: { tr: 'Mağaracılık', en: 'Caving' },
    formalName: 'Speleology',
    terrain: { tr: 'Yeraltı galerileri ve düşey kuyular', en: 'Underground passages and vertical shafts' },
    gear: { tr: 'Kask lambası, tulum, iple iniş takımı', en: 'Helmet lamp, oversuit, single-rope kit' },
    season: { tr: 'Yıl boyu; yağıştan sonra girilmez', en: 'Year-round, but never after rain' },
    description: {
      tr: 'Mağara sistemlerini keşfetmek. Işık, sıcaklık ve zaman algısının kaybolduğu tek doğa sporudur; her ekip yedek ışıkla girer.',
      en: 'Exploring cave systems — the one outdoor sport where light, warmth and the sense of time all disappear, so every party carries spare lamps.',
    },
  },

  // --- Water ---------------------------------------------------------------
  {
    id: 'kayaking',
    element: 'water',
    name: { tr: 'Kayak (Deniz Kanosu)', en: 'Kayaking' },
    formalName: 'Kayaking',
    terrain: { tr: 'Deniz, göl, akarsu', en: 'Sea, lake and river' },
    gear: { tr: 'Kapalı tekne, çift kaşık kürek, can yeleği, etek', en: 'Closed-deck boat, double paddle, buoyancy aid, spraydeck' },
    season: { tr: 'Nisan–Ekim', en: 'April–October' },
    description: {
      tr: 'Bacakları içeride, çift kaşıklı kürekle çekilen kapalı tekne. Devrilince tekrar doğrulmayı öğrenmek ilk derstir.',
      en: 'A closed boat paddled with a double blade, legs inside. Learning to right yourself after a capsize is the first lesson.',
    },
  },
  {
    id: 'canoeing',
    element: 'water',
    name: { tr: 'Kano', en: 'Canoeing' },
    formalName: 'Canoeing',
    terrain: { tr: 'Sakin nehirler, göller', en: 'Calm rivers and lakes' },
    gear: { tr: 'Açık tekne, tek kaşık kürek, can yeleği', en: 'Open boat, single blade, buoyancy aid' },
    season: { tr: 'Mayıs–Eylül', en: 'May–September' },
    description: {
      tr: 'Açık tekneli, diz üstü ya da oturarak tek kürekle sürülen tekne. Yük taşımaya elverişli olduğu için uzun su yolculuklarının aracıdır.',
      en: 'An open boat paddled kneeling or seated with a single blade. Its carrying capacity makes it the craft of long water journeys.',
    },
  },
  {
    id: 'rafting',
    element: 'water',
    name: { tr: 'Rafting', en: 'Rafting' },
    formalName: 'Whitewater Rafting',
    terrain: { tr: 'Hızlı akan, çağlayanlı nehirler', en: 'Fast rivers with rapids' },
    gear: { tr: 'Şişme bot, kask, can yeleği, kürek', en: 'Inflatable raft, helmet, buoyancy aid, paddle' },
    season: { tr: 'Nisan–Haziran, kar suyuyla', en: 'April–June, on the snowmelt' },
    description: {
      tr: 'Ekip hâlinde çağlayanlardan inmek. Nehirler I’den VI’ya zorluk sınıflarına ayrılır; komutu daima kaptan verir.',
      en: 'Running rapids as a crew. Rivers are graded from class I to VI, and the guide alone calls the strokes.',
    },
  },
  {
    id: 'canyoning',
    element: 'water',
    name: { tr: 'Kanyon Geçişi', en: 'Canyoning' },
    formalName: 'Canyoning',
    terrain: { tr: 'Dar kanyonlar, şelaleler', en: 'Narrow canyons and waterfalls' },
    gear: { tr: 'Dalgıç kıyafeti, kask, iple iniş takımı', en: 'Wetsuit, helmet, abseil kit' },
    season: { tr: 'Haziran–Eylül', en: 'June–September' },
    description: {
      tr: 'Bir kanyonu yüzerek, atlayarak ve iple inerek boydan boya geçmek. Ani su yükselmesi en büyük tehlikedir.',
      en: 'Descending a canyon by swimming, jumping and abseiling. A sudden rise in water level is the principal danger.',
    },
  },
  {
    id: 'scuba-diving',
    element: 'water',
    name: { tr: 'Tüplü Dalış', en: 'Scuba Diving' },
    formalName: 'Scuba Diving',
    terrain: { tr: 'Resifler, batıklar, kıyı suları', en: 'Reefs, wrecks and coastal water' },
    gear: { tr: 'Tüp, regülatör, denge yeleği, derinlik saati', en: 'Cylinder, regulator, buoyancy jacket, dive computer' },
    season: { tr: 'Mayıs–Ekim; kuru elbiseyle yıl boyu', en: 'May–October; year-round in a drysuit' },
    description: {
      tr: 'Sıkıştırılmış hava taşıyarak su altında kalmak. Çıkış hızı ve dip süresi, dokunulan hiçbir şeyden daha önemlidir.',
      en: 'Staying underwater on compressed air, where ascent rate and bottom time matter more than anything you might see.',
    },
  },
  {
    id: 'freediving',
    element: 'water',
    name: { tr: 'Serbest Dalış', en: 'Freediving' },
    formalName: 'Apnea',
    terrain: { tr: 'Açık deniz, mavi delikler', en: 'Open sea and blue holes' },
    gear: { tr: 'Uzun palet, maske, balast kemeri', en: 'Long fins, mask, weight belt' },
    season: { tr: 'Haziran–Eylül', en: 'June–September' },
    description: {
      tr: 'Tek nefesle dalmak. Vücut derinlikte kalp atışını yavaşlatıp kanı göğse toplar; buna memeli dalış refleksi denir.',
      en: 'Diving on a single breath. At depth the body slows the heart and shifts blood to the chest — the mammalian dive reflex.',
    },
  },
  {
    id: 'snorkelling',
    element: 'water',
    name: { tr: 'Şnorkelle Yüzme', en: 'Snorkelling' },
    formalName: 'Snorkelling',
    terrain: { tr: 'Sığ resifler, berrak koylar', en: 'Shallow reefs and clear bays' },
    gear: { tr: 'Maske, şnorkel, palet', en: 'Mask, snorkel, fins' },
    season: { tr: 'Haziran–Eylül', en: 'June–September' },
    description: {
      tr: 'Yüzeyde kalarak su altını izlemek. Eğitim gerektirmediği için deniz yaşamıyla ilk tanışma çoğu kez buradan olur.',
      en: 'Watching the underwater world from the surface. Needing no training, it is where most people first meet marine life.',
    },
  },
  {
    id: 'surfing',
    element: 'water',
    name: { tr: 'Sörf', en: 'Surfing' },
    formalName: 'Surfing',
    terrain: { tr: 'Kırılan dalgalı kıyılar', en: 'Coasts with breaking waves' },
    gear: { tr: 'Sörf tahtası, leash, dalgıç kıyafeti', en: 'Surfboard, leash, wetsuit' },
    season: { tr: 'Sonbahar–kış, dalga en iriyken', en: 'Autumn–winter, when the swell is biggest' },
    description: {
      tr: 'Kırılan dalganın yüzünde tahtayla kaymak. Dalga okuma ve doğru yerde bekleme, kürek gücünden daha belirleyicidir.',
      en: 'Riding the face of a breaking wave. Reading the swell and sitting in the right place count for more than paddling power.',
    },
  },
  {
    id: 'windsurfing',
    element: 'water',
    name: { tr: 'Rüzgâr Sörfü', en: 'Windsurfing' },
    formalName: 'Windsurfing',
    terrain: { tr: 'Rüzgârlı koylar ve göller', en: 'Windy bays and lakes' },
    gear: { tr: 'Yelkenli tahta, trapez, dalgıç kıyafeti', en: 'Sailboard, harness, wetsuit' },
    season: { tr: 'Mayıs–Eylül', en: 'May–September' },
    description: {
      tr: 'Tahtaya bağlı bir yelkenle rüzgârı kullanmak. Yelken açısı ayakla ve gövdeyle ayarlanır; dümen yoktur.',
      en: 'Harnessing wind through a sail mounted on the board. Trim comes from feet and body — there is no rudder.',
    },
  },
  {
    id: 'kitesurfing',
    element: 'water',
    name: { tr: 'Uçurtma Sörfü', en: 'Kitesurfing' },
    formalName: 'Kiteboarding',
    terrain: { tr: 'Geniş, sığ ve rüzgârlı sular', en: 'Wide, shallow, windy water' },
    gear: { tr: 'Uçurtma, bar, trapez, küçük tahta', en: 'Kite, control bar, harness, small board' },
    season: { tr: 'Mayıs–Eylül', en: 'May–September' },
    description: {
      tr: 'Büyük bir uçurtmanın çekişiyle su üstünde kaymak ve havalanmak. Uçurtmanın kontrolü tahtadan önce öğrenilir.',
      en: 'Being pulled across the water — and into the air — by a large kite. Flying the kite is learned before ever standing on the board.',
    },
  },
  {
    id: 'sailing',
    element: 'water',
    name: { tr: 'Yelken', en: 'Sailing' },
    formalName: 'Sailing',
    terrain: { tr: 'Deniz, körfez, büyük göller', en: 'Sea, gulfs and large lakes' },
    gear: { tr: 'Yelkenli tekne, can yeleği, seyir haritası', en: 'Sailing boat, life jacket, chart' },
    season: { tr: 'Nisan–Ekim', en: 'April–October' },
    description: {
      tr: 'Rüzgârı yelkenle işe çevirmek. Tekne rüzgâra karşı doğrudan gidemez; zikzak çizerek, orsa yaparak ilerler.',
      en: 'Turning wind into way through sails. A boat cannot sail straight into the wind, so it works upwind in a zigzag of tacks.',
    },
  },
  {
    id: 'paddleboarding',
    element: 'water',
    name: { tr: 'Ayakta Kürek', en: 'Stand-up Paddleboarding' },
    formalName: 'Stand-up Paddleboarding',
    terrain: { tr: 'Sakin göller, koylar, yavaş nehirler', en: 'Calm lakes, bays and slow rivers' },
    gear: { tr: 'Geniş tahta, uzun kürek, leash', en: 'Wide board, long paddle, leash' },
    season: { tr: 'Haziran–Eylül', en: 'June–September' },
    description: {
      tr: 'Geniş bir tahtanın üstünde ayakta durup tek kürekle ilerlemek. Öğrenmesi kolaydır ama rüzgâr her şeyi zorlaştırır.',
      en: 'Standing on a wide board and paddling with a single blade. Easy to learn, though wind changes everything.',
    },
  },

  // --- Air -----------------------------------------------------------------
  {
    id: 'paragliding',
    element: 'air',
    name: { tr: 'Yamaç Paraşütü', en: 'Paragliding' },
    formalName: 'Paragliding',
    terrain: { tr: 'Dağ yamaçları, kıyı sırtları', en: 'Mountain slopes and coastal ridges' },
    gear: { tr: 'Kanat, harness, yedek paraşüt, telsiz', en: 'Wing, harness, reserve parachute, radio' },
    season: { tr: 'Nisan–Ekim, gün ortası termaliyle', en: 'April–October, on midday thermals' },
    description: {
      tr: 'Yamaçtan koşarak havalanan, motorsuz kumaş kanat. Yükselen sıcak hava sütunlarıyla saatlerce havada kalınabilir.',
      en: 'A soft wing launched by running off a slope. Riding columns of rising warm air, a pilot can stay up for hours.',
    },
  },
  {
    id: 'hang-gliding',
    element: 'air',
    name: { tr: 'Delta Kanat', en: 'Hang Gliding' },
    formalName: 'Hang Gliding',
    terrain: { tr: 'Dik yamaçlar, kalkış rampaları', en: 'Steep slopes and launch ramps' },
    gear: { tr: 'Sert iskeletli kanat, harness, kask', en: 'Rigid-framed wing, harness, helmet' },
    season: { tr: 'Nisan–Ekim', en: 'April–October' },
    description: {
      tr: 'Alüminyum iskeletli sert kanatla süzülmek. Yamaç paraşütünden hızlıdır ve rüzgâra karşı daha iyi ilerler.',
      en: 'Gliding beneath a rigid alloy-framed wing. Faster than a paraglider, and far better at making headway into wind.',
    },
  },
  {
    id: 'skydiving',
    element: 'air',
    name: { tr: 'Paraşütle Atlayış', en: 'Skydiving' },
    formalName: 'Skydiving',
    terrain: { tr: 'Uçaktan, 3000–4000 metreden', en: 'From aircraft at 3,000–4,000 metres' },
    gear: { tr: 'Ana ve yedek paraşüt, altimetre, kask', en: 'Main and reserve canopy, altimeter, helmet' },
    season: { tr: 'Yıl boyu, açık havada', en: 'Year-round, in clear weather' },
    description: {
      tr: 'Uçaktan atlayıp serbest düşüşün ardından paraşüt açmak. Serbest düşüş yaklaşık bir dakika sürer, hız 200 km/s civarında dengelenir.',
      en: 'Leaving an aircraft, falling free, then opening a canopy. Freefall lasts about a minute and settles near 200 km/h.',
    },
  },
  {
    id: 'wingsuit-flying',
    element: 'air',
    name: { tr: 'Wingsuit Uçuşu', en: 'Wingsuit Flying' },
    formalName: 'Wingsuit Flying',
    terrain: { tr: 'Uçaktan ya da yüksek kayalıklardan', en: 'From aircraft or high cliffs' },
    gear: { tr: 'Kanatlı tulum, paraşüt, altimetre', en: 'Winged suit, parachute, altimeter' },
    season: { tr: 'Yaz; yalnızca ileri düzey atlayıcı', en: 'Summer; advanced jumpers only' },
    description: {
      tr: 'Kol ve bacak aralarına gerilmiş kumaşla düşüşü ileri harekete çevirmek. En ileri ve en riskli hava sporlarından biridir.',
      en: 'Turning fall into forward flight with fabric stretched between arms and legs — among the most advanced and least forgiving air sports.',
    },
  },
  {
    id: 'base-jumping',
    element: 'air',
    name: { tr: 'BASE Atlayışı', en: 'BASE Jumping' },
    formalName: 'BASE Jumping',
    terrain: { tr: 'Kayalık, köprü, anten, bina', en: 'Cliffs, bridges, antennae, buildings' },
    gear: { tr: 'Tek paraşüt, kask', en: 'Single canopy, helmet' },
    season: { tr: 'Yaz; rüzgârsız sabah saatleri', en: 'Summer, in the still hours of morning' },
    description: {
      tr: 'Sabit bir noktadan atlayış. İrtifa düşük olduğu için yedek paraşüt taşınmaz; hata payı neredeyse yoktur.',
      en: 'Jumping from a fixed object. The altitude is too low to carry a reserve, which leaves almost no margin for error.',
    },
  },
  {
    id: 'gliding',
    element: 'air',
    name: { tr: 'Planörcülük', en: 'Gliding' },
    formalName: 'Gliding',
    terrain: { tr: 'Termal ve dalga rüzgârlı gökyüzü', en: 'Skies with thermals and wave lift' },
    gear: { tr: 'Planör, paraşüt, variometre', en: 'Sailplane, parachute, variometer' },
    season: { tr: 'Nisan–Eylül', en: 'April–September' },
    description: {
      tr: 'Motorsuz uçakla yükselen havayı kullanarak uçmak. İyi koşullarda yüzlerce kilometre yol alınabilir.',
      en: 'Flying an engineless aircraft on rising air. In good conditions a pilot can cover hundreds of kilometres.',
    },
  },
  {
    id: 'paramotoring',
    element: 'air',
    name: { tr: 'Motorlu Paraşüt', en: 'Paramotoring' },
    formalName: 'Powered Paragliding',
    terrain: { tr: 'Düz kalkış alanları, kıyı ve ova', en: 'Flat launch fields, coast and plain' },
    gear: { tr: 'Sırt motoru, kanat, kask', en: 'Back-mounted motor, wing, helmet' },
    season: { tr: 'Yıl boyu; sabah ve akşam sakinliği', en: 'Year-round, in the calm of morning and evening' },
    description: {
      tr: 'Sırta takılan pervaneli motorla yamaç gerekmeden havalanmak. Düz araziden kalkabildiği için en erişilebilir hava sporudur.',
      en: 'Taking off from flat ground with a propeller worn on the back — the most accessible way into the air, needing no slope.',
    },
  },
  {
    id: 'ballooning',
    element: 'air',
    name: { tr: 'Sıcak Hava Balonu', en: 'Hot Air Ballooning' },
    formalName: 'Hot Air Ballooning',
    terrain: { tr: 'Sabaha karşı sakin hava', en: 'Calm air around dawn' },
    gear: { tr: 'Balon, brülör, sepet, altimetre', en: 'Envelope, burner, basket, altimeter' },
    season: { tr: 'Yıl boyu; şafak ve gün batımı', en: 'Year-round, at dawn and dusk' },
    description: {
      tr: 'Isıtılmış havayla yükselmek. Balon yönlendirilemez; pilot yalnızca yükselip alçalarak farklı yönde esen rüzgâr katmanlarını seçer.',
      en: 'Rising on heated air. A balloon cannot be steered — the pilot only climbs or descends to find a layer of wind going the right way.',
    },
  },
  {
    id: 'speed-flying',
    element: 'air',
    name: { tr: 'Speed Flying', en: 'Speed Flying' },
    formalName: 'Speed Flying',
    terrain: { tr: 'Dik, karlı ya da çıplak yamaçlar', en: 'Steep snow or bare slopes' },
    gear: { tr: 'Küçük hızlı kanat, kask, kayak', en: 'Small fast wing, helmet, skis' },
    season: { tr: 'Kış, karlı yamaçta', en: 'Winter, on snow slopes' },
    description: {
      tr: 'Küçük bir kanatla yamaca yakın, yüksek hızda süzülmek. Yamaç paraşütünün tersine yükselmek değil, hızlı inmek amaçlanır.',
      en: 'Skimming close to a slope under a small, fast wing. Unlike paragliding the aim is not to climb but to descend quickly.',
    },
  },
];
