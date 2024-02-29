// objective: get the authenticated user -> how?

// available tools 
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

import { Subscription, UserDetails } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";


type UserContextType = {
  accessToken: string | null;
  user: User | null; // interface with 22 properties
  userDetails: UserDetails | null; // interface defined in types.ts
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined // when does this value change?
  // when: return <UserContext.Provider value={value} {...props} />;
);

export interface Props {
  [propName: string]: any;
};

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext(); // get actual session

  const user = useSupaUser(); // get authenticated user 

  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();

  const getSubscription = () => supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      // whats the utility of all this stuff?
      // iterable of promises and returns a single promise
      // parallel programming 
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0]; // array promises indexes
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails); // types.ts
          };

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          };

          setIsLoadingData(false);
        }
      );

    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  // object with the form of UserContextType
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isLoadingUser,
    subscription
  };

  return <UserContext.Provider value={value} {...props} />; // update UserContext value from undefined to a new one.
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used withing a MyUserContextProvider");
  };
  return context;
};

// conclusion: useUser custom hook, receives no arguments and returns the actual context stored in it as a property