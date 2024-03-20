import { SpecialistProfile } from 'src/modules';

const Specialist = (props: { params: { specialistId: string } }) => (
  <SpecialistProfile {...props.params} />
);

export default Specialist;
