import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Perfil from '../Screens/Perfil';
import Produtos from '../Screens/Produtos';
import Favoritos from '../Screens/Favoritos';
import DrawerContent from './DrawerContent'; // You need to create this component
import routes from '../Constants/routes';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name={routes.Produtos} component={Produtos} />
      <Drawer.Screen name={routes.Favoritos} component={Favoritos} />
      <Drawer.Screen name={routes.Perfil} component={Perfil} />
    </Drawer.Navigator>
  );
}
