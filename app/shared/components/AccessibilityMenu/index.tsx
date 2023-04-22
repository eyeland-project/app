import {
    View,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import Pressable from '@components/Pressable';
import { useState } from 'react';

import Options from './Options';

import useTheme from '@hooks/useTheme';
import { Theme } from '@theme';

const Accessibility = () => {
    const [showOptions, setShowOptions] = useState(false);
    const theme = useTheme();
    const styles = getStyles(theme);

    const unShowOptions = () => {
        setShowOptions(false);
    };

    return (
        <>
            {showOptions && (
                <Pressable style={styles.transparent} onPress={unShowOptions} />
            )}
            <View style={styles.container}>
                {showOptions && <Options unShowOptions={unShowOptions} />}
                <Pressable
                    onPress={() => setShowOptions(!showOptions)}
                    accessible={true}
                    accessibilityLabel="Opciones de accesibilidad"
                    accessibilityHint="Alternar funciones accesibles"
                    accessibilityRole="button"
                >
                    <Image
                        style={styles.image}
                        source={require('@icons/accessibility.png')}
                        resizeMode="contain"
                    />
                </Pressable>
            </View>
        </>
    );
};

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        transparent: {
            position: 'absolute',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            backgroundColor: 'transparent',
            bottom: 0
        },
        container: {
            flex: 1,
            position: 'absolute',
            bottom: 20,
            right: 20
        },
        image: {
            width: 55,
            height: 55
        }
    });

export default Accessibility;
