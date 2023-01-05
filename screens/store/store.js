import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { db } from '../../firebaseconfig';
import { doc, getDoc,updateDoc ,collection, getDocs,query,onSnapshot,where} from "firebase/firestore";

// define the store
const useStore = create(set => ({
  userdetails: null,
  matches: [],
  personinfo:null,
  favourite: [],
  likes: [],
  verify:null,
  userinfo:null,
  login:null,
  // fetch: async (userdetails) => {
  //   const q = query(collection(db, "users"), where("id", "!=", userdetails.user.uid));
  //   const querySnapshot = await getDocs(q);
  //         querySnapshot.foreach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, " => ", doc.data());
       
  //           set(state => ({ matches: [...state.matches,doc.data()] }))
  //         })
  // },
  adduser: (user) => set(state => ({ userdetails: user })),
  setUser: (data) => set(state => ({ login: data })),
  addverify: (verifys) => set(state => ({ verify: verifys })),
  removeuser: () => set(state => ({ userdetails: null })),
  adduserinfo: (user) => set(state => ({ userinfo: user })),
  addinfo: (data) => set(state => ({ personinfo: data })),

  addmatch: (data) =>
    set(state => ({ matches: data }))
  ,
  addfav: (data) =>
  set(state => ({ favourite: [...state.favourite,data] })
  ),
  addlike: (data) =>
  set(state => ({ likes: [...state.likes,data] })
  ),
  removeMatch: (matchId) => {
    set((state) => ({
        matches: state.matches.filter((c) => c.id !== matchId)
    }))
},

}));

export default useStore
