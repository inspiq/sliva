import { ReactElement, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Loader } from 'src/components';
import { UploadAvatar } from 'src/components/user_profile/UploadAvatar';
import { UserInfoForm } from 'src/components/user_profile/UserInfoForm';
import { useAuthContext } from 'src/context';
import { db, devices, storage } from 'src/shared';

const Title = styled.h6`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 40px;
  margin-top: 50px;
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-bottom: 50px;

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

const UserProfileElement = (): ReactElement => {
  const { currentAuthUser } = useAuthContext();
  const [fileUpload, setFileUpload] = useState<File>();
  const t = useTranslations();

  const uploadFile = async (fileUpload?: File) => {
    if (!fileUpload || !currentAuthUser) return;

    const { name } = fileUpload;
    const filesFolderRef = ref(storage, `uploads/${name}`);

    try {
      const userDocRef = doc(db, 'users', currentAuthUser?.uid);

      const { ref } = await uploadBytes(filesFolderRef, fileUpload);
      const downloadURL = await getDownloadURL(ref);

      await updateDoc(userDocRef, { avatarUrl: downloadURL });
    } catch {
      /* empty */
    }
  };

  if (!currentAuthUser) {
    return <Loader />;
  }

  return (
    <>
      <Title>{t('user_profile.additional_information_input')}</Title>
      <MainLayout>
        <UploadAvatar fileUpload={fileUpload} setFileUpload={setFileUpload} />
        <UserInfoForm uploadFile={uploadFile} fileUpload={fileUpload} />
      </MainLayout>
    </>
  );
};

export const UserProfile = UserProfileElement;
