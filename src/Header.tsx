export interface Props {
  title: string,
  color?: string
}

const Header = (props: Props) => {

  let myVariable: unknown = { name: 'dev' };

  function hasName(obj: any): obj is { name: string } {
    return !!obj &&
      typeof obj === 'object' &&
      'name' in obj
  }
  if (hasName(myVariable)) {
    console.log(myVariable.name);
  }

  let b = 6;

  return <header style={{ color: props.color ? props.color : 'blueviolet' }}>{props.title}</header>;
};

export default Header;
