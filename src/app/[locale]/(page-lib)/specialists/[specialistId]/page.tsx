import { SpecialistProfile } from 'src/modules';

const Specialist = (props: { params: { specialistId: string } }) => {
  const { params } = props;

  return <SpecialistProfile {...params} />;
};

export default Specialist;
