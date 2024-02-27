import { SpecialistAccount } from 'src/modules';

const Specialist = (props: { params: { specialistId: string } }) => {
  const { params } = props;

  return <SpecialistAccount {...params} />;
};

export default Specialist;
