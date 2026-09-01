import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
    deleteUser
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    collection, 
    writeBatch,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDocs,
    limit,
    query,
    deleteDoc
} from 'firebase/firestore';
import backgroundImage from './assets/bg.jpeg'; // Import the local background image
import avatar1 from './assets/avatar1.png';
import avatar2 from './assets/avatar2.png';
import avatar3 from './assets/avatar3.png';
import avatar4 from './assets/avatar4.png';
import avatar5 from './assets/avatar5.png';

// --- LOCAL POSTER IMPORTS ---
// Ensure you have these images in src/assets/posters/
import darkKnightPoster from './assets/posters/The Dark Knight.jpeg';
import inceptionPoster from './assets/posters/Inception.jpeg';
import pulpFictionPoster from './assets/posters/Pulp Fiction.jpeg';
import forrestGumpPoster from './assets/posters/Forrest Gump.jpeg';
import superbadPoster from './assets/posters/Superbad.jpeg';
import theConjuringPoster from './assets/posters/The Conjuring.jpeg';
import theMatrixPoster from './assets/posters/The Matrix.jpeg';
import gladiatorPoster from './assets/posters/Gladiator.jpeg';
import theHangoverPoster from './assets/posters/The Hangover.jpeg';
import theSilenceOfTheLambsPoster from './assets/posters/The Silence of the Lambs.jpeg';
import titanicPoster from './assets/posters/Titanic.jpeg';
import hereditaryPoster from './assets/posters/Hereditary.jpeg';
import bladeRunner2049Poster from './assets/posters/Blade Runner 2049.jpeg';
import johnWickPoster from './assets/posters/John Wick.jpeg';
import stepBrothersPoster from './assets/posters/Step Brothers.jpeg';
import se7enPoster from './assets/posters/Se7en.jpeg';
import theNotebookPoster from './assets/posters/The Notebook.jpeg';
import getOutPoster from './assets/posters/Get Out.jpeg';
import interstellarPoster from './assets/posters/Interstellar.jpeg';
import madMaxFuryRoadPoster from './assets/posters/Mad Max Fury Road.jpeg';
import threeIdiotsPoster from './assets/posters/3 Idiots.jpeg';
import dangalPoster from './assets/posters/Dangal.jpeg';
import kahaaniPoster from './assets/posters/Kahaani.jpeg';
import dilwaleDulhaniaLeJayengePoster from './assets/posters/DDLJ.jpeg';
import tumbbadPoster from './assets/posters/Tumbbad.jpeg';
import pkPoster from './assets/posters/PK.jpeg';
import lagaanPoster from './assets/posters/Lagaan.jpeg';
import zindagiNaMilegiDobaraPoster from './assets/posters/Zindagi Na Milegi Dobara.jpeg';
import aWednesdayPoster from './assets/posters/A Wednesday.jpeg';
import veerZaaraPoster from './assets/posters/Veer-Zaara.jpeg';
import bulbbulPoster from './assets/posters/Bulbbul.jpeg';
import cargoPoster from './assets/posters/Cargo.jpeg';
import sholayPoster from './assets/posters/Sholay.jpeg';
import heraPheriPoster from './assets/posters/Hera Pheri.jpeg';
import drishyamHindiPoster from './assets/posters/Drishyam.jpeg';
import jabWeMetPoster from './assets/posters/Jab We Met.jpeg';
import bhoolBhulaiyaaPoster from './assets/posters/Bhool Bhulaiyaa.jpeg';
import raOnePoster from './assets/posters/ra one.jpeg';
import warPoster from './assets/posters/War.jpeg';
import andhadhunPoster from './assets/posters/Andhadhun.jpeg';
import kgfChapter1Poster from './assets/posters/KGF 1.jpeg';
import luciaPoster from './assets/posters/Lucia.jpeg';
import uTurnPoster from './assets/posters/U-Turn.jpeg';
import mungaruMalePoster from './assets/posters/Mungaru Male.jpeg';
import kirikPartyPoster from './assets/posters/Kirik Party.jpeg';
import rangiTarangaPoster from './assets/posters/RangiTaranga.jpeg';
import ulidavaruKandanthePoster from './assets/posters/Ulidavaru Kandanthe.jpeg';
import avaneSrimannarayanaPoster from './assets/posters/Avane Srimannarayana.jpeg';
import kavaludaariPoster from './assets/posters/Kavaludaari.jpeg';
import diaPoster from './assets/posters/Dia.jpeg';
import thithiPoster from './assets/posters/Thithi.jpeg';
import sixFiveTwoPoster from './assets/posters/652.jpeg';
import kantaraPoster from './assets/posters/Kantara.jpeg';
import garudaGamanaVrishabhaVahanaPoster from './assets/posters/Garuda Gamana Vrishabha Vahana.jpeg';
import hostelHudugaruBekagiddarePoster from './assets/posters/Hostel Hudugaru Bekagiddare.jpeg';
import gultooPoster from './assets/posters/Gultoo.jpeg';
import loveMocktailPoster from './assets/posters/Love Mocktail.jpeg';
import mummyPoster from './assets/posters/Mummy.jpeg';
import nathicharamiPoster from './assets/posters/Nathicharami.jpeg';
import vikrantRonaPoster from './assets/posters/Vikrant Rona.jpeg';
import baahubaliTheBeginningPoster from './assets/posters/Baahubali The Beginning.jpeg';
import eegaPoster from './assets/posters/Eega.jpeg';
import arjunReddyPoster from './assets/posters/Arjun Reddy.jpeg';
import kshanamPoster from './assets/posters/Kshanam.jpeg';
import pelliChoopuluPoster from './assets/posters/Pelli Choopulu.jpeg';
import bhaagamathiePoster from './assets/posters/Bhaagamathie.jpeg';
import rrrPoster from './assets/posters/RRR.jpeg';
import aditya369Poster from './assets/posters/Aditya 369.jpeg';
import agentSaiSrinivasaAthreyaPoster from './assets/posters/Agent Sai Srinivasa Athreya.jpeg';
import fidaaPoster from './assets/posters/Fidaa.jpeg';
import jathiRatnaluPoster from './assets/posters/Jathi Ratnalu.jpeg';
import arundhatiPoster from './assets/posters/Arundhati.jpeg';
import pushpaTheRisePoster from './assets/posters/Pushpa The Rise.jpeg';
import coKancharapalemPoster from './assets/posters/Co Kancharapalem.jpeg';
import brochevarevaruraPoster from './assets/posters/Brochevarevarura.jpeg';
import jerseyPoster from './assets/posters/Jersey.jpeg';
import goodachariPoster from './assets/posters/Goodachari.jpeg';
import ohBabyPoster from './assets/posters/Oh Baby.jpeg';
import gameOverPoster from './assets/posters/Game Over.jpeg';
import mahanatiPoster from './assets/posters/Mahanati.jpeg';
import vikramVedhaPoster from './assets/posters/Vikram Vedha.jpeg';
import ratsasanPoster from './assets/posters/Ratsasan.jpeg';
import ninetySixPoster from './assets/posters/96.jpeg';
import superDeluxePoster from './assets/posters/Super Deluxe.jpeg';
import pizzaPoster from './assets/posters/Pizza.jpeg';
import twentyFourPoster from './assets/posters/24.jpeg';
import kaithiPoster from './assets/posters/Kaithi.jpeg';
import maanagaramPoster from './assets/posters/Maanagaram.jpeg';
import vinnaithaandiVaruvaayaaPoster from './assets/posters/Vinnaithaandi Varuvaayaa.jpeg';
import soodhuKavvumPoster from './assets/posters/Soodhu Kavvum.jpeg';
import indruNetruNaalaiPoster from './assets/posters/Indru Netru Naalai.jpeg';
import avalPoster from './assets/posters/Aval.jpeg';
import asuranPoster from './assets/posters/Asuran.jpeg';
import pariyerumPerumalPoster from './assets/posters/Pariyerum Perumal.jpeg';
import jigarthandaPoster from './assets/posters/Jigarthanda.jpeg';
import demonteColonyPoster from './assets/posters/Demonte Colony.jpeg';
import maanaaduPoster from './assets/posters/Maanaadu.jpeg';
import dhuruvangalPathinaaruPoster from './assets/posters/Dhuruvangal Pathinaaru.jpeg';
import kaadhalumKadandhuPogumPoster from './assets/posters/Kaadhalum Kadandhu Pogum.jpeg';
import mundasupattiPoster from './assets/posters/Mundasupatti.jpeg';
import drishyamMalayalamPoster from './assets/posters/Drishyam.jpeg';
import premamPoster from './assets/posters/Premam.jpeg';
import kumbalangiNightsPoster from './assets/posters/Kumbalangi Nights.jpeg';
import ezraPoster from './assets/posters/Ezra.jpeg';
import luciferPoster from './assets/posters/Lucifer.jpeg';
import androidKunjappanVer525Poster from './assets/posters/Android Kunjappan Ver 5.25.jpeg';
import cuSoonPoster from './assets/posters/C U Soon.jpeg';
import bangaloreDaysPoster from './assets/posters/Bangalore Days.jpeg';
import maheshintePrathikaaramPoster from './assets/posters/Maheshinte Prathikaaram.jpeg';
import bhoothakaalamPoster from './assets/posters/Bhoothakaalam.jpeg';
import jallikattuPoster from './assets/posters/Jallikattu.jpeg';
import ninePoster from './assets/posters/9.jpeg';
import anjaamPathiraaPoster from './assets/posters/Anjaam Pathiraa.jpeg';
import helenPoster from './assets/posters/Helen.jpeg';
import sudaniFromNigeriaPoster from './assets/posters/Sudani from Nigeria.jpeg';
import virusPoster from './assets/posters/Virus.jpeg';
import minnalMuraliPoster from './assets/posters/Minnal Murali.jpeg';
import theGreatIndianKitchenPoster from './assets/posters/The Great Indian Kitchen.jpeg';
import angamalyDiariesPoster from './assets/posters/Angamaly Diaries.jpeg';
import thondimuthalumDriksakshiyumPoster from './assets/posters/Thondimuthalum Driksakshiyum.jpeg';

