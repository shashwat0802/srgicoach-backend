import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import List from '../components/List';
import { db } from '../firebase';

export default function Mails() {
  const [providers, setProviders] = useState();
  const getProviders = async () => {
    const response = await db.collection('providers').get();
    if (!response.empty) {
      let arr = [];
      response.forEach((doc) => {
        let obj = doc.data();
        if (obj.isVerified === false) {
          obj.id = doc.id;
          arr.push(obj);
        }
      });
      console.log(arr);
      setProviders(arr);
    }
  };

  useEffect(() => {
    getProviders();
  }, []);
  return (
    <div className="custom-login-bg">
      <Header />
      <div className="container mx-auto shadow-lg rounded-md p-4 flex justify-center w-1/2 mt-8">
        <div>
          <p className="text-xl text-center mb-4">VERIFY EMAILS</p>
          {providers && (
            <>
              {providers.map((provider, index) => (
                <List
                  key={index}
                  id={provider.id}
                  getProviders={getProviders}
                  email={provider.email}
                />
              ))}
            </>
          )}
          {!providers && <p>No emails to verify</p>}
        </div>
      </div>
    </div>
  );
}
