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
}

const ContextModal = ({ showModal, toggleModal, dataIntroduction }: Props) => {
    const theme = useTheme()

    return (
        <Modal animationType='slide' visible={showModal} onRequestClose={toggleModal} transparent={true}>
            <View style={getStyles(theme).container}>
                <Pressable onPress={toggleModal} style={getStyles(theme).closeButton}>
                    <AntDesign
                        name='close'
                        size={40}
                        color={theme.colors.white}
                    />
                </Pressable>
                <Image source={{ uri: dataIntroduction.thumbnailUrl }} style={getStyles(theme).image} />
                <Text style={getStyles(theme).title}>{dataIntroduction.name}</Text>
                <Text style={getStyles(theme).description}>{dataIntroduction.longDescription}</Text>
            </View>
        </Modal>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: hexToRgbA(theme.colors.darkestGreen, 0.95),
            alignItems: 'center',
            justifyContent: 'center',
        },
        closeButton: {
            position: 'absolute',
            top: 30,
            right: 30,
        },
        image: {
            width: 904,
            height: 393,
            borderColor: theme.colors.white,
            borderWidth: 0.5,
        },
        title: {
            color: theme.colors.bluerGreen,
            fontSize: theme.fontSize.xxxxxxl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginTop: 20,
        },
        description: {
            color: theme.colors.bluerGreen,
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.bold,
            letterSpacing: theme.spacing.medium,
            marginTop: 20,
            maxWidth: 904,
            textAlign: 'center',
        },
    })

export default ContextModal