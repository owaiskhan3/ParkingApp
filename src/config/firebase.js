import * as firebase from "firebase";
import Swal from "sweetalert2";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBIFdnUej6uAuEJsJyaGNVpKEhOW40JEBY",
  authDomain: "parkingapp-595dc.firebaseapp.com",
  databaseURL: "https://parkingapp-595dc.firebaseio.com",
  projectId: "parkingapp-595dc",
  storageBucket: "parkingapp-595dc.appspot.com",
  messagingSenderId: "753405245920",
  appId: "1:753405245920:web:f9632a5a6cb3841a991385",
  measurementId: "G-LSMF3BBW56"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function signUpWithFirebase(
  email,
  password,
  firstName,
  lastName,
  isAdmin = "user"
) {
  try {
    if (isAdmin == true) {
      isAdmin = "admin";
    }
    var response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log("signup");

    return await firebase
      .firestore()
      .collection("users")
      .doc(response.user.uid)
      .set({
        uid: response.user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        types: isAdmin
      });
  } catch (error) {
    Swal.fire("Error", error.message, "error");

    throw error;
  }
}

async function signInWithFirebase(email, password) {
  try {
    var response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    console.log("signin");
    return response;
  } catch (error) {
    Swal.fire("Error", error.message, "error");

    throw error;
  }
}

async function setUser(uid) {
  try {
    await firebase
      .firestore()
      .collection("currUser")
      .doc("uid")
      .set({ userId: uid });
  } catch (e) {
    Swal.fire("Error..", e.message, "error");
  }
}
async function checkUser(uid) {
  try {
    var user = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    console.log(user);

    let data = await user.data();
    console.log(data);
    return data;
  } catch (e) {
    Swal.fire("Error", e.message, "error");

    console.log(e.message);
  }
}

async function getUserType() {
  let uid = await firebase
    .firestore()
    .collection("currUser")
    .doc("uid")
    .get();
  console.log(uid.data());

  let userData = await firebase
    .firestore()
    .collection("users")
    .doc(uid.data().userId)
    .get();
  console.log(userData.data());
  return userData;
}

async function logOut() {
  try {
    var response = await firebase.auth().signOut();

    setTimeout(() => {
      window.location.assign("/");
    }, 1000);

    console.log("loggout");

    return response;
  } catch (e) {
    Swal.fire("Error", e.message, "error");

    throw e;
  }
}

async function addStudent(student) {
  try {
    console.log(student);
    const { st_email, st_pass } = student;

    let uid = await firebase
      .auth()
      .createUserWithEmailAndPassword(st_email, st_pass)
      .then(res => {
        return res.user.uid;
      });

    console.log(uid);

    student.uid = uid;

    console.log(student);

    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({
        email: st_email,
        firstName: student.st_name,
        lastName: "",
        types: "user",
        uid: uid
      });

    await firebase
      .firestore()
      .collection("students")
      .doc(st_email)
      .set(student, { merge: true });

    Swal.fire("Success", "Student Added Successfully", "success");
  } catch (e) {
    Swal.fire("Error", e.message, "error");
  }
}

async function getStudents() {
  let usersData = [];
  await firebase
    .firestore()
    .collection("students")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        usersData.push(doc.data());
        return doc.data();
      });
    });
  return usersData;
}

async function updateSlots(docId, data) {
  console.log("docId", docId);
  console.log("data", data);

  await firebase
    .firestore()
    .collection("slots")
    .doc(docId)
    .set({ slots: data }, { merge: true });

  Swal.fire("Success", "Deleted Past Parking Record", "success");
}

async function getSlots() {
  let slots = [];
  await firebase
    .firestore()
    .collection("slots")

    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        slots.push(doc.data());
        return doc.data();
      });
    });

  console.log(slots);
  return slots;
}

async function setSlots(data) {
  console.log(data);
  const { bookedSlot, start_date, parkingStartTime, parkingEndTime } = data;
  console.log(bookedSlot);
  console.log(start_date);
  console.log(parkingStartTime);
  console.log(parkingEndTime);

  let uid = await firebase
    .firestore()
    .collection("currUser")
    .doc("uid")
    .get();
  console.log(uid.data());

  let objToSend = {
    uid: uid.data().userId,
    date: new Date(start_date),
    parkingEndTime: new Date(parkingEndTime),
    parkingStartTime: new Date(parkingStartTime)
  };
  await firebase
    .firestore()
    .collection("slots")
    .doc(bookedSlot)
    .set(
      { slots: firebase.firestore.FieldValue.arrayUnion(objToSend) },
      { merge: true }
    );
}

async function getUid() {
  let uid = await firebase
    .firestore()
    .collection("currUser")
    .doc("uid")
    .get();
  console.log(uid.data());
  return uid.data().userId;
}

async function submitFeedback(feedback, uid) {
  let data = await this.checkUser(uid);
  console.log(data);

  await firebase
    .firestore()
    .collection("userFeedback")
    .doc(uid)
    .set({ feedback, userInfo: data });

  Swal.fire(
    "Feedback Submitted Successfully",
    "Thankyou for your feedback.",
    "success"
  );
}

async function getFeedbacks() {
  let userFeedback = [];
  await firebase
    .firestore()
    .collection("userFeedback")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log("DocId", doc.id);
        console.log("Data", doc.data());
        userFeedback.push({
          userInfo: doc.data().userInfo,
          feedback: doc.data().feedback
        });
      });
    });
  return userFeedback;
}

export default {
  signInWithFirebase,
  signUpWithFirebase,
  addStudent,
  getStudents,
  setUser,
  checkUser,
  getUserType,
  logOut,
  getSlots,
  setSlots,
  getUid,
  submitFeedback,
  getFeedbacks,
  updateSlots
};
