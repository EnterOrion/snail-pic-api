#! /usr/bin/env node

console.log(
  "This script populates the starting set of snail pictures to the database. Specified database as argument - e.g.: node populatedb mongodb+srv://exampleUser:examplePassword@cluster0.envg0u2.mongodb.net/?retryWrites=true&w=majority"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const SnailPic = require("./models/SnailPic");

const snailPics = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createSnailPics();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function snailPicCreate(dateTaken, photoUrl, category, description) {
  snailPicDetail = {
    dateTaken: dateTaken,
    photoUrl: photoUrl,
    category: category,
    description: description,
  };

  const snailPicData = new SnailPic(snailPicDetail);

  await snailPicData.save();
  snailPics.push(snailPicData);
  console.log(`Added snail picture: ${description}, Taken on: ${dateTaken}`);
}

async function createSnailPics() {
  console.log("Adding Snail Pics");
  await Promise.all([
    snailPicCreate(
      "6/29/20",
      "https://i.ibb.co/crMwzDh/Snapchat-521719035.jpg",
      "Live",
      "The very first snail pic!"
    ),
    snailPicCreate(
      "9/28/20",
      "https://i.ibb.co/d5pk9cS/Snapchat-839348260.jpg",
      "2D",
      "Found on the side of a building on a warm fall day."
    ),
    snailPicCreate(
      "10/16/20",
      "https://i.ibb.co/fNS3RTJ/Snapchat-1130383820.jpg",
      "2D",
      "Found among other painted creatures on a bridge."
    ),
    snailPicCreate(
      "3/29/21",
      "https://i.ibb.co/G2ttwDF/Snapchat-752889482.jpg",
      "3D",
      "A cute statue in a garden shop."
    ),
    snailPicCreate(
      "6/14/21",
      "https://i.ibb.co/JdvDxvr/Snapchat-1075052963.jpg",
      "3D",
      "A well-crafted and adorable purple snail."
    ),
    snailPicCreate(
      "6/21/21",
      "https://i.ibb.co/NN0gyW7/Snapchat-1306505974.jpg",
      "3D",
      "A snail plush that my friend from Canada gifted me!"
    ),
    snailPicCreate(
      "7/2/21",
      "https://i.ibb.co/mbMcHNH/Snapchat-285150641.jpg",
      "Live",
      "Found on a walk on my local trail."
    ),
    snailPicCreate(
      "11/6/21",
      "https://i.ibb.co/TLykQgc/Snapchat-1876514563.jpg",
      "2D",
      "A cute sign to warn drivers to slow down."
    ),
    snailPicCreate(
      "11/26/21",
      "https://i.ibb.co/6vch28R/Snapchat-2006773429.jpg",
      "3D",
      "Found as a part of a magical garden diorama in someone's front yard!"
    ),
    snailPicCreate(
      "11/26/21",
      "https://i.ibb.co/zSJL3h1/Snapchat-2131305559-min.jpg",
      "2D",
      "A sign to warn drivers to slow down in a neighborhood."
    ),
    snailPicCreate(
      "11/26/21",
      "https://i.ibb.co/PrhKMzC/Snapchat-1157302811.jpg",
      "2D",
      "The best sticker on that sign post."
    ),
    snailPicCreate(
      "2/10/22",
      "https://i.ibb.co/nsm4Mw4/Snapchat-1613016606.jpg",
      "2D",
      "A lovely snail partnership! A good first snail pic for 2022."
    ),
    snailPicCreate(
      "4/22/22",
      "https://i.ibb.co/dtHKFTP/Snapchat-1827687263.jpg",
      "2D",
      "A psychedelic rainbow snail chilling on the back of a sign."
    ),
    snailPicCreate(
      "4/28/22",
      "https://i.ibb.co/X3T3hHK/Snapchat-1783174906.jpg",
      "3D",
      "A gorgeous painted snail."
    ),
    snailPicCreate(
      "5/29/22",
      "https://i.ibb.co/8cpCKh3/Snapchat-551147217.jpg",
      "2D",
      "A great snail pun and on a journal! What a deal."
    ),
    snailPicCreate(
      "6/1/22",
      "https://i.ibb.co/FXD6QLd/Snapchat-833758207.jpg",
      "2D",
      "A wholesome snail message."
    ),
    snailPicCreate(
      "6/29/22",
      "https://i.ibb.co/fFBdpPY/Snapchat-1985715173.jpg",
      "Live",
      "A snail resting by some leaves."
    ),
    snailPicCreate(
      "8/12/22",
      "https://i.ibb.co/HF6x7qG/Snapchat-686642122-min.jpg",
      "2D",
      "Found on a REI gift card."
    ),
    snailPicCreate(
      "8/18/22",
      "https://i.ibb.co/dGw9xN3/Snapchat-1691068155-min.jpg",
      "2D",
      "A children's book in a Colombian bookstore."
    ),
    snailPicCreate(
      "8/26/22",
      "https://i.ibb.co/Pj0MfpW/Snapchat-1964125867-min.jpg",
      "2D",
      "Cover for a whimsical kid's book."
    ),
    snailPicCreate(
      "10/5/22",
      "https://i.ibb.co/RhSdg7f/Snapchat-1101225023-min.jpg",
      "3D",
      "A goofy blue snail plush."
    ),
    snailPicCreate(
      "10/19/22",
      "https://i.ibb.co/wSNd8z9/Snapchat-978309992-min.jpg",
      "2D",
      "A beautiful mural made by children."
    ),
    snailPicCreate(
      "10/19/22",
      "https://i.ibb.co/LzdKSST/Snapchat-1936969567-min.jpg",
      "Live",
      "A snail vibin' in the dirt."
    ),
    snailPicCreate(
      "11/7/22",
      "https://i.ibb.co/XSvZP9w/Snapchat-1688227472-min.jpg",
      "2D",
      "Found in a bookstore in Buenos Aires."
    ),
    snailPicCreate(
      "11/14/22",
      "https://i.ibb.co/YpTrW8L/Snapchat-1551203670.jpg",
      "2D",
      "A stylish snail advertising Lollapalooza."
    ),
    snailPicCreate(
      "12/13/22",
      "https://i.ibb.co/MMP9hkk/Snapchat-2019261360-min.jpg",
      "2D",
      "Half-snail, half-barrel."
    ),
    snailPicCreate(
      "12/24/22",
      "https://i.ibb.co/jDpsPHM/Snapchat-240860365-min.jpg",
      "2D",
      "A small snail found in Undertale."
    ),
    snailPicCreate(
      "1/25/23",
      "https://i.ibb.co/JQDQcy4/Snapchat-1614993523-min.jpg",
      "2D",
      "A wholesome graduation card."
    ),
    snailPicCreate(
      "2/8/23",
      "https://i.ibb.co/3M9nsQ1/Snapchat-1168815200-min.jpg",
      "2D",
      "The best sticker you could have on your water bottle."
    ),
    snailPicCreate(
      "2/9/23",
      "https://i.ibb.co/4YpLRNn/Snapchat-531294267-min.jpg",
      "2D",
      "What a cutie."
    ),
    snailPicCreate(
      "3/5/23",
      "https://i.ibb.co/pXwFSSp/Snapchat-1615513230-min.jpg",
      "2D",
      "This snail is a proud defender of LGBT rights."
    ),
    snailPicCreate(
      "3/5/23",
      "https://i.ibb.co/0VsvsY3/Snapchat-739700938-min.jpg",
      "3D",
      "A snail soap dispenser!!"
    ),
    snailPicCreate(
      "3/16/23",
      "https://i.ibb.co/gymPf2w/Snapchat-1361025156-min.jpg",
      "2D",
      "Found on the back of a car."
    ),
    snailPicCreate(
      "3/18/23",
      "https://i.ibb.co/DL8Zk2w/Snapchat-957852622-min.jpg",
      "2D",
      "A museum info display about the ground snail."
    ),
    snailPicCreate(
      "3/18/23",
      "https://i.ibb.co/Z2hY1wX/Snapchat-1653524263-min.jpg",
      "3D",
      "Good things come in threes and snails are no exception."
    ),
    snailPicCreate(
      "3/18/23",
      "https://i.ibb.co/m9qW7pC/Snapchat-123193478-min.jpg",
      "2D",
      "A small medieval snail guardian."
    ),
    snailPicCreate(
      "3/19/23",
      "https://i.ibb.co/2Mtsbfx/Snapchat-1888562826-min.jpg",
      "2D",
      "A fearsome one"
    ),
    snailPicCreate(
      "4/2/23",
      "https://i.ibb.co/b1GCRL9/Snapchat-558707161-min.jpg",
      "2D",
      "Snail socks!"
    ),
    snailPicCreate(
      "4/2/23",
      "https://i.ibb.co/vxHH51Z/Snapchat-862220402-min.jpg",
      "2D",
      "Wholesome forest socks. Look cozy."
    ),
    snailPicCreate(
      "4/5/23",
      "https://i.ibb.co/dWqJB15/Snapchat-1763020176-min.jpg",
      "2D",
      "The snail is good PR for a deal on a tattoo."
    ),
    snailPicCreate(
      "4/7/23",
      "https://i.ibb.co/C9WwN6D/Snapchat-256911640-min.jpg",
      "2D",
      "I asked a stranger to take a pic of the back of his shirt."
    ),
    snailPicCreate(
      "4/14/23",
      "https://i.ibb.co/W544b82/Snapchat-1409840585-min.jpg",
      "2D",
      "That snail is zoomin' along."
    ),
    snailPicCreate(
      "4/14/23",
      "https://i.ibb.co/qsL1C4R/Snapchat-1096491531-min.jpg",
      "2D",
      "Found on a cover of a board game box."
    ),
    snailPicCreate(
      "4/15/23",
      "https://i.ibb.co/Qpx99H4/Snapchat-1131180668-min.jpg",
      "2D",
      "A beautiful snail sticker. And two snails!!"
    ),
  ]);
}
