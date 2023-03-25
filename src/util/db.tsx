import db from "../config/firebase";
import {
    doc, setDoc, updateDoc, arrayUnion, getFirestore,
    onSnapshot,
    collection,
    query,
    where,
    orderBy,
    getDoc,
    addDoc,
    deleteDoc,
    serverTimestamp,
    deleteField,
    arrayRemove,
    getDocs,
} from 'firebase/firestore';
import {
    useQuery,
    hashQueryKey,
    QueryClient,
    QueryClientProvider as QueryClientProviderBase,
} from "@tanstack/react-query";


const client = new QueryClient();

export const getBusinesses = async () => {
    const q = query(collection(db, "businesses"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}


export function useBusinesses() {
    return useQuery(
        ['businesses'],
        () => getBusinesses(),
    );
};



export function QueryClientProvider(props: { children: React.ReactNode }) {
    return (
        <QueryClientProviderBase client={client}>
            {props.children}
        </QueryClientProviderBase>
    );
}

