import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import Loading from './screens/Loading';
import Complete from './screens/Complete';
import SelectAndSpeaking from './screens/SelectAndSpeaking';
import Open from './screens/Open';

import PosTaskProvider from '@app/core/contexts/PosTaskContext';

interface Props {
	route: any;
}

const Stack = createNativeStackNavigator();

const PosTask = ({ route }: Props) => {

	const optionsPrimary: NativeStackNavigationOptions = {
		animation: 'slide_from_right',
		headerBackVisible: false,
		headerShown: false
	};

	return (
		<PosTaskProvider>
			<Stack.Navigator >
				<Stack.Screen
					name="Loading"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						taskOrder: route.params.taskOrder
					}}
					component={Loading}
				/>
				<Stack.Screen
					name="SelectAndSpeaking"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={SelectAndSpeaking}
				/>
				<Stack.Screen
					name="Open"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={Open}
				/>
				<Stack.Screen
					name="Complete"
					options={{
						...optionsPrimary
					}}
					component={Complete}
				/>
			</Stack.Navigator>
		</PosTaskProvider>
	);
};

export default PosTask;
