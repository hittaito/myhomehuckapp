import Header from './Header';

export const Layout = ({ children }) => (
  <>
    <Header></Header>
    {children}
  </>
);
