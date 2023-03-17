import { View, StyleSheet, Text } from 'react-native';

import useTheme from '@hooks/useTheme';
import useTeam from '@hooks/useTeam';
import { useNavigation } from '@react-navigation/native';

import { Student } from '@interfaces/Student.interface';
import { Theme } from '@theme';
import Pressable from '@components/Pressable';
import { Power } from '@enums/Power.enum';

interface Props {
    id: string;
    name: string;
    members: Student[];
    taskOrder: number;
}

const GroupCard = ({ id, name, members, taskOrder }: Props) => {
    const theme = useTheme();
    const { joinTeam } = useTeam();
    const navigation = useNavigation<any>();

    const getPower = (power: Power) => {
        switch (power) {
            case Power.MemoryPro:
                return 'Memory Pro';
            case Power.SuperHearing:
                return 'Super Hearing';
            case Power.SuperRadar:
                return 'Super Radar';
            default:
                return 'Desconocido';
        }
    };

    return (
        <View
            style={getStyles(theme).container}
            accessible={true}
            accessibilityLabel={`Grupo ${name}, miembros: ${members.length}`}
            accessibilityRole="button"
        >
            <Text style={getStyles(theme).title} accessible={false}>
                {name}
            </Text>
            <View
                accessible={true}
                accessibilityLabel={`Miembros del grupo: ${members.map((member) => member.firstName + ' ' + member.lastName + ', poder: ' + getPower(member.power)).join(', ')}`}
                accessibilityRole="text"
            >
                {
                    members.map((member) => (
                        <Text
                            style={getStyles(theme).textMember}
                            key={member.id}
                            accessible={false}
                        >
                            {member.firstName + ' ' + member.lastName + ' - ' + getPower(member.power)}
                        </Text>
                    ))
                }
            </View>
            {members.length < 3 && (
                <Pressable
                    style={getStyles(theme).button}
                    onPress={async () => {
                        await joinTeam({ code: id, taskOrder });
                        navigation.navigate('WaitingBegin', { taskOrder });
                    }}
                    accessible
                    accessibilityLabel="Ingresar al grupo"
                    accessibilityHint="Toca dos veces para ingresar a este grupo"
                >
                    <Text style={getStyles(theme).text} accessible={false}>
                        Ingresar
                    </Text>
                </Pressable>
            )}
        </View>
    );
};

const getStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.medium,
            marginHorizontal: 20,
            padding: 15,
            ...theme.shadow,
        },
        title: {
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.bold,
            color: theme.colors.black,
            letterSpacing: theme.spacing.medium,
        },
        button: {
            backgroundColor: theme.colors.secondary,
            borderRadius: theme.borderRadius.full,
            padding: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginTop: 20,
            ...theme.shadow,
        },
        text: {
            color: theme.colors.white,
            fontFamily: theme.fontWeight.regular,
            fontSize: theme.fontSize.small,
            letterSpacing: theme.spacing.medium,
        },
        textMember: {
            color: theme.colors.black,
            fontSize: theme.fontSize.medium,
            fontFamily: theme.fontWeight.regular,
            letterSpacing: theme.spacing.medium,
        }
    });

export default GroupCard;
