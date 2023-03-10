import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
	name: "Eyeland",
	slug: "Eyeland",
	icon: "./assets/icon.png",
	backgroundColor: "#FFFFFF",
	android: {
		adaptiveIcon: {
			backgroundColor: "#FFFFFF",
			foregroundImage: "./assets/adaptive-icon.png"
		}
	}
};

export default config;
