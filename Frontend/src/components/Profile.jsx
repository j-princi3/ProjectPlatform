import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Spinner } from "@material-tailwind/react";
import { createStudent, getStudentByUsername, updateStudent } from '../services/studentData';
import { SessionContext } from './SessionProvider';
import AlertBox from '../components/AlertBox';

export default function Profile() {
  const session = React.useContext(SessionContext);
  const [profileData, setProfileData] = useState({
    name: '',
    universityName: '',
    githubUsername: '',
    linkedinProfile: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [message, setMessage] = useState(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session.user) {
      fetchStudentData();
    }
  }, [session.user]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const { name, universityName, githubUsername, linkedinProfile } = await getStudentByUsername();
      if (name || universityName || githubUsername || linkedinProfile) {
        // Data exists for the user
        setIsNewUser(false);
      }
      console.log(isNewUser);
      console.log(name, universityName, githubUsername, linkedinProfile)
      setProfileData({
        ...profileData,
        name: name,
        universityName: universityName,
        githubUsername: githubUsername,
        linkedinProfile: linkedinProfile,
      });
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false); // Set loading to false whether the request succeeds or fails
    }
  };
  const handleInputChange = (field, value) => {
    setProfileData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      console.group(profileData);
      const createdStudent = await updateStudent(profileData);
      console.log('Student created:', createdStudent);
      setIsEditMode(false);
      setIsNewUser(false);
      showMessage({ type: "success", message: "Profile successfully saved." });
    } catch (error) {
      console.error('Error saving profile:', error);
      showMessage({ type: "error", message: "Failed to save profile." });
    }
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleUpdateProfile = async () => {
    try {
      setIsUpdatingProfile(true);
      const updatedStudent = await updateStudent(profileData);
      console.log('Student updated:', updatedStudent);
      setIsUpdatingProfile(false);
      setIsEditMode(false);
      showMessage({ type: "success", message: "Profile successfully updated." });
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsUpdatingProfile(false);
      showMessage({ type: "error", message: "Failed to update profile." });
    }
  };

  const showMessage = (message) => {
    setMessage(message);
  };
  if(loading){
    return <div className='flex justify-center items-center h-screen'><Spinner className='h-12 w-12'/></div>
  }
  return (
    <div>
    {isUpdatingProfile ? <div className='flex justify-center items-center h-screen'><Spinner className='h-12 w-12'/></div> : <div>
      {message && (
        <AlertBox type={message.type} message={message.message} onClose={() => setMessage(null)} />
      )}
    <Card color="transparent" shadow={false} className="mt-10 place-items-center mb-10">
      <Typography variant="h1" color="blue-gray">
        My Profile
      </Typography>
      <Typography variant="h6" color="gray" className="mt-1 font-normal">
        Your Profile Details!
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            id="name"
            placeholder="Your Name"
            autoComplete="name"
            onChange={(e) => handleInputChange('name', e.target.value)}
            value={profileData.name}
            disabled={!isEditMode && !isNewUser}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your University Name
          </Typography>
          <Input
            size="lg"
            placeholder="Your University"
            id="university"
            autoComplete="organization"
            onChange={(e) => handleInputChange('universityName', e.target.value)}
            value={profileData.universityName}
            disabled={!isEditMode && !isNewUser}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your GitHub Username
          </Typography>
          <Input
            size="lg"
            placeholder="GitHub"
            id="github"
            autoComplete="username"
            onChange={(e) => handleInputChange('githubUsername', e.target.value)}
            value={profileData.githubUsername}
            disabled={!isEditMode && !isNewUser}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your LinkedIn Username
          </Typography>
          <Input
            size="lg"
            placeholder="LinkedIn"
            id="linkedin"
            autoComplete="username"
            onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
            value={profileData.linkedinProfile}
            disabled={!isEditMode && !isNewUser}
          />
        </div>
        {isNewUser ? (
          <Button className="mt-6" fullWidth onClick={handleSaveProfile}>
            SAVE.
          </Button>
        ) : (
          <>
          {!isEditMode && (
              <Button className="mt-6" fullWidth onClick={handleEditProfile}>
                EDIT.
              </Button>
            )}
            {isEditMode && (
              <Button className="mt-6" fullWidth onClick={handleUpdateProfile}>
                UPDATE.
              </Button>
            )}
          </>
        )}
      </form>
    </Card>
    </div>}
    </div>
  );
}
