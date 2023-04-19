import { Text, StyleSheet, Modal, Image, View } from 'react-native'
import Pressable from '@components/Pressable'
import AntDesign from '@expo/vector-icons/AntDesign'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'
import { Introduction } from '@interfaces/Introduction.interface'

import { hexToRgbA } from '@utils/hexToRgba'

interface Props {
    showModal: boolean
    toggleModal: () => void
    dataIntroduction: Introduction
    isPhone: boolean
}

const ContextModal = ({ showModal, toggleModal, dataIntroduction, isPhone }: Props) => {
    const theme = useTheme()

    return (
        <Modal animationType='slide' visible={showModal} onRequestClose={toggleModal} transparent={true}>
            <View style={getStyles(theme, isPhone).container}>
                <Pressable onPress={toggleModal} style={getStyles(theme, isPhone).closeButton}>
                    <AntDesign
                        name='close'
                        size={40}
                        color={theme.colors.white}
                    />
                </Pressable>
                <Image source={{ uri: dataIntroduction.thumbnailUrl }} style={getStyles(theme, isPhone).image} />
                <Text style={getStyles(theme, isPhone).title}>{dataIntroduction.name}</Text>
                <Text style={getStyles(theme, isPhone).description}>{dataIntroduction.longDescription}</Text>
            </View>
        </Modal>
    )
}

const getStyles = (theme: Theme, isPhone: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: hexToRgbA(theme.colors.darkestGreen, 0.95),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: isPhone ? 20 : 0,
        },
        closeButton: {
            position: 'absolute',
            top: 30,
            right: 30,
        },
        image: {
            width: isPhone ? '100%' : 904,
            height: isPhone ? 200 : 393,
            borderColor: theme.colors.white,
            borderWidth: 0.5,
        },
        title: {
            color: theme.colors.bluerGreen,
            fontSize: isPhone ? theme.fontSize.xxxxxl : theme.fontSize.xxxxxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginTop: 20,
        },
        description: {
            color: theme.colors.bluerGreen,
            fontSize: isPhone ? theme.fontSize.large : theme.fontSize.xl,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
            marginTop: 20,
            maxWidth: isPhone ? '100%' : 904,
            textAlign: 'center',
            paddingHorizontal: isPhone ? 10 : 0,
        },
    });


export default ContextModal