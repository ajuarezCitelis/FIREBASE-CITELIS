declare const auth: import("@firebase/auth").Auth;
declare const db: import("@firebase/firestore").Firestore;
declare const signInWithGoogle: () => Promise<void>;
declare function logInWithEmailAndPassword(email: any, password: any): Promise<void>;
declare const registerWithEmailAndPassword: (name: any, email: any, password: any) => Promise<void>;
declare const sendPasswordReset: (email: any) => Promise<void>;
declare const logout: () => void;
export { auth, db, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout, };
//# sourceMappingURL=index.d.ts.map