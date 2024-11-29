import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import defaultProfilePic from '../../assets/icons/profile.png';

const Profile = () => {

    const { token } = useAuth();
    const [profile, setProfile] = useState('null');
    const { id } = useParams();
    console.log("Insideprofile")
    console.log(id)

    const { currentUser, loading } = useAuth();
    if (loading) {
      return <div>Loading...</div>; // Show a loading spinner or message
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const json = response.data;
                    setProfile(json);
                } else {
                        console.error('Failed to fetch profile. Status:', response.status);
                    }
            } catch (error) {
                console.error('Error fetching the profile:', error);
            }
        };

    
        fetchProfile();
    }, [id,token]);


    return ( 
        <div className="min-h-screen flex items-center justify-center bg-gray-50"> 
        <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-4xl border-r-4 border-transparent" style={{ borderImage: 'linear-gradient(to bottom right, blue, lightblue) 1' }}>
        <div className="flex flex-col md:flex-row items-center md:items-start relative">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md mb-6 md:mb-0 md:mr-6 relative">
            <img src={ defaultProfilePic } alt="Profile" className="w-full h-full object-cover hover:scale-105 transition-transform" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">{profile.firstName} {profile.lastName}</h1>
            <p className="text-gray-600 mb-2">{profile.email}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-100 text-blue-600 py-4 px-6 rounded-lg shadow-md">
                  <p className="text-sm font-semibold">Joined Date</p>
                  <p className="text-base">{new Date(profile.createdOn).toLocaleDateString()}</p>
                </div>
                <div className="bg-blue-100 text-blue-600 py-4 px-6 rounded-lg shadow-md">
                  <p className="text-sm font-semibold">Role</p>
                  <p className="text-base">{profile.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};
 
export default Profile;