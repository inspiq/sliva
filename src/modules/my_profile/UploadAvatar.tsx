import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useMemo,
} from 'react';
import styled from 'styled-components';

import type { UserType } from 'src/app_store/AppSessionStore';
import { Avatar, DEFAULT_AVATAR_URL, UiInput } from 'src/shared';

const MainLayout = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.aqua};
`;

const UiInputLayout = styled.div`
  position: absolute;
  right: -3px;
  bottom: -3px;
`;

const UploadAvatarElement = (props: {
  setFileUpload: Dispatch<SetStateAction<File | undefined>>;
  fileUpload?: File;
  additionalInfo: UserType | null;
}) => {
  const { setFileUpload, fileUpload, additionalInfo } = props;
  const avatarUrl = additionalInfo?.avatarUrl;

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;
    setFileUpload(files?.[0]);
  };

  const getAvatarPath = useMemo(() => {
    if (fileUpload) {
      return URL.createObjectURL(fileUpload);
    }

    if (avatarUrl) {
      return avatarUrl;
    }

    return DEFAULT_AVATAR_URL;
  }, [avatarUrl, fileUpload]);

  return (
    <MainLayout>
      <UiInputLayout>
        <UiInput type="file" onChange={onChange} />
      </UiInputLayout>
      <Avatar avatarUrl={getAvatarPath} width={200} height={200} />
    </MainLayout>
  );
};

export const UploadAvatar = UploadAvatarElement;
