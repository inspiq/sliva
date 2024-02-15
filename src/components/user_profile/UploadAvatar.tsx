import { Dispatch, FormEvent, SetStateAction, useMemo } from 'react';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import styled from 'styled-components';

import { UiInput } from 'src/shared';

const MainLayout = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 60px;
`;

const UiInputLayout = styled.div`
  position: absolute;
  right: -3px;
  bottom: -3px;
`;

const StyledImage = styled(Image)`
  border-radius: 60px;
  object-fit: cover;
`;

export const UploadAvatar = (props: {
  userMetaData?: DocumentData;
  setFileUpload: Dispatch<SetStateAction<File | undefined>>;
  fileUpload?: File;
}) => {
  const { userMetaData, setFileUpload, fileUpload } = props;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;
    setFileUpload(files?.[0]);
  };

  const getSrc = useMemo(() => {
    if (fileUpload) {
      return URL.createObjectURL(fileUpload);
    }

    if (userMetaData) {
      return userMetaData.avatarUrl;
    }

    return '/images/avatar.png';
  }, [fileUpload, userMetaData]);

  return (
    <MainLayout>
      <UiInputLayout>
        <UiInput type="file" onChange={onChange} />
      </UiInputLayout>
      <StyledImage src={getSrc} width={200} height={200} alt={'Avatar'} />
    </MainLayout>
  );
};
