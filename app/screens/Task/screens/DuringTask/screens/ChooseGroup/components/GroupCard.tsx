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
    index: number;
}

const GroupCard = ({ id, name, members, taskOrder, index }: Props) => {
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
        <View style={getStyles(theme).outerContainer}>
            <View
                style={getStyles(theme).container}
                accessible={true}
                accessibilityLabel={`Grupo ${name}, miembros: ${members.length}`}
                accessibilityRole="button"
            >
                <Text style={[getStyles(theme).title, { fontFamily: theme.fontWeight.bold }]} accessible={false}>
                    Equipo {index}:
                </Text>
                <Text style={getStyles(theme).title} accessible={false}>
                    {name}
                </Text>
                <View style={getStyles(theme).divider} />
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
        outerContainer: {
            maxWidth: 350,
            width: '100%',
            marginBottom: 20,
            alignSelf: 'center',
        },
        container: {
            backgroundColor: theme.colors.white,
            marginHorizontal: 20,
            paddingVertical: 15,
            height: 247,
        },
        title: {
            fontSize: theme.fontSize.xl,
            fontFamily: theme.fontWeight.medium,
            color: theme.colors.darkGreen,
            letterSpacing: theme.spacing.medium,
            alignSelf: 'center',
        },
        button: {
            backgroundColor: theme.colors.bluerGreen,
            borderRadius: theme.borderRadius.full,
            paddingVertical: 10,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            alignSelf: 'center',
        },
        text: {
            color: theme.colors.darkestGreen,
            fontFamily: theme.fontWeight.bold,
            fontSize: theme.fontSize.xxl,
            letterSpacing: theme.spacing.medium,
        },
        textMember: {
            color: theme.colors.darkestGreen,
            fontSize: theme.fontSize.medium,
            fontFamily: theme.fontWeight.medium,
            letterSpacing: theme.spacing.medium,
            marginHorizontal: 10,
        },
        divider: {
            height: 4,
            backgroundColor: theme.colors.lightGreen,
            marginVertical: 15,
        }
    });

export default GroupCard;
