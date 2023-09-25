import Complete from './screens/Complete';
import FillBlank from './screens/FillBlank';
import Loading from './screens/Loading';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Open from './screens/Open';
import PosTaskProvider from '@app/core/contexts/PosTaskContext';
import SelectAndSpeaking from './screens/SelectAndSpeaking';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
			<Stack.Navigator>
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
					name="FillBlank"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={FillBlank}
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
