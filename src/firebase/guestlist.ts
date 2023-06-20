import { db } from "./server";

const ref = db.ref("/1P8zfU5J1FLHL6e_tteATaN0S72_QgfEfbvOxm5EVP_k/All");

export interface Guestlist {
  id: string;
  name: string;
  group: Array<string>;
  attending: boolean;
}

export const getGuestlistNames = async () => {
  const guestListArray: Array<Object> = [];

  const data = await ref.orderByChild("Id").once("value");

  data.forEach((child) => {
    let dataId = child.val()["Id"];
    let name = child.val()["Name"];
    let group = child.val()["Group"];
    group = group ? group.toString().split(",") : [];
    let attending = child.val()["RSVP"];
    guestListArray.push({ id: dataId, name, group, attending });
  });

  return guestListArray;
};

// get the party from the db from an array of names
export const getGuestlistParty = async (arr: Array<String>) => {
  // create an array to store the party
  const partyArray: Array<Object> = [];

  // get the party from the db, return array of promises
  const results = arr.map(async (searchedName: String) => {
    let data = await ref
      .orderByChild("Name")
      .equalTo(searchedName.toString())
      .once("value");

    return data.val();
  });

  // wait for all promises to resolve
  const party = await Promise.all(results);

  // loop through the party and add each guest to the partyArray
  party.forEach((obj) => {
    // TODO: fix this type
    Object.values(obj).forEach((value: any) => {
      let dataId = value["Id"];
      let name = value["Name"];
      let attending = value["RSVP"];
      partyArray.push({ id: dataId, name, attending });
    });
  });

  // return the party
  return partyArray;
};
