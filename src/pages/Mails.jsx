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
      <div className="container-fluid mx-auto shadow-lg rounded-md p-4 flex justify-center w-1/2 mt-8">
        <div>
          <div className="row gy-5">
          <p className="text-xl text-center mb-4">VERIFY EMAILS</p>
          {providers && (
            <>
              {providers.map((provider, index) => (
    <div className="card text-center col-12 mb-5 border p-5" >
      {
        provider.photurl!=""?<img src={provider.photoUrl} className="card-img-top mx-auto" alt="photo"  style={{maxHeight:"400px",minHeight:"250px",maxWidth:"400px"}}/>
        :<img src="gray.avif" className="card-img-top mx-auto" alt="photo"  style={{maxHeight:"400px",minHeight:"250px",maxWidth:"300px"}}/>
      }
    
    <div className="card-body">
      <h5 className=" card-title">
      <List
                  key={index}
                  id={provider.id}
                  getProviders={getProviders}
                  email={provider.email}
        />
        </h5>
        <ul class="list-group list-group-flush">
    <li class="list-group-item pb-2">Name: {provider.name}</li>
    <li class="list-group-item pb-2">Practice: {provider.practice}</li>
    <li class="list-group-item pb-2">Speciality: {provider.specialty}</li>
    <li class="list-group-item ">State: {provider.state}</li>
  </ul>
   </div>
  </div>            
  
              ))}
            </>
          )}
          {!providers && <p>No emails to verify</p>}
        </div>
      </div>
    </div>
    </div>
  );
}
