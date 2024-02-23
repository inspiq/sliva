import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';
import * as yup from 'yup';

import { Container, Footer, Header, Loader, Wrapper } from 'src/components';
import { Button, ReviewForm } from 'src/components/forms/review/ReviewForm';
import { ReviewPanel } from 'src/components/specialists/account/SpecialistReviewList';
import { useAuthContext } from 'src/context';
import { Option } from 'src/shared';
import { ChatIcon, db, Specialist } from 'src/shared';
import { isSpecialist } from 'src/shared/types/type-guards';

const Avatar = styled(Image)`
  width: 150px;
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.light};
`;

const SpecialistProfileLayout = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 20px;
  margin: 40px 10px;
`;

const SpecialistListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FullName = styled.div`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.w600};
`;

const City = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w400};
`;

const Experience = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w400};
`;

const Row = styled.div`
  display: flex;
  gap: 30px;
`;

const Rating = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w500};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReviewsCount = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReviewsLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

const Specialistlayout = styled.div`
  max-width: 820px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  specialistId: string;
}

export interface ReviewProps {
  reveiwId?: string;
  name?: string;
  lastName?: string;
  userId?: string;
  date?: string;
  description?: string;
  rating: number;
}

const SpecialistAccountElement = (props: Props): ReactElement => {
  const { specialistId } = props;
  const [userMetaData, setUserMetaData] = useState<Specialist>();
  const [IsWrite, seIitWrite] = useState<boolean>();
  const { primary, light, border_ui, border_ui_hover } = useTheme();
  const { currentAuthUser } = useAuthContext();
  const t = useTranslations();
  const initialValues = useMemo(
    () =>
      isSpecialist(currentAuthUser?.additionalInfo)
        ? {
            area: currentAuthUser.additionalInfo.area ?? '',
          }
        : {
            name: currentAuthUser?.additionalInfo?.name ?? '',
            surname: currentAuthUser?.additionalInfo?.surname ?? '',
            lastName: currentAuthUser?.additionalInfo?.lastName ?? '',
            dayOfBirth: currentAuthUser?.additionalInfo?.dayOfBirth ?? '',
            email: currentAuthUser?.additionalInfo?.email ?? '',
          },
    [currentAuthUser?.additionalInfo],
  );

  const writeReview = () => {
    seIitWrite((prev) => !prev);
  };

  const getSpecialist = useCallback(async () => {
    try {
      const docRef = doc(db, 'users', specialistId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUserMetaData(snapshot.data() as Specialist);
      }
    } catch {
      /* empty */
    }
  }, [specialistId]);

  useEffect(() => {
    getSpecialist();
  }, [getSpecialist]);

  useEffect(() => {
    const docRef = doc(db, 'users', specialistId);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setUserMetaData(docSnapshot.data() as Specialist);
      }
    });

    return () => unsubscribe();
  }, [specialistId]);

  const onChangeArea = (option: Option) => {
    setFieldValue('area', option);
  };

  const styles: StylesConfig = {
    option: (base) => ({
      ...base,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 15,
      paddingTop: 10,
      paddingBottom: 10,
    }),
    control: (styles, { isFocused }) => ({
      ...styles,
      width: '100%',
      minHeight: 50,
      borderRadius: 10,
      borderColor: isFocused ? border_ui_hover : border_ui,
      boxShadow: 'none',
      borderWidth: 1,
      fontSize: 15,
      transition: '0.3s',
      ':hover': {
        ...styles[':hover'],
        borderColor: border_ui_hover,
      },
    }),
  };
  const areas = [
    { value: 'Izhevsk', label: 'Ижевск' },
    { value: 'Arkansas', label: 'Арканзас' },
    { value: 'Texas', label: 'Техас' },
    { value: 'Boston', label: 'Бостон' },
    { value: 'Florida', label: 'Флорида' },
    { value: 'Seattle', label: 'Сиэтл' },
    { value: 'Dortmund', label: 'Дортмунд' },
    { value: 'Catalonia', label: 'Каталония' },
  ];
  const { setFieldValue, values } = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: yup.object().shape({
      name: yup.string().required(t('validations.required')),
      surname: yup.string().required(t('validations.required')),
      lastName: yup.string().required(t('validations.required')),
      dayOfBirth: yup.string().required(t('validations.required')),
    }),
    onSubmit: async (metaData) => {
      if (!currentAuthUser) return;

      try {
        const userDocRef = doc(db, 'users', currentAuthUser?.uid);
        await updateDoc(userDocRef, { ...metaData });
      } catch (e) {
        /* empty */
      }
    },
  });

  if (!currentAuthUser) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <Specialistlayout>
            <SpecialistProfileLayout>
              <Avatar
                src={userMetaData?.avatarUrl ?? '/files/images/avatar.png'}
                width={100}
                height={100}
                alt="Avatar"
              />
              <SpecialistListInfo>
                <FullName>
                  {userMetaData?.name}
                  {userMetaData?.lastName}
                </FullName>
                <City>Область:{userMetaData?.city}</City>
                <Experience>Стаж:{userMetaData?.experience}</Experience>
                <Row>
                  <Rating>{userMetaData?.estimation}</Rating>
                  <ReviewsCount>
                    <ChatIcon width={20} />
                    {userMetaData?.reviews.length} отзывов
                  </ReviewsCount>
                </Row>
              </SpecialistListInfo>
            </SpecialistProfileLayout>
            <ReviewsLayout>
              <Select
                isMulti
                name="area"
                options={areas}
                onChange={onChangeArea as VoidFunction}
                value={values.area}
                placeholder="Выберите области работы"
                styles={styles}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: light,
                    primary50: light,
                    primary,
                  },
                })}
              />
              {IsWrite && userMetaData ? (
                <ReviewForm specialist={userMetaData} onClick={writeReview} />
              ) : (
                <Button onClick={writeReview}>Написать отзыв</Button>
              )}
              <ReviewPanel reviews={userMetaData?.reviews} />
            </ReviewsLayout>
          </Specialistlayout>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const SpecialistAccount = SpecialistAccountElement;
