"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Noto_Sans_Devanagari } from "next/font/google";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as any;

// Assuming the updated 9:16 vertical rain image is saved as bg.png
import bgImage from "../assets/bg.png";
import mobileBgImage from "../assets/bgmobile.png"; // Your new 9:16 mobile image
import RainEffect from "@/components/RainEffect";
// Load the Devanagari font for the massive headline
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["800"],
  display: "swap",
});

const stations = [
  {
    videoId: "fbx6ULRrhXg",
    title: "AMBARSARIYA",
    artist: "Sona Mohapatra",
  },
  {
    videoId: "piUHBTXsoiY",
    title: "Raabta",
    artist: "Pritam",
  },
  {
    videoId: "r9eGi0rVxBw",
    title: "KABHI KABHI ADITI",
    artist: "Rashid Ali Warbartan",
  },
  {
    videoId: "3E1NLVzDZ_Y",
    title: "Tujh Mein Rab Dikhta Hai",
    artist: "Roop Kumar Rathod",
  },
  {
    videoId: "InD68CDGT9Q",
    title: "Mast Magan",
    artist: "Arijit Singh",
  },
  {
    videoId: "cK9h5PVzRpk",
    title: "GUZARISH",
    artist: "Javed Ali",
  },
  {
    videoId: "3chj4ooasmE",
    title: "Mere Bina",
    artist: "Pritam",
  },
  {
    videoId: "bdS6OoH1W2A",
    title: "Ajab Si",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "1q65CU2JoXg",
    title: "Iktara",
    artist: "Amit Trivedi",
  },
  {
    videoId: "LQzByGZHiQ8",
    title: "Tum Jo Aaye",
    artist: "Pritam",
  },
  {
    videoId: "o-9VdyXZKsQ",
    title: "Tujhe Bhula Diya",
    artist: "Mohit Chauhan",
  },
  {
    videoId: "FYHKeHYlVA4",
    title: "Pee Loon",
    artist: "Pritam",
  },
  {
    videoId: "qH1eRWlJpsY",
    title: "KABHI JO BAADAL BARSE",
    artist: "Arijit Singh",
  },
  {
    videoId: "5IX-nUxDtJI",
    title: "Bin Tere",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "aG7MaqtWxT8",
    title: 'Khuda Jaane (From "Bachna Ae Haseeno")',
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "AsieVqOTRs0",
    title: "Mitwa",
    artist: "Shankar Ehsaan Loy",
  },
  {
    videoId: "gLBoyzFnAdE",
    title: "Haule Haule",
    artist: "Sukhwinder Singh",
  },
  {
    videoId: "crrHSFnM3ic",
    title: "LONDON THUMAKDA",
    artist: "Labh Janjua",
  },
  {
    videoId: "pwKmLIPvEjI",
    title: "Badtameez Dil",
    artist: "Shefali Alvares",
  },
  {
    videoId: "lSPNH_rYKIg",
    title: "Ilahi",
    artist: "Amitabh Bhattacharya",
  },
  {
    videoId: "ELZYwzTPUw4",
    title: "TUMSE MILKE DIL KA",
    artist: "Sonu Nigam",
  },
  {
    videoId: "jitmi9o3As8",
    title: "Tu Meri",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "ZCRL8V0ZkEA",
    title: "Ishq Bulaava",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "vmzbVgLShEw",
    title: "Ladki Badi Anjani Hai",
    artist: "Jatin Lalit",
  },
  {
    videoId: "-ePF1m7yw8U",
    title: "Galat Baat Hai",
    artist: "Neeti Mohan",
  },
  {
    videoId: "d_QDYIJSkB8",
    title: "Ye Ishq Hai",
    artist: "Pritam",
  },
  {
    videoId: "mUisIKGTkVw",
    title: "Ishq Wala Love",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "r6yFwzExp0w",
    title: "Bahara",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "TiP72S9tf7o",
    title: "Teri Meri Kahaani",
    artist: "Arijit Singh",
  },
  {
    videoId: "t6t3i8SBbIM",
    title: "Saathiyaa",
    artist: "Shreya Ghoshal",
  },
  {
    videoId: "xteZNX3B4yA",
    title: "TUSE MILKE DIL KA HAI JO HAAL",
    artist: "Sonu Nigam",
  },
  {
    videoId: "d3nBjAuBmME",
    title: "Balam Pichkari",
    artist: "Release",
  },
  {
    videoId: "ykWgSGsZyeo",
    title: "RABBA",
    artist: "Mohit Chauhan",
  },
  {
    videoId: "PpiHfZbtQv8",
    title: "I Hate Luv Storys",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "D2t8buu_7tU",
    title: "SAADI GALLI AAJA",
    artist: "Ayushmann Khurrana",
  },
  {
    videoId: "eA7V16oogFA",
    title: "Zaroorat",
    artist: "Mustafa Zahid",
  },
  {
    videoId: "jgcSK3P6U8Q",
    title: "Kukkad",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "MoJVzTzixzs",
    title: "SALAAM-E-ISHQ",
    artist: "Sonu Nigam",
  },
  {
    videoId: "V9Rib9c61Zg",
    title: "Titli",
    artist: "Chinmayi",
  },
  {
    videoId: "JF7mC58X7_w",
    title: "DIL NA DIYA",
    artist: "Kunal Ganjawala",
  },
  {
    videoId: "Eoj4kxD9Tnk",
    title: "Locha-E-Ulfat",
    artist: "Benny Dayal",
  },
  {
    videoId: "VrIf8Rxssgc",
    title: "RAAT BHAR",
    artist: "Arijit Singh",
  },
  {
    videoId: "AQ5qWopu_uU",
    title: 'Sajdaa (From "My Name Is Khan")',
    artist: "Shankar Ehsaan Loy",
  },
  {
    videoId: "2g-p76-r33I",
    title: "Zehnaseeb",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "HWpZ_rOe_f0",
    title: "KAHIN TO",
    artist: "Vasundhara Das",
  },
  {
    videoId: "QSovkFvJW6k",
    title: "Bhare Naina",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "VzxX4AQkzZA",
    title: 'Tum Hi Ho Bandhu (From "Cocktail")',
    artist: "Neeraj Shridhar",
  },
  {
    videoId: "cB1jxbgf-Qs",
    title: "Ik Junoon (Paint It Red)",
    artist: "Vishal Dadlani",
  },
  {
    videoId: "reBEkYrqMhA",
    title: "Gerua",
    artist: "Pritam",
  },
  {
    videoId: "7Ayq6LPNISg",
    title: "Drama Queen",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "r_hiM42nGZM",
    title: "Bang Bang",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "gnrSX7TQJqU",
    title: "Sooraj Ki Baahon Mein",
    artist: "Release",
  },
  {
    videoId: "SDboZSHp-VM",
    title: "Give Me Some Sunshine",
    artist: "Suraj Jagan",
  },
  {
    videoId: "58jgsk7i3gQ",
    title: "Ghagra",
    artist: "Pritam",
  },
  {
    videoId: "zQp8QINWUnc",
    title: "Naina",
    artist: "Sona Mohapatra",
  },
  {
    videoId: "0780Oz21Qtc",
    title: "Dil Hi Toh Hai",
    artist: "Pritam",
  },
  {
    videoId: "0780Oz21Qtc",
    title: "Dil Hi Toh Hai",
    artist: "Pritam",
  },
  {
    videoId: "CL1d_4jgy-M",
    title: "Kashmir Main Tu Kanyakumari",
    artist: "Sunidhi Chauhan",
  },
  {
    videoId: "Jzdzi0WXaxM",
    title: "Dance Pe Chance",
    artist: "Sunidhi Chauhan",
  },
  {
    videoId: "yDWOp8ur90Q",
    title: "Aas Paas Khuda",
    artist: "Rahat Fateh Ali Khan",
  },
  {
    videoId: "BnYokCSJDfw",
    title: "ADHOORE",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "F7YIiGiCQmc",
    title: "Jiya Re",
    artist: "Neeti Mohan",
  },
  {
    videoId: "-UU9J-LbfB8",
    title:
      'Samjhawan (Unplugged by Alia Bhatt) (From "Humpty Sharma Ki Dulhania")',
    artist: "Jawad Ahmad",
  },
  {
    videoId: "P_mNFy_dfn4",
    title: "Deewangi Deewangi",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "_P2g7D_1f0s",
    title: "PEHLI BAAR",
    artist: "Sukriti Kakar",
  },
  {
    videoId: "2svlPehTRu0",
    title: "Kurbaan Hua",
    artist: "Salim Merchant",
  },
  {
    videoId: "2svlPehTRu0",
    title: "Kurbaan Hua",
    artist: "Salim Merchant",
  },
  {
    videoId: "1qz_5uzzo1s",
    title: "Gun Gun Guna",
    artist: "Ajay Gogavale",
  },
  {
    videoId: "4-mSFnXqcyc",
    title: "Mashallah",
    artist: "Sajid-Wajid",
  },
  {
    videoId: "3qzos9Xgvng",
    title: "Behti Hawa Sa Tha Woh",
    artist: "Shaan",
  },
  {
    videoId: "W_076ZN_n7A",
    title: 'Radha (From "Student of the Year")',
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "BYVj_e0faU0",
    title: "PAPPU CAN'T DANCE",
    artist: "Satish Chakravarthy",
  },
  {
    videoId: "qY66m8UosfQ",
    title: "Shanivaar Raati",
    artist: "Arijit Singh",
  },
  {
    videoId: "G9SOAHXDk64",
    title: "One Two Three Four (Get On The Dance Floor)",
    artist: "Vishal Dadlani",
  },
  {
    videoId: "S6DhdT0NAzI",
    title: "The Jawaani Song",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "WxXbLnBq0n0",
    title: "Aashiyan",
    artist: "Pritam",
  },
  {
    videoId: "t9o22bt6VU0",
    title: "Palat - Tera Hero Idhar Hai",
    artist: "Arijit Singh",
  },
  {
    videoId: "UFzBtouqWVA",
    title: "Uff",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "sxB4bCU0F60",
    title: "Zoobi Doobi",
    artist: "Sonu Nigam",
  },
  {
    videoId: "Qr0DCdRNQxI",
    title: "KOI TUMSA NAHIN",
    artist: "Sonu Nigam",
  },
  {
    videoId: "7KSgzG9kbw4",
    title: "Iski Uski",
    artist: "Akriti Kakar",
  },
  {
    videoId: "WP8KWkt4SbI",
    title: 'Bheegi Si Bhaagi Si (From "Raajneeti")',
    artist: "Pritam",
  },
  {
    videoId: "sKBKIY5p0Ds",
    title: "Tera Rastaa Chhodoon Na",
    artist: "Amitabh Bhattacharya",
  },
  {
    videoId: "I3tgyXQC38c",
    title: "Lucky Tu Lucky Me",
    artist: "Sachin-Jigar",
  },
  {
    videoId: "tYULFA8ijyo",
    title: "TERE BINAA",
    artist: "Mustafa Zahid",
  },
  {
    videoId: "c6cHxi2eLQ4",
    title: "Maa",
    artist: "Shankar Mahadevan",
  },
  {
    videoId: "Zhb5_y2KNEw",
    title: "Bezubaan Phir Se",
    artist: "Vishal Dadlani",
  },
  {
    videoId: "Qe18x3hETA0",
    title: "Meherbaan",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "QJpUAlbQk9Y",
    title: "Pal Pal Har Pal",
    artist: "Sonu Nigam",
  },
  {
    videoId: "MVwf8EmGv8A",
    title: 'Pani Da Rang Male (From "Vicky Donor")',
    artist: "Ayushmann Khurrana",
  },
  {
    videoId: "NmlURA07qGM",
    title: "Offo",
    artist: "Aditi Singh Sharma",
  },
  {
    videoId: "NRAvWDSxfl0",
    title: 'Senorita (From "Zindagi Na Milegi Dobara")',
    artist: "Farhan Akhtar",
  },
  {
    videoId: "4jKa2hewAkg",
    title: "Nagada Sang Dhol",
    artist: "Shreya Ghoshal",
  },
  {
    videoId: "YUfLJ68Jwyg",
    title: "Preet",
    artist: "Jasleen Royal",
  },
  {
    videoId: "xP8Ww4jkQoI",
    title: "Chammak Challo (International Version)",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "oYG2CScW5F4",
    title: "Tumse Hi Tumse",
    artist: "Shekhar Ravjiani",
  },
  {
    videoId: "ZOfOS2VykRc",
    title: "Anjaana Anjaani",
    artist: "Vishal Dadlani",
  },
  {
    videoId: "SwR0eJ92UR8",
    title: "Jab Se Tere Naina",
    artist: "Shani Kumar Saniya",
  },
  {
    videoId: "TIw-udUM8BU",
    title: "DIL DHADAKNE DO",
    artist: "Priyanka Chopra",
  },
  {
    videoId: "L0iuPXg0mCw",
    title: "Ratta Maar",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "g3icG9Zywew",
    title: "Pyaar Ki Yeh Kahani",
    artist: "Vishal - Shekhar",
  },
  {
    videoId: "vbW_zqQVZE0",
    title: 'Shukran Allah (From "Kurbaan")',
    artist: "Salim Merchant",
  },
  {
    videoId: "AbihV7qJXus",
    title: "Saans (Reprise)",
    artist: "Shreya Ghoshal",
  },
  {
    videoId: "L-DbeI3YCIA",
    title: "Tere Naina",
    artist: "Shankar Ehsaan Loy",
  },
  {
    videoId: "fWsq4-FvQ-M",
    title: 'Daaru Desi (From "Cocktail")',
    artist: "Benny Dayal",
  },
  {
    videoId: "JoSR1dSI2ds",
    title: "Blame The Night",
    artist: "Various Artists",
  },
  {
    videoId: "eJuWIKRtNns",
    title: "Galliyan",
    artist: "Ankit Tiwari",
  },
  {
    videoId: "yowTz2PFDV8",
    title: "Ek Main Aur Ekk Tu",
    artist: "Benny Dayal",
  },
  {
    videoId: "t2CHtFE8pMo",
    title: "Lahu Munh Lag Gaya",
    artist: "Shail Hada",
  },
  {
    videoId: "ZN7DcixuLw4",
    title: "Saiyaara Rebirth",
    artist: "Sohail Sen",
  },
  {
    videoId: "D94WSTI_UC0",
    title: "Allah Waariyan",
    artist: "Shafqat Amanat Ali",
  },
  {
    videoId: "37JjGXBPIOM",
    title: "Subhanallah",
    artist: "Pritam",
  },
  {
    videoId: "ONlxQMFmR4w",
    title: "Koi Mil Gaya.",
    artist: "Shurjo Bhattacharya",
  },
  {
    videoId: "97FJsWl_OGo",
    title: "Om Shanti Om",
    artist: "Meditative Mind",
  },
  {
    videoId: "chRtu8DrGs8",
    title: "Pareshaan (Remix)",
    artist: "Shalmali Kholgade",
  },
  {
    videoId: "FrdRpJoRRT4",
    title: "Tattad Tattad",
    artist: "Aditya Narayan",
  },
  {
    videoId: "S9uSPpNZ8DA",
    title: "Laapata Rebirth",
    artist: "Sohail Sen",
  },
  {
    videoId: "r8xqL2gbmvQ",
    title: "Besharmi Ki Height",
    artist: "Benny Dayal",
  },
  {
    videoId: "tny8p29M7J0",
    title: "Ash King - Aunty JI (Live)",
    artist: "T & A Photography & Media",
  },
  {
    videoId: "MZkrcUzJANQ",
    title: "Kabira",
    artist: "Pritam",
  },
  {
    videoId: "BLXISeAXD04",
    title: "Subha Hone Na De",
    artist: "Pritam",
  },
  {
    videoId: "BoJlxXq_2NI",
    title: "Vishal-Shekhar.......Tara Rum Pum",
    artist: "nehasareen",
  },
  {
    videoId: "O1tz7vhtul8",
    title: "Raabta",
    artist: "Pritam",
  },
  {
    videoId: "cyFydLrAeiU",
    title: "I Love You",
    artist: "Pritam",
  },
  {
    videoId: "RsokTAWqsc0",
    title: "Shafqat Amanat Ali - Dildaara (Stand By Me) [Full HD]",
    artist: "Radiozamana",
  },
  {
    videoId: "afJZDEvMCZE",
    title: "Dilli Wali Girlfriend",
    artist: "Norbu Tshering",
  },
  {
    videoId: "nOSUza1b424",
    title: "Tu Jo Mila",
    artist: "Pritam",
  },
  {
    videoId: "3i-hpM7x2f4",
    title: "Salim suleiman concert daman - Aadat se majboor",
    artist: "Chintak Shah",
  },
  {
    videoId: "egSGtA7ixt8",
    title: "Main Rang Sharbaton Ka / Sunday Morning",
    artist: "Penn Masala",
  },
  {
    videoId: "aZkT2qQgoCs",
    title: "Sharib-Toshi | Saturday Saturday | Live Performance",
    artist: "BlueNote Entertainment",
  },
  {
    videoId: "qzDTpyd6IMI",
    title: "Banjaara Hd sohail; songs",
    artist: "Sohail Khan",
  },
  {
    videoId: "3CCbZwgaQss",
    title: "Pritam abcd m",
    artist: "Hira bhai Hira bhai",
  },
  {
    videoId: "E6gDUyD8tnU",
    title: "Kabra Nu Challa",
    artist: "Yad sharma",
  },
  {
    videoId: "lJjlONBpxS4",
    title: "Chand Sifarish",
    artist: "L3AD",
  },
].map((track) => ({
  title: track.title.split("|")[0].trim(),
  artist: track.artist,
  src: `https://www.youtube.com/watch?v=${track.videoId}`,
  thumbnail: `https://img.youtube.com/vi/${track.videoId}/hqdefault.jpg`,
}));
export default function Page() {
  const [boarded, setBoarded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [stationIndex, setStationIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const audioContext = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const playerRef = useRef<any>(null);

  const currentStation = stations[stationIndex];

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
    const timer = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);
  // Supress React Player AbortError noise
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason &&
        typeof event.reason.message === "string" &&
        event.reason.message.includes("The play() request was interrupted")
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", handleRejection);
    return () =>
      window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!boarded) return;
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      }
      if (event.key === "ArrowRight") changeStation(1);
      if (event.key === "ArrowLeft") changeStation(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [boarded, playing, stationIndex]);

  function clickSound() {
    try {
      const AudioCtor =
        window.AudioContext || (window as any).webkitAudioContext;
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
    setPlaying(true);
    tell(`Now playing: ${currentStation.title}`);
  }

  function togglePlay() {
    clickSound();
    setPlaying((value) => !value);
  }

  function changeStation(direction: number) {
    clickSound();
    setPlaying(false);
    setTimeout(() => {
      const nextIndex =
        (stationIndex + direction + stations.length) % stations.length;
      setStationIndex(nextIndex);
      setPlaying(true);
      tell(`Tuned to: ${stations[nextIndex].title}`);
    }, 100);
  }

  return (
    <main className="h-[100dvh] w-screen overflow-hidden relative selection:bg-[#dc2626] selection:text-white bg-[#0a0a0a] text-[#ededed] font-sans">
      {/* Background Component */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Desktop Background (Hidden on mobile, visible on medium+ screens) */}
        <Image
          src={bgImage}
          alt="South Asian street station scene at night"
          fill
          priority
          className="object-cover object-center opacity-80 hidden md:block"
        />
        {/* Mobile Background (Visible on mobile, hidden on medium+ screens) */}
        <Image
          src={mobileBgImage}
          alt="South Asian street station scene at night (Vertical)"
          fill
          priority
          className="object-cover object-center opacity-80 block md:hidden"
        />

        <RainEffect />
        {/* Gradient Overlay for player legibility */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-black/40 to-black/95"></div>
      </div>

      {/* Hidden YouTube Player */}
      <div className="hidden">
        <ReactPlayer
          key={stationIndex}
          ref={playerRef}
          src={currentStation.src}
          playing={playing && boarded}
          volume={1} // Defaulting to full volume
          playsInline
          width="0"
          height="0"
          loop
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onEnded={() => changeStation(1)}
        />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-[24px] py-[24px]">
        {/* Top Navigation Bar */}
        {/* Top Navigation Bar */}
        <header className="relative z-50 flex items-center justify-between w-full pt-[max(1rem,env(safe-area-inset-top))]">
          {/* Left Side: Time and Online Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Time Badge */}
            <div className="bg-transparent px-[12px] py-[8px]">
              <span className="text-[#ffffff] text-[12px] sm:text-[14px] font-[500] tracking-wide whitespace-nowrap">
                {currentTime || "12:00 PM"}
              </span>
            </div>

            {/* Status Badge: Online (Text hides on very small screens to save space) */}
            <div className="flex items-center gap-[6px] bg-transparent border border-white/20 rounded-[9999px] px-[10px] sm:px-[14px] py-[8px] backdrop-blur-md">
              <div className="w-2.5 h-2.5 flex-shrink-0 rounded-[9999px] bg-[#4ade80] shadow-[0_0_8px_0_rgba(74,222,128,0.9)] animate-pulse"></div>
              <span className="text-[#ffffff] text-[12px] sm:text-[14px] font-[500] leading-[20px] whitespace-nowrap hidden sm:inline">
                104 online
              </span>
            </div>
          </div>

          {/* External Links */}
          <nav className="flex items-center gap-[16px] sm:gap-[22px] mr-[max(0.5rem,env(safe-area-inset-right))]">
            <a
              href="https://open.spotify.com/playlist/0rXkrKD5eOVn4sVdOqceCx"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-[8px] text-[#ffffff] font-[500] bg-transparent hover:opacity-80 transition-opacity"
              aria-label="Spotify"
            >
              {/* Text hidden on mobile (sm breakpoint) */}
              <span className="hidden sm:inline text-[14px]">Spotify</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-spotify"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
              </svg>
            </a>

            <a
              href="https://music.youtube.com/watch?v=Mmu-tj-psuk"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-[8px] text-[#ffffff] font-[500] bg-transparent hover:opacity-80 transition-opacity"
              aria-label="YouTube Music"
            >
              {/* Text hidden on mobile (sm breakpoint) */}
              <span className="hidden sm:inline text-[14px]">YT Music</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-youtube"
                viewBox="0 0 16 16"
              >
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
              </svg>
            </a>
          </nav>
        </header>

        {/* Hero Display Headline */}

        {/* Floating Music Player Card */}
        <div className="flex justify-center pb-[max(3rem,env(safe-area-inset-bottom))]">
          <div className="group bg-[rgba(0,0,0,0.55)] hover:bg-[rgba(0,0,0,0.7)] backdrop-blur-xl rounded-[9999px] shadow-[0_8px_40px_0_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.15)] hover:shadow-[0_12px_50px_0_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.3)] border border-white/5 hover:border-white/20 transition-all duration-500 ease-out p-[8px_14px_8px_12px] flex items-center gap-[12px] w-[95%] max-w-[420px] relative overflow-hidden">
            {/* Subtle interactive progress line at the bottom (appears on hover) */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Album Art Thumbnail (Tactile Vinyl Effect) */}
            <div
              className={`group/vinyl w-[42px] h-[42px] rounded-[9999px] bg-[#1a1a1a] flex-shrink-0 overflow-hidden border ${playing ? "border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.15)]" : "border-white/10"} transition-all duration-500 relative flex items-center justify-center cursor-pointer`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentStation.thumbnail}
                alt="Cover"
                className={`w-full h-full object-cover group-hover/vinyl:scale-110 transition-transform duration-500 ${playing ? "animate-spin-slow" : "paused"}`}
              />
              {/* Vinyl Grooves Overlay */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
              {/* Center Hole */}
              <div className="absolute w-3.5 h-3.5 bg-[#0a0a0a] rounded-full border border-white/30 shadow-inner z-10 flex items-center justify-center">
                <div className="w-1 h-1 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Track Info */}
            <div className="flex flex-col flex-grow justify-center overflow-hidden pr-2">
              <div className="text-[#ffffff] text-[14px] font-[500] truncate leading-[20px] flex items-center gap-2">
                {isBuffering && boarded ? (
                  <span className="flex items-center gap-[3px] py-1">
                    <span
                      className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                ) : (
                  currentStation.title
                )}

                {/* Micro-interaction: Tiny pulsing equalizer when actively playing */}
                {playing && !isBuffering && (
                  <div className="flex items-end gap-[2px] h-[10px] ml-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span
                      className="w-[2px] bg-white rounded-t-sm h-[60%] animate-pulse"
                      style={{ animationDuration: "0.7s" }}
                    />
                    <span
                      className="w-[2px] bg-white rounded-t-sm h-[100%] animate-pulse"
                      style={{ animationDuration: "0.9s" }}
                    />
                    <span
                      className="w-[2px] bg-white rounded-t-sm h-[80%] animate-pulse"
                      style={{ animationDuration: "0.8s" }}
                    />
                  </div>
                )}
              </div>
              <div className="text-[#ededed] opacity-50 group-hover:opacity-90 transition-opacity duration-300 text-[11px] font-[400] truncate leading-[16.5px]">
                {currentStation.artist}
              </div>
            </div>

            {/* Transport Controls */}
            <div className="flex items-center gap-[6px] pr-[2px]">
              <button
                aria-label="Previous"
                onClick={() => changeStation(-1)}
                className="bg-transparent text-white/40 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-300 flex items-center justify-center active:scale-90"
              >
                <svg
                  className="w-[18px] h-[18px] fill-current transition-transform active:-translate-x-0.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                aria-label={playing ? "Pause" : "Play"}
                onClick={togglePlay}
                className="bg-[#ffffff] text-[#000000] rounded-[9999px] p-0 w-[38px] h-[38px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] group/btn"
              >
                {playing ? (
                  <svg
                    className="w-[16px] h-[16px] fill-current group-hover/btn:scale-90 transition-transform duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-[16px] h-[16px] fill-current ml-[3px] group-hover/btn:scale-110 transition-transform duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                aria-label="Next"
                onClick={() => changeStation(1)}
                className="bg-transparent text-white/40 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-300 flex items-center justify-center active:scale-90"
              >
                <svg
                  className="w-[18px] h-[18px] fill-current transition-transform active:translate-x-0.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Required Boarding Overlay (to allow autoplay) */}
      {!boarded && (
        <div className="absolute inset-0 z-[80] flex flex-col items-center justify-center px-6 bg-black/80 backdrop-blur-md">
          <button
            className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-white font-medium hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.12)]"
            onClick={handleBoard}
            autoFocus
          >
            Board the train
          </button>
        </div>
      )}

      {/* Toast Notice */}
      <div
        className={`toast fixed left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[rgba(0,0,0,0.6)] backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-sm font-[500] z-[100] max-w-[90vw] text-center whitespace-nowrap overflow-hidden text-ellipsis shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${notice ? "top-[max(5rem,calc(env(safe-area-inset-top)+4.5rem))] opacity-100 scale-100" : "top-14 opacity-0 scale-95 pointer-events-none"}`}
      >
        <span className="tracking-wide truncate">{notice}</span>
      </div>

      <style jsx>{`
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
        .paused {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  );
}
