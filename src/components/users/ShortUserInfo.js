export class ShortUserInfo {
  constructor(id, fname, lname, dBirth, photoUrl){
    this.id = id
    this.fname = fname
    this.lname = lname
    this.dBirth = dBirth
    this.photoUrl = photoUrl
  }
}

export const ShortInfoConverter = {
  toFirestore: () => {},
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new ShortUserInfo(snapshot.id, data.bio.fName, data.bio.lName, data.bio.dBirth, data.photoUrl);
  }
};