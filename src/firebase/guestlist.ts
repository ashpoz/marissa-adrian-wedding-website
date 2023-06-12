import { db } from "./server";

const ref = db.ref("/1P8zfU5J1FLHL6e_tteATaN0S72_QgfEfbvOxm5EVP_k/All");

export const getGuestlistNames = async () => {
  const guestListArray: Array<String> = [];
  ref.orderByChild("Name").on("child_added", (snapshot) => {
    guestListArray.push(snapshot.val()["Name"]);
  });
  return guestListArray;
};
