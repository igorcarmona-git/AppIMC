import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import Main from "./src/components/Main/Main";
import ImcList from "./src/components/ImcList/ImcList";
import EditScreen from "./src/components/EditScreen/EditScreen";
import { IconIMC } from "./src/components/Form/Icons/IconIMC";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Main"
          component={Main}
          options={( {navigation} ) => {
            return {
              title: "Home",
              headerRight: () => (
                <IconIMC
                  iconName="users"
                  iconSize={40}
                  iconColor="white"
                  text="All IMCs"
                  onPress={() => navigation.navigate("ImcList")}
                />
              ),
            };
          }}
        />

        <Stack.Screen
          name="ImcList"
          component={ImcList}
          options={{title: "Voltar para Home"}}
        />

        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={( {navigation} ) => {
            return {
              title: "Voltar para Home",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("Main")}
                  type="clear"
                  icon={<Icon name="home" size={40} color="white" />}
                />
              ),
            };
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: "red",
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};