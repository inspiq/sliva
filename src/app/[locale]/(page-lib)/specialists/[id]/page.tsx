const Specialist = (props: { params: { id: string } }) => {
  const { params } = props;

  return <div>Specialist {params.id}</div>;
};

export default Specialist;
