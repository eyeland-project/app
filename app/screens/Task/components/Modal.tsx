import { View, Text, Modal as ModalNative, StyleSheet } from 'react-native'
import Option from './Option'
import AntDesign from '@expo/vector-icons/AntDesign'
import Pressable from '@components/Pressable'

import useTheme from '@hooks/useTheme'

import { Theme } from '@theme'

interface Props {
    showModal: boolean
    closeModal: () => void
    correct?: boolean
    help: string
}

const Modal = ({ showModal, correct, closeModal, help }: Props) => {
    const theme = useTheme()

    return (
        <ModalNative
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={closeModal}
        >
            <View style={getStyles(theme).modalContainer}>
                <View style={getStyles(theme).modalView}>
                    <View style={getStyles(theme).iconContainer}>
                        <AntDesign name={correct ? 'checkcircle' : 'closecircle'} size={50} color={correct ? theme.colors.green : theme.colors.red} style={getStyles(theme).icon} />
                    </View>
                    <Text style={getStyles(theme).modalTitleText}>{correct ? 'Respuesta correcta' : 'Respuesta incorrecta'}</Text>
                    <View style={getStyles(theme).separator} />
                    <View style={getStyles(theme).helpContainer}>
                        {/* <View style={getStyles(theme).iconContainer}>
                            <Text style={getStyles(theme).iconText}>Ayuda:</Text>
                        </View> */}
                        <Text style={getStyles(theme).helpText}>{help}</Text>
                    </View>
                    <Pressable onPress={closeModal}>
                        <View style={getStyles(theme).button}>
                            <AntDesign name={'back'} size={25} color={theme.colors.white} />
                            <Text style={getStyles(theme).buttonText}>Reintentar</Text>
                        </View>
                    </Pressable>
                    {/* <Option 
                    text='Reintentar' 
                    onPress={closeModal} 
                    containerStyle={{ marginBottom: 10 }} 
                    textStyle={{ fontFamily: theme.fontWeight.regular, fontSize: theme.fontSize.large }} /> */}
                </View>
            </View>
        </ModalNative>
    )
}

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalView: {
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.large,
            paddingVertical: 10,
        },
        modalTitleText: {
            fontSize: theme.fontSize.xxl,
            fontFamily: theme.fontWeight.bold,
            color: theme.colors.darkGray,
            letterSpacing: theme.spacing.medium,
            textAlign: 'center',
            marginBottom: 10,
            paddingHorizontal: 20,
            marginTop: 30,
        },
        helpContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 40,
            alignSelf: 'center',
        },
        iconContainer: {
            position: 'absolute',
            top: -25,
            alignSelf: 'center',
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.full,
            padding: 4,
        },
        icon: {
            alignSelf: 'center',
        },
        helpText: {
            fontSize: theme.fontSize.large,
            fontFamily: theme.fontWeight.regular,
            color: theme.colors.black,
            letterSpacing: theme.spacing.medium,
            alignSelf: 'center',
            paddingHorizontal: 20,
            textAlign: 'center',
        },
        separator: {
            borderBottomColor: theme.colors.lightGreen,
            borderBottomWidth: 1,
            marginVertical: 10,
        },
        button: {
            backgroundColor: theme.colors.darkGreen,
            flexDirection: 'row',
            width: 200,
            height: 50,
            marginBottom: 10,
            borderRadius: theme.borderRadius.full,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
        buttonText: {
            color: theme.colors.white,
            fontSize: theme.fontSize.large,
            fontFamily: theme.fontWeight.medium,
            marginLeft: 10,
        }
    })

export default Modal