// --- ICONS (as SVG components) ---
const ThumbsUpIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${filled ? 'text-green-500' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.737V10a2 2 0 012-2h5V5a2 2 0 012-2h.09a2 2 0 012 2v3.372zM6 21V10H4a2 2 0 00-2 2v7a2 2 0 002 2h2z" />
    </svg>
);

const ThumbsDownIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${filled ? 'text-red-500' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326-.02.485-.06L17 5.263V14a2 2 0 01-2 2h-5v5a2 2 0 01-2 2h-.09a2 2 0 01-2-2v-3.372zM18 3v11h2a2 2 0 002-2V5a2 2 0 00-2-2h-2z" />
    </svg>
);

const WatchedIcon = ({ filled }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${filled ? 'text-green-500' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- New Default Avatars ---
const defaultAvatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
];

// --- MOVIE DATASET ---
const movieDataset = [
  // English (20)
  { title: "The Dark Knight", genre: "Action", language: "English", plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", poster: darkKnightPoster },
  { title: "Inception", genre: "Sci-Fi", language: "English", plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", poster: inceptionPoster },
  { title: "Pulp Fiction", genre: "Thriller / Mystery", language: "English", plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", poster: pulpFictionPoster },
  { title: "Forrest Gump", genre: "Romance", language: "English", plot: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.", poster: forrestGumpPoster },
  { title: "Superbad", genre: "Comedy", language: "English", plot: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.", poster: superbadPoster },
  { title: "The Conjuring", genre: "Horror", language: "English", plot: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.", poster: theConjuringPoster },
  { title: "The Matrix", genre: "Sci-Fi", language: "English", plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", poster: theMatrixPoster },
  { title: "Gladiator", genre: "Action", language: "English", plot: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", poster: gladiatorPoster },
  { title: "The Hangover", genre: "Comedy", language: "English", plot: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.", poster: theHangoverPoster },
  { title: "The Silence of the Lambs", genre: "Thriller / Mystery", language: "English", plot: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", poster: theSilenceOfTheLambsPoster },
  { title: "Titanic", genre: "Romance", language: "English", plot: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.", poster: titanicPoster },
  { title: "Hereditary", genre: "Horror", language: "English", plot: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.", poster: hereditaryPoster },
  { title: "Blade Runner 2049", genre: "Sci-Fi", language: "English", plot: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.", poster: bladeRunner2049Poster },
  { title: "John Wick", genre: "Action", language: "English", plot: "An ex-hitman comes out of retirement to track down the gangsters that took everything from him.", poster: johnWickPoster },
  { title: "Step Brothers", genre: "Comedy", language: "English", plot: "Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.", poster: stepBrothersPoster },
  { title: "Se7en", genre: "Thriller / Mystery", language: "English", plot: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.", poster: se7enPoster },
  { title: "The Notebook", genre: "Romance", language: "English", plot: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.", poster: theNotebookPoster },
  { title: "Get Out", genre: "Horror", language: "English", plot: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.", poster: getOutPoster },
  { title: "Interstellar", genre: "Sci-Fi", language: "English", plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster: interstellarPoster },
  { title: "Mad Max: Fury Road", genre: "Action", language: "English", plot: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners and a drifter named Max.", poster: madMaxFuryRoadPoster },

  // Hindi (20)
  { title: "3 Idiots", genre: "Comedy", language: "Hindi", plot: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.", poster: threeIdiotsPoster },
  { title: "Dangal", genre: "Action", language: "Hindi", plot: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.", poster: dangalPoster },
  { title: "Kahaani", genre: "Thriller / Mystery", language: "Hindi", plot: "A pregnant woman's search for her missing husband takes her from London to Kolkata, but everyone she questions denies having ever met him.", poster: kahaaniPoster },
  { title: "Dilwale Dulhania Le Jayenge", genre: "Romance", language: "Hindi", plot: "When Raj meets Simran in Europe, it isn't love at first sight but when Simran moves to India for an arranged marriage, love happens.", poster: dilwaleDulhaniaLeJayengePoster },
  { title: "Tumbbad", genre: "Horror", language: "Hindi", plot: "A mythological story about a goddess who created the entire universe. The plot revolves around the consequences when humans build a temple for her first-born.", poster: tumbbadPoster },
  { title: "PK", genre: "Sci-Fi", language: "Hindi", plot: "An alien on Earth loses the only device he can use to communicate with his spaceship. His innocent questions and child-like curiosity force society to re-examine its long-held beliefs.", poster: pkPoster },
  { title: "Lagaan", genre: "Action", language: "Hindi", plot: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.", poster: lagaanPoster },
  { title: "Zindagi Na Milegi Dobara", genre: "Comedy", language: "Hindi", plot: "Three friends decide to turn their fantasy vacation into reality after one of them becomes engaged.", poster: zindagiNaMilegiDobaraPoster },
  { title: "A Wednesday!", genre: "Thriller / Mystery", language: "Hindi", plot: "A retiring police commissioner recounts the most memorable case of his career wherein he was informed about a bomb scare in Mumbai.", poster: aWednesdayPoster },
  { title: "Veer-Zaara", genre: "Romance", language: "Hindi", plot: "An Indian Air Force pilot, Squadron Leader Veer Pratap Singh, and a Pakistani woman, Zaara Haayat Khan, fall in love, but their romance faces hurdles.", poster: veerZaaraPoster },
  { title: "Bulbbul", genre: "Horror", language: "Hindi", plot: "A child bride grows into an enigmatic woman presiding over her household, harboring a painful past as supernatural murders of men plague her village.", poster: bulbbulPoster },
  { title: "Cargo", genre: "Sci-Fi", language: "Hindi", plot: "A lonely demon who has been working on a spaceship for years processing the dead for rebirth gets a new assistant who is full of new ideas.", poster: cargoPoster },
  { title: "Sholay", genre: "Action", language: "Hindi", plot: "After his family is murdered by a notorious and ruthless bandit, a former police officer enlists the services of two outlaws to capture him.", poster: sholayPoster },
  { title: "Hera Pheri", genre: "Comedy", language: "Hindi", plot: "Three unemployed men find the answer to all their money problems when they receive a call from a kidnapper. However, things do not go as planned.", poster: heraPheriPoster },
  { title: "Drishyam", genre: "Thriller / Mystery", language: "Hindi", plot: "A man goes to desperate lengths to save his family from the dark side of the law, after they commit an unexpected crime.", poster: drishyamHindiPoster },
  { title: "Jab We Met", genre: "Romance", language: "Hindi", plot: "A depressed wealthy businessman's life changes after he meets a spunky and talkative young woman on a train.", poster: jabWeMetPoster },
  { title: "Bhool Bhulaiyaa", genre: "Horror", language: "Hindi", plot: "An NRI and his wife decide to stay in his ancestral home, paying no heed to the warnings about ghosts.", poster: bhoolBhulaiyaaPoster },
  { title: "Ra.One", genre: "Sci-Fi", language: "Hindi", plot: "A video game designer creates an unstoppable villain who escapes from the game and confronts the designer's family.", poster: raOnePoster },
  { title: "War", genre: "Action", language: "Hindi", plot: "An Indian soldier is assigned to eliminate his former mentor, who has gone rogue.", poster: warPoster },
  { title: "Andhadhun", genre: "Thriller / Mystery", language: "Hindi", plot: "A series of mysterious events change the life of a blind pianist, who must now report a crime that he should technically not know about.", poster: andhadhunPoster },

  // Kannada (20)
  { title: "K.G.F: Chapter 1", genre: "Action", language: "Kannada", plot: "In the 1970s, a fierce rebel rises against the brutal oppression in the Kolar Gold Fields and becomes a symbol of hope to the enslaved people.", poster: kgfChapter1Poster },
  { title: "Lucia", genre: "Sci-Fi", language: "Kannada", plot: "A man suffering from insomnia is tricked into buying a drug, Lucia, which makes him dream of a better life. But the lines between reality and dream begin to blur.", poster: luciaPoster },
  { title: "U-Turn", genre: "Thriller / Mystery", language: "Kannada", plot: "A journalist investigating a story on traffic rule violators at a particular flyover finds herself entangled in a series of mysterious deaths.", poster: uTurnPoster },
  { title: "Mungaru Male", genre: "Romance", language: "Kannada", plot: "A young man falls in love with a girl he meets in a mall, but her marriage is already fixed. He continues to love her with no expectations.", poster: mungaruMalePoster },
  { title: "Kirik Party", genre: "Comedy", language: "Kannada", plot: "The story of a mischievous group of engineering students, following their journey through love, friendship, and college life.", poster: kirikPartyPoster },
  { title: "RangiTaranga", genre: "Horror", language: "Kannada", plot: "A novelist and his wife travel to her ancestral village, where they encounter a series of supernatural events and a mysterious festival.", poster: rangiTarangaPoster },
  { title: "Ulidavaru Kandanthe", genre: "Action", language: "Kannada", plot: "A journalist sets out to uncover the truth behind a murder that takes place during a festival, with five different people giving their own versions of the incident.", poster: ulidavaruKandanthePoster },
  { title: "Avane Srimannarayana", genre: "Sci-Fi", language: "Kannada", plot: "A corrupt police officer in a fictional town searches for a hidden treasure, leading to a fantastical adventure.", poster: avaneSrimannarayanaPoster },
  { title: "Kavaludaari", genre: "Thriller / Mystery", language: "Kannada", plot: "A traffic police constable's curiosity leads him to re-open a 40-year-old case, uncovering a web of secrets and conspiracies.", poster: kavaludaariPoster },
  { title: "Dia", genre: "Romance", language: "Kannada", plot: "A shy, introverted girl's life takes a turn after she falls in love with a boy, but a tragic accident and fate have other plans for them.", poster: diaPoster },
  { title: "Thithi", genre: "Comedy", language: "Kannada", plot: "The film is about how three generations of sons react to the death of their 101-year-old patriarch.", poster: thithiPoster },
  { title: "6-5=2", genre: "Horror", language: "Kannada", plot: "A found-footage film about a group of friends who go on a trek and encounter paranormal activities, recording their ordeal.", poster: sixFiveTwoPoster },
  { title: "Kantara", genre: "Action", language: "Kannada", plot: "A fiery young man clashes with an unflinching forest officer in a south Indian village where spirituality, fate and folklore rule the lands.", poster: kantaraPoster },
  { title: "Garuda Gamana Vrishabha Vahana", genre: "Action", language: "Kannada", plot: "The tale of two friends, Shiva and Hari, who rise through the ranks of the Mangaluru underworld.", poster: garudaGamanaVrishabhaVahanaPoster },
  { title: "Hostel Hudugaru Bekagiddare", genre: "Comedy", language: "Kannada", plot: "A group of hostel boys have to hide the suicide of their warden to save their own skin.", poster: hostelHudugaruBekagiddarePoster },
  { title: "Gultoo", genre: "Thriller / Mystery", language: "Kannada", plot: "An aspiring tech entrepreneur gets entangled in a cybercrime case, and his life takes a dark turn.", poster: gultooPoster },
  { title: "Love Mocktail", genre: "Romance", language: "Kannada", plot: "A man, on a drive, recounts his past romantic relationships and heartbreaks.", poster: loveMocktailPoster },
  { title: "Mummy", genre: "Horror", language: "Kannada", plot: "A pregnant woman and her daughter are haunted by a malevolent spirit in their new home.", poster: mummyPoster },
  { title: "Nathicharami", genre: "Romance", language: "Kannada", plot: "A widow struggles with her physical desires and societal expectations, seeking a way to fulfill them without emotional attachment.", poster: nathicharamiPoster },
  { title: "Vikrant Rona", genre: "Action", language: "Kannada", plot: "An eccentric inspector investigates a series of mysterious deaths in a remote village.", poster: vikrantRonaPoster },

  // Telugu (20)
  { title: "Baahubali: The Beginning", genre: "Action", language: "Telugu", plot: "In the kingdom of Mahishmati, a young man of superhuman strength discovers his royal heritage and confronts a tyrannical ruler.", poster: baahubaliTheBeginningPoster },
  { title: "Eega", genre: "Sci-Fi", language: "Telugu", plot: "A murdered man is reincarnated as a housefly and seeks to avenge his death and protect his love from a ruthless billionaire.", poster: eegaPoster },
  { title: "Arjun Reddy", genre: "Romance", language: "Telugu", plot: "A brilliant, short-tempered surgeon spirals into a path of self-destruction after his girlfriend is forced to marry another man.", poster: arjunReddyPoster },
  { title: "Kshanam", genre: "Thriller / Mystery", language: "Telugu", plot: "An NRI returns to India to help his ex-girlfriend find her kidnapped daughter, but he soon realizes that nothing is as it seems.", poster: kshanamPoster },
  { title: "Pelli Choopulu", genre: "Comedy", language: "Telugu", plot: "A lazy chef and an ambitious girl meet at a matchmaking ceremony and decide to start a food truck business together.", poster: pelliChoopuluPoster },
  { title: "Bhaagamathie", genre: "Horror", language: "Telugu", plot: "An IAS officer is imprisoned in a haunted house for interrogation, where she becomes possessed by a vengeful spirit.", poster: bhaagamathiePoster },
  { title: "RRR", genre: "Action", language: "Telugu", plot: "A fearless revolutionary and an officer in the British force, who once shared a deep bond, decide to join forces and chart out an inspirational path of freedom against the despotic rulers.", poster: rrrPoster },
  { title: "Aditya 369", genre: "Sci-Fi", language: "Telugu", plot: "A scientist invents a time machine, and a group of people accidentally travel back to the 16th-century Krishnadevaraya empire and then to a post-apocalyptic future.", poster: aditya369Poster },
  { title: "Agent Sai Srinivasa Athreya", genre: "Thriller / Mystery", language: "Telugu", plot: "A private detective from Nellore gets his first big case when he investigates a mysterious dead body found near a railway track.", poster: agentSaiSrinivasaAthreyaPoster },
  { title: "Fidaa", genre: "Romance", language: "Telugu", plot: "An NRI medical student and a spirited village girl fall in love, but their cultural differences and family issues create challenges.", poster: fidaaPoster },
  { title: "Jathi Ratnalu", genre: "Comedy", language: "Telugu", plot: "Three happy-go-lucky men land in prison for a crime they didn't commit. They must find a way to prove their innocence.", poster: jathiRatnaluPoster },
  { title: "Arundhati", genre: "Horror", language: "Telugu", plot: "A young woman discovers she is the reincarnation of a warrior queen and must battle an evil sorcerer from her past life.", poster: arundhatiPoster },
  { title: "Pushpa: The Rise", genre: "Action", language: "Telugu", plot: "A labourer rises through the ranks of a red sandal smuggling syndicate, making enemies along the way.", poster: pushpaTheRisePoster },
  { title: "C/o Kancharapalem", genre: "Romance", language: "Telugu", plot: "An anthology of four love stories set in a small town, each exploring a different facet of love and relationships.", poster: coKancharapalemPoster },
  { title: "Brochevarevarura", genre: "Comedy", language: "Telugu", plot: "Three students who are failing in their studies find themselves in a kidnapping plot that goes hilariously wrong.", poster: brochevarevaruraPoster },
  { title: "Jersey", genre: "Romance", language: "Telugu", plot: "A talented but failed cricketer decides to return to the game in his late thirties, driven by a desire to fulfill his son's wish.", poster: jerseyPoster },
  { title: "Goodachari", genre: "Thriller / Mystery", language: "Telugu", plot: "A young man recruited into a secret service agency finds himself framed for the murder of his superiors and must uncover the conspiracy.", poster: goodachariPoster },
  { title: "Oh! Baby", genre: "Comedy", language: "Telugu", plot: "A 70-year-old woman magically finds herself in the body of her 24-year-old self and decides to relive her youth.", poster: ohBabyPoster },
  { title: "Game Over", genre: "Horror", language: "Telugu", plot: "A game designer with PTSD finds her life turning into a terrifying game where she has to fight for survival.", poster: gameOverPoster },
  { title: "Mahanati", genre: "Romance", language: "Telugu", plot: "A biographical drama based on the life of legendary South Indian actress Savitri, chronicling her rise to stardom and her tragic personal life.", poster: mahanatiPoster },

  // Tamil (20)
  { title: "Vikram Vedha", genre: "Action", language: "Tamil", plot: "A no-nonsense police officer engages in a mind game with a notorious smuggler, where each story challenges the other's perception of good and evil.", poster: vikramVedhaPoster },
  { title: "Ratsasan", genre: "Thriller / Mystery", language: "Tamil", plot: "An aspiring filmmaker turned cop hunts for a mysterious serial killer who targets schoolgirls, leading to a chilling investigation.", poster: ratsasanPoster },
  { title: "96", genre: "Romance", language: "Tamil", plot: "Two high school sweethearts from the 1996 batch meet at a reunion after 22 years and reminisce about their past.", poster: ninetySixPoster },
  { title: "Super Deluxe", genre: "Comedy", language: "Tamil", plot: "An unfaithful wife, an estranged father, a priest, and an angry son suddenly find themselves in the most unexpected predicaments, all on one fateful day.", poster: superDeluxePoster },
  { title: "Pizza", genre: "Horror", language: "Tamil", plot: "A pizza delivery boy's life takes a terrifying turn when he is sent to a mysterious house where supernatural events unfold.", poster: pizzaPoster },
  { title: "24", genre: "Sci-Fi", language: "Tamil", plot: "A scientist invents a time-traveling watch, and his evil twin brother will stop at nothing to get it.", poster: twentyFourPoster },
  { title: "Kaithi", genre: "Action", language: "Tamil", plot: "An ex-convict, on his way to meet his daughter for the first time, is forced by a police officer to help him stop a drug raid.", poster: kaithiPoster },
  { title: "Maanagaram", genre: "Thriller / Mystery", language: "Tamil", plot: "The lives of a few individuals get intertwined in a series of events in the city of Chennai, leading to a thrilling tale of survival.", poster: maanagaramPoster },
  { title: "Vinnaithaandi Varuvaayaa", genre: "Romance", language: "Tamil", plot: "A Hindu aspiring filmmaker falls in love with a Christian girl, but their religious and cultural differences pose a major obstacle.", poster: vinnaithaandiVaruvaayaaPoster },
  { title: "Soodhu Kavvum", genre: "Comedy", language: "Tamil", plot: "A group of low-profile kidnappers with a set of principles find themselves in a mess when they kidnap a politician's son.", poster: soodhuKavvumPoster },
  { title: "Indru Netru Naalai", genre: "Sci-Fi", language: "Tamil", plot: "Two friends get their hands on a time machine and start a business to solve people's problems, but their actions have unforeseen consequences.", poster: indruNetruNaalaiPoster },
  { title: "Aval", genre: "Horror", language: "Tamil", plot: "A neurosurgeon and his wife's lives are disrupted when a new family moves into the neighboring house, which has a dark past.", poster: avalPoster },
  { title: "Asuran", genre: "Action", language: "Tamil", plot: "A farmer from an oppressed community goes on the run with his son after a violent altercation with a wealthy landlord.", poster: asuranPoster },
  { title: "Pariyerum Perumal", genre: "Romance", language: "Tamil", plot: "A law student from an oppressed caste falls in love with a girl from a dominant caste, leading to a powerful story about caste discrimination.", poster: pariyerumPerumalPoster },
  { title: "Jigarthanda", genre: "Comedy", language: "Tamil", plot: "An aspiring director tries to make a film about a real-life gangster, but the lines between reality and fiction begin to blur.", poster: jigarthandaPoster },
  { title: "Demonte Colony", genre: "Horror", language: "Tamil", plot: "Four friends decide to explore a haunted colony, and their lives take a turn for the worse.", poster: demonteColonyPoster },
  { title: "Maanaadu", genre: "Sci-Fi", language: "Tamil", plot: "A man gets trapped in a time loop and must find a way to stop a political assassination.", poster: maanaaduPoster },
  { title: "Dhuruvangal Pathinaaru", genre: "Thriller / Mystery", language: "Tamil", plot: "A retired police officer recounts the details of a perplexing case that still haunts him.", poster: dhuruvangalPathinaaruPoster },
  { title: "Kaadhalum Kadandhu Pogum", genre: "Romance", language: "Tamil", plot: "A rowdy and an educated woman form an unlikely friendship, which slowly blossoms into love.", poster: kaadhalumKadandhuPogumPoster },
  { title: "Mundasupatti", genre: "Comedy", language: "Tamil", plot: "A photographer who is afraid of cameras is hired to take pictures in a village where photography is believed to cause death.", poster: mundasupattiPoster },

  // Malayalam (20)
  { title: "Drishyam", genre: "Thriller / Mystery", language: "Malayalam", plot: "A man goes to great lengths to protect his family after they accidentally commit a crime, using his knowledge from films to outsmart the police.", poster: drishyamMalayalamPoster },
  { title: "Premam", genre: "Romance", language: "Malayalam", plot: "The film follows the life of a young man through three different stages of his life and his romantic relationships.", poster: premamPoster },
  { title: "Kumbalangi Nights", genre: "Comedy", language: "Malayalam", plot: "The story of four brothers who share a love-hate relationship with each other in a dysfunctional home in the village of Kumbalangi.", poster: kumbalangiNightsPoster },
  { title: "Ezra", genre: "Horror", language: "Malayalam", plot: "A young couple's life is turned upside down when they buy an antique box, which contains a dybbuk (a malicious spirit).", poster: ezraPoster },
  { title: "Lucifer", genre: "Action", language: "Malayalam", plot: "Following the death of a political leader, a mysterious man steps in to fill the vacuum, leading to a power struggle.", poster: luciferPoster },
  { title: "Android Kunjappan Ver 5.25", genre: "Sci-Fi", language: "Malayalam", plot: "A conservative villager's life changes when his son, who works in Russia, brings home a robot to take care of him.", poster: androidKunjappanVer525Poster },
  { title: "C U Soon", genre: "Thriller / Mystery", language: "Malayalam", plot: "A software engineer's cousin's fiancée goes missing, and he must find her using his digital skills, uncovering a dark secret.", poster: cuSoonPoster },
  { title: "Bangalore Days", genre: "Romance", language: "Malayalam", plot: "The story of three cousins who move to Bangalore to fulfill their dreams and how their lives change.", poster: bangaloreDaysPoster },
  { title: "Maheshinte Prathikaaram", genre: "Comedy", language: "Malayalam", plot: "A photographer vows not to wear his slippers until he has avenged a public humiliation.", poster: maheshintePrathikaaramPoster },
  { title: "Bhoothakaalam", genre: "Horror", language: "Malayalam", plot: "Following a family death, a mother and son experience mysterious events which distort their sense of reality and make them question their sanity.", poster: bhoothakaalamPoster },
  { title: "Jallikattu", genre: "Action", language: "Malayalam", plot: "A buffalo escapes from a slaughterhouse, and the entire village comes together to hunt it down, revealing their primal instincts.", poster: jallikattuPoster },
  { title: "9", genre: "Sci-Fi", language: "Malayalam", plot: "When a global crisis occurs for 9 days, an astrophysicist must protect his son from a malevolent force from outer space.", poster: ninePoster },
  { title: "Anjaam Pathiraa", genre: "Thriller / Mystery", language: "Malayalam", plot: "A criminologist assists the police in hunting down a serial killer who targets police officers.", poster: anjaamPathiraaPoster },
  { title: "Helen", genre: "Thriller / Mystery", language: "Malayalam", plot: "A young woman accidentally gets locked in a freezer room and has to fight for survival.", poster: helenPoster },
  { title: "Sudani from Nigeria", genre: "Comedy", language: "Malayalam", plot: "A Nigerian football player joins a local club in Malappuram, Kerala, and forms an unlikely bond with the team manager.", poster: sudaniFromNigeriaPoster },
  { title: "Virus", genre: "Thriller / Mystery", language: "Malayalam", plot: "Based on the 2018 Nipah virus outbreak in Kerala, the film follows the efforts of healthcare professionals and officials to contain the epidemic.", poster: virusPoster },
  { title: "Minnal Murali", genre: "Action", language: "Malayalam", plot: "A tailor gains superpowers after being struck by lightning, but must take down an unexpected foe if he is to become the hero his hometown needs.", poster: minnalMuraliPoster },
  { title: "The Great Indian Kitchen", genre: "Romance", language: "Malayalam", plot: "A newly married woman struggles to fit into the patriarchal norms of her husband's family.", poster: theGreatIndianKitchenPoster },
  { title: "Angamaly Diaries", genre: "Action", language: "Malayalam", plot: "A young man from Angamaly gets involved in the local pork business and the gang rivalries that come with it.", poster: angamalyDiariesPoster },
  { title: "Thondimuthalum Driksakshiyum", genre: "Comedy", language: "Malayalam", plot: "A couple on their way to a new town get robbed, and the subsequent police investigation takes a series of comical turns.", poster: thondimuthalumDriksakshiyumPoster },
];

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyA034fmUibW1EXWrLK7Hfp9Cbv6b-b7PpM",
  authDomain: "movie-recommender-2be13.firebaseapp.com",
  projectId: "movie-recommender-2be13",
  storageBucket: "movie-recommender-2be13.appspot.com",
  messagingSenderId: "234338239950",
  appId: "1:234338239950:web:3a7f233c92626dafb0979f"
};

const GlobalStyles = () => (
    <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
    `}</style>
);


// --- React Components ---

const Spinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
    </div>
);

const Modal = ({ message, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-red-600 text-center">
            <p className="text-white mb-4">{message}</p>
            <button onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Close
            </button>
        </div>
    </div>
);

const MovieModal = ({ movie, onClose, onInteraction, interactions }) => {
    if (!movie) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide relative flex flex-col md:flex-row">
                <button onClick={onClose} className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 z-10 hover:bg-red-600 transition-colors">
                    <CloseIcon />
                </button>
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
                </div>
                <div className="p-6 flex flex-col">
                    <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
                    <div className="text-sm text-gray-400 mb-4">
                        <span>{movie.genre}</span> &bull; <span>{movie.language}</span>
                    </div>
                    <p className="text-gray-300 mb-6 flex-grow">{movie.plot}</p>
                    <div className="flex items-center gap-4">
                        <button onClick={() => onInteraction('liked', movie.id)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"><ThumbsUpIcon filled={interactions.liked.has(movie.id)} /></button>
                        <button onClick={() => onInteraction('disliked', movie.id)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"><ThumbsDownIcon filled={interactions.disliked.has(movie.id)} /></button>
                        <button onClick={() => onInteraction('watched', movie.id)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"><WatchedIcon filled={interactions.watched.has(movie.id)} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExpandedMovieDetail = ({ movie, onInteraction, interactions }) => {
    if (!movie) return null;

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-b-lg overflow-hidden shadow-lg shadow-black/50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-bold text-lg truncate mb-2">{movie.title}</h3>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <button onClick={(e) => { e.stopPropagation(); onInteraction('liked', movie.id); }} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"><ThumbsUpIcon filled={interactions.liked.has(movie.id)} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onInteraction('disliked', movie.id); }} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"><ThumbsDownIcon filled={interactions.disliked.has(movie.id)} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onInteraction('watched', movie.id); }} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"><WatchedIcon filled={interactions.watched.has(movie.id)} /></button>
                </div>
            </div>
            <p className="text-gray-300 text-sm line-clamp-3">{movie.plot}</p>
            <div className="mt-2 text-xs text-gray-400">
                <span>{movie.genre}</span> &bull; <span>{movie.language}</span>
            </div>
        </div>
    );
};


const MovieCard = ({ movie, onSelect, onInteraction, interactions }) => {
    return (
        <div className="w-full group" onClick={() => onSelect(movie)}>
            <div className="relative transition-transform duration-300 group-hover:scale-110 group-hover:z-20">
                <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-auto object-cover rounded-lg cursor-pointer shadow-lg" 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x450/111111/FFFFFF?text=Image+Not+Found'; }}
                />
                <ExpandedMovieDetail movie={movie} onInteraction={onInteraction} interactions={interactions} />
            </div>
        </div>
    );
};

const MovieRow = ({ title, movies, onInteraction, interactions, onMovieSelect }) => {
    const rowRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    
    const handleScroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = rowRef.current.clientWidth * 0.8;
            rowRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const checkArrows = () => {
        if (rowRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        const currentRef = rowRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkArrows, { passive: true });
            checkArrows();
            window.addEventListener('resize', checkArrows);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkArrows);
                window.removeEventListener('resize', checkArrows);
            }
        };
    }, [movies]);

    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <div className="mb-8 group/row">
            <h2 className="text-xl font-bold text-white mb-3 ml-4">{title}</h2>
            <div className="relative">
                {showLeftArrow && (
                    <button 
                        onClick={() => handleScroll('left')} 
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/row:opacity-100 transition-opacity"
                    >
                        <ChevronLeftIcon />
                    </button>
                )}
                <div ref={rowRef} className="relative flex items-start overflow-x-auto overflow-y-hidden py-4 px-4 scrollbar-hide">
                    {movies.map(movie => (
                        <div key={movie.id} className="flex-shrink-0 w-[16.66%] px-1">
                            <MovieCard 
                                movie={movie} 
                                onSelect={onMovieSelect}
                                onInteraction={onInteraction}
                                interactions={interactions}
                            />
                        </div>
                    ))}
                </div>
                {showRightArrow && (
                     <button 
                        onClick={() => handleScroll('right')} 
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover/row:opacity-100 transition-opacity"
                    >
                        <ChevronRightIcon />
                    </button>
                )}
            </div>
        </div>
    );
};

// --- New Mega Menu Components ---
const MegaMenu = ({ genreItems, collectionItems, setView, closeMenu }) => {
    const handleNavigation = (view) => {
        setView(view);
        closeMenu();
    };

    return (
        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[40rem] bg-gray-800/90 backdrop-blur-md rounded-lg shadow-2xl text-white p-6 border border-gray-700">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Genres</h3>
                    <ul className="space-y-2">
                        {genreItems.map(item => (
                            <li key={item.name}>
                                <button 
                                    onClick={() => handleNavigation({ page: 'movieList', title: `${item.name} Movies`, filter: { type: 'genre', value: item.name }})}
                                    className="hover:text-red-500 transition-colors duration-200"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Featured Collections</h3>
                     <ul className="space-y-2">
                        {collectionItems.map(item => (
                            <li key={item.name}>
                                <button 
                                    onClick={() => handleNavigation({ page: 'movieList', title: item.name, filter: { type: 'collection', value: item.name }})}
                                    className="hover:text-red-500 transition-colors duration-200"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const LanguageMenu = ({ langItems, setView, closeMenu }) => {
    const handleNavigation = (view) => {
        setView(view);
        closeMenu();
    };
    return (
         <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-2xl text-white p-4 border border-gray-700">
            <ul className="space-y-2">
                {langItems.map(item => (
                    <li key={item.name}>
                        <button 
                            onClick={() => handleNavigation({ page: 'movieList', title: `${item.name} Movies`, filter: { type: 'language', value: item.name }})}
                            className="hover:text-red-500 transition-colors duration-200"
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const Header = ({ onSignOut, setView, userProfile }) => {
    const [openMenu, setOpenMenu] = useState(null); // null, 'genres', 'languages', 'profile'
    const menuRef = useRef(null);

    const genres = ["Action", "Comedy", "Horror", "Romance", "Thriller / Mystery", "Sci-Fi", "Drama", "Fantasy"];
    const languages = ["English", "Hindi", "Kannada", "Telugu", "Tamil", "Malayalam"];
    const collections = ["New Releases", "Critically Acclaimed", "Action Packed"];

    const genreItems = genres.map(g => ({ name: g }));
    const langItems = languages.map(l => ({ name: l }));
    const collectionItems = collections.map(c => ({ name: c }));

    const handleMenuToggle = (menu) => {
        setOpenMenu(prev => (prev === menu ? null : menu));
    };

    const handleNavigation = (view) => {
        setView(view);
        setOpenMenu(null);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header ref={menuRef} className="bg-black/20 backdrop-blur-sm text-white p-4 sticky top-0 z-40">
            <div className="container mx-auto flex justify-between items-center">
                 <h1 onClick={() => setView({ page: 'home' })} className="text-3xl font-bold text-red-600 cursor-pointer">MovieRecommender</h1>
                <nav className="flex items-center space-x-6 text-lg">
                    <button onClick={() => handleNavigation({ page: 'home' })} className="hover:text-red-500 transition-colors">Home</button>
                    <div className="relative">
                        <button onClick={() => handleMenuToggle('genres')} className="hover:text-red-500 transition-colors">Genres</button>
                        {openMenu === 'genres' && <MegaMenu genreItems={genreItems} collectionItems={collectionItems} setView={setView} closeMenu={() => setOpenMenu(null)} />}
                    </div>
                     <div className="relative">
                        <button onClick={() => handleMenuToggle('languages')} className="hover:text-red-500 transition-colors">Languages</button>
                         {openMenu === 'languages' && <LanguageMenu langItems={langItems} setView={setView} closeMenu={() => setOpenMenu(null)} />}
                    </div>
                </nav>
                <div className="relative">
                     <button onClick={() => handleMenuToggle('profile')} className="rounded-full overflow-hidden w-10 h-10 border-2 border-transparent hover:border-red-500">
                        <img src={userProfile?.photoURL || defaultAvatars[0]} alt="Profile" className="w-full h-full object-cover" />
                     </button>
                     {openMenu === 'profile' && (
                        <div className="absolute top-full mt-4 right-0 w-56 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-2xl text-white p-2 border border-gray-700">
                           <button onClick={() => handleNavigation({ page: 'watchHistory' })} className="w-full text-left px-4 py-2 hover:bg-red-600 rounded-md transition-colors">Watch History</button>
                           <button onClick={() => handleNavigation({ page: 'profileSettings' })} className="w-full text-left px-4 py-2 hover:bg-red-600 rounded-md transition-colors">Profile Settings</button>
                           <button onClick={onSignOut} className="w-full text-left px-4 py-2 hover:bg-red-600 rounded-md transition-colors">Sign Out</button>
                        </div>
                     )}
                </div>
            </div>
        </header>
    );
};

const AuthPage = ({ setModalMessage, onSignUpStart, onSignUpFinish }) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [signUpStep, setSignUpStep] = useState('credentials'); // 'credentials' or 'avatar'
    const [newUser, setNewUser] = useState(null); // To hold user object between steps
    const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatars[0]);

    const auth = getAuth();
    const db = getFirestore();

    const handleAuthAction = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        if (isSignUp) {
            if (password !== confirmPassword) {
                setModalMessage("Passwords do not match.");
                return;
            }
            if(username.length < 3) {
                setModalMessage("Username must be at least 3 characters long.");
                return;
            }
            setIsLoading(true);
            try {
                onSignUpStart(); // Notify parent that sign-up process has started
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                setNewUser(userCredential.user);
                setSignUpStep('avatar');
            } catch (error) {
                console.error("Authentication error:", error);
                setModalMessage(error.message);
                onSignUpFinish(); // Reset the flag on error
            } finally {
                setIsLoading(false);
            }
        } else { // Sign In
            setIsLoading(true);
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.error("Authentication error:", error);
                setModalMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFinishSignUp = async () => {
        if (!newUser || !selectedAvatar) return;
        setIsLoading(true);
        try {
            await setDoc(doc(db, "users", newUser.uid), {
                username: username,
                email: newUser.email,
                watched: [],
                liked: [],
                disliked: [],
                isNewUser: true,
                photoURL: selectedAvatar,
            });
            onSignUpFinish(); // Notify parent that sign-up is complete
        } catch (error) {
            console.error("Error creating user profile:", error);
            setModalMessage("Could not create your profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderCredentialsForm = () => (
        <form onSubmit={handleAuthAction}>
            {isSignUp && (
                <div className="mb-4">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
                </div>
            )}
            <div className="mb-4">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
            </div>
            <div className="mb-4">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
            </div>
            {isSignUp && (
                <div className="mb-6">
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
                </div>
            )}
            <button type="submit" disabled={isLoading}
                className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-800 disabled:cursor-not-allowed">
                {isLoading ? <Spinner /> : (isSignUp ? 'Continue' : 'Sign In')}
            </button>
        </form>
    );

    const renderAvatarSelection = () => (
        <div>
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Choose Your Avatar</h3>
            <div className="flex items-center justify-center gap-4 mb-6">
                {defaultAvatars.map(avatarUrl => (
                    <img 
                        key={avatarUrl}
                        src={avatarUrl} 
                        alt="Avatar" 
                        onClick={() => setSelectedAvatar(avatarUrl)}
                        className={`w-20 h-20 rounded-full object-cover cursor-pointer border-4 transition-all ${selectedAvatar === avatarUrl ? 'border-red-500 scale-110' : 'border-transparent hover:border-gray-500'}`} 
                    />
                ))}
            </div>
            <button onClick={handleFinishSignUp} disabled={isLoading}
                className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-800">
                {isLoading ? <Spinner /> : 'Finish Sign Up'}
            </button>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border-t-4 border-red-600 shadow-red-600/20">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    {isSignUp ? (signUpStep === 'credentials' ? 'Create Account' : 'Last Step!') : 'Sign In'}
                </h2>
                
                {isSignUp && signUpStep === 'avatar' ? renderAvatarSelection() : renderCredentialsForm()}

                <p className="text-center text-gray-400 mt-6">
                    {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
                    <button onClick={() => { setIsSignUp(!isSignUp); setSignUpStep('credentials'); }} className="text-red-500 hover:text-red-400 font-bold ml-2">
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
};

const InitialSelectionPage = ({ allMovies, user, onFinished, setModalMessage }) => {
    const [selectedMovies, setSelectedMovies] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const db = getFirestore();

    const randomMovies = useMemo(() => [...allMovies].sort(() => 0.5 - Math.random()).slice(0, 30), [allMovies]);

    const toggleMovieSelection = (movieId) => {
        setSelectedMovies(prev => {
            const newSet = new Set(prev);
            newSet.has(movieId) ? newSet.delete(movieId) : newSet.add(movieId);
            return newSet;
        });
    };

    const handleDone = async () => {
        if (selectedMovies.size < 3) {
            setModalMessage("Please select at least 3 movies to get started.");
            return;
        }
        setIsLoading(true);
        try {
            const userRef = doc(db, "users", user.uid);
            const watchedArray = Array.from(selectedMovies);
            await updateDoc(userRef, {
                watched: watchedArray,
                isNewUser: false,
            });
            onFinished(watchedArray); // Pass the array up
        } catch (error) {
            console.error("Error saving initial selection:", error);
            setModalMessage("Could not save your selection. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white p-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-red-600">Welcome!</h1>
                <p className="text-gray-300 mt-2">Select some movies you've watched to personalize your recommendations.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {randomMovies.map(movie => {
                    const isSelected = selectedMovies.has(movie.id);
                    return (
                        <div key={movie.id} onClick={() => toggleMovieSelection(movie.id)}
                             className={`relative rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${isSelected ? 'border-red-600 scale-105' : 'border-transparent'}`}>
                            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                             {isSelected && <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-3xl font-bold text-red-500">✓</div>}
                        </div>
                    );
                })}
            </div>
            <div className="text-center mt-8">
                <button onClick={handleDone} disabled={isLoading}
                        className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors text-xl disabled:bg-red-800">
                    {isLoading ? "Saving..." : "Done"}
                </button>
            </div>
        </div>
    );
};

// --- Page Components ---
const HomePage = ({ allMovies, userProfile, onInteraction, interactions, onMovieSelect }) => {
    const recommendations = useMemo(() => {
        if (!userProfile || allMovies.length === 0) return [];
        
        const likedMovies = allMovies.filter(m => interactions.liked.has(m.id));
        const dislikedMovies = allMovies.filter(m => interactions.disliked.has(m.id));
        const watchedMovies = allMovies.filter(m => interactions.watched.has(m.id));

        const userProfileScores = { genres: {}, languages: {} };
        
        likedMovies.forEach(movie => {
            userProfileScores.genres[movie.genre] = (userProfileScores.genres[movie.genre] || 0) + 5;
            userProfileScores.languages[movie.language] = (userProfileScores.languages[movie.language] || 0) + 3;
        });
        dislikedMovies.forEach(movie => {
            userProfileScores.genres[movie.genre] = (userProfileScores.genres[movie.genre] || 0) - 10;
            userProfileScores.languages[movie.language] = (userProfileScores.languages[movie.language] || 0) - 5;
        });
        watchedMovies.forEach(movie => {
            if (!interactions.liked.has(movie.id) && !interactions.disliked.has(movie.id)) {
                userProfileScores.genres[movie.genre] = (userProfileScores.genres[movie.genre] || 0) + 1;
            }
        });

        const scoredMovies = allMovies
            .filter(movie => !interactions.watched.has(movie.id))
            .map(movie => {
                let score = 0;
                score += userProfileScores.genres[movie.genre] || 0;
                score += userProfileScores.languages[movie.language] || 0;
                return { ...movie, score };
            });

        scoredMovies.sort((a, b) => b.score - a.score);
        return scoredMovies.slice(0, 18);
    }, [allMovies, interactions, userProfile]);

    const similarMovieRows = useMemo(() => {
        const likedMovieIds = Array.from(interactions.liked);
        const shuffledIds = likedMovieIds.sort(() => 0.5 - Math.random());
        const seedMovieIds = shuffledIds.slice(0, 3);
        
        return seedMovieIds.map(seedId => {
            const seedMovie = allMovies.find(m => m.id === seedId);
            if (!seedMovie) return null;

            const similarMovies = allMovies.filter(m => 
                m.genre === seedMovie.genre && 
                m.id !== seedMovie.id && 
                !interactions.watched.has(m.id)
            ).slice(0, 12);

            return { title: `Because you liked ${seedMovie.title}`, movies: similarMovies };
        }).filter(Boolean);
    }, [allMovies, interactions.liked, interactions.watched]);

    const randomizedRows = useMemo(() => {
        const genres = ["Action", "Comedy", "Horror", "Romance", "Thriller / Mystery", "Sci-Fi"];
        const languages = ["English", "Hindi", "Kannada", "Telugu", "Tamil", "Malayalam"];
        
        const genreRows = genres.map(genre => ({
            title: `${genre} Movies`,
            movies: allMovies.filter(m => m.genre === genre).sort(() => 0.5 - Math.random()).slice(0, 12)
        }));

        const languageRows = languages.map(lang => ({
            title: `${lang} Movies`,
            movies: allMovies.filter(m => m.language === lang).sort(() => 0.5 - Math.random()).slice(0, 12)
        }));

        const allPotentialRows = [...genreRows, ...languageRows];
        
        // Shuffle and pick a subset of genre/language rows
        const shuffled = allPotentialRows.sort(() => 0.5 - Math.random());
        const maxDynamicRows = 6 - (1 + similarMovieRows.length); // 1 is for the recommendations row
        const selectedRows = shuffled.slice(0, Math.max(0, maxDynamicRows)); 

        return [
            { title: "Recommended For You", movies: recommendations },
            ...similarMovieRows,
            ...selectedRows
        ];
    }, [allMovies, recommendations, similarMovieRows]);


    return (
        <div>
            {randomizedRows.map(row => (
                <MovieRow key={row.title} title={row.title} movies={row.movies} onInteraction={onInteraction} interactions={interactions} onMovieSelect={onMovieSelect} />
            ))}
        </div>
    );
};

const CategoryGridPage = ({ title, items, setView }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map(item => (
                    <div 
                        key={item.name} 
                        onClick={() => setView({ page: 'movieList', title: `${item.name} Movies`, filter: { type: item.type, value: item.name }})}
                        className="relative rounded-lg overflow-hidden cursor-pointer h-40 group"
                    >
                        <img src={item.poster} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <h3 className="text-white text-2xl font-bold">{item.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MovieGridPage = ({ title, movies, onInteraction, interactions, onMovieSelect }) => {
     return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map(movie => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        onSelect={onMovieSelect}
                        onInteraction={onInteraction}
                        interactions={interactions}
                    />
                ))}
            </div>
        </div>
    );
};

// --- New Profile Pages ---
const WatchHistoryPage = ({ allMovies, interactions, onMovieSelect, onInteraction }) => {
    const [filter, setFilter] = useState('watched'); // 'watched', 'liked', 'disliked'

    const filteredMovies = useMemo(() => {
        const movieIds = interactions[filter];
        if (!movieIds) return [];
        return allMovies.filter(movie => movieIds.has(movie.id));
    }, [allMovies, interactions, filter]);

    const getTitle = () => {
        if (filter === 'watched') return 'Your Watch History';
        if (filter === 'liked') return 'Movies You Liked';
        if (filter === 'disliked') return 'Movies You Disliked';
        return 'Your Movies';
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white border-l-4 border-red-600 pl-4">{getTitle()}</h2>
                <div className="relative">
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="watched">Watched</option>
                        <option value="liked">Liked</option>
                        <option value="disliked">Disliked</option>
                    </select>
                </div>
            </div>
            {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} onInteraction={onInteraction} interactions={interactions} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-16">You haven't marked any movies in this category yet.</p>
            )}
        </div>
    );
};

const ProfileSettingsPage = ({ user, userProfile, setModalMessage, onProfileUpdate, onSignOut }) => {
    const [activeSection, setActiveSection] = useState(null); // 'avatar', 'username', 'password'
    const [newUsername, setNewUsername] = useState(userProfile.username || '');
    const [usernamePassword, setUsernamePassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    
    const auth = getAuth();
    const db = getFirestore();

    const handleAvatarSelect = async (avatarUrl) => {
        if (avatarUrl === userProfile.photoURL) return;
        setModalMessage("Updating avatar...");
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { photoURL: avatarUrl });
            onProfileUpdate({ ...userProfile, photoURL: avatarUrl });
            setModalMessage("Avatar updated successfully!");
        } catch (error) {
            console.error("Error updating avatar:", error);
            setModalMessage("Failed to update avatar.");
        }
    };

    const reauthenticate = async (password) => {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
    };

    const handleUsernameChange = async (e) => {
        e.preventDefault();
        if (newUsername === userProfile.username) {
            setModalMessage("New username is the same as the current one.");
            return;
        }
        setModalMessage("Changing username...");
        try {
            await reauthenticate(usernamePassword);
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { username: newUsername });
            onProfileUpdate({ ...userProfile, username: newUsername });
            setModalMessage("Username changed successfully!");
            setUsernamePassword('');
        } catch (error) {
            console.error("Error changing username:", error);
            setModalMessage("Failed to change username. Please check your password.");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setModalMessage("New passwords do not match.");
            return;
        }
        setModalMessage("Changing password...");
        try {
            await reauthenticate(currentPassword);
            await updatePassword(user, newPassword);
            setModalMessage("Password updated successfully!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error) {
            console.error("Error changing password:", error);
            setModalMessage("Failed to change password. Please check your current password.");
        }
    };

    const handleAccountDelete = async (e) => {
        e.preventDefault();
        setModalMessage("Deleting account...");
        try {
            await reauthenticate(deletePassword);
            // First delete the Firestore document
            await deleteDoc(doc(db, "users", user.uid));
            // Then delete the user from Authentication
            await deleteUser(user);
            setModalMessage("Account deleted successfully.");
            // The onAuthStateChanged listener will handle redirecting the user
        } catch (error) {
            console.error("Error deleting account:", error);
            setModalMessage("Failed to delete account. Please check your password.");
        }
    };

    const renderSection = () => {
        switch(activeSection) {
            case 'avatar':
                return (
                    <div>
                        <button onClick={() => setActiveSection(null)} className="text-red-500 mb-4">&larr; Back to Settings</button>
                        <h3 className="text-xl font-semibold text-white mb-4">Choose Your Avatar</h3>
                        <div className="flex items-center justify-center gap-4">
                            {defaultAvatars.map(avatarUrl => (
                                <img key={avatarUrl} src={avatarUrl} alt="Avatar" onClick={() => handleAvatarSelect(avatarUrl)}
                                    className={`w-24 h-24 rounded-full object-cover cursor-pointer border-4 transition-all ${userProfile.photoURL === avatarUrl ? 'border-red-500 scale-110' : 'border-transparent hover:border-gray-500'}`} 
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'username':
                return (
                    <div>
                        <button onClick={() => setActiveSection(null)} className="text-red-500 mb-4">&larr; Back to Settings</button>
                        <h3 className="text-xl font-semibold text-white mb-4">Change Username</h3>
                        <form onSubmit={handleUsernameChange} className="space-y-4">
                            <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="New Username" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
                            <input type="password" value={usernamePassword} onChange={e => setUsernamePassword(e.target.value)} placeholder="Confirm with Password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
                            <button type="submit" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">Save Username</button>
                        </form>
                    </div>
                );
            case 'password':
                 return (
                    <div>
                        <button onClick={() => setActiveSection(null)} className="text-red-500 mb-4">&larr; Back to Settings</button>
                        <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Current Password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
                            <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} placeholder="Confirm New Password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
                            <button type="submit" className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">Save Password</button>
                        </form>
                    </div>
                );
            case 'delete':
                 return (
                    <div>
                        <button onClick={() => setActiveSection(null)} className="text-red-500 mb-4">&larr; Back to Settings</button>
                        <h3 className="text-xl font-semibold text-white mb-4">Delete Account</h3>
                        <p className="text-gray-300 mb-4">This action is irreversible. All your data, including watch history and preferences, will be permanently deleted.</p>
                        <form onSubmit={handleAccountDelete} className="space-y-4">
                            <input type="password" value={deletePassword} onChange={e => setDeletePassword(e.target.value)} placeholder="Confirm with Password" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" required />
                            <button type="submit" className="w-full bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-900 transition-colors">Permanently Delete Account</button>
                        </form>
                    </div>
                );
            default:
                return (
                    <div className="space-y-4 text-white text-lg">
                        <button onClick={() => setActiveSection('avatar')} className="w-full text-left p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">Change Profile Avatar</button>
                        <button onClick={() => setActiveSection('username')} className="w-full text-left p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">Change Username</button>
                        <button onClick={() => setActiveSection('password')} className="w-full text-left p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">Change Password</button>
                        <button onClick={() => setActiveSection('delete')} className="w-full text-left p-4 bg-red-900/50 rounded-lg hover:bg-red-800/50 transition-colors text-red-400">Delete Account</button>
                        <button onClick={onSignOut} className="w-full text-left p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">Sign Out</button>
                    </div>
                );
        }
    };

    return (
        <div>
             <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4">Profile Settings</h2>
             <div className="max-w-xl mx-auto">
                {renderSection()}
             </div>
        </div>
    );
};


// --- Main Content Wrapper ---
const MainContent = ({ user, userProfile, allMovies, onSignOut, setModalMessage, onProfileUpdate }) => {
    const [view, setView] = useState({ page: 'home' }); // home, genres, languages, movieList, watchHistory, profileSettings
    const [interactions, setInteractions] = useState({ watched: new Set(), liked: new Set(), disliked: new Set() });
    const [modalMovie, setModalMovie] = useState(null);
    const db = getFirestore();

    useEffect(() => {
        if (userProfile) {
            setInteractions({
                watched: new Set(userProfile.watched || []),
                liked: new Set(userProfile.liked || []),
                disliked: new Set(userProfile.disliked || []),
            });
        }
    }, [userProfile]);

    const handleInteraction = useCallback(async (type, movieId) => {
        const newInteractions = {
            watched: new Set(interactions.watched),
            liked: new Set(interactions.liked),
            disliked: new Set(interactions.disliked),
        };

        const isAdding = !newInteractions[type].has(movieId);
        
        if (isAdding) {
            newInteractions[type].add(movieId);
            if (type === 'liked' || type === 'disliked') {
                newInteractions.watched.add(movieId);
            }
            if (type === 'liked') {
                newInteractions.disliked.delete(movieId);
            }
            if (type === 'disliked') {
                newInteractions.liked.delete(movieId);
            }
        } else {
            newInteractions[type].delete(movieId);
        }

        setInteractions(newInteractions);

        try {
            const userRef = doc(db, "users", user.uid);
            const updatePayload = {
                liked: Array.from(newInteractions.liked),
                disliked: Array.from(newInteractions.disliked),
                watched: Array.from(newInteractions.watched),
            };
            await updateDoc(userRef, updatePayload);
        } catch (error) {
            console.error("Error updating interactions:", error);
            setModalMessage("Failed to save your preference. Please try again.");
        }
    }, [interactions, db, user.uid, setModalMessage]);

    const renderCurrentPage = () => {
        switch(view.page) {
            case 'home':
                return <HomePage allMovies={allMovies} userProfile={userProfile} onInteraction={handleInteraction} interactions={interactions} onMovieSelect={setModalMovie} />;
            case 'watchHistory':
                return <WatchHistoryPage allMovies={allMovies} interactions={interactions} onMovieSelect={setModalMovie} onInteraction={handleInteraction} />;
            case 'profileSettings':
                return <ProfileSettingsPage user={user} userProfile={userProfile} setModalMessage={setModalMessage} onProfileUpdate={onProfileUpdate} onSignOut={onSignOut} />;
            case 'genres': {
                const genres = ["Action", "Comedy", "Horror", "Romance", "Thriller / Mystery", "Sci-Fi"];
                const genreItems = genres.map(g => ({ name: g, type: 'genre', poster: allMovies.find(m => m.genre === g)?.poster || 'https://placehold.co/400x225/111/fff?text='+g }));
                return <CategoryGridPage title="Genres" items={genreItems} setView={setView} />;
            }
            case 'languages': {
                const languages = ["English", "Hindi", "Kannada", "Telugu", "Tamil", "Malayalam"];
                const langItems = languages.map(l => ({ name: l, type: 'language', poster: allMovies.find(m => m.language === l)?.poster || 'https://placehold.co/400x225/111/fff?text='+l }));
                return <CategoryGridPage title="Languages" items={langItems} setView={setView} />;
            }
            case 'movieList': {
                let filtered = [];
                if (view.filter.type === 'collection') {
                    if (view.filter.value === 'New Releases') filtered = [...allMovies].sort(() => 0.5 - Math.random()).slice(0, 18);
                    else if (view.filter.value === 'Critically Acclaimed') filtered = [...allMovies].sort(() => 0.5 - Math.random()).slice(0, 18);
                    else if (view.filter.value === 'Action Packed') filtered = allMovies.filter(m => m.genre === 'Action');
                } else {
                    filtered = allMovies.filter(m => m[view.filter.type] === view.filter.value);
                }
                return <MovieGridPage title={view.title} movies={filtered} onInteraction={handleInteraction} interactions={interactions} onMovieSelect={setModalMovie} />;
            }
            default:
                return <HomePage allMovies={allMovies} userProfile={userProfile} onInteraction={handleInteraction} interactions={interactions} onMovieSelect={setModalMovie} />;
        }
    };

    return (
        <div className="min-h-screen">
            <Header onSignOut={onSignOut} setView={setView} userProfile={userProfile} />
            <main className="container mx-auto p-4 md:p-8">
                {renderCurrentPage()}
            </main>
            <MovieModal 
                movie={modalMovie} 
                onClose={() => setModalMovie(null)} 
                onInteraction={handleInteraction} 
                interactions={interactions} 
            />
        </div>
    );
};


// Main App Component
export default function App() {
    const [app, setApp] = useState(null);
    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);

    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [page, setPage] = useState('loading'); // loading, auth, initialSelect, main
    const [allMovies, setAllMovies] = useState([]);
    const [modalMessage, setModalMessage] = useState(null);
    const [isDataSeeded, setIsDataSeeded] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    useEffect(() => {
        try {
            const appInstance = initializeApp(firebaseConfig);
            const authInstance = getAuth(appInstance);
            const dbInstance = getFirestore(appInstance);
            setApp(appInstance);
            setAuth(authInstance);
            setDb(dbInstance);
        } catch (error) {
            console.error("Firebase initialization error:", error);
            setModalMessage("Failed to initialize Firebase. Check console and config.");
        }
    }, []);

    const seedMovieData = useCallback(async () => {
        if (!db || isDataSeeded) return;
        const moviesRef = collection(db, "movies");
        const q = query(moviesRef, limit(1));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log("Seeding movie data...");
            setModalMessage("Setting up the movie library...");
            const batch = writeBatch(db);
            movieDataset.forEach(movie => {
                const docRef = doc(moviesRef);
                batch.set(docRef, movie);
            });
            await batch.commit();
            setModalMessage(null);
        }
        setIsDataSeeded(true);
    }, [db, isDataSeeded]);

    const fetchAllMovies = useCallback(async () => {
        if (!db || !isDataSeeded || allMovies.length > 0) return;
        console.log("Fetching all movies...");
        const moviesSnapshot = await getDocs(collection(db, "movies"));
        const moviesList = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllMovies(moviesList);
    }, [db, isDataSeeded, allMovies.length]);

    useEffect(() => {
        if (db) seedMovieData();
    }, [db, seedMovieData]);
    
    useEffect(() => {
        if (isDataSeeded) fetchAllMovies();
    }, [isDataSeeded, fetchAllMovies]);

    const checkUserStatus = useCallback(async (currentUser) => {
        if (currentUser && !currentUser.isAnonymous) {
            setUser(currentUser);
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
                const profileData = { uid: currentUser.uid, ...userDoc.data() };
                setUserProfile(profileData);
                setPage(profileData.isNewUser ? 'initialSelect' : 'main');
            } else {
                // If doc doesn't exist yet during signup, wait. Otherwise, go to auth.
                if (!isSigningUp) {
                    setPage('auth');
                }
            }
        } else {
            setUser(null);
            setUserProfile(null);
            setPage('auth');
        }
    }, [db, isSigningUp]);

    useEffect(() => {
        if (!auth || !db) return;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!isSigningUp) {
                checkUserStatus(currentUser);
            }
        });
        return () => unsubscribe();
    }, [auth, db, isSigningUp, checkUserStatus]);

    const handleSignOut = async () => {
        if (auth) await signOut(auth);
    };

    const handleProfileUpdate = (updatedProfile) => {
        setUserProfile(updatedProfile);
    };

    const handleSignUpStart = () => setIsSigningUp(true);
    const handleSignUpFinish = () => {
        setIsSigningUp(false);
        checkUserStatus(auth.currentUser);
    };
    
    const handleInitialSelectionFinish = (watchedArray) => {
        const updatedProfile = {
            ...userProfile,
            watched: watchedArray,
            isNewUser: false,
        };
        setUserProfile(updatedProfile);
        setPage('main');
    };

    const renderPage = () => {
        if (page === 'loading' || (page !== 'auth' && allMovies.length === 0)) {
            return <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center"><Spinner /><p className="text-white mt-4">Loading Movie Library...</p></div>;
        }
        switch (page) {
            case 'auth':
                return <AuthPage setModalMessage={setModalMessage} onSignUpStart={handleSignUpStart} onSignUpFinish={handleSignUpFinish} />;
            case 'initialSelect':
                return <InitialSelectionPage allMovies={allMovies} user={user} onFinished={handleInitialSelectionFinish} setModalMessage={setModalMessage} />;
            case 'main':
                return <MainContent user={user} userProfile={userProfile} allMovies={allMovies} onSignOut={handleSignOut} setModalMessage={setModalMessage} onProfileUpdate={handleProfileUpdate} />;
            default:
                return <AuthPage setModalMessage={setModalMessage} onSignUpStart={handleSignUpStart} onSignUpFinish={handleSignUpFinish} />;
        }
    };

    return (
        <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}>
            <GlobalStyles />
            {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} />}
            {renderPage()}
        </div>
    );
}
