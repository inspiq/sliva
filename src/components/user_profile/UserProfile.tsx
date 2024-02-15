import { useCallback, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';

import { Loader } from 'src/components';
import { UploadAvatar } from 'src/components/user_profile/UploadAvatar';
import { UserInfoForm } from 'src/components/user_profile/UserInfoForm';
import { useAuthContext } from 'src/context';
import { db, devices, Specialist, storage, UserSystem } from 'src/shared';

const Title = styled.h6`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.w500};
  margin-bottom: 40px;
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

export const UserProfile = () => {
  const { currentUser } = useAuthContext();
  const [userMetaData, setUserMetaData] = useState<Specialist>();
  const [fileUpload, setFileUpload] = useState<File>();

  const getUserData = useCallback(async () => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, 'users', currentUser?.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUserMetaData(snapshot.data() as Specialist);
      }
    } catch {
      /* empty */
    }
  }, [currentUser]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const uploadFile = async (fileUpload?: File) => {
    if (!fileUpload || !currentUser) return;

    const { name } = fileUpload;
    const filesFolderRef = ref(storage, `uploads/${name}`);

    try {
      const userDocRef = doc(db, 'users', currentUser?.uid);

      const { ref } = await uploadBytes(filesFolderRef, fileUpload);
      const downloadURL = await getDownloadURL(ref);

      await updateDoc(userDocRef, { avatarUrl: downloadURL });
    } catch {
      /* empty */
    }
  };

  if (!userMetaData) {
    return <Loader size={60} />;
  }

  return (
    <>
      <Title>Мои данные</Title>
      <MainLayout>
        <UploadAvatar
          userMetaData={userMetaData}
          fileUpload={fileUpload}
          setFileUpload={setFileUpload}
        />
        <UserInfoForm
          userMetaData={userMetaData}
          uploadFile={uploadFile}
          fileUpload={fileUpload}
        />
      </MainLayout>
    </>
  );
};
