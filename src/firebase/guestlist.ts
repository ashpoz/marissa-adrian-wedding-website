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

  ref.orderByChild("Name").on("child_added", (snapshot) => {
    let dataId = snapshot.val()["Id"];
    let name = snapshot.val()["Name"];
    let group = snapshot.val()["Group"];
    group = group ? group.toString().split(",") : [];
    let attending = snapshot.val()["RSVP"];

    guestListArray.push({ id: dataId, name, group, attending });
  });
  return guestListArray;
};

export const getGuestlistParty = async (arr: Array<String>) => {
  const partyArray: Array<Object> = [];

  arr.forEach((name: String) => {
    ref
      .orderByChild("Name")
      .equalTo(name.toString())
      .on("child_added", (snapshot) => {
        let dataId = snapshot.val()["Id"];
        let name = snapshot.val()["Name"];
        let attending = snapshot.val()["RSVP"];

        partyArray.push({ id: dataId, name, attending });
      });

    // console.log(partyArray);
  });
  return partyArray;
};
