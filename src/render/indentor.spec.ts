import Indentor from "./indentor";

it('should indent single space', () => {
  const indentor = new Indentor(' ');
  expect(indentor.getIndent(0)).toEqual('');
  expect(indentor.getIndent(1)).toEqual(' ');
  expect(indentor.getIndent(2)).toEqual('  ');
});

it('should indent double space', () => {
  const indentor = new Indentor('  ');
  expect(indentor.getIndent(0)).toEqual('');
  expect(indentor.getIndent(1)).toEqual('  ');
  expect(indentor.getIndent(2)).toEqual('    ');
});

it('should indent double space using default instabce', () => {
  const indentor = Indentor.instance();
  expect(indentor.getIndent(0)).toEqual('');
  expect(indentor.getIndent(1)).toEqual('  ');
  expect(indentor.getIndent(2)).toEqual('    ');
});

it('should indent single tab', () => {
  const indentor = new Indentor('\t');
  expect(indentor.getIndent(0)).toEqual('');
  expect(indentor.getIndent(1)).toEqual('\t');
  expect(indentor.getIndent(2)).toEqual('\t\t');
});
