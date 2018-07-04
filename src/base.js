import Rebase from "re-base";
import Firebase from "firebase";

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyCEI8ntzpFdineypByAy5psHzc8V8FnNvw",
    authDomain: "catch-of-the-day-mk-1.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-mk-1.firebaseio.com"
  });

  const base = Rebase.createClass(firebaseApp.database());

  //this is a named export
  export { firebaseApp };

  //this is a default export
  export default base; 