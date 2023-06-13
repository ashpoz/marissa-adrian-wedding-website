import { db } from "./server";

const ref = db.ref("/1P8zfU5J1FLHL6e_tteATaN0S72_QgfEfbvOxm5EVP_k/All");

export const getGuestlistNames = async () => {
  const guestListArray: Array<String> = [];

  ref.orderByChild("Name").on("child_added", (snapshot) => {
    let name = snapshot.val()["Name"];
    let party = snapshot.val()["Group"];
    party = party ? party.toString().split(",") : [];
    let attending = snapshot.val()["RSVP"];

    // TODO: rebuild party array to include attending status
    // basically you'll loop thru party array, and then for each name in firebase, you'll check if the name is in the party array, and if it is, you'll add the attending status to the party array

    guestListArray.push({ name, party, attending });
  });
  return guestListArray;
};

// TODO: add function to search for specific names in database
export const getRSVPs = async (arr: Array<String>) => {
  const partyArray: Array<String> = [];

  arr.forEach((name) => {
    ref
      .orderByChild("Name")
      .equalTo(name)
      .on("child_added", (snapshot) => {
        let name = snapshot.val()["Name"];
        let attending = snapshot.val()["RSVP"];

        partyArray.push({ name, attending });
      });

    return partyArray;
  });
};
