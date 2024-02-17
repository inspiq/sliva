import { SpecialistAccount } from 'src/components';

const Specialist = (props: { params: { specialistId: string } }) => {
  const { params } = props;

  return <SpecialistAccount specialistId={params.specialistId} />;
};

export default Specialist;
