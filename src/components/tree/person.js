import { Timestamp } from "firebase/firestore";
import { saveOneConv } from "../../hooks/useDB";

class Person {
  constructor(
    {id,
    userId,
    fName,
    lName,
    dBirth,
    sex,
    dDeath,
    bio,
    photoUrls,
    photoUrl,
    position = { x: 200, y: 200 }}
  ) {
    this.id = id;
    this.userId = userId;
    this.fName = fName;
    this.lName = lName;
    this.dBirth = dBirth ? new Date(dBirth) : null;
    this.dDeath = dDeath ? new Date(dDeath) : null;
    this.bio = bio;
    this.sex = sex;
    this.photoUrls = photoUrls || [photoUrl || null];
    this.position = position;
  }

  addPhoto(photo) {
    this.photoUrls.push(photo);
  }

  updateField(key, event) {
    if (Object.prototype.hasOwnProperty.call(this, key))
      this[key] = event.target.value;
  }

  updateDate(key, event) {
    this[key] = event ? event.toDate() : null;
  }

  savePerson() {
    saveOneConv(
      this,
      personConverter,
      "trees",
      this.userId,
      "persons",
      this.id
    );
  }
}

const personConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Person(
      snapshot.id,
      data.userId,
      data.fName,
      data.lName,
      data.dBirth,
      data.dDeath,
      data.data.sex,
      data.data.bio,
      data.photoUrls,
      data.position
    );
  },

  toFirestore: (person) => {
    return {
      data: {
        fName: person.fName,
        lName: person.lName,
        dBirth: person.dBirth ? Timestamp.fromDate(person.dBirth) : null,
        dDeath: person.dDeath ? Timestamp.fromDate(person.dDeath) : null,
        bio: person.bio || "",
        sex: person.sex || "",
        photoUrls: person.photoUrls,
        userId: person.userId,
        id: person.id
      },
      position: person.position,
      id: person.id,
    };
  },
};
export default Person;
