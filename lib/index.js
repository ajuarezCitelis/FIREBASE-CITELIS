"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.sendPasswordReset = exports.registerWithEmailAndPassword = exports.logInWithEmailAndPassword = exports.signInWithGoogle = exports.db = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
const googleProvider = new auth_1.GoogleAuthProvider();
const signInWithGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, auth_1.signInWithPopup)(auth, googleProvider);
        const user = res.user;
        const q = (0, firestore_1.query)((0, firestore_1.collection)(db, "users"), (0, firestore_1.where)("uid", "==", user.uid));
        const docs = yield (0, firestore_1.getDocs)(q);
        if (docs.docs.length === 0) {
            yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    }
    catch (err) {
        console.error(err);
    }
});
exports.signInWithGoogle = signInWithGoogle;
function logInWithEmailAndPassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.logInWithEmailAndPassword = logInWithEmailAndPassword;
;
const registerWithEmailAndPassword = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, auth_1.createUserWithEmailAndPassword)(auth, email, password);
        const user = res.user;
        yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }
    catch (err) {
        console.error(err);
    }
});
exports.registerWithEmailAndPassword = registerWithEmailAndPassword;
const sendPasswordReset = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_1.sendPasswordResetEmail)(auth, email);
        alert("Password reset link sent!");
    }
    catch (err) {
        console.error(err);
    }
});
exports.sendPasswordReset = sendPasswordReset;
const logout = () => {
    (0, auth_1.signOut)(auth);
};
exports.logout = logout;
//# sourceMappingURL=index.js.map