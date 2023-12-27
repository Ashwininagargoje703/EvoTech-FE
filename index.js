import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";

import App from "./App";
import AuthContextProvider from "./src/context/AuthContext";
import { store } from "./src/store";
import { Provider } from "react-redux";

const AppWraper = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </NavigationContainer>
    </Provider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWraper);
