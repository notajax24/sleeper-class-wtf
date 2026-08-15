"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Info,
  Pause,
  Play,
  Radio,
  SkipBack,
  SkipForward,
  TrainFront,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as any;

// Make sure your background image is placed in src/assets/bg.png
import bgImage from "../assets/bg.png";

const stations = [
  {
    videoId: "sOhESxhibAM",
    title:
      "Safarnama FULL AUDIO Song | Tamasha | Ranbir Kapoor, Deepika Padukone | T-Series",
    artist: "Tamasha",
  },
  {
    videoId: "2mWaqsC3U7k",
    title:
      "ROCKSTAR: Phir Se Ud Chala (Full Song) | Ranbir Kapoor, Nargis Fakhri | A. R. Rahman, Mohit Chauhan",
    artist: "Rockstar",
  },
  {
    videoId: "BArlCOQ__ug",
    title:
      "Shiv Kailashon Ke Vasi | Laman | Bhole Baba | Official song | Folk Himachal | Shankar Sankat Harna",
    artist: "Laman",
  },
  {
    videoId: "s8aAlUynpEY",
    title:
      'Highway: "Maahi Ve" Full Song with lyrics | Alia Bhatt, Randeep Hooda | A.R Rahman',
    artist: "Highway",
  },
  {
    videoId: "PlIoHp6v3LI",
    title:
      "Shiv kailasho ke Vasi || Official Music Video || Hansraj Raghuwanshi || Baba Ji",
    artist: "Hansraj Raghuwanshi",
  },
  {
    videoId: "fdubeMFwuGs",
    title:
      "Ilahi Full Video Song | Yeh Jawaani Hai Deewani | Ranbir Kapoor, Deepika Padukone | Pritam",
    artist: "Yeh Jawaani Hai Deewani",
  },
  {
    videoId: "2N8_XDPW67Q",
    title:
      "Dil Beparvah (feat. Dhruv Bhola, Nikhil Vasudevan) (The Dewarists, Season 5)",
    artist: "The Dewarists",
  },
  {
    videoId: "oZ7PnR_ZKRE",
    title:
      "Journey Song Full Audio | Piku | Amitabh Bachchan, Irrfan Khan & Deepika Padukone",
    artist: "Piku",
  },
  {
    videoId: "8HDTS80dlr4",
    title:
      "Patakha Guddi Highway Full Video Song (Official) || A.R Rahman | Alia Bhatt, Randeep Hooda",
    artist: "Highway",
  },
  {
    videoId: "Gy3f_A8J7KQ",
    title: "Mohit Chauhan - Babaji",
    artist: "Mohit Chauhan",
  },
  {
    videoId: "QMtJqPw2m-8",
    title: "Papon - Banao Banao",
    artist: "Papon",
  },
  {
    videoId: "eEeX2QMlSlo",
    title:
      "Yun Hi Chala Chal Lyrical Video | Swades | A.R. Rahman | Javed Akhtar | Udit Narayan | Shahrukh Khan",
    artist: "Swades",
  },
  {
    videoId: "QkdYA_T-Mbs",
    title: "Banjarey Full Audio Song | Fugly | Yo Yo Honey Singh",
    artist: "Fugly",
  },
  {
    videoId: "9godkMYS1c4",
    title: "Gaurav Pandey - Back Home To The Mountains | Official Music Video",
    artist: "Gaurav Pandey",
  },
  {
    videoId: "4h5aIACGjQo",
    title:
      "Arijit Singh: Chota Sa Fasana Video Song | Karwaan | Irrfan Khan | DulQuer Salmaan | Mithila Palkar",
    artist: "Karwaan",
  },
  {
    videoId: "R0XjwtP_iTY",
    title:
      "Khaabon Ke Parinday (Full video song) Zindagi Na Milegi Dobara | Hrithik Roshan, Kartina Kaif",
    artist: "Zindagi Na Milegi Dobara",
  },
  {
    videoId: "Mo5tQDcs__g",
    title:
      "Full Video:Aao Milo Chalen|Jab We Met|Shahid Kapoor, Kareena Kapoor|Pritam, Shaan, Ustad Sultan Khan",
    artist: "Jab We Met",
  },
  {
    videoId: "R3Ed4zvQ0Hs",
    title:
      "Saansein Lyrical Song | Karwaan | Irrfan Khan, Dulquer Salmaan, Mithila Palkar | Prateek Kuhad",
    artist: "Karwaan",
  },
  {
    videoId: "XZhAJWI94hk",
    title:
      "Theher Ja | October | Varun Dhawan & Banita Sandhu | Armaan Malik | Abhishek Arora | Abhiruchi Chand",
    artist: "October",
  },
  {
    videoId: "dXpG0kavjUo",
    title:
      "Full Video: Yeh Ishq Hai | Jab We Met | Kareena Kapoor, Shahid Kapoor | Pritam | Shreya Ghoshal",
    artist: "Jab We Met",
  },
  {
    videoId: "epUBGOngvaU",
    title: "Dooba Dooba - Dooba Dooba - Silk Route | Official Hindi Pop Song",
    artist: "Silk Route",
  },
  {
    videoId: "2Z0Put0teCM",
    title:
      "Lyrical : Senorita | Zindagi Na Milegi Dobara | Farhan Akhtar, Hrithik Roshan, Abhay Deol",
    artist: "Zindagi Na Milegi Dobara",
  },
  {
    videoId: "qLCLvzTGFVM",
    title: "The Local Train - Dil Mere (Official)",
    artist: "The Local Train",
  },
  {
    videoId: "wqTQNs9sO6M",
    title:
      "Hairat Full Video | Anjaana Anjaani | Ranbir Kapoor, Priyanka Chopra | Lucky Ali | Vishal - Shekhar",
    artist: "Anjaana Anjaani",
  },
  {
    videoId: "KWA0_kI5PKk",
    title:
      "Aaj Kal Zindagi Full Video - Wake Up Sid|Ranbir Kapoor, Konkona Sen|Shankar Mahadevan",
    artist: "Wake Up Sid",
  },
  {
    videoId: "H0in5w8Zung",
    title:
      "Ghar se hum chale bas ek backpack | MTV Roadies season 5 theme song | Jeet lenge hum",
    artist: "MTV Roadies",
  },
  {
    videoId: "6EHpMmSyU5o",
    title:
      "Ik Junoon 'Paint It Red'- Full Song feat.Hrithik -Zindagi Na Milegi Dobara (in True HD )",
    artist: "Zindagi Na Milegi Dobara",
  },
  {
    videoId: "NlEqiKJjh-k",
    title:
      "Queen: O Gujariya Full Video Song | Kangana Ranaut, Lisa Haydon, Raj Kumar Rao",
    artist: "Queen",
  },
  {
    videoId: "hJBHSmyqv0Y",
    title:
      "Humraah Full Song | Malang | Aditya R K, Disha P Anil K Kunal K | Sachet T | Mohit S | Fusion P",
    artist: "Malang",
  },
  {
    videoId: "uqa0BvYy03I",
    title: "SANAM - Neele Neele Ambar Par",
    artist: "Sanam",
  },
  {
    videoId: "geBOXRbvSu4",
    title:
      "Musafir Hoon Yaron | Rishabh Tiwari | Ft. Sapna Rathore & Prashant Sethi | Tarun Sharma",
    artist: "Rishabh Tiwari",
  },
  {
    videoId: "JlgkMXex2DI",
    title: "SANAM - Hai Apna Dil To Awara - Ft. Soogum Sookha",
    artist: "Sanam",
  },
  {
    videoId: "61cnlW6hLzg",
    title:
      "Ek Pyar Ka Nagma Hai | Lyrical | Carvaan Lounge | Neeti Mohan | Papon | Arko | Anupriya Goenka",
    artist: "Carvaan Lounge",
  },
  {
    videoId: "3Ge_VoC1Cf8",
    title:
      "Yeh Raat Bheegi Bheegi | Sanam ft. Aishwarya Majmudar | Official HD Video | Raj Kapoor | Nargis Dutt",
    artist: "Sanam",
  },
  {
    videoId: "XpD73w-tvSY",
    title:
      "Lag Ja Gale / Abhi Na Jao Chhod Ke - Akriti Kakar | Big Band Theory | Mashup",
    artist: "Akriti Kakar",
  },
  {
    videoId: "VOFm2oB8t98",
    title: "Sham",
    artist: "Prateek Kuhad",
  },
  {
    videoId: "4HRC6c5-2lQ",
    title: "SANAM - Yeh Raaten Yeh Mausam - Ft. Simran Sehgal",
    artist: "Sanam",
  },
  {
    videoId: "iFwRoxuN_9o",
    title: "SANAM - Dilbar Mere",
    artist: "Sanam",
  },
  {
    videoId: "c2gSzYLJ8sY",
    title:
      "Ishq Bulaava Full Video - Hasee Toh Phasee|Parineeti, Sidharth|Sanam Puri, Shipra Goyal",
    artist: "Hasee Toh Phasee",
  },
  {
    videoId: "IbBT5VZ3Lpg",
    title:
      "Old Songs Mashup | 20 Songs On ONE CHORD | Siddharth Slathia | Pehchan Music",
    artist: "Siddharth Slathia",
  },
  {
    videoId: "HqUeSjsYLNU",
    title:
      "Makhna - Drive | Sushant Singh Rajput, Jacqueline Fernandez | Tanishk Bagchi, Asees Kaur",
    artist: "Drive",
  },
  {
    videoId: "bR8sE9ubyTI",
    title: 'MEMBA - For Aisha (Featured in "The Sky Is Pink") [Lyric Video]',
    artist: "MEMBA",
  },
  {
    videoId: "9LjKAt6SkdQ",
    title: "The Local Train - Khudi (Official)",
    artist: "The Local Train",
  },
  {
    videoId: "vt4jX0iRgCg",
    title:
      "Kho Gaye Hum Kahan -Full Video |Baar Baar Dekho | Sidharth Malhotra, Katrina K| Jasleen R, Prateek K",
    artist: "Baar Baar Dekho",
  },
  {
    videoId: "nLdIt92oM5c",
    title: "Tu Kisi Rail Si",
    artist: "Masaan",
  },
  {
    videoId: "Il7Nv270zNk",
    title: "Prateek Kuhad - cold/mess",
    artist: "Prateek Kuhad",
  },
  {
    videoId: "6BYIKEH0RCQ",
    title: "Ritviz - Liggi [Official Music Video]",
    artist: "Ritviz",
  },
  {
    videoId: "KBIq11mNB0I",
    title:
      "Full Video: Malang (Title Track)| Aditya Roy Kapur, Disha Patani, Anil K, Kunal K | Ved S | Mohit S",
    artist: "Malang",
  },
  {
    videoId: "0gosur3db5I",
    title:
      "AIB : Udd Gaye by RITVIZ [Official Music Video] | #BacardiHousePartySessions",
    artist: "Ritviz",
  },
  {
    videoId: "azFITRcZ9Os",
    title: "Purani Jeans Aur Guitar | Acoustic Version | Sachet Tandon |",
    artist: "Sachet Tandon",
  },
  {
    videoId: "2kj0oZP0YoI",
    title:
      "Mileya Mileya Official Full Song Video PRIYA ANDREWS | REKHA BHARDWAJ | JIGAR SARAIYA",
    artist: "Rekha Bhardwaj",
  },
  {
    videoId: "ZmcBC9-wAXM",
    title:
      "Qaafirana | Kedarnath | Sushant Rajput | Sara Ali Khan | Arijit Singh & Nikhita | Amit Trivedi",
    artist: "Kedarnath",
  },
  {
    videoId: "8FMz_KT1mC4",
    title:
      "Jo Bheji Thi Duaa Shanghai Full Song | Emraan hashmi, Abhay Deol, Kalki Koechlin",
    artist: "Shanghai",
  },
  {
    videoId: "3PmtRjTBcXk",
    title:
      "Kya Hua Tera Wada - Unplugged | Pranav Chandran | Trending Songs | Pehchan Music | Old Hindi Songs",
    artist: "Pranav Chandran",
  },
  {
    videoId: "uKspitQJycA",
    title:
      "Raat Kali / Emptiness Mashup | Digvijay Singh | Kishore Kumar | Cover",
    artist: "Digvijay Singh",
  },
  {
    videoId: "fhKVp1-kJDs",
    title: "Tum Itna Jo - Papon | MTV Unplugged",
    artist: "Papon",
  },
  {
    videoId: "kums97Zw3z8",
    title:
      "Meri Bheegi Bheegi Si Song  Kishore Kumar  Anamika 1973 Hindi Movie  YouTube",
    artist: "Kishore Kumar",
  },
  {
    videoId: "8367ETnagHo",
    title: "Coke Studio Season 9| Tera Woh Pyar| Momina Mustehsan & Asim Azhar",
    artist: "Coke Studio",
  },
  {
    videoId: "nD1jhw6F-J4",
    title:
      "Voh Dekhnay Mein Full Video - London Paris New York|Ali Zafar, Aditi Rao Hydari",
    artist: "London Paris New York",
  },
  {
    videoId: "L-9s4nTLSdA",
    title:
      "Madari - Clinton Cerejo feat Vishal Dadlani & Sonu Kakkar, Coke Studio @ MTV Season 2",
    artist: "Coke Studio",
  },
  {
    videoId: "T94PHkuydcw",
    title:
      "ROCKSTAR: Kun Faya Kun (Full Video Song) | Ranbir Kapoor | A.R. Rahman, Javed Ali, Mohit Chauhan",
    artist: "Rockstar",
  },
  {
    videoId: "SS3lIQdKP-A",
    title:
      "Full Video: Masakali | Delhi 6 | Abhishek Bachchan, Sonam Kapoor | A.R. Rahman |  Mohit Chauhan",
    artist: "Delhi 6",
  },
  {
    videoId: "uxTXp0-iZrY",
    title:
      "Pashmina | Fitoor | Aditya Roy Kapur, Katrina Kaif | Amit Trivedi | love song",
    artist: "Fitoor",
  },
  {
    videoId: "x_NoA_Fp2Rc",
    title:
      "Jugni - Full Video Song | Cocktail | Saif Ai Khan, Deepika Padukone & Diana Penty | Pritam",
    artist: "Cocktail",
  },
  {
    videoId: "qTsAdjULqwg",
    title:
      "Uff Teri Adaa Full Video Song | Karthik Calling Karthik | Farhan Akhtar, Deepika Padukone",
    artist: "Karthik Calling Karthik",
  },
  {
    videoId: "VkJlv0m6els",
    title:
      "'Pehli Baar' VIDEO Song | Dil Dhadakne Do | Ranveer Singh, Anushka Sharma | T-Series",
    artist: "Dil Dhadakne Do",
  },
  {
    videoId: "YR12Z8f1Dh8",
    title:
      "3 - Why This Kolaveri Di Official Video | Dhanush | Anirudh Ravichander | Shruti Haasan",
    artist: "Dhanush",
  },
  {
    videoId: "oSpMspvMkSQ",
    title:
      "Kudi Nu Nachne De:Angrezi Medium|Anushka,Katrina,Alia,Janhvi,Ananya,Kriti,Kiara,Radhika,Sachin-Jigar",
    artist: "Angrezi Medium",
  },
  {
    videoId: "Ynimc6hMoBA",
    title:
      "Daru Desi (Full Video Song) | Cocktail | BollyWoo.ooo | Saif Ali Khan, Deepika Padukone, Diana Penty",
    artist: "Cocktail",
  },
  {
    videoId: "6vKucgAeF_Q",
    title:
      "MATARGASHTI full VIDEO Song | TAMASHA Songs 2015 | Ranbir Kapoor, Deepika Padukone | T-Series",
    artist: "Tamasha",
  },
  {
    videoId: "1GWyCJHuNms",
    title:
      "Challa | Full Song | Jab Tak Hai Jaan | Shah Rukh Khan, Katrina Kaif | Rabbi | A. R. Rahman | Gulzar",
    artist: "Jab Tak Hai Jaan",
  },
  {
    videoId: "0KNk-Joi-NM",
    title:
      "Tera Ghata | Gajendra Verma Ft. Karishma Sharma | Vikram Singh | Official Video",
    artist: "Gajendra Verma",
  },
  {
    videoId: "-Lw8k4hYGVk",
    title:
      "Dil Hi Toh Hai - The Sky Is Pink | Priyanka Chopra Jonas,Farhan Akhtar |Arijit Singh, Pritam, Gulzar",
    artist: "The Sky Is Pink",
  },
  {
    videoId: "6SncLwWFrJ0",
    title:
      "Pichle saat Dinon Mein Full Song | Rock On!! - OST | Arjun Rampal,Farhan Akhtar,Luke Kenny",
    artist: "Rock On!!",
  },
  {
    videoId: "HIbzXaBdwZw",
    title:
      "Full Video: Kabhi Kabhi Aditi Zindagi | Jaane Tu Ya Jaane Na | A.R. Rahman | Rashid Ali",
    artist: "Jaane Tu Ya Jaane Na",
  },
  {
    videoId: "BrfRB6aTZlM",
    title:
      "A.R. Rahman - Roobaroo - Audio | Rang De Basanti | Aamir Khan | A. R. Rahman | Naresh Iyer",
    artist: "Rang De Basanti",
  },
  {
    videoId: "uB5bf7LQPVU",
    title: "The Local Train: Choo Lo (Home Demo)",
    artist: "The Local Train",
  },
  {
    videoId: "i96UO8-GFvw",
    title: "The Local Train - Aaoge Tum Kabhi (Official)",
    artist: "The Local Train",
  },
  {
    videoId: "eY62RfeviuE",
    title:
      "Sinbad The Sailor | Rock On | Farhan Akhtar, Raman Mahadevan | Shankar-Ehsaan-Loy",
    artist: "Rock On",
  },
  {
    videoId: "c6riJnK_AVs",
    title: "Rasta Jahaan Le Chale",
    artist: "Bombay Velvet",
  },
  {
    videoId: "sV_sz8TF7kg",
    title:
      "Shimla Tha Ghar | Deepak Rathore Project | Latest Hindi Songs 2016 | Speed Records",
    artist: "Deepak Rathore Project",
  },
  {
    videoId: "MDwVsoIen3k",
    title:
      "Dariya - Lyrical Video | Baar Baar Dekho | Sidharth Malhotra & Katrina Kaif | Arko",
    artist: "Baar Baar Dekho",
  },
  {
    videoId: "yUu26tcUri0",
    title:
      "Gajendra Verma - Tune Mere Jaana Kabhi Nahi Jaana I Emptiness | Gajendra Verma Songs | Sonotek Music",
    artist: "Gajendra Verma",
  },
  {
    videoId: "__qkzfWhi6g",
    title: "Shaan - Tanha Dil",
    artist: "Shaan",
  },
  {
    videoId: "V0FotIwYhMw",
    title: '"Hawa Hawai" Shaitan Movie Full Video Song | Kalki Koechlin',
    artist: "Shaitan",
  },
  {
    videoId: "Zqv5CBWt9yA",
    title: "Bhuvan Bam- Safar | Official Music Video |",
    artist: "Bhuvan Bam",
  },
  {
    videoId: "jcV7i0WM9jU",
    title:
      "Lo Safar Song With Lyrics | Baaghi 2 | Tiger Shroff | Disha Patani | Jubin Nautiyal",
    artist: "Baaghi 2",
  },
  {
    videoId: "ttIKsnxPrMY",
    title:
      "ROCKSTAR: Nadaan Parinde (Full Song) | Ranbir Kapoor | A. R. Rahman | Mohit Chauhan | Irshaad Kamil",
    artist: "Rockstar",
  },
  {
    videoId: "x42dH5K_Lj0",
    title:
      "Notebook: Safar Video | Zaheer Iqbal & Pranutan Bahl | Mohit Chauhan | Vishal Mishra",
    artist: "Notebook",
  },
  {
    videoId: "aZngT1Eas4w",
    title:
      "Hai Junoon Song | New York | John Abraham, Katrina Kaif, Neil Nitin Mukesh | KK | Pritam | है जुनून",
    artist: "New York",
  },
  {
    videoId: "hnswwRWLi3E",
    title:
      "A.R. Rahman - Khalbali Best Video|Rang De Basanti|Aamir Khan|Siddharth|Soha|Nacim",
    artist: "Rang De Basanti",
  },
  {
    videoId: "Z_-lSJg52NU",
    title:
      "Namo Namo - Full Audio | Kedarnath | Sushant Rajput | Sara Ali Khan | Amit Trivedi | Amitabh B",
    artist: "Kedarnath",
  },
  {
    videoId: "hsTQKwZEMQE",
    title:
      "Chor Bazari | Full Audio Song | Love Aaj Kal | Saif Ali Khan & Deepika Padukone",
    artist: "Love Aaj Kal",
  },
  {
    videoId: "tFDDcUi7hrI",
    title:
      "Tu Chale Toh - Full Video | Qarib Qarib Singlle | Irrfan | Parvathy | Papon | Rochak Kohli",
    artist: "Qarib Qarib Singlle",
  },
].map((track) => ({
  title: track.title.split("|")[0].trim(),
  artist: track.artist,
  src: `https://www.youtube.com/watch?v=${track.videoId}`,
  // Automatically generate the YouTube thumbnail URL:
  thumbnail: `https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`,
}));

