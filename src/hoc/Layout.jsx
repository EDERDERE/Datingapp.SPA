import React, { Fragment } from 'react';
import Productos from '../containers/Productos';
import Navigation from './../components/Navigation/Navigation';

const Layout = () => {
  return (
    <Fragment>
      <Navigation></Navigation>
      <main className='container'>
        <Productos></Productos>
      </main>
    </Fragment>
  );
};

export default Layout;
