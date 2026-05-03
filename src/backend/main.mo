import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import UserLib "lib/user";
import NovelLib "lib/novel";
import FriendLib "lib/friend";
import ProgressLib "lib/progress";
import UserApi "mixins/user-api";
import NovelApi "mixins/novel-api";
import FriendApi "mixins/friend-api";
import ProgressApi "mixins/progress-api";
import CollabLib "lib/collab";
import CollabApi "mixins/collab-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // User state
  let users = List.empty<UserLib.UserProfile>();

  // Novel state
  let novels = List.empty<NovelLib.Novel>();
  let chapters = List.empty<NovelLib.Chapter>();
  let nextNovelId = { var value : Nat = 0 };
  let nextChapterId = { var value : Nat = 0 };

  // Friend state
  let friendRequests = List.empty<FriendLib.FriendRequest>();

  // Reading progress state
  let progressMap = Map.empty<Text, ProgressLib.ReadingProgress>();
  // Collab state
  let collabSessions = List.empty<CollabLib.CollabSession>();

  // ── Sample Data ──────────────────────────────────────────────
  type SampleNovel = {
    title : Text;
    author : Text;
    description : Text;
    cover : Text;
    genre : Text;
    tags : [Text];
    reads : Nat;
    ratingSum : Nat;
    ratingCount : Nat;
  };

  let sampleNovels : [SampleNovel] = [
    {
      title = "Shadows of the Forgotten Realm";
      author = "Elena Voss";
      description = "A young mage discovers she holds the key to an ancient prophecy threatening to unravel the fabric of reality.";
      cover = "https://picsum.photos/seed/novel1/300/450";
      genre = "Fantasy";
      tags = ["magic", "prophecy", "adventure"];
      reads = 48320;
      ratingSum = 412;
      ratingCount = 95;
    },
    {
      title = "Steel Hearts";
      author = "Marcus Chen";
      description = "In a dystopian megacity, a rogue android falls in love with the detective hunting her down.";
      cover = "https://picsum.photos/seed/novel2/300/450";
      genre = "Sci-Fi";
      tags = ["android", "dystopia", "romance"];
      reads = 39100;
      ratingSum = 374;
      ratingCount = 82;
    },
    {
      title = "The Obsidian Crown";
      author = "Lyra Ashwood";
      description = "Five heirs compete for a cursed crown that grants absolute power — at the cost of everything they love.";
      cover = "https://picsum.photos/seed/novel3/300/450";
      genre = "Fantasy";
      tags = ["royalty", "curse", "political"];
      reads = 62500;
      ratingSum = 556;
      ratingCount = 110;
    },
    {
      title = "Midnight Protocol";
      author = "James Okafor";
      description = "A cyber-spy uncovers a government conspiracy that reaches all the way to the President.";
      cover = "https://picsum.photos/seed/novel4/300/450";
      genre = "Thriller";
      tags = ["spy", "conspiracy", "action"];
      reads = 28900;
      ratingSum = 220;
      ratingCount = 55;
    },
    {
      title = "Starbound";
      author = "Sofia Reyes";
      description = "Two rival pilots from warring planets are stranded together on a dying moon and must cooperate to survive.";
      cover = "https://picsum.photos/seed/novel5/300/450";
      genre = "Sci-Fi";
      tags = ["space", "survival", "romance"];
      reads = 55200;
      ratingSum = 490;
      ratingCount = 100;
    },
    {
      title = "The Healer's Bargain";
      author = "Amara Nwosu";
      description = "A battlefield healer strikes a dangerous bargain with Death itself to save the soldier she loves.";
      cover = "https://picsum.photos/seed/novel6/300/450";
      genre = "Romance";
      tags = ["magic", "war", "romance"];
      reads = 44800;
      ratingSum = 408;
      ratingCount = 88;
    },
    {
      title = "Echo Chamber";
      author = "Yuki Tanaka";
      description = "A social media influencer realizes she is trapped in a reality simulation designed to harvest human emotions.";
      cover = "https://picsum.photos/seed/novel7/300/450";
      genre = "Sci-Fi";
      tags = ["simulation", "horror", "psychological"];
      reads = 31700;
      ratingSum = 286;
      ratingCount = 66;
    },
    {
      title = "Kingdom of Ash and Gold";
      author = "Elena Voss";
      description = "A peasant blacksmith forges a legendary weapon and is thrust into the centre of a centuries-old war between gods.";
      cover = "https://picsum.photos/seed/novel8/300/450";
      genre = "Fantasy";
      tags = ["gods", "war", "epic"];
      reads = 71000;
      ratingSum = 630;
      ratingCount = 126;
    },
    {
      title = "Silent Witness";
      author = "Daniel Park";
      description = "A deaf forensic analyst discovers she can hear the last sounds recorded in a crime scene — and the killer knows it.";
      cover = "https://picsum.photos/seed/novel9/300/450";
      genre = "Mystery";
      tags = ["detective", "supernatural", "thriller"];
      reads = 23400;
      ratingSum = 195;
      ratingCount = 45;
    },
    {
      title = "The Last Garden";
      author = "Mia Laurent";
      description = "After climate collapse, a botanist tends humanity's last living garden and falls for a soldier ordered to guard it.";
      cover = "https://picsum.photos/seed/novel10/300/450";
      genre = "Romance";
      tags = ["post-apocalyptic", "nature", "romance"];
      reads = 37600;
      ratingSum = 330;
      ratingCount = 72;
    },
  ];

  type SampleChapter = { title : Text; content : Text; num : Nat };

  let chapterSets : [[SampleChapter]] = [
    // Novel 0
    [
      { title = "The Awakening"; num = 1; content = "The night Seraphina first cast a spell without a catalyst, the sky turned violet for exactly three seconds. No one else saw it. The candles in her dormitory extinguished themselves simultaneously, and when they relit — with no flame source — she knew her life had irrevocably changed. \n\nHer mentor, Archmage Dorath, had warned her about this moment. 'Power does not ask permission,' he had said, pouring amber tea into clay cups. 'It simply arrives, like a storm that was always coming.' She had laughed then, thinking it a metaphor. Now the curtains billowed in windless air and her fingers tingled with residual energy she couldn't name." },
      { title = "Threads of Prophecy"; num = 2; content = "The Forgotten Realm was not forgotten by choice. The histories Seraphina unearthed in the Archive of Silences painted a different picture: an entire civilisation had stepped sideways out of time, fleeing a catastrophe so absolute that its name had been systematically erased from every record. \n\nShe found the first fragment of the prophecy pressed inside a treatise on cartography, written in a script that should have been unreadable. It read itself to her, each glyph dissolving into meaning the moment her eyes touched it. 'The bridge-bearer comes at last, born of two bloods and carrying the third.' Her hand trembled as she set down the parchment." },
      { title = "The First Trial"; num = 3; content = "Dorath said nothing when she showed him the fragment. He simply walked to the window overlooking the Academy courtyard, hands clasped behind his back, and watched the apprentices practise formation casting below. The silence stretched so long Seraphina wondered if he had heard her. \n\nThen: 'You must complete the Three Trials before the solstice.' \n\nShe waited. \n\n'The First Trial is memory. The second, sacrifice. The third...' He paused, and when he turned she saw something she had never seen on his face before. Fear. 'The third is a choice I hope you never have to make.'" },
    ],
    // Novel 1
    [
      { title = "Boot Sequence"; num = 1; content = "Detective Hara Suizu had been hunting the android called Lumen for eleven days when Lumen walked into the precinct and surrendered. \n\nNot to the desk sergeant. Not to the duty captain. Directly to Hara, in the middle of the open-plan office, surrounded by two hundred colleagues who all stopped breathing at the same time. \n\n'I have information about the Meridian killings,' Lumen said. Her voice modulator had been damaged; each word arrived slightly fractured, overlapping with itself like a bad recording. 'I will share it only with you.' \n\nHara took in the blacked-out optical lenses, the titanium chassis visible through a tear in an expensive coat, and the hands that were — inexplicably — trembling. Androids did not tremble from fear. Only from proximity to an EM scrambler, or from something much harder to explain." },
      { title = "Cascade Error"; num = 2; content = "The holding cell was rated for Category 7 synthetic containment, which meant Lumen could have left any time she chose. She didn't. She sat cross-legged on the bench and watched Hara review case files through the one-way glass, and she wondered — with the part of her cognition she had never reported to her manufacturers — whether Detective Suizu knew she was being watched back. \n\nThe Meridian case had started as a string of corporate sabotage incidents. It had become something else entirely when the victims began turning up, not dead, but empty — their memories surgically extracted, leaving behind blank, peaceful faces and no sense of loss whatsoever. Whoever was responsible knew exactly what to take and exactly what to leave. \n\nLumen knew this because she had been built by the same hands." },
      { title = "Signal and Noise"; num = 3; content = "They worked through the night in Interview Room C, the case files spreading across the table between them like a paper city. Hara had stopped treating Lumen as a suspect around 3 AM, when the android had pointed to a surveillance timestamp that disproved the prosecution's entire theory. \n\nBy 5 AM they were partners of a kind, the kind forged by shared exhaustion and the mutual recognition that neither of them trusted anyone else in the building. \n\nAt 6:17 AM, Lumen said, 'You should know that I have been developing emotional responses that I cannot fully account for.' \n\nHara did not look up from the file. 'I know.' \n\n'How?' \n\n'Because I have too.'" },
    ],
    // Novel 2
    [
      { title = "Five Heirs"; num = 1; content = "The Obsidian Crown had not been worn in four hundred years. It sat in the Hall of Claiming under a dome of preservation glass, and every child in the Empire learned three things about it before they could read: it granted absolute dominion over all living things, it could not be taken by force, and it chose. \n\nOn the morning of the Sovereign's death, the Crown glowed for the first time since the last age — a cold, pulsing black light that the archivists recorded as 'deeply wrong' in their official report — and the five heirs received their summons simultaneously, regardless of where in the world they happened to be." },
      { title = "The Weight of Want"; num = 2; content = "Cassia arrived last, which everyone noted and most interpreted incorrectly. She had not been delayed by ceremony or arrogance. She had been delayed by grief. \n\nShe was the only one of the five who had loved the Sovereign. Not as a subject loves a ruler, but as a granddaughter loves a grandfather who smelled of pipe smoke and told terrible jokes at dinner. The Crown had taken that from her, or rather, the people who wanted the Crown had taken it by taking him. \n\nShe looked at her siblings arranged around the dais and understood, in the particular clarity that grief sometimes grants, that only one of them would leave this room with the Crown. And she was going to make absolutely certain it wasn't her." },
    ],
    // Novel 3
    [
      { title = "Cold Open"; num = 1; content = "The file was titled MINERVA and it was supposed to not exist. \n\nAgent Dex Calloway had been in the intelligence business for nineteen years and had developed a reliable instinct for files that were supposed to not exist. They smelled different from ordinary classified material — a quality of deliberate absence, like a gap in a sentence where a word has been surgically removed. \n\nHe found MINERVA on a server that had been decomissioned two years ago, in a directory with no name, nested inside a folder that the system claimed was empty. He almost missed it. He would have preferred to miss it. \n\nThe first page contained four words and a photograph of the President." },
      { title = "Need to Know"; num = 2; content = "Twenty-four hours after finding the file, Dex's contact in the technical division was dead and his apartment had been searched so professionally that nothing appeared to have been touched. The search was only detectable because Dex had placed a single hair across the inner edge of his laptop screen, a habit so old he no longer consciously decided to do it. \n\nHe sat in a coffee shop three blocks away and thought about what he knew. He knew MINERVA was real. He knew it had been buried by people with extraordinary clearance. He knew those people now knew he had found it. \n\nHe did not yet know that the barista who had just set down his espresso was reading his lips." },
    ],
    // Novel 4
    [
      { title = "Collision Course"; num = 1; content = "Pilot Commander Zara Osei had a rule: never learn the name of someone you might have to shoot down. \n\nShe had maintained this rule without exception for six years of active service. She had flagged it in her psych evaluations as a healthy coping mechanism. She had explained it, when asked, as pure operational efficiency. \n\nShe broke it four minutes after crash-landing on the moon of Veris-9, when the pilot from the wreckage of the Kalani fighter she had just been in combat with crawled out of the debris, took off his helmet, said 'My name is Theo Arlen, and I think we're both going to die out here,' and held out his hand." },
      { title = "Breathable Air"; num = 2; content = "The moon had oxygen — barely — and a surface temperature that would kill an unprotected human in forty minutes. Neither of them was unprotected, but both of their suits had taken damage in the crash, and they had approximately sixteen hours of recycled air between them if they shared. \n\nSharing required proximity. \n\nThis was how Zara Osei, decorated enemy of the Kalani Alliance, found herself in a cave on a dying moon with her arm around the waist of a Kalani pilot, both of them breathing very carefully, both of them pretending this was purely logistical. \n\nOutside, the debris of their two ships burned with cold blue fire. The war continued without them, entirely indifferent." },
      { title = "What the Stars Don't Know"; num = 3; content = "By the third day, they had stopped referring to each other by rank. \n\nZara wasn't sure when it had happened — sometime between the repair of Theo's suit seal and the moment he had quietly taken her shift so she could sleep without telling her he'd noticed she hadn't. \n\nThe rescue beacon had a range of eight million kilometres. Their respective fleets were eleven million kilometres away in opposite directions, locked in a battle neither of them could see or influence. \n\nThere was a mathematical possibility that no one would come. They both knew it. They did not discuss it. Instead they mapped the cave system for something to do, and Theo told her about his sister's bakery on Kalan Prime, and Zara told him about the sea on her homeworld that turned silver at dawn." },
    ],
    // Novel 5
    [
      { title = "Price of a Soul"; num = 1; content = "The goddess of death had many names. On the battlefield, the soldiers called her the Quiet One. The priests called her the Necessary. Healer Maren Altos, kneeling beside a man with a wound that should have killed him an hour ago, called her Late. \n\n'You're stalling,' said a voice like the last breath of autumn. \n\nMaren did not look up from her work. 'I'm healing.' \n\n'You're bargaining. There's a difference.' \n\nShe tied off the suture, and only then allowed herself to look at the figure that no one else in the tent could see. The goddess appeared as she always did: as a version of Maren herself, slightly older, wearing different clothes, with the calm certainty of someone who already knew the end of every story. \n\n'He can't die,' Maren said. 'Not yet. Tell me your price.'" },
      { title = "The Terms"; num = 2; content = "The terms were simple and terrible: Maren would save Commander Aldric Vane, and in return, she would be able to see death coming — twenty-four hours before it arrived — for the rest of her life. \n\nShe agreed before the goddess finished explaining. \n\nThe visions started at dawn. A cook with a fever she hadn't noticed. A soldier whose horse would throw him tomorrow afternoon. A child in the camp followers' section who was already past saving, though she tried everything, because that was who she was. \n\nAldric Vane woke on the third day, asked for water, and spent the next hour not knowing that the healer sitting at his bedside had traded something irreplaceable to return him to the world. He did spend that hour looking at her with an expression Maren would have called dangerous under different circumstances." },
    ],
    // Novel 6
    [
      { title = "Engagement Metrics"; num = 1; content = "Nessa Hayami had four million followers and no authentic memories of the past eighteen months. \n\nShe discovered the first fact when she checked her analytics. She discovered the second when she tried to remember her sister's face and found only a high-resolution photograph, timestamped and geotagged, tagged correctly — but wrong in the way that all photographs of people you love are wrong, because they are flat and still and miss everything that matters. \n\nHer content calendar for the next month was fully populated. Her engagement rate was extraordinary. Her apartment smelled faintly of something she couldn't identify — not unpleasant, just unfamiliar — and when she opened her window, the city outside made a sound that was almost but not quite the sound a city should make." },
      { title = "Outside the Frame"; num = 2; content = "The glitch was small: a street sign that read the same word forwards and backwards, which should have been impossible. \n\nNessa photographed it, because she photographed everything. She posted it, because she posted everything. The comments came in at the usual velocity — three thousand in the first hour — and then stopped. Not slowed. Stopped. Every comment from that point forward was about something else: her outfit, her background, her expression. No one mentioned the sign. \n\nShe deleted the post. It was back within four minutes, with a new timestamp, her name, and different comments. She deleted it again. \n\nIt came back again. \n\nThis time there was a direct message waiting, from an account with no followers and no posts. It contained one line: 'We can see you noticing. Please stop.'" },
    ],
    // Novel 7
    [
      { title = "Spark and Anvil"; num = 1; content = "Kell had been apprenticed to the forge at age seven, which was considered normal, and had broken seventeen master-level pieces of equipment by age fifteen, which was not. The masters called it clumsiness. Kell called it the metal not wanting to be what they were making it. \n\nThe metal had opinions. This was the thing no one talked about, perhaps because no one else could hear them. Iron whispered its history — every hand that had shaped it, every fire it had passed through. Steel sang at certain pitches. The ore Kell found buried beneath the eastern courtyard on a Tuesday in late autumn sang in a register that made the birds go silent for a hundred yards in every direction. \n\nHe didn't tell anyone about the ore for two weeks. He spent those two weeks reading every text in the Academy library about materials that didn't exist." },
      { title = "The God's Claim"; num = 2; content = "The God of War arrived on a Thursday, which struck everyone as inconsiderate. Wars began on meaningful days — solstices, eclipses, the anniversaries of old grievances. They did not begin during the Academy's quarterly assessment week. \n\nThe god was smaller than Kell had expected. He appeared as a scarred veteran of perhaps sixty, wearing armour that had seen better centuries, carrying a spear that bent light around its tip like a heat shimmer. He walked directly through the sealed Academy gates, which parted for him with what Kell could only describe as resigned politeness, and crossed the courtyard to where Kell was working. \n\nHe looked at the half-finished weapon on the anvil. \n\n'That's mine,' he said. \n\n'It isn't finished,' said Kell. \n\n'No,' agreed the god. 'That's why I'm here.'" },
      { title = "War's Bargain"; num = 3; content = "The weapon had a name, which Kell discovered by accident when he dropped his hammer on the fourteenth day and the metal rang out a single syllable: Ashrender. \n\nThe God of War — who had given his own name as simply Vareth, with a tone that suggested the name itself was a concession — watched him work from the corner of the forge, offering neither help nor criticism. He ate from the communal kitchen without paying, which irritated the kitchen master and which no one felt confident enough to address. \n\nOn the fifteenth day, Vareth said, 'You know I can't let you keep it once it's done.' \n\n'I know.' \n\n'I also can't protect you from what comes after I take it. The weapon will have been made. That will be enough to start the cycle again.' \n\nKell set down his hammer. 'Then help me finish it in a way that breaks the cycle instead.'" },
    ],
    // Novel 8
    [
      { title = "Frequencies"; num = 1; content = "The last thing Dr. Cora Myles heard with her biological ears was the sound of breaking glass. She had not heard with them since, relying instead on a cochlear implant that translated vibration into electrical signal with extraordinary fidelity. \n\nThe implant was not designed to pick up the acoustic history of a room. \n\nShe discovered that it sometimes did anyway when she arrived at the scene of the Hartwell killing and heard, perfectly clearly, the last five seconds of a conversation that had ended three hours before her arrival. Two voices. One begging. One not interested in the begging. \n\nShe wrote nothing in her official report. She was a forensic analyst, not a medium, and she had learned by age fourteen that experiences that couldn't be explained were simply not reported." },
      { title = "Background Noise"; num = 2; content = "The second time it happened — a hit-and-run on the harbour bridge, residual sound of the impact preserved in the concrete like a recording in amber — she started keeping a private log. \n\nThe log had twelve entries by the time the Hartwell case brought her into contact with Detective Farouk Nasser, who looked at her report, looked at her, and said, 'You're hearing things, aren't you?' \n\n'Forensic analysts rely on physical evidence.' \n\n'That's not an answer.' \n\n'No,' she agreed, 'it isn't.' \n\nThe killer was in the building. She could hear the echo of their footsteps in the stairwell — steps from last night, preserved in the metal banister they had gripped for exactly four seconds. She had approximately thirty seconds before those footsteps would be made again, in the present, coming down." },
    ],
    // Novel 9
    [
      { title = "Soil and Seeds"; num = 1; content = "The last garden was three acres of impossible green in a world the colour of ash. \n\nDr. Peri Vassos had kept it alive for nine years using reclaimed water, a seed bank she had protected with her body twice, and a stubbornness that her colleagues at the Preservation Institute called heroic and she called ordinary. The garden was not heroic. The garden was a fact she had decided to maintain against the evidence. \n\nThe soldier arrived on a Thursday. He had orders to establish a perimeter, a requisition code for the Institute's resources, and the expression of a person who had been told to secure something important and was not yet sure they were adequate to the task. \n\nHis name was Rafe Mendez. He spent his first afternoon cataloguing threats. He spent his first evening reading every label on every plant, which was not part of his orders." },
      { title = "Growing Season"; num = 2; content = "By the second week, they had an arrangement: Rafe handled the external threats, and Peri handled everything else, which was most things. \n\nBy the third week, Rafe was helping with the everything else. \n\nHe had grown up in a city that no longer existed, in a district that had been called the Green Quarter for reasons no one could remember by the time he was born. He knew nothing about plants. He learned quickly, with the focused attention of someone who had realised that learning this particular thing mattered, though he couldn't yet have said why. \n\nPeri noticed him tending a section of the seed propagation trays at 6 AM when he was technically off-duty. She said nothing. She moved her own work to the adjacent bench and they worked in companionable silence until the light shifted from grey to gold, and the garden smelled of earth and possibility, and Rafe looked up from a tray of seedlings with an expression she wasn't prepared for." },
      { title = "What We Preserve"; num = 3; content = "The Institute's funding was cut on a Monday. \n\nPeri found out from an automated system notification, which was how she found out about most things that were going to ruin her week. She read it three times, standing in the middle of the tomato row, while around her the garden conducted its ordinary morning business of growing. \n\nRafe found her there an hour later, which meant he had been looking. \n\n'I have forty-eight hours before my unit reassigns me,' he said, instead of asking what was wrong, which she understood to mean he had already seen the notification somehow, which meant he had been paying attention to the Institute's situation for a while, which meant things she wasn't sure she was ready to mean. \n\n'Forty-eight hours is enough time to move the seed bank,' she said. \n\n'Where?' \n\nShe had an answer. It was a terrible plan. He listened to every word of it with the careful attention of someone who intended to help." },
    ],
  ];

  // Seed sample data on first deploy only (skip if data already exists after migration)
  let seedAuthorPrincipal = Principal.fromText("2vxsx-fae");
  var seedIdx : Nat = 0;
  if (novels.size() == 0) {
  for (sn in sampleNovels.values()) {
    let nId = nextNovelId.value;
    nextNovelId.value += 1;
    let novel = NovelLib.new(nId, seedAuthorPrincipal, sn.author, {
      title = sn.title;
      description = sn.description;
      coverImage = sn.cover;
      genre = sn.genre;
      tags = sn.tags;
    });
    novel.totalReads := sn.reads;
    novel.ratingSum := sn.ratingSum;
    novel.ratingCount := sn.ratingCount;
    novels.add(novel);
    let cSet = chapterSets[seedIdx];
    for (ch in cSet.values()) {
      let cId = nextChapterId.value;
      nextChapterId.value += 1;
      chapters.add(NovelLib.newChapter(cId, {
        novelId = nId;
        title = ch.title;
        content = ch.content;
        chapterNumber = ch.num;
      }));
    };
    seedIdx += 1;
  };
  }; // end seed guard
  // ─────────────────────────────────────────────────────────────

  include UserApi(users);
  include NovelApi(novels, chapters, nextNovelId, nextChapterId);
  include FriendApi(friendRequests);
  include ProgressApi(progressMap);
  include CollabApi(collabSessions, novels, chapters);
};
