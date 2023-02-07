import { View, Text, StyleSheet } from 'react-native'
import BackButton from '../../shared/components/BackButton';
import WebView from 'react-native-webview';
import Pressable from '../../shared/components/Pressable';

import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';

import useTheme from '../../core/hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '../../theme';


interface TaskParams {
    idTask: string;
}

interface Props {
    route: RouteProp<ParamListBase, 'Introduction'> & {
        params: TaskParams;
    };
}

const PreTask = ({ route }: Props) => {
    const { idTask } = route.params;

    const theme = useTheme();
    const navigation = useNavigation<any>();
    // TODO - Get pretask from API

    return (
        <View style={getStyles(theme).container}>
            <View style={getStyles(theme).row}>
                <BackButton />
                <Pressable onPress={() => navigation.navigate('PreTask', { idTask })}>
                    <Text style={getStyles(theme).text}>Siguiente</Text>
                </Pressable>
            </View>
            {/* HARD CODE */}
            <WebView
                source={{ uri: 'https://wordwall.net/resource/36022113/task-1-vocabulary' }}
                style={{ marginBottom: 90, marginTop: 10 }}
            />
        </View>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            height: '100%',
            paddingTop: 10,
        },
        scrollView: {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
        },
        text: {
            color: theme.colors.black,
            fontSize: theme.fontSize.large,
            fontFamily: theme.fontWeight.bold,
        },
        image: {
            width: '100%',
            height: 200,
            borderRadius: theme.borderRadius.medium,
            marginBottom: 40,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
        },
    })


export default PreTask