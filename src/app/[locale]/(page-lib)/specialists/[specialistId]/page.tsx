import { SpecialistInfo } from 'src/components';

const Specialist = (props: { params: { specialistId: string } }) => {
  const { params } = props;

  return <SpecialistInfo specialistId={params.specialistId} />;
};

export default Specialist;
