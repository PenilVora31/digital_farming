import { firebase } from "../lib/firebase";

export async function userLogIn(emailAddress, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
    return true;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

// for Initialize new user data
export async function InitializeUserData(userId) {
  const object = {
    area: 0,
    crop: { name: "peanut" },
    cropType: { name: "ubhadi", id: "hXfp0cedC3c0oV0ePOrz" },
    disease_alpharot: { amount: 0, cost: 0 },
    disease_green: { amount: 0, cost: 0 },
    disease_molo: { amount: 0, cost: 0 },
    disease_tikka: { amount: 0, cost: 0 },
    fertilizer_salt: { amount: 0, cost: 0 },
    fetilizer_nitrogen: { amount: 0, cost: 0 },
    fetilizer_see: { amount: 0, cost: 0 },
    fetilizer_south: { amount: 0, cost: 0 },
    seed: { amount: 0, cost: 0, name: "" },
    soil_pest: { amount: 0, cost: 0 },
    soil_rot: { amount: 0, cost: 0 },
    soil_slope: { amount: 0, cost: 0 },
  };
  try {
    await firebase.firestore().collection("data").doc(userId).set(object);
  } catch (err) {
    console.log(err.message);
    return false;
  }
  return true;
}

export async function getUserArea(userId) {
  let area = localStorage.getItem("UserArea");
  if (area) {
    return parseInt(area);
  }
  const result = await firebase
    .firestore()
    .collection("data")
    .doc(userId)
    .get();
  return result.data().area;
}

// for crops and cropTypes

export async function getCrops() {
  const result = await firebase.firestore().collection("crops").get();
  return result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
}

export async function getCropTypes() {
  const result = await firebase.firestore().collection("cropTypes").get();
  return result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
}

export async function setUserCropDetails(
  Area,
  crop,
  cropType,
  cropTypeId,
  userId
) {
  try {
    await firebase
      .firestore()
      .collection("data")
      .doc(userId)
      .update({
        area: Area,
        crop: { name: crop },
        cropType: { name: cropType, id: cropTypeId },
      });
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

// for soil

export async function getSoilDetails() {
  const result = await firebase
    .firestore()
    .collection("soil")
    .doc("peanut")
    .get();

  return result.data();
}

export async function setUserSoilDetails(amount, cost, disease, userId) {
  try {
    if (disease === "pest") {
      firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          soil_pest: { amount: amount, cost: cost },
        });
    } else if (disease === "rot") {
      firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          soil_rot: { amount: amount, cost: cost },
        });
    } else if (disease === "slope") {
      firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          soil_slope: { amount: amount, cost: cost },
        });
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
  return true;
}

// for seeds

export async function getSeeds(userId) {
  // get cropTypeId
  let id = await getCropTypeId(userId);
  if (id === "") {
    id = "hXfp0cedC3c0oV0ePOrz";
  }
  const result = await firebase.firestore().collection("seeds").doc(id).get();
  return result.data();
}

export async function getCropTypeId(userId) {
  let id = "";
  const result = await firebase
    .firestore()
    .collection("data")
    .doc(userId)
    .get();
  if (result) {
    id = result.data().cropType.id;
  }
  return id;
}

export async function setUserSeedDetails(name, amount, cost, userId) {
  try {
    await firebase
      .firestore()
      .collection("data")
      .doc(userId)
      .update({
        seed: { name: name, amount: amount, cost: cost },
      });
    return true;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

//  for sowing of seeds

export async function getSeedSowingDetails(userId) {
  // get cropTypeId
  let id = await getCropTypeId(userId);
  if (id === "") {
    id = "hXfp0cedC3c0oV0ePOrz";
  }
  const result = await firebase.firestore().collection("sowing").doc(id).get();
  return result.data();
}

//  for fertilizers

export async function getFertilizerDetails() {
  const result = await firebase.firestore().collection("fertilizer").get();
  return result.docs.map((item) => item.data());
}

export async function setUserFertilizerDetails(type, value, totalCost, userId) {
  try {
    if (type === "nitrogen") {
      await firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          fetilizer_nitrogen: { amount: value, cost: totalCost },
        });
    } else if (type === "salt") {
      await firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          fertilizer_salt: { amount: value, cost: totalCost },
        });
    } else if (type === "see") {
      await firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          fetilizer_see: { amount: value, cost: totalCost },
        });
    } else if (type === "south") {
      await firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          fetilizer_south: { amount: value, cost: totalCost },
        });
    } else {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

// for crop's diseases

export async function setUserCropDiseasesDetails(type, value, cost, userId) {
  try {
    if (type === "disease_alpharot") {
      await firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          disease_alpharot: { amount: value, cost: cost },
        });
    } else if (type === "disease_tikka") {
      await firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          disease_tikka: { amount: value, cost: cost },
        });
    } else if (type === "disease_molo") {
      await firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          disease_molo: { amount: value, cost: cost },
        });
    } else if (type === "disease_green") {
      await firebase
        .firestore()
        .collection("data")
        .doc(userId)
        .update({
          disease_green: { amount: value, cost: cost },
        });
    } else {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

// for estimation details
export async function getEstimate(userId) {
  const result = await firebase
    .firestore()
    .collection("data")
    .doc(userId)
    .get();
  return result.data();
}
