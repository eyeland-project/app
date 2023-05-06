import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import Loading from './screens/Loading';
import MultipleChoice from './screens/MultipleChoice';
import FillBlank from './screens/FillBlank';
import FlashCards from './screens/FlashCards';
import Order from './screens/Order';
import AudioMultipleChoice from './screens/AudioMultipleChoice';
import AudioOrder from './screens/AudioOrder';
import AudioSpeaking from './screens/AudioSpeaking';
import OrderAWord from './screens/OrderAWord';
import AudioOrderAWord from './screens/AudioOrderAWord';
import Complete from './screens/Complete';

import PreTaskProvider from '@contexts/PreTaskContext';

interface Props {
	route: any;
}

const Stack = createNativeStackNavigator();

const PreTask = ({ route }: Props) => {
	const optionsPrimary: NativeStackNavigationOptions = {
		animation: 'slide_from_right',
		headerBackVisible: false,
		headerShown: false
	};

	return (
		<PreTaskProvider>
			<Stack.Navigator initialRouteName='OrderAWord'>
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
					name="MultipleChoice"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={MultipleChoice}
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
					name="FlashCards"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={FlashCards}
				/>
				<Stack.Screen
					name="Order"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={Order}
				/>
				<Stack.Screen
					name="AudioMultipleChoice"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={AudioMultipleChoice}
				/>
				<Stack.Screen
					name="AudioOrder"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={AudioOrder}
				/>
				<Stack.Screen
					name="AudioSpeaking"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={AudioSpeaking}
				/>
				<Stack.Screen
					name="OrderAWord"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={OrderAWord}
				/>
				<Stack.Screen
					name="AudioOrderAWord"
					options={{
						...optionsPrimary
					}}
					initialParams={{
						question: null
					}}
					component={AudioOrderAWord}
				/>
				<Stack.Screen
					name="Complete"
					options={{
						...optionsPrimary
					}}
					component={Complete}
				/>
			</Stack.Navigator>
		</PreTaskProvider>
	);
};

export default PreTask;
