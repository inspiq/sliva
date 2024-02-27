import { SpecialistProfile } from 'src/components';

const Specialist = (props: { params: { specialistId: string } }) => {
  const { params } = props;

  return <SpecialistProfile specialistId={params.specialistId} />;
};

export default Specialist;
