import { ReactElement } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import { ChatIcon, devices, Line, Specialist, StarIcon } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media ${devices.mobileL} {
    flex-direction: column;
    gap: 5px;
  }
`;

const Experience = styled.div<{ hasExperience: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.secondary};

  & > span {
    color: ${({ theme, hasExperience }) =>
      hasExperience ? theme.secondary : theme.grey};
  }
`;

const Rating = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReviewsCount = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SpecialistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FullName = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
`;

const SpecialistCard = styled.div`
  display: flex;
  gap: 15px;
`;

const LineLayout = styled.div`
  padding: 25px 0;
`;

const Avatar = styled(Image)`
  width: 140px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.aqua};
`;

const AdditionalInfoLayout = styled.div`
  margin-top: 15px;
`;

const AdditionalInfoTitle = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
`;

const AdditionalInfoDescription = styled.div<{ hasExtendedInfo: boolean }>`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme, hasExtendedInfo }) =>
    hasExtendedInfo ? theme.secondary : theme.grey};
  margin-top: 5px;
`;

interface Props {
  specialist: Specialist;
}

const SpecialistDetailsElement = (props: Props): ReactElement => {
  const { specialist } = props;
  const {
    avatarUrl,
    firstName,
    lastName,
    experience,
    reviewDetails,
    extendedInfo,
  } = specialist;
  const reviewsCount = reviewDetails?.count ?? 0;

  const t = useTranslations();
  const { secondary } = useTheme();

  return (
    <MainLayout>
      <SpecialistCard>
        <Avatar
          src={avatarUrl ?? '/files/images/avatar.png'}
          width={140}
          height={150}
          alt={t('alts.avatar')}
        />
        <SpecialistInfo>
          <FullName>
            {firstName} {lastName}
          </FullName>
          <Experience hasExperience={!!experience}>
            {t('SpecialistCard.experience.title')}
            <span>
              {' '}
              {experience
                ? t('SpecialistCard.experience.info', { experience })
                : t('SpecialistCard.experience.no_info')}
            </span>
          </Experience>
          <Row>
            <Rating>
              <StarIcon color={secondary} width={18} />
              {reviewDetails?.avgRating ?? 0}
            </Rating>
            <ReviewsCount>
              <ChatIcon width={20} color={secondary} />
              {t('SpecialistCard.reviews.info', { reviewsCount })}
            </ReviewsCount>
          </Row>
        </SpecialistInfo>
      </SpecialistCard>
      <AdditionalInfoLayout>
        <AdditionalInfoTitle>
          {t('SpecialistCard.information.additional_information_textarea')}
        </AdditionalInfoTitle>
        <AdditionalInfoDescription hasExtendedInfo={!!extendedInfo}>
          {extendedInfo
            ? extendedInfo
            : t('SpecialistCard.information.additional_information_content')}
        </AdditionalInfoDescription>
      </AdditionalInfoLayout>
      <LineLayout>
        <Line />
      </LineLayout>
    </MainLayout>
  );
};

export const SpecialistDetails = SpecialistDetailsElement;