export default function Page() {
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason &&
        typeof event.reason.message === "string" &&
        event.reason.message.includes(
          "The play() request was interrupted by a call to pause()",
        )
      ) {
        event.preventDefault(); // Silences the YouTube iframe AbortError warning entirely
      }
    };

    window.addEventListener("unhandledrejection", handleRejection);
    return () =>
      window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  // Whether the visitor has "boarded" — this first tap is what lets the
  // hidden YouTube player actually start audio. Browsers block autoplay
  // with sound until there's been a real user gesture, so instead of
  // fighting that, we make the gesture part of the theme.
  const [boarded, setBoarded] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // This tracks the progress (0 to 1)
  const [stationIndex, setStationIndex] = useState(0);
  const [volume, setVolume] = useState(68);
  const [ambientOpen, setAmbientOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [chai, setChai] = useState(0);
  const [notice, setNotice] = useState("");
  const [isNight, setIsNight] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  // Animation states
  const [floatingChais, setFloatingChais] = useState<
    { id: number; x: number }[]
  >([]);
  const [isStopped, setIsStopped] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const audioContext = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const playerRef = useRef<any>(null);

  const currentStation = stations[stationIndex];

  // Mobile-friendly clock
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = () => setReduceMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (!boarded) return;
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      }
      if (event.key.toLowerCase() === "m") setMuted((value) => !value);
      if (event.key.toLowerCase() === "a") setAmbientOpen((value) => !value);
      if (event.key === "ArrowRight") changeStation(1);
      if (event.key === "ArrowLeft") changeStation(-1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boarded, playing, stationIndex]);

  function clickSound() {
    try {
      const AudioCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtor) return;
      const context = audioContext.current ?? new AudioCtor();
      audioContext.current = context;
      if (context.state === "suspended") context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 520;
      gain.gain.setValueAtTime(0.035, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.07);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.07);
    } catch {
      // Audio is an optional enhancement
    }
  }

  function tell(message: string) {
    setNotice(message);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setNotice(""), 2600);
  }

  function handleBoard() {
    clickSound();
    setBoarded(true);
    setIsStopped(false);
    setPlaying(true);
    tell(`Now playing: ${currentStation.title}`);
  }

  function togglePlay() {
    clickSound();
    setIsStopped(false);
    setPlaying((value) => !value);
  }

  function handleChaiClick() {
    clickSound();
    setChai((value) => value + 1);
    tell("Chai is on the way.");

    // Floating chai animation
    const id = Date.now();
    const randomX = Math.random() * 40 - 20;
    setFloatingChais((prev) => [...prev, { id, x: randomX }]);

    setTimeout(() => {
      setFloatingChais((prev) => prev.filter((item) => item.id !== id));
    }, 2000);
  }

  function handleChainPull() {
    if (!boarded || isPulling) return;
    clickSound();

    // The pull animation and the pause happen together — the chain
    // yanking down IS what silences the music, not a side effect of it.
    setIsPulling(true);
    setPlaying(false);
    tell("Chain pulled. The train is stopped.");

    setIsStopped(true);
    setTimeout(() => setIsPulling(false), 650);
    setTimeout(() => setIsStopped(false), 3500);
  }

  function changeStation(direction: number) {
    clickSound();
    setPlaying(false); // 1. Briefly pause

    setTimeout(() => {
      setStationIndex(
        (index) => (index + direction + stations.length) % stations.length,
      );
      setPlaying(true); // 2. Resume playing after the state update
      tell(
        `Tuned to: ${stations[(stationIndex + direction + stations.length) % stations.length].title}`,
      );
    }, 100); // Small 100ms delay gives the DOM time to acknowledge the change
  }

  function selectStation(index: number) {
    if (!boarded || index === stationIndex) return;
    clickSound();
    setIsStopped(false);
    setStationIndex(index);
    setPlaying(true);
    tell(`Tuned to: ${stations[index].title}`);
  }

  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === "string" && args[0].includes("widgetapi")) {
        return; // Ignore the YouTube noise
      }
      originalConsoleError(...args);
    };
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <main
      className={`sleeper-app relative w-full h-[100dvh] overflow-hidden ${isNight ? "night-mode" : ""}`}
    >
      <div
        className="grain absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Emergency stop red flashing overlay */}
      {isStopped && (
        <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none z-30 mix-blend-overlay" />
      )}

      {/* HEADER */}
      <header className="topbar absolute top-0 w-full z-50 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:py-4 bg-gradient-to-b from-black/80 sm:from-black/60 to-transparent text-white">
        <div className="station-time text-xs sm:text-sm font-medium tracking-widest uppercase whitespace-nowrap bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {currentTime || "8:54 PM"}
        </div>

        <div className="top-actions flex items-center justify-end gap-1 sm:gap-2">
          <a
            className="platform-link spotify-link items-center justify-center w-9 h-9 sm:w-10 sm:h-10 hover:text-green-400 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 active:scale-95 hidden sm:flex"
            href="https://open.spotify.com/playlist/3IpDoXyKOPgxJvUJYsagyM"
            target="_blank"
            rel="noreferrer"
            aria-label="Spotify"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.72 12.9c.36.181.54.78.241 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </a>
          <a
            className="platform-link youtube-link items-center justify-center w-9 h-9 sm:w-10 sm:h-10 hover:text-red-500 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 active:scale-95 hidden sm:flex"
            href="https://music.youtube.com"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube Music"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.16c-3.954 0-7.16-3.206-7.16-7.16 0-3.954 3.206-7.16 7.16-7.16 3.954 0 7.16 3.206 7.16 7.16 0 3.954-3.206 7.16-7.16 7.16zM9.545 7.979v8.042l7.636-4.021-7.636-4.02z" />
            </svg>
          </a>

          <button
            className="top-icon flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 active:scale-95"
            aria-label="Open about and FAQ"
            onClick={() => {
              clickSound();
              setAboutOpen(true);
              setAmbientOpen(false);
            }}
          >
            <Info size={20} />
          </button>
        </div>
      </header>

      {/* HIDDEN YOUTUBE PLAYER (saloon.wtf trick — zero-size iframe, audio only) */}
      {/*
          react-player v3 renamed a few things from v2, which is why audio
          wasn't playing before:
            - the prop is `src`, not `url`
            - there's no `onBuffer`/`onBufferEnd` anymore — the real events
              are the native media ones, `onWaiting` and `onPlaying`
            - `config` is intentionally left out below: an inline object
              literal gets a new reference on every render, and passing a
              fresh object into the player on every re-render is what was
              causing the "play() request was interrupted by pause()"
              warning as the player kept re-settling. `playsInline` is a
              first-class prop now, so we don't need config for that.
        */}
      {/* 
   By using the station index as a 'key', Next.js will completely 
   destroy the old player and create a new one every time you switch stations, 
   which prevents the widgetapi from getting confused. 
*/}
      {/* HIDDEN YOUTUBE PLAYERS */}
      <div className="hidden">
        {/* Main Music Player */}
        <ReactPlayer
          key={stationIndex}
          ref={playerRef}
          src={currentStation.src}
          playing={playing && boarded}
          volume={muted ? 0 : volume / 100}
          muted={muted}
          playsInline
          width="0"
          height="0"
          loop
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onEnded={() => changeStation(1)}
          onError={(e: any) => console.warn("Music Player error:", e)}
        />
      </div>

      {/* BACKGROUND SCENE — the title lives inside bg.png already, so no text is layered on top here */}
      <section
        className="window-scene w-full h-full relative z-0 overflow-hidden"
        aria-label="A moving view from an Indian Railways sleeper coach"
      >
        <div
          className={`scene-motion absolute -inset-2 -z-10 ${reduceMotion ? "" : "animate-train-drift"}`}
        >
          <Image
            src={bgImage}
            alt="Sleeper Class Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-black/10 -z-10" />

        {/* A pole light sweeping past, like the ones you catch through a train window at night */}
        {!reduceMotion && (
          <div
            className="light-sweep absolute inset-0 -z-[5] pointer-events-none animate-light-sweep"
            aria-hidden="true"
          />
        )}
      </section>

      {/* EMERGENCY CHAIN */}
      <button
        className={`chain-wrap absolute right-2 sm:right-6 top-[22%] sm:top-1/3 z-40 flex flex-col items-center scale-90 sm:scale-100 group transition-transform duration-300 ${
          isStopped && !isPulling ? "translate-y-3" : ""
        } ${!isPulling && !isStopped ? "hover:scale-105 active:scale-95" : ""} ${
          boarded ? "" : "opacity-40 pointer-events-none"
        }`}
        aria-label="Pull emergency chain to stop the music"
        aria-disabled={!boarded}
        onClick={handleChainPull}
      >
        <span
          className={`chain-handle origin-top bg-red-600/90 backdrop-blur-md border border-red-400/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded group-hover:bg-red-500 transition-colors ${
            isPulling && !reduceMotion ? "animate-chain-handle" : ""
          }`}
        >
          STOP
        </span>
        <span
          className={`chain-line origin-top w-1.5 h-14 sm:h-24 bg-gradient-to-b from-red-800 to-red-900 shadow-inner ${
            isPulling && !reduceMotion ? "animate-chain-pull" : ""
          }`}
        />
      </button>

      {/* PLAYER DOCK */}
      <section
        className="player-dock absolute bottom-0 w-full z-50 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 px-3 sm:px-10 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:pb-8 pt-8 sm:pt-12 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-white"
        aria-label="Audio player"
      >
        {/* Left: track info */}
        <div className="flex items-center gap-3 sm:gap-4 w-full md:flex-1 justify-center md:justify-start">
          <div className="artwork-container w-12 h-12 flex-shrink-0 relative hidden sm:block">
            {/* The Disk Container */}
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-lg relative bg-black flex items-center justify-center">
              {/* The Spinning Image */}
              <img
                src={currentStation.thumbnail}
                alt={currentStation.title}
                className={`w-full h-full object-cover ${playing ? "animate-spin-slow" : "paused"}`}
                style={{
                  display: "block",
                  objectFit: "cover",
                }}
              />

              {/* The Center Hole (Perfectly Centered) */}
              <div className="absolute w-3 h-3 bg-[#171126] rounded-full border border-white/20 shadow-inner z-10" />
            </div>
          </div>
          <div className="track-info flex flex-col items-start text-left min-w-0">
            <strong className="text-sm sm:text-base font-semibold tracking-wide flex items-center gap-2 truncate max-w-[60vw] sm:max-w-xs">
              <span
                className={`w-2 h-2 flex-shrink-0 rounded-full ${
                  playing && boarded
                    ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"
                    : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                }`}
              ></span>
              <span className="truncate">{currentStation.title}</span>
            </strong>
            <span className="text-xs text-gray-400 mt-0.5 truncate">
              {isBuffering && boarded ? "Tuning in…" : currentStation.artist}
            </span>
          </div>
        </div>

        {/* Center: Transport Controls + Playback Line */}
        <div className="transport flex flex-col items-center gap-3 w-full md:flex-1">
          <div className="flex items-center gap-6">
            <button
              aria-label="Previous Station"
              className="hover:bg-white/10 p-2 rounded-full transition-colors active:scale-95"
              onClick={() => changeStation(-1)}
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button
              className="play-button w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => {
                clickSound();
                setPlaying(!playing);
              }}
            >
              {playing ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-1" />
              )}
            </button>
            <button
              aria-label="Next Station"
              className="hover:bg-white/10 p-2 rounded-full transition-colors active:scale-95"
              onClick={() => changeStation(1)}
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>

          {/* The Playback Progress Line */}
          <div className="w-full max-w-[200px] h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-300 transition-all duration-300 ease-linear"
              style={{ width: `${played * 100}%` }}
            />
          </div>
        </div>
        {/* Right: volume + chai */}
        <div className="sound-controls flex items-center justify-between md:justify-end gap-2 sm:gap-4 w-full md:flex-1 px-1 sm:px-0">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button
              aria-label={muted ? "Unmute" : "Mute"}
              className="hover:bg-white/10 p-2 rounded-full transition-colors active:scale-95 flex-shrink-0"
              onClick={() => {
                clickSound();
                setMuted((v) => !v);
              }}
            >
              {muted || volume === 0 ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>
            <input
              aria-label="Volume"
              type="range"
              min="0"
              max="100"
              className="w-16 xs:w-20 sm:w-28 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-300"
              value={muted ? 0 : volume}
              onChange={(event) => {
                setVolume(Number(event.target.value));
                setMuted(false);
              }}
            />
          </div>

          <div className="flex items-center gap-3 relative flex-shrink-0">
            {floatingChais.map((cup) => (
              <div
                key={cup.id}
                className="absolute text-xl pointer-events-none animate-out fade-out slide-out-to-top-12 duration-1000 ease-out z-20"
                style={{
                  left: "50%",
                  bottom: "100%",
                  transform: `translateX(calc(-50% + ${cup.x}px))`,
                }}
              >
                ☕
              </div>
            ))}

            <button
              className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
              onClick={handleChaiClick}
            >
              <span className="text-orange-300 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                ₹
              </span>
              <span className="tracking-wide hidden xs:inline">Chai</span>
              <span className="flex items-center justify-center bg-black/30 px-2 py-0.5 rounded-full text-[10px] font-bold border border-white/10 shadow-inner group-hover:bg-black/50 transition-colors duration-300">
                × {chai}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT MODAL */}
      {aboutOpen && (
        <div
          className="modal-backdrop fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setAboutOpen(false)}
        >
          <section
            className="about-modal bg-black/85 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full max-h-[85vh] overflow-y-auto text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors active:scale-95"
              aria-label="Close about"
              onClick={() => setAboutOpen(false)}
            >
              <X size={24} />
            </button>
            <span className="eyebrow text-[10px] uppercase tracking-widest opacity-60">
              est. somewhere between stations
            </span>
            <h2
              id="about-title"
              className="text-2xl font-bold font-devanagari mt-2 mb-4 pr-8"
            >
              SleeperClass
              <span className="text-orange-300 text-lg font-sans">.wtf</span>
            </h2>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              A quiet internet radio for long train journeys, window seats, and
              the strange peace of watching India go by.
            </p>
            <div className="faq-list flex flex-col gap-4">
              <details open className="border-b border-white/10 pb-4">
                <summary className="font-semibold cursor-pointer mb-2 hover:text-orange-200 transition-colors">
                  What is SleeperClass?
                </summary>
                <p className="text-sm opacity-70 mt-2">
                  Ambient music and a digital Indian sleeper coach for
                  late-night listening.
                </p>
              </details>
              <details className="border-b border-white/10 pb-4">
                <summary className="font-semibold cursor-pointer mb-2 hover:text-orange-200 transition-colors">
                  Keyboard shortcuts
                </summary>
                <p className="text-sm opacity-70 mt-2">
                  Space to play or pause, M to mute, A for the ambient mixer,
                  and the left/right arrows to change stations.
                </p>
              </details>
            </div>
          </section>
        </div>
      )}

      {/* BOARDING OVERLAY — the required first tap that starts playback on landing */}
      {!boarded && (
        <div className="boarding-overlay absolute inset-0 z-[80] flex flex-col items-center justify-center text-center px-6 bg-black/70 backdrop-blur-md">
          <span className="eyebrow text-[10px] sm:text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
            platform 1 · departing now
          </span>
          <p className="text-sm sm:text-base text-white/70 max-w-sm mb-8 leading-relaxed">
            A quiet radio for the journey ahead. Tap to board and the first
            station starts playing.
          </p>
          <button
            className="board-button flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-medium tracking-wide hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.12)]"
            onClick={handleBoard}
            autoFocus
          >
            <TrainFront size={20} />
            Board the train
          </button>
          <span className="text-xs text-white/40 mt-4">
            {currentStation.title} · {currentStation.artist}
          </span>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div
        className={`toast fixed left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/20 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium z-[100] max-w-[90vw] text-center whitespace-nowrap overflow-hidden text-ellipsis shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          notice
            ? "top-[max(5rem,calc(env(safe-area-inset-top)+4.5rem))] opacity-100 scale-100"
            : "top-10 sm:top-14 opacity-0 scale-95 pointer-events-none"
        }`}
        aria-live="polite"
      >
        <span className="tracking-wide truncate">{notice}</span>
      </div>

      <style jsx>{`
        /* Slow drift + gentle zoom so the window view feels like it's
            passing by rather than sitting still. Small enough that the
            -inset-2 buffer on .scene-motion never exposes an edge. */
        @keyframes train-drift {
          0% {
            transform: translate3d(0, 0, 0) scale(1.04);
          }
          50% {
            transform: translate3d(-1.1%, -0.4%, 0) scale(1.07);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1.04);
          }
        }
        .animate-train-drift {
          animation: train-drift 26s ease-in-out infinite;
          will-change: transform;
        }

        /* A soft diagonal light passing across the window, like a
            platform lamp or level crossing catching the glass. */
        .light-sweep {
          background: linear-gradient(
            75deg,
            transparent 42%,
            rgba(255, 226, 170, 0.16) 48%,
            rgba(255, 226, 170, 0.28) 50%,
            rgba(255, 226, 170, 0.16) 52%,
            transparent 58%
          );
          background-size: 300% 100%;
          background-position: 130% 0;
        }
        @keyframes light-sweep {
          0%,
          70% {
            background-position: 130% 0;
          }
          85% {
            background-position: -30% 0;
          }
          100% {
            background-position: -30% 0;
          }
        }
        .animate-light-sweep {
          animation: light-sweep 9s ease-in infinite;
        }

        /* Chain handle jerks down and settles */
        @keyframes chain-handle-pull {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(10px) rotate(-3deg);
          }
          45% {
            transform: translateY(14px) rotate(2deg);
          }
          65% {
            transform: translateY(6px) rotate(-1deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .animate-chain-handle {
          animation: chain-handle-pull 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Chain line stretches taut, then snaps back with a little overshoot */
        @keyframes chain-line-pull {
          0% {
            transform: scaleY(1);
          }
          30% {
            transform: scaleY(1.32);
          }
          55% {
            transform: scaleY(0.94);
          }
          75% {
            transform: scaleY(1.06);
          }
          100% {
            transform: scaleY(1);
          }
        }
        .animate-chain-pull {
          animation: chain-line-pull 0.65s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-train-drift,
          .animate-light-sweep,
          .animate-chain-handle,
          .animate-chain-pull {
            animation: none;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }

        /* This pauses the spinning when the music is paused */
        .paused {
          animation-play-state: paused;
        }
        .artwork img {
          display: block;
          min-width: 100%;
          min-height: 100%;
          max-width: none;
        }
        .artwork-container img {
          object-position: center center;
        }
      `}</style>
    </main>
  );
}